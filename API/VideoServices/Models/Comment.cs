using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace VideoServices.Models
{
    public class Comment
    {
        [Key]
        public Guid CommnetId { get; set; }
        [ForeignKey("VideoId")]
        public Guid VideoId { get; set; }
        public Video Video { get; set; }
        public string Message { get; set; }
        [ForeignKey("UserId")]
        public Guid CommenterId { get; set; }
        public User Commenter { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
