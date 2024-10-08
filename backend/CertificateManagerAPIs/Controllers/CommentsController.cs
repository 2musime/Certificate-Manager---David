using CertificateManagerAPIs.DTO;
using CertificateManagerAPIs.Services;
using Microsoft.AspNetCore.Mvc;

namespace CertificateManagerAPIs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpPost("{certificateId}")]
        public async Task<ActionResult<CommentDto>> AddComment(int certificateId, [FromBody] CommentDto commentDto)
        {
            if (commentDto == null)
            {
                return BadRequest("Comment data cannot be null.");
            }

            if (string.IsNullOrWhiteSpace(commentDto.UserComment))
            {
                return BadRequest("Comment text is required.");
            }

            var createdComment = await _commentService.AddCommentToCertificateAsync(certificateId, commentDto);

            return CreatedAtAction(
                nameof(GetCommentsByCertificateId),
                new { certificateId = certificateId, id = createdComment.Id },
                createdComment
            );
        }

        [HttpGet("Certificate/{certificateId}")]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetCommentsByCertificateId(int certificateId)
        {
            var comments = await _commentService.GetCommentsByCertificateIdAsync(certificateId);
            if (comments == null)
            {
                return NotFound($"No comments found for Certificate ID {certificateId}.");
            }

            return Ok(comments);
        }
    }
}
