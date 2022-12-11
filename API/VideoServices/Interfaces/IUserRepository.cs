using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VideoServices.Models;

namespace VideoServices.Interfaces
{
    public interface IUserRepository
    {
        Task<IList<User>> UserList();
        Task Register(User user);
        Task AddUser(User user);
        Task<User> GetUser(Guid id);
        Task UpdateUser(User user);
        Task DeleteUser(User user);
    }
}
