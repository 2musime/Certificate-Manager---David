namespace CertificateManagerAPIs.DTO
{
    public class CertificateDto
    {

        public SupplierDto Supplier { get; set; } = null!;
        public string Type { get; set; } = null!;

        public DateTime ValidFrom { get; set; }

        public DateTime ValidTo { get; set; }
        public int Id { get; set; }
    }

}