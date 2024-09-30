using CertificateManagerAPIs.DTO;
using CertificateManagerAPIs.Services;
using Microsoft.AspNetCore.Mvc;

namespace CertificateManagerAPIs.Controllers
{
    [ApiController]
    [Route("api/controller")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("All Participants")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUserAsync()
        {
            var users = await _userService.GetAllUserAsync();
            return Ok(users);
        }

        [HttpGet("Name")]
        public async Task<IActionResult> SearchUsersByNameAsync(string userName)
        {
            var user = await _userService.SearchUsersByNameAsync(userName);
            return Ok(user);
        }

        [HttpGet("FirstName")]
        public async Task<IActionResult> SearchUsersByFirstNameAsync(string firstName)
        {
            var user = await _userService.SearchUsersByFirstNameAsync(firstName);
            return Ok(user);
        }

        [HttpGet("UserId")]
        public async Task<IActionResult> SearchUsersByUserIdAsync(int userId)
        {
            var user = await _userService.SearchUsersByUserIdAsync(userId);
            return Ok(user);
        }
        [HttpGet("Plant")]
        public async Task<IActionResult> SearchUsersByPlantAsync(string plant)
        {
            var user = await _userService.SearchUsersByPlantAsync(plant);
            return Ok(user);
        }
    }
}
