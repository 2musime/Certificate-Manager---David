namespace CertificateManagerAPIs.DTO
{
    public class CertificateCreateDto
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public string PdfFile { get; set; }
        public int SupplierId { get; set; }
        public int? UserAssigned { get; set; }
    }


}
