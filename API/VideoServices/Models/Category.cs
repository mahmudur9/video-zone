using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace VideoServices.Models
{
    public class Category
    {
        [Key]
        public Guid CategoryId { get; set; }
        [Column(TypeName = "nvarchar(30)")]
        public string CategoryName { get; set; }
        public ICollection<Video> Videos { get; set; }
    }
}
