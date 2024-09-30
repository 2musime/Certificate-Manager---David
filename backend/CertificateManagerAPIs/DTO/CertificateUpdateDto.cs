namespace CertificateManagerAPIs.DTO
{
    public class CertificateUpdateDto
    {
        public int SupplierId { get; set; }
        public string Type { get; set; } = null!;
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public string PdfFile { get; set; } = null!;
        public int? UserAssigned { get; set; }
        public List<CommentDto> NewComments { get; set; } = new List<CommentDto>();
        public List<int> AssignedUserIds { get; set; } = new List<int>();
    }
}
