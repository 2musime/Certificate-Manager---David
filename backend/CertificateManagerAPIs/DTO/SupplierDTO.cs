namespace CertificateManagerAPIs.DTO
{
    public class SupplierDto
    {
        public int SupplierId { get; set; }

        public string SupplierName { get; set; } = null!;

        public int? SupplierIndex { get; set; }

        public string City { get; set; } = null!;
    }
}

