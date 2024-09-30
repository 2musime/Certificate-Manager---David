namespace CertificateManagerAPIs.DTO
{
    public class CertificateByIdDto
    {
        public SupplierDto Supplier { get; set; } = null!;
        public string Type { get; set; } = null!;
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public string PdfFile { get; set; } = null!;
        public int Id { get; set; }
        public List<CommentDto>? Comments { get; set; }
        public List<AssignedUserDto>? UserAssignedNavigation { get; set; }
    }
}
