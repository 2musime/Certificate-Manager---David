using CertificateManagerAPIs.Entities;

namespace CertificateManagerAPIs.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUserAsync();
        Task<IEnumerable<User>> SearchUsersByNameAsync(string userName);
        Task<IEnumerable<User>> SearchUsersByFirstNameAsync(string firstName);
        Task<IEnumerable<User>> SearchUsersByUserIdAsync(int userId);
        Task<IEnumerable<User>> SearchUsersByPlantAsync(string plant);
    }
}
