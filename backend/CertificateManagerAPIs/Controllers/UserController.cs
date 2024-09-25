using CertificateManagerAPIs.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPIs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly CertificatedbContext _context;
        public UserController(CertificatedbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _context.Users
                .Include(u => u.Certificates)
                .Include(u => u.Comments)
                .ToListAsync();

            var userDtos = users.Select(u => new UserDto
            {
                UserId = u.UserId,
                Name = u.Name,
                FirstName = u.FirstName,
                Department = u.Department,
                Plant = u.Plant,
                Email = u.Email,
                Certificates = u.Certificates.Select(c => new CertificateDto
                {
                    Type = c.Type
                }).ToList(),
                Comments = u.Comments.Select(c => new CommentDto
                {
                    UserComment = c.UserComment
                }).ToList()
            }).ToList();

            return Ok(userDtos);
        }

        // GET: api/user/{id}
        [HttpGet("user{id}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _context.Users
                .Include(u => u.Certificates)
                .Include(u => u.Comments)
                .FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null)
            {
                return NotFound();
            }

            var userDto = new UserDto
            {
                UserId = user.UserId,
                Name = user.Name,
                FirstName = user.FirstName,
                Department = user.Department,
                Plant = user.Plant,
                Email = user.Email,
                Certificates = user.Certificates.Select(c => new CertificateDto
                {
                    Type = c.Type
                }).ToList(),
                Comments = user.Comments.Select(c => new CommentDto
                {
                    UserComment = c.UserComment
                }).ToList()
            };

            return Ok(userDto);
        }
    }

}
