using System.Text.Json.Serialization;

namespace CertificateManagerAPIs.DTO
{
    public class CertificateDto
    {
        [JsonIgnore]
        public SupplierDto Supplier { get; set; } = null!;
        public string SupplierDetails => $"{Supplier.SupplierName},{Supplier.SupplierIndex},{Supplier.City}";
        public string Type { get; set; } = null!;
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public int Id { get; set; }
    }
}