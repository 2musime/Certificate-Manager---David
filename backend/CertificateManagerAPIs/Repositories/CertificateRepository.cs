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
                                 .Where(c => c.DeletedAt == null)
                                 .Include(c => c.Supplier)
                                 .ToListAsync();
        }

        public async Task<Certificate?> GetCertificateByIdAsync(int id)
        {
            return await _context.Certificates
                .Where(c => c.DeletedAt == null)
                .Include(c => c.Supplier)
                .Include(c => c.Comments)
                .Include(c => c.AssignedUsers)
                    .ThenInclude(au => au.User)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task AddCertificateAsync(Certificate certificate)
        {
            await _context.Certificates.AddAsync(certificate);
        }
        public async Task UpdateCertificateAsync(Certificate certificate)
        {
            _context.Certificates.Update(certificate);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCertificateAsync(int id)
        {
            var certificate = await GetCertificateByIdAsync(id);
            if (certificate != null)
            {
                certificate.DeletedAt = DateTime.UtcNow;
            }
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}
