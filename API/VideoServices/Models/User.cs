using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace VideoServices.Models
{
    public class User
    {
        [Key]
        public Guid UserId { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string Name { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string Email { get; set; }
        public string Password { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        public string UserImage { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Type { get; set; }
        public ICollection<Video> Videos { get; set; }
        public ICollection<Like> Likes { get; set; }
        public ICollection<Dislike> Dislikes { get; set; }
        public ICollection<Comment> Comments { get; set; }

        public User()
        {
            Type = "User";
            ImageFile = null;
        }
    }
}
