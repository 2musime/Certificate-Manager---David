using CertificateManagerAPIs.DTO;
using CertificateManagerAPIs.Services;
using Microsoft.AspNetCore.Mvc;

namespace CertificateManagerAPIs.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
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
