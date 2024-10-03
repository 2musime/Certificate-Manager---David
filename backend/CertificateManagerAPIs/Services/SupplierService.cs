using CertificateManagerAPIs.DTO;
using CertificateManagerAPIs.Repositories;

namespace CertificateManagerAPIs.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly ISupplierRepository _supplierRepository;

        public SupplierService(ISupplierRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }

        public async Task<IEnumerable<SupplierDto>> GetFilteredSuppliersAsync(
            string supplierName, int? supplierIndex, string city)
        {
            var suppliers = await _supplierRepository.GetSuppliersAsync();


            if (!string.IsNullOrEmpty(supplierName))
            {
                suppliers = suppliers.Where(s => s.SupplierName.Contains(supplierName, StringComparison.OrdinalIgnoreCase));
            }

            if (supplierIndex.HasValue)
            {
                suppliers = suppliers.Where(s => s.SupplierIndex == supplierIndex.Value);
            }

            if (!string.IsNullOrEmpty(city))
            {
                suppliers = suppliers.Where(s => s.City.Contains(city, StringComparison.OrdinalIgnoreCase));
            }

            return suppliers.Select(s => new SupplierDto
            {
                SupplierId = s.SupplierId,
                SupplierName = s.SupplierName,
                SupplierIndex = s.SupplierIndex,
                City = s.City
            }).ToList();
        }
    }
}
