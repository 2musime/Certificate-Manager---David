using CertificateManagerAPIs.DTO;
using CertificateManagerAPIs.Services;
using Microsoft.AspNetCore.Mvc;

namespace CertificateManagerAPIs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CertificateController : ControllerBase
    {
        private readonly ICertificateService _certificateService;

        public CertificateController(ICertificateService certificateService)
        {
            _certificateService = certificateService;
        }

        // GET: api/Certificate
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CertificateDto>>> GetCertificates()
        {
            var certificates = await _certificateService.GetAllCertificatesAsync();
            return Ok(certificates);
        }

        // GET: api/Certificate/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CertificateDto>> GetCertificate(int id)
        {
            var certificate = await _certificateService.GetCertificateByIdAsync(id);
            if (certificate == null) return NotFound();
            return Ok(certificate);
        }

        // POST: api/Certificate
        [HttpPost]
        public async Task<ActionResult> CreateCertificate([FromBody] CertificateCreateDto dto)
        {
            await _certificateService.CreateCertificateAsync(dto);
            return CreatedAtAction(nameof(GetCertificate), new { id = dto.SupplierId }, dto);
        }

        // PUT: api/Certificate/5
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCertificate(int id, [FromBody] CertificateUpdateDto dto)
        {
            await _certificateService.UpdateCertificateAsync(id, dto);
            return NoContent();
        }

        // DELETE: api/Certificate/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCertificate(int id)
        {
            await _certificateService.DeleteCertificateAsync(id);
            return NoContent();
        }
    }
}