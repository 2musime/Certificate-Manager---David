using CertificateManagerAPIs.DTO;
using CertificateManagerAPIs.Entities;

namespace CertificateManagerAPIs.Services
{
    public class CertificateService : ICertificateService
    {
        private readonly ICertificateRepository _certificateRepository;

        public CertificateService(ICertificateRepository certificateRepository)
        {
            _certificateRepository = certificateRepository;
        }
        public async Task<IEnumerable<CertificateDto>> GetAllCertificatesAsync()
        {
            var certificates = await _certificateRepository.GetCertificatesAsync();
            return certificates.Select(c => new CertificateDto
            {
                Id = c.Id,
                Type = c.Type,
                ValidFrom = c.ValidFrom,
                ValidTo = c.ValidTo,
                Supplier = new SupplierDto
                {
                    SupplierName = c.Supplier.SupplierName
                }
            });
        }

        public async Task<CertificateDto?> GetCertificateByIdAsync(int id)
        {
            var certificate = await _certificateRepository.GetCertificateByIdAsync(id);
            if (certificate == null) return null;

            return new CertificateDto
            {
                Id = certificate.Id,
                Type = certificate.Type,
                ValidFrom = certificate.ValidFrom,
                ValidTo = certificate.ValidTo,
                Supplier = new SupplierDto
                {
                    SupplierName = certificate.Supplier.SupplierName
                }
            };
        }

        public async Task CreateCertificateAsync(CertificateCreateDto dto)
        {
            var certificate = new Certificate
            {
                Type = dto.Type,
                ValidFrom = dto.ValidFrom,
                ValidTo = dto.ValidTo,
                PdfFile = dto.PdfFile,
                SupplierId = dto.SupplierId
            };

            await _certificateRepository.AddCertificateAsync(certificate);
            await _certificateRepository.SaveChangesAsync();
        }

        public async Task UpdateCertificateAsync(int id, CertificateUpdateDto dto)
        {
            var certificate = await _certificateRepository.GetCertificateByIdAsync(id);
            if (certificate == null) throw new Exception("Certificate not found");

            certificate.Type = dto.Type;
            certificate.ValidFrom = dto.ValidFrom;
            certificate.ValidTo = dto.ValidTo;
            certificate.PdfFile = dto.PdfFile;
            certificate.UserAssigned = dto.UserAssigned;
            certificate.SupplierId = dto.SupplierId;

            await _certificateRepository.UpdateCertificateAsync(certificate);
            await _certificateRepository.SaveChangesAsync();
        }

        public async Task DeleteCertificateAsync(int id)
        {
            await _certificateRepository.DeleteCertificateAsync(id);
            await _certificateRepository.SaveChangesAsync();
        }
    }
}
