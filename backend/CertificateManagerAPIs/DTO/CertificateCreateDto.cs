
namespace CertificateManagerAPIs.DTO
{
    public class CertificateCreateDto
    {
        public int SupplierId { get; set; }
        public string Type { get; set; } = null!;
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public IFormFile PdfFile { get; set; } = null!;
        public List<string> AssignedUserIds { get; set; } = new List<string>();
    }
}
