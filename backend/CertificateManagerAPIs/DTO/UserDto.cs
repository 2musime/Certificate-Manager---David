namespace CertificateManagerAPIs.DTO
{
    public class UserDto
    {
        public int UserId { get; set; }
        public string Name { get; set; } = null!;
        public string? FirstName { get; set; }
        public string? Department { get; set; }
        public string Plant { get; set; } = null!;
        public string Email { get; set; } = null!;
    }
}
