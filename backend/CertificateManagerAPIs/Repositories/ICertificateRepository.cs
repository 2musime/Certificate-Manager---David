using CertificateManagerAPIs.Entities;

public interface ICertificateRepository
{
    Task<IEnumerable<Certificate>> GetCertificatesAsync();
    Task<Certificate?> GetCertificateByIdAsync(int id);
    Task AddCertificateAsync(Certificate certificate);
    Task UpdateCertificateAsync(Certificate certificate);
    Task DeleteCertificateAsync(int id);
    Task<bool> SaveChangesAsync();
}
