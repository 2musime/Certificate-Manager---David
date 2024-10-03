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
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsersAsync(
            [FromQuery] string? userName = null,
            [FromQuery] string? firstName = null,
            [FromQuery] int? userId = null,
            [FromQuery] string? Department = null,
            [FromQuery] string? plant = null,
            [FromQuery] string? email = null)
        {
            var users = await _userService.GetFilteredUsersAsync(userName, firstName, userId, Department, plant, email);
            return Ok(users);
        }
    }
}
