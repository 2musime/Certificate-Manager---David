namespace CertificateManagerAPIs.DTO
{
    public class CertificateCreateDto
    {
        public SupplierDto Supplier { get; set; } = null!;
        public string Type { get; set; } = null!;
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public string PdfFile { get; set; } = null!;
        public int? UserAssigned { get; set; }
        public int SupplierId { get; set; }
    }

}
