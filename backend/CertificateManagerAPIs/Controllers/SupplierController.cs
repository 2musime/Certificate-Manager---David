using CertificateManagerAPIs.DTO;
using CertificateManagerAPIs.Services;
using Microsoft.AspNetCore.Mvc;


namespace CertificateManagerAPIs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupplierController : Controller
    {
        private readonly ISupplierService _supplierService;

        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        [HttpGet("All suppliers")]
        public async Task<ActionResult<IEnumerable<SupplierDto>>> GetSuppliersAsync()
        {
            var suppliers = await _supplierService.GetSuppliersAsync();
            return Ok(suppliers);
        }
        [HttpGet("SearchByName")]
        public async Task<IActionResult> SearchByName(string supplierName)
        {
            var suppliers = await _supplierService.SearchSuppliersByNameAsync(supplierName);
            return Ok(suppliers);
        }
        // Search by Supplier Index
        [HttpGet("SearchByIndex")]
        public async Task<IActionResult> SearchByIndex(int supplierIndex)
        {
            var suppliers = await _supplierService.SearchSuppliersByIndexAsync(supplierIndex);
            return Ok(suppliers);
        }
        // Search by City
        [HttpGet("SearchByCity")]
        public async Task<IActionResult> SearchByCity(string city)
        {
            var suppliers = await _supplierService.SearchSuppliersByCityAsync(city);
            return Ok(suppliers);
        }
    }
}
