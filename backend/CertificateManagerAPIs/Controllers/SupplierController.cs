using CertificateManagerAPIs.DTO;
using CertificateManagerAPIs.Services;
using Microsoft.AspNetCore.Mvc;

namespace CertificateManagerAPIs.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _supplierService;

        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupplierDto>>> GetSuppliersAsync(
            [FromQuery] string supplierName = null,
            [FromQuery] int? supplierIndex = null,
            [FromQuery] string city = null)
        {
            var suppliers = await _supplierService.GetFilteredSuppliersAsync(supplierName, supplierIndex, city);
            return Ok(suppliers);
        }
    }
}
