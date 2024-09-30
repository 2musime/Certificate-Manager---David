using CertificateManagerAPIs.Entities;

namespace CertificateManagerAPIs.Repositories
{
    public interface ISupplierRepository
    {
        Task<IEnumerable<Supplier>> GetSuppliersAsync();
        Task<IEnumerable<Supplier>> SearchSuppliersByNameAsync(string supplierName);
        Task<IEnumerable<Supplier>> SearchSuppliersByIndexAsync(int supplierIndex);
        Task<IEnumerable<Supplier>> SearchSuppliersByCityAsync(string city);
    }
}
