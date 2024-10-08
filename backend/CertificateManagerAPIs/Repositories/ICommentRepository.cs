using CertificateManagerAPIs.Entities;

namespace CertificateManagerAPIs.Repositories
{
    public interface ICommentRepository
    {
        Task<IEnumerable<Comment>> GetCommentsByCertificateIdAsync(int certificateId);
        Task<Comment> AddCommentAsync(Comment comment);
    }
}