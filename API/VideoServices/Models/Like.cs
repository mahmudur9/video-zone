using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace VideoServices.Models
{
    public class Like
    {
        [Key]
        public Guid LikeId { get; set; }
        [ForeignKey("VideoId")]
        public Guid VideoId { get; set; }
        public Video Video { get; set; }
        [ForeignKey("UserId")]
        public Guid LikerId { get; set; }
        public User Liker { get; set; }
    }
}
