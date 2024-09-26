using CertificateManagerAPIs.DTO;
using CertificateManagerAPIs.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CertificatesController : ControllerBase
    {
        private readonly CertificatedbContext _context;

        public CertificatesController(CertificatedbContext context)
        {
            _context = context;
        }
        // GET: api/certificates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CertificateDto>>> GetCertificates()
        {
            var certificates = await _context.Certificates
                .Where(c => c.DeletedAt == null)
                .Include(c => c.Supplier)
                .Select(c => new CertificateDto
                {
                    //Id = c.Id,
                    Type = c.Type,
                    ValidFrom = c.ValidFrom,
                    ValidTo = c.ValidTo,
                    Supplier = new SupplierDto
                    {
                        SupplierId = c.Supplier.SupplierId,
                        SupplierName = c.Supplier.SupplierName
                    }
                })
                .ToListAsync();

            return Ok(certificates);
        }


        // GET: api/certificates/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CertificateUpdateDto>> GetCertificateById(int id)
        {
            var certificate = await _context.Certificates
                .Include(c => c.Supplier)
                .Include(c => c.UserAssignedNavigation)
                .Where(c => c.Id == id && c.DeletedAt == null)
                .Select(c => new CertificateUpdateDto
                {
                    Id = c.Id,
                    Type = c.Type,
                    ValidFrom = c.ValidFrom,
                    ValidTo = c.ValidTo,
                    PdfFile = c.PdfFile,
                    UserAssigned = c.UserAssigned,
                    Supplier = new SupplierDto
                    {
                        SupplierId = c.Supplier.SupplierId,
                        SupplierName = c.Supplier.SupplierName
                    }
                })
                .FirstOrDefaultAsync();

            if (certificate == null)
            {
                return NotFound();
            }

            return Ok(certificate);
        }

        [HttpPost]
        public async Task<ActionResult<CertificateDto>> CreateCertificate([FromBody] CertificateCreateDto certificateCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var certificate = new Certificate
            {
                Type = certificateCreateDto.Type,
                ValidFrom = certificateCreateDto.ValidFrom,
                ValidTo = certificateCreateDto.ValidTo,
                PdfFile = certificateCreateDto.PdfFile,
                SupplierId = certificateCreateDto.SupplierId,
                UserAssigned = certificateCreateDto.UserAssigned,
                CreatedAt = DateTime.UtcNow,
                ModifiedAt = DateTime.UtcNow
            };

            _context.Certificates.Add(certificate);
            await _context.SaveChangesAsync();

            var certificateDto = new CertificateCreateDto
            {
                Id = certificate.Id,
                Type = certificate.Type,
                ValidFrom = certificate.ValidFrom,
                ValidTo = certificate.ValidTo,
                PdfFile = certificate.PdfFile,
                UserAssigned = certificate.UserAssigned,
                SupplierId = certificate.SupplierId
            };

            return CreatedAtAction(nameof(GetCertificateById), new { id = certificateCreateDto.Id }, certificateDto);
        }


        // PUT: api/certificates/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<CertificateUpdateDto>> UpdateCertificate(int id, CertificateUpdateDto certificateUpdateDto)
        {
            if (id != certificateUpdateDto.Id)
            {
                return BadRequest();
            }

            var certificate = await _context.Certificates.FindAsync(id);
            if (certificate == null || certificate.DeletedAt != null)
            {
                return NotFound();
            }

            certificate.Type = certificateUpdateDto.Type;
            certificate.ValidFrom = certificateUpdateDto.ValidFrom;
            certificate.ValidTo = certificateUpdateDto.ValidTo;
            certificate.PdfFile = certificateUpdateDto.PdfFile;
            certificate.UserAssigned = certificateUpdateDto.UserAssigned;
            certificate.ModifiedAt = DateTime.UtcNow;

            _context.Entry(certificate).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new CertificateUpdateDto
            {
                Id = certificate.Id,
                Type = certificate.Type,
                ValidFrom = certificate.ValidFrom,
                ValidTo = certificate.ValidTo,
                PdfFile = certificate.PdfFile,
                UserAssigned = certificate.UserAssigned,
                Supplier = new SupplierDto
                {
                    SupplierId = certificate.SupplierId,
                    SupplierName = certificate.Supplier.SupplierName
                }
            });
        }

        // DELETE: api/Certificates/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCertificate(int id)
        {
            var certificate = await _context.Certificates.FindAsync(id);

            if (certificate == null)
            {
                return NotFound();
            }

            certificate.DeletedAt = DateTime.UtcNow;

            _context.Entry(certificate).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
