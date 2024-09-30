using CertificateManagerAPIs.DTO;
using CertificateManagerAPIs.Entities;
using CertificateManagerAPIs.Repositories;
namespace CertificateManagerAPIs.Services;

public class SupplierService : ISupplierService
{
    private readonly ISupplierRepository _supplierRepository;
    public SupplierService(ISupplierRepository supplierRepository)
    {
        _supplierRepository = supplierRepository;
    }
    public async Task<IEnumerable<Supplier>> GetSuppliersAsync()
    {
        return await _supplierRepository.GetSuppliersAsync();
    }

    public async Task<IEnumerable<SupplierDto>> SearchSuppliersByNameAsync(string supplierName)
    {
        var suppliers = await _supplierRepository.SearchSuppliersByNameAsync(supplierName);
        return suppliers.Select(s => new SupplierDto
        {
            SupplierId = s.SupplierId,
            SupplierName = s.SupplierName,
            SupplierIndex = s.SupplierIndex,
            City = s.City
        }).ToList();
    }

    public async Task<IEnumerable<SupplierDto>> SearchSuppliersByIndexAsync(int supplierIndex)
    {
        var suppliers = await _supplierRepository.SearchSuppliersByIndexAsync(supplierIndex);
        return suppliers.Select(s => new SupplierDto
        {
            SupplierId = s.SupplierId,
            SupplierName = s.SupplierName,
            SupplierIndex = s.SupplierIndex,
            City = s.City
        }).ToList();
    }

    public async Task<IEnumerable<SupplierDto>> SearchSuppliersByCityAsync(string city)
    {
        var suppliers = await _supplierRepository.SearchSuppliersByCityAsync(city);
        return suppliers.Select(s => new SupplierDto
        {
            SupplierId = s.SupplierId,
            SupplierName = s.SupplierName,
            SupplierIndex = s.SupplierIndex,
            City = s.City
        }).ToList();
    }
}