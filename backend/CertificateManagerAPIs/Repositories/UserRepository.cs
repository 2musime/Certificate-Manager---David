using CertificateManagerAPIs.Data;
using CertificateManagerAPIs.Entities;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPIs.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly CertificatedbContext _context;
        public UserRepository(CertificatedbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<User>> GetAllUserAsync()
        {
            return await _context.Users
                .ToListAsync();
        }
        public async Task<IEnumerable<User>> SearchUsersByNameAsync(string userName)
        {
            return await _context.Users
                .Where(s => s.Name.Contains(userName))
                .ToListAsync();
        }
        public async Task<IEnumerable<User>> SearchUsersByFirstNameAsync(string firstName)
        {
            return await _context.Users
                .Where(s => s.Name.Contains(firstName))
                .ToListAsync();
        }
        public async Task<IEnumerable<User>> SearchUsersByUserIdAsync(int userId)
        {
            return await _context.Users
            .Where(s => s.UserId == userId)
                .ToListAsync();
        }
        public async Task<IEnumerable<User>> SearchUsersByPlantAsync(string plant)
        {
            return await _context.Users
            .Where(s => s.Plant.Contains(plant))
                .ToListAsync();
        }
    }
}
