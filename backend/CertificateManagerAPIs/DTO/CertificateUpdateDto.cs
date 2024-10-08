namespace CertificateManagerAPIs.DTO
{
    public class CertificateUpdateDto
    {
        public string Type { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public int SupplierId { get; set; }
        public IFormFile? PdfFile { get; set; }
        public List<CommentDto>? NewComments { get; set; }
        public List<int>? AssignedUserIds { get; set; }
    }
}