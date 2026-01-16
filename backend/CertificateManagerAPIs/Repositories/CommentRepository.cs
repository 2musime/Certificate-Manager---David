using CertificateManagerAPIs.Data;
using CertificateManagerAPIs.Entities;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPIs.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly CertificatedbContext _context;

        public CommentRepository(CertificatedbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Comment>> GetCommentsByCertificateIdAsync(int certificateId)
        {
            return await _context.Comments
                .Where(c => c.CertificateId == certificateId)
                .ToListAsync();
        }

        public async Task<Comment> AddCommentAsync(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
            return comment;
        }
    }
}
