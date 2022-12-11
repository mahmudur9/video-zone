using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace VideoServices.Models
{
    public class Video
    {
        [Key]
        public Guid VideoId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        [NotMapped]
        public IFormFile VideoFile { get; set; }
        public string Url { get; set; }
        [NotMapped]
        public IFormFile ThumbnailFile { get; set; }
        public string ThumbnailUrl { get; set; }
        [ForeignKey("UserId")]
        public Guid PostedById { get; set; }
        public User PostedBy { get; set; }
        [ForeignKey("CategoryId")]
        public Guid VideoCategoryId { get; set; }
        public Category VideoCategory { get; set; }
        public ICollection<Like> Likes { get; set; }
        public ICollection<Dislike> Dislikes { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public int ViewCounts { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public Video()
        {
            VideoFile = null;
        }
    }
}
