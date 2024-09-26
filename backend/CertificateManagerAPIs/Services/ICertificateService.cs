using CertificateManagerAPIs.DTO;

namespace CertificateManagerAPIs.Services
{
    public interface ICertificateService
    {
        Task<IEnumerable<CertificateDto>> GetAllCertificatesAsync();
        Task<CertificateDto?> GetCertificateByIdAsync(int id);
        Task CreateCertificateAsync(CertificateCreateDto dto);
        Task UpdateCertificateAsync(int id, CertificateUpdateDto dto);
        Task DeleteCertificateAsync(int id);
    }
}
