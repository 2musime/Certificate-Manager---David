using CertificateManagerAPIs.DTO;
using CertificateManagerAPIs.Entities;
using CertificateManagerAPIs.Repositories;

namespace CertificateManagerAPIs.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<IEnumerable<User>> GetAllUserAsync()
        {
            return await _userRepository.GetAllUserAsync();
        }
        public async Task<IEnumerable<UserDto>> SearchUsersByNameAsync(string userName)
        {
            var user = await _userRepository.SearchUsersByNameAsync(userName);
            return user.Select(s => new UserDto
            {
                Name = s.Name,
                FirstName = s.FirstName,
                UserId = s.UserId,
                Department = s.Department,
                Plant = s.Plant,
                Email = s.Email
            }).ToList();
        }
        public async Task<IEnumerable<UserDto>> SearchUsersByFirstNameAsync(string firstName)
        {
            var user = await _userRepository.SearchUsersByFirstNameAsync(firstName);
            return user.Select(s => new UserDto
            {
                Name = s.Name,
                FirstName = s.FirstName,
                UserId = s.UserId,
                Department = s.Department,
                Plant = s.Plant,
                Email = s.Email
            }).ToList();
        }
        public async Task<IEnumerable<UserDto>> SearchUsersByUserIdAsync(int userId)
        {
            var user = await _userRepository.SearchUsersByUserIdAsync(userId);
            return user.Select(s => new UserDto
            {
                Name = s.Name,
                FirstName = s.FirstName,
                UserId = s.UserId,
                Department = s.Department,
                Plant = s.Plant,
                Email = s.Email
            }).ToList();
        }
        public async Task<IEnumerable<UserDto>> SearchUsersByPlantAsync(string plant)
        {
            var user = await _userRepository.SearchUsersByPlantAsync(plant);
            return user.Select(s => new UserDto
            {
                Name = s.Name,
                FirstName = s.FirstName,
                UserId = s.UserId,
                Department = s.Department,
                Plant = s.Plant,
                Email = s.Email
            }).ToList();
        }
    }
}
