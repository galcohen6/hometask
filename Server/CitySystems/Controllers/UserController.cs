using Microsoft.AspNetCore.Mvc;
using CitySystems.Models;
using System.Security.Cryptography;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System;

namespace CitySystems.Controllers
{
    [ApiController]
    [Route("api/[controller]")]  
    public class UsersController : ControllerBase
    {
        private static List<User> users = new List<User>();


        [HttpPost("register")] 
        public IActionResult Register(User user)
        {
            if (users.Any(u => u.IDNumber == user.IDNumber || u.Email == user.Email))
            {
                return BadRequest("המשתמש כבר קיים");
            }

            user.Password = HashPassword(user.Password);

            users.Add(user);

            return Ok("נרשמת בהצלחה");
        }


        [HttpGet("login")]  
        public IActionResult Login()
        {
            return Ok(users);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            var user = users.FirstOrDefault(u => u.Email == loginRequest.Email);

            if (user == null)
            {
                return BadRequest("המשתמש לא קיים");
            }

            var hashedPassword = HashPassword(loginRequest.Password);

            if (user.Password != hashedPassword)
            {
                return BadRequest("סיסמה שגויה");
            }

            return Ok(new { success = true, user });
        }



        public class LoginRequest
        {
            public string Email { get; set; }
            public string Password { get; set; } 
        }



        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }
}