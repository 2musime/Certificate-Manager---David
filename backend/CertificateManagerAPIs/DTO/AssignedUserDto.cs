namespace CertificateManagerAPIs.DTO
{
    public class AssignedUserDto
    {
        public int CertificateId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public UserDto? User { get; set; }
    }
}