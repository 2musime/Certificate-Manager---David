using CertificateManagerAPIs.DTO;
using CertificateManagerAPIs.Entities;
using CertificateManagerAPIs.Repositories;

namespace CertificateManagerAPIs.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;

        public CommentService(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public async Task<IEnumerable<CommentDto>> GetCommentsByCertificateIdAsync(int certificateId)
        {
            var comments = await _commentRepository.GetCommentsByCertificateIdAsync(certificateId);
            var commentDtos = comments.Select(c => new CommentDto
            {
                Id = c.Id,
                CertificateId = c.CertificateId,
                UserId = c.UserId,
                UserComment = c.UserComment
            });

            return commentDtos;
        }

        public async Task<CommentDto> AddCommentToCertificateAsync(int certificateId, CommentDto dto)
        {
            var comment = new Comment
            {
                CertificateId = certificateId,
                UserId = dto.UserId,
                UserComment = dto.UserComment
            };

            var createdComment = await _commentRepository.AddCommentAsync(comment);

            return new CommentDto
            {
                Id = createdComment.Id,
                CertificateId = createdComment.CertificateId,
                UserId = createdComment.UserId,
                UserComment = createdComment.UserComment
            };
        }
    }
}
