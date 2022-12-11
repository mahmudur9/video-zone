using API.Messages;
using API.Models;
using API.Services;
using JWT;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using VideoServices.Context;
using VideoServices.Interfaces;
using VideoServices.Models;

namespace VideoServices.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DBContext _context;
        private readonly IJwtAuthenticationManager jwtAuthenticationManager;
        private readonly IUserRepository _userRepository;

        public UsersController(DBContext context, IJwtAuthenticationManager jwtAuthenticationManager, IUserRepository userRepository)
        {
            _context = context;
            this.jwtAuthenticationManager = jwtAuthenticationManager;
            _userRepository = userRepository;
        }

        [HttpGet("")]
        public async Task<IActionResult> UserList()
        {
            var users = await _userRepository.UserList();

            return Ok(users);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var data = _context.Users.Where(e => e.Email.Contains(user.Email)).FirstOrDefault();
            var success = new SuccessMessage();
            var error = new ErrorMessage();
            DateTime dateTime = DateTime.Now;
            if (data == null)
            {
                await _userRepository.Register(user);
            }
            else
            {
                error.Error = "The user already exists!";
                return BadRequest(error);
            }
            success.Message = "User registered successfully!";
            return Ok(success);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserCred userCred)
        {
            Token tokenModel = new Token();
            DateTime dateTime = DateTime.Now;

            var user = _context.Users.Where(u => u.Email.Equals(userCred.Email) && u.Password.
            Equals(Hash.CreateHash(userCred.Password))).FirstOrDefault();

            if (user != null)
            {
                var data = _context.Tokens.Where(t => t.ExpiredDate < dateTime && t.UserId.Equals(user.UserId)).ToList();
                if (data != null)
                {
                    _context.Tokens.RemoveRange(data);
                    _context.SaveChanges();
                }
            }

            if (user == null)
            {
                var error = new ErrorMessage();
                error.Error = "Wrong email or password!";
                return Unauthorized(error);
            }
            else
            {
                var token = jwtAuthenticationManager.Authenticate(userCred.Email, userCred.Password, user.Type);

                // Inserting token into TokenModel
                tokenModel.TokenValue = token;
                tokenModel.ExpiredDate = dateTime.AddHours(1);
                tokenModel.UserId = user.UserId;
                _context.Add(tokenModel);
                _context.SaveChanges();

                return Ok(token);
            }
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var email = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;
            var userDetails = _context.Users.Include(u => u.Videos).ThenInclude(u => u.Comments)
                .Include(u => u.Videos).ThenInclude(u => u.Likes)
                .Where(u => u.Email.Equals(email)).AsNoTracking().FirstOrDefault();

            return Ok(userDetails);
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser([FromForm] User user)
        {
            var success = new SuccessMessage();
            var error = new ErrorMessage();

            if (user.Email == null)
            {
                error.Error = "The email field can not be empty!";
                return BadRequest(error);
            }
            var userWithEmail = _context.Users.Where(p => p.Email.Equals(user.Email) && !p.UserId.Equals(user.UserId)).FirstOrDefault();

            if (userWithEmail != null)
            {
                error.Error = "The email is being used by another user!";

                return BadRequest(error);
            }
         
            if (user.ImageFile != null)
            {
                if (!(Path.GetExtension(user.ImageFile.FileName).Split(".")[1].ToString().ToLower().Equals("jpg") || Path.GetExtension(user.ImageFile.FileName).Split(".")[1].ToString().ToLower().Equals("png")))
                {
                    error.Error = "Unsupported file!";
                    return BadRequest(error);
                }
            }

            await _userRepository.UpdateUser(user);

            success.Message = "User updated successfully!";

            return Ok(success);
        }

        [AllowAnonymous]
        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var user = await _userRepository.GetUser(id);
            var error = new ErrorMessage();
            if (id == null)
            {
                error.Error = "User not found!";
                return BadRequest(error);
            }

            return Ok(user);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var success = new SuccessMessage();
            var error = new ErrorMessage();
            var user = _context.Users.Find(id);

            if (user == null)
            {
                error.Error = "User not found!";

                return BadRequest(error);
            }

            await _userRepository.DeleteUser(user);

            success.Message = "User deleted successfully!";
            return Ok(success);
        }

        public IActionResult VerifyUser([FromBody] User user)
        {


            return Ok();
        }
    }
}
