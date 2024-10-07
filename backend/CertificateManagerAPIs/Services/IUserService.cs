using CertificateManagerAPIs.DTO;

namespace CertificateManagerAPIs.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetFilteredUsersAsync(string? Name, string? firstName, int? userId, string? Department, string? plant, string? email);
    }
}
