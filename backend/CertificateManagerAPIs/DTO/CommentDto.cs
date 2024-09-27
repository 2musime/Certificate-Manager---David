namespace CertificateManagerAPIs.DTO
{
    public class CommentDto
    {
        public int Id { get; set; }
        public int CertificateId { get; set; }
        public int UserId { get; set; }
        public string UserComment { get; set; } = null!;
    }
}