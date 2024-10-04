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
        public async Task<ActionResult<IEnumerable<SupplierDto>>> GetSuppliersAsync([FromQuery] SupplierDto filter)
        {
            var suppliers = await _supplierService
                .GetFilteredSuppliersAsync(filter.SupplierName, filter.SupplierIndex, filter.City);
            return Ok(suppliers);
        }

    }
}
