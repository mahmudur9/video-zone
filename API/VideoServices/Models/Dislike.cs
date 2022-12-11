using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace VideoServices.Models
{
    public class Dislike
    {
        [Key]
        public Guid DislikeId { get; set; }
        [ForeignKey("VideoId")]
        public Guid VideoId { get; set; }
        public Video Video { get; set; }
        [ForeignKey("UserId")]
        public Guid DislikerId { get; set; }
        public User Disliker { get; set; }
    }
}
