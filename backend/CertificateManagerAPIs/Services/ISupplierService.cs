using CertificateManagerAPIs.DTO;

namespace CertificateManagerAPIs.Services
{
    public interface ISupplierService
    {

        Task<IEnumerable<SupplierDto>> GetFilteredSuppliersAsync(string supplierName, int? supplierIndex, string city);
    }
}
