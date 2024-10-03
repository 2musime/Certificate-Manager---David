using CertificateManagerAPIs.DTO;
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

        public async Task<IEnumerable<UserDto>> GetFilteredUsersAsync(string Name, string firstName, int? userId, string Department, string plant, string email)
        {
            var users = await _userRepository.GetAllUserAsync();

            if (!string.IsNullOrEmpty(Name))
            {
                users = users.Where(u => u.Name.Contains(Name, StringComparison.OrdinalIgnoreCase));
            }

            if (!string.IsNullOrEmpty(firstName))
            {
                users = users.Where(u => u.FirstName.Contains(firstName, StringComparison.OrdinalIgnoreCase));
            }

            if (userId.HasValue)
            {
                users = users.Where(u => u.UserId == userId.Value);
            }

            if (!string.IsNullOrEmpty(Department))
            {
                users = users.Where(u => u.Department.Contains(Department, StringComparison.OrdinalIgnoreCase));
            }
            if (!string.IsNullOrEmpty(plant))
            {
                users = users.Where(u => u.Plant.Contains(plant, StringComparison.OrdinalIgnoreCase));
            }
            if (!string.IsNullOrEmpty(email))
            {
                users = users.Where(u => u.Email.Contains(email, StringComparison.OrdinalIgnoreCase));
            }

            return users.Select(u => new UserDto
            {
                Name = u.Name,
                FirstName = u.FirstName,
                UserId = u.UserId,
                Department = u.Department,
                Plant = u.Plant,
                Email = u.Email
            }).ToList();
        }
    }
}
