using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VideoServices.Context;
using VideoServices.Interfaces;
using VideoServices.Models;
using API.Services;
using System.IO;
using Microsoft.EntityFrameworkCore;

namespace VideoServices.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DBContext _context;

        public UserRepository(DBContext context)
        {
            _context = context;
        }

        public Task AddUser(User user)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteUser(User user)
        {
            if (user.UserImage != null)
            {
                string PreviousImage = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", user.UserImage);
                var fileInfo = new System.IO.FileInfo(PreviousImage);
                fileInfo.Delete();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User> GetUser(Guid id)
        {
            return await _context.Users.Include(u => u.Videos).ThenInclude(u => u.Comments)
                .Include(u => u.Videos).ThenInclude(u => u.Likes)
                .AsNoTracking().FirstOrDefaultAsync(u => u.UserId.Equals(id));
        }

        public async Task Register(User user)
        {
            user.Password = Hash.CreateHash(user.Password);
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUser(User user)
        {
            var findUser = _context.Users.Find(user.UserId);

            if (user.ImageFile != null)
            {
                if (findUser.UserImage != null)
                {
                    // delete start
                    string PreviousImage = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", findUser.UserImage);
                    var fileInfo = new System.IO.FileInfo(PreviousImage);
                    fileInfo.Delete();
                    // delete end
                }

                // upload image
                var file = user.ImageFile;
                string ImageName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                string SavePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", ImageName);
               
                ProcessFile.ResizeAndUpload(SavePath, file);

                findUser.UserImage = ImageName;
                // End image upload
            }

            if (user.Password != null)
            {
                findUser.Password = Hash.CreateHash(user.Password);
            }
            if (user.Name != null)
            {
                findUser.Name = user.Name;
            }
            if (user.Email != null)
            {
                findUser.Email = user.Email;
            }

            _context.Update(findUser);
            await _context.SaveChangesAsync();
        }

        public async Task<IList<User>> UserList()
        {
            return await _context.Users.ToListAsync();
        }
    }
}
