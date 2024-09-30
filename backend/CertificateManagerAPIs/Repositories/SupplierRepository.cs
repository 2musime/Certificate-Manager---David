using CertificateManagerAPIs.Data;
using CertificateManagerAPIs.Entities;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPIs.Repositories
{
    public class SupplierRepository : ISupplierRepository
    {
        private readonly CertificatedbContext _context;
        public SupplierRepository(CertificatedbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Supplier>> GetSuppliersAsync()
        {
            return await _context.Suppliers
                                 .ToListAsync();
        }

        public async Task<IEnumerable<Supplier>> SearchSuppliersByNameAsync(string supplierName)
        {
            return await _context.Suppliers
                .Where(s => s.SupplierName.Contains(supplierName))
                .ToListAsync();
        }

        public async Task<IEnumerable<Supplier>> SearchSuppliersByIndexAsync(int supplierIndex)
        {
            return await _context.Suppliers
                .Where(s => s.SupplierIndex == supplierIndex)
                .ToListAsync();
        }

        public async Task<IEnumerable<Supplier>> SearchSuppliersByCityAsync(string city)
        {
            return await _context.Suppliers
                .Where(s => s.City.Contains(city))
                .ToListAsync();
        }
    }
}
