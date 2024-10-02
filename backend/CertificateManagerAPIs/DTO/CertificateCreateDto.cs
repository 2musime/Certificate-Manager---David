
namespace CertificateManagerAPIs.DTO
{
    public class CertificateCreateDto
    {
        public int SupplierId;
        public string Type { get; set; } = null!;
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public byte[] PdfFile { get; set; } = null!;
        public int? UserAssigned { get; set; }
        public List<int>? AssignedUserIds { get; set; }
        public List<CommentDto>? Comments { get; set; }
    }
}
