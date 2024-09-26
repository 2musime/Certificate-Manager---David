using CertificateManagerAPIs.DTO;
using CertificateManagerAPIs.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPIs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : Controller
    {
        private readonly CertificatedbContext _context;
        public CommentController(CertificatedbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetComments()
        {
            var comments = await _context.Comments
                .ToListAsync();

            var commentDtos = comments.Select(c => new CommentDto
            {
                Id = c.Id,
                CertificateId = c.CertificateId,
                UserId = c.UserId,
                UserComment = c.UserComment
            }).ToList();

            return Ok(commentDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CommentDto>> GetComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            var commentDto = new CommentDto
            {
                Id = comment.Id,
                CertificateId = comment.CertificateId,
                UserId = comment.UserId,
                UserComment = comment.UserComment
            };

            return Ok(commentDto);
        }
        [HttpPost]
        public async Task<ActionResult<CommentDto>> PostComment(CommentDto commentDto)
        {
            var comment = new Comment
            {
                CertificateId = commentDto.CertificateId,
                UserId = commentDto.UserId,
                UserComment = commentDto.UserComment,
                CreatedAt = DateTime.Now
            };

            _context.Comments.Add(comment);

            await _context.SaveChangesAsync();
            var createdCommentDto = new CommentDto
            {
                Id = comment.Id,
                CertificateId = comment.CertificateId,
                UserId = comment.UserId,
                UserComment = comment.UserComment
            };
            return CreatedAtAction(nameof(GetComment), new { id = createdCommentDto.Id }, createdCommentDto);
        }

    }
}
