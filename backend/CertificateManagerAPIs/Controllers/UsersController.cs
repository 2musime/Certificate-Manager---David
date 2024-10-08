using CertificateManagerAPIs.DTO;
using CertificateManagerAPIs.Services;
using Microsoft.AspNetCore.Mvc;

namespace CertificateManagerAPIs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IUserService _userService;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsersAsync([FromQuery] UserDto filter)
        {
            var users = await _userService
                .GetFilteredUsersAsync(filter.Name, filter.FirstName, filter.UserId, filter.Department, filter.Plant, filter.Email);
            return Ok(users);
        }
    }
}
