namespace CertificateManagerAPIs.DTO
{
    public class UserDto
    {
        public int UserId { get; set; }

        public string Name { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string? Department { get; set; }

        public string? Plant { get; set; }

        public string Email { get; set; } = null!;

        public ICollection<CertificateDto> Certificates { get; set; } = new List<CertificateDto>();

        public ICollection<CommentDto> Comments { get; set; } = new List<CommentDto>();
    }
}
