using CertificateManagerAPIs.DTO;
namespace CertificateManagerAPIs.Services
{
    public interface ICommentService
    {
        Task<IEnumerable<CommentDto>> GetCommentsByCertificateIdAsync(int certificateId);
        Task<CommentDto> AddCommentToCertificateAsync(int certificateId, CommentDto commentDto);
    }
}