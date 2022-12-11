using API.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using VideoServices.Context;
using VideoServices.Interfaces;
using VideoServices.Models;

namespace VideoServices.Repositories
{
    public class VideoRepository : IVideoRepository
    {
        private readonly DBContext _context;

        public VideoRepository(DBContext context)
        {
            _context = context;
        }

        public async Task AddVideo(Video video)
        {
            // Video upload start
            var file = video.VideoFile;
            string ImageName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            string SavePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/videos", ImageName);

            var processFile = new ProcessFile();

            await processFile.UploadVideoAsync(SavePath, file);

            video.Url = ImageName;
            // Video upload end

            // Thumbnail upload start
            var thumbnailFile = video.ThumbnailFile;
            string thumbnailName = Guid.NewGuid().ToString() + Path.GetExtension(thumbnailFile.FileName);
            string ThumbnailPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/thumbnails", thumbnailName);

            ProcessFile.ResizeAndUpload(ThumbnailPath, thumbnailFile);

            video.ThumbnailUrl = thumbnailName;
            // Thumbnail upload end

            video.CreatedAt = DateTime.Now;
            video.UpdatedAt = DateTime.Now;

            await _context.AddAsync(video);
            await _context.SaveChangesAsync();
        }

        public async Task Comment(Comment comment)
        {
            comment.CreatedAt = DateTime.Now;
            comment.UpdatedAt = DateTime.Now;
            await _context.AddAsync(comment);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteComment(Guid id)
        {
            var comment = _context.Comments.Find(id);
            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteVideo(Guid id)
        {
            var video = _context.Videos.Find(id);

            // Delete start
            string previousVideo = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/videos", video.Url);
            var fileInfo = new System.IO.FileInfo(previousVideo);
            fileInfo.Delete();
            // Delete end

            // Delete thumbnail start
            if (video.ThumbnailUrl != null)
            {
                string previousThumbnail = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/thumbnails", video.ThumbnailUrl);
                var thumbnailInfo = new System.IO.FileInfo(previousThumbnail);
                thumbnailInfo.Delete();
            }
            // Delete thumbnail end

            _context.Videos.Remove(video);
            await _context.SaveChangesAsync();
        }

        public async Task AddDislike(Dislike dislike)
        {
            await _context.AddAsync(dislike);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveDislike(Dislike dislike)
        {
            _context.Dislikes.Remove(dislike);
            await _context.SaveChangesAsync();
        }

        public async Task<Video> GetVideo(Guid id)
        {
            return await _context.Videos.Include(v => v.PostedBy).Include(v => v.VideoCategory).Include(v => v.Likes).ThenInclude(v => v.Liker)
                .Include(v => v.Dislikes).ThenInclude(v => v.Disliker).Include(v => v.Comments)
                .ThenInclude(v => v.Commenter).AsNoTracking().FirstOrDefaultAsync(v => v.VideoId.Equals(id));
        }

        public async Task AddLike(Like like)
        {
            await _context.AddAsync(like);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveLike(Like like)
        {
            _context.Likes.Remove(like);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateComment(Comment comment)
        {
            comment.UpdatedAt = DateTime.Now;
            _context.Update(comment);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateVideo(Video video)
        {
            var proessFile = new ProcessFile();

            if (video.VideoFile != null)
            {
                // Delete start
                string previousVideo = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/videos", video.Url);
                var fileInfo = new System.IO.FileInfo(previousVideo);
                fileInfo.Delete();
                // Delete end

                // Video upload
                var file = video.VideoFile;
                string VideoName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                string SavePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/videos", VideoName);

                await proessFile.UploadVideoAsync(SavePath, file);

                video.Url = VideoName;
                // End video upload
            }

            if (video.ThumbnailFile != null)
            {
                // Delete thumbnail start
                string previousThumbnail = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/thumbnails", video.ThumbnailUrl);
                var thumbnailInfo = new System.IO.FileInfo(previousThumbnail);
                thumbnailInfo.Delete();
                // Delete thumbnail end

                // Thumbnail upload start
                var thumbnailFile = video.ThumbnailFile;
                string thumbnailName = Guid.NewGuid().ToString() + Path.GetExtension(thumbnailFile.FileName);
                string ThumbnailPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/thumbnails", thumbnailName);

                ProcessFile.ResizeAndUpload(ThumbnailPath, thumbnailFile);

                video.ThumbnailUrl = thumbnailName;
                // Thumbnail upload end
            }

            video.UpdatedAt = DateTime.Now;

            _context.Update(video);
            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<Video>> VideoList()
        {
            return await _context.Videos.Include(v => v.PostedBy).Include(v => v.VideoCategory).Include(v => v.Likes).ThenInclude(v => v.Liker)
                .Include(v => v.Dislikes).ThenInclude(v => v.Disliker).Include(v => v.Comments)
                .ThenInclude(v => v.Commenter).AsNoTracking().ToListAsync();
        }

        public async Task AddViewCount(Guid id)
        {
            var video = _context.Videos.Find(id);
            video.ViewCounts = video.ViewCounts + 1;
            _context.Update(video);
            await _context.SaveChangesAsync();
        }
    }
}
