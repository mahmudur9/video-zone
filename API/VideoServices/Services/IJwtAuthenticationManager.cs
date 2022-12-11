using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JWT
{
    public interface IJwtAuthenticationManager
    {
        string Authenticate(string username, string password, string role = "User");
    }
}
