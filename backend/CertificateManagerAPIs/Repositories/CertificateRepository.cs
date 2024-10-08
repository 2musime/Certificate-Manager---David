using CertificateManagerAPIs.Data;
using CertificateManagerAPIs.Entities;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPIs.Repositories
{
    public class CertificateRepository : ICertificateRepository
    {
        private readonly CertificatedbContext _context;

        public CertificateRepository(CertificatedbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Certificate>> GetCertificatesAsync()
        {
            return await _context.Certificates
                .Include(c => c.Supplier)
                .Where(c => c.DeletedAt == null)
                .ToListAsync();
        }

        public async Task<Certificate?> GetCertificateByIdAsync(int id)
        {
            return await _context.Certificates
           .Include(c => c.Supplier)
           .Include(c => c.Comments)
           .Include(c => c.AssignedUsers)
               .ThenInclude(au => au.User)
           .FirstOrDefaultAsync(c => c.Id == id && c.DeletedAt == null);
        }

        public async Task AddCertificateAsync(Certificate certificate)
        {
            await _context.Certificates.AddAsync(certificate);
        }

        public async Task UpdateCertificateAsync(Certificate certificate)
        {
            _context.Entry(certificate).State = EntityState.Modified;
        }

        public async Task DeleteCertificateAsync(int id)
        {
            var certificate = await _context.Certificates.FindAsync(id);
            if (certificate != null)
            {
                certificate.DeletedAt = DateTime.UtcNow;
                _context.Entry(certificate).State = EntityState.Modified;
            }
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}