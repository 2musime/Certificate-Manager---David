using CertificateManagerAPIs.DTO;
using CertificateManagerAPIs.Entities;

namespace CertificateManagerAPIs.Services
{
    public interface ISupplierService
    {
        Task<IEnumerable<Supplier>> GetSuppliersAsync();
        Task<IEnumerable<SupplierDto>> SearchSuppliersByNameAsync(string supplierName);
        Task<IEnumerable<SupplierDto>> SearchSuppliersByIndexAsync(int supplierIndex);
        Task<IEnumerable<SupplierDto>> SearchSuppliersByCityAsync(string city);
    }
}
