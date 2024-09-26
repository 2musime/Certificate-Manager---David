namespace CertificateManagerAPIs.DTO
{

    public class CertificateDto
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public SupplierDto Supplier { get; set; }
    }

}

