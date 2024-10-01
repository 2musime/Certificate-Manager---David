using CertificateManagerAPIs.DTO;
using CertificateManagerAPIs.Entities;

namespace CertificateManagerAPIs.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUserAsync();
        Task<IEnumerable<UserDto>> SearchUsersByNameAsync(string userName);
        Task<IEnumerable<UserDto>> SearchUsersByFirstNameAsync(string firstName);
        Task<IEnumerable<UserDto>> SearchUsersByUserIdAsync(int userId);
        Task<IEnumerable<UserDto>> SearchUsersByPlantAsync(string plant);
    }
}
