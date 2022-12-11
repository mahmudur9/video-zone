using API.Messages;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using VideoServices.Context;
using VideoServices.Interfaces;
using VideoServices.Messages;
using VideoServices.Models;

namespace VideoServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideosController : ControllerBase
    {
        private readonly ILogger<VideosController> _logger;
        private readonly DBContext _context;
        private readonly IVideoRepository _videoRepository;

        public VideosController(ILogger<VideosController> logger, DBContext context, IVideoRepository videoRepository)
        {
            _logger = logger;
            _context = context;
            _videoRepository = videoRepository;
        }

        [HttpGet("")]
        public async Task<IActionResult> VideoList()
        {
            var videos = await _videoRepository.VideoList();

            return Ok(videos);
        }

        /*[HttpGet("own/{id}")]
        public IActionResult OwnVideoList(int id)
        {
            var videos = _context.Videos.Include(v => v.PostedBy).Include(v => v.VideoCategory).Include(v => v.Likes).ThenInclude(v => v.Liker)
                .Include(v => v.Dislikes).ThenInclude(v => v.Disliker).Include(v => v.Comments)
                .ThenInclude(v => v.Commenter).Where(v => v.PostedById.Equals(id)).AsNoTracking();

            return Ok(videos);
        }*/

        [HttpGet("watch")]
        public IActionResult Watch([FromQuery] string url)
        {
            try
            {
                var fileName = url;
                string videoPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/videos", fileName);

                var filestream = System.IO.File.OpenRead(videoPath);
                return File(filestream, contentType: "video/mp4", fileDownloadName: fileName, enableRangeProcessing: true);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Something Went Wrong in the {nameof(Watch)}");

                return BadRequest();
            }
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetVideo(Guid id)
        {
            var video = await _videoRepository.GetVideo(id);

            return Ok(video);
        }

        //[DisableRequestSizeLimit]
        [HttpPost("add")]
        public async Task<IActionResult> AddVideo([FromForm] Video video)
        {
            var success = new SuccessMessage();
            var error = new ErrorMessage();

            if (video.VideoFile != null && video.ThumbnailFile != null && video.Title != null && video.Description != null && video.PostedById != null)
            {
                //var extensionSplitArray = Path.GetExtension(video.VideoFile.FileName).Split(".");
                if (!(Path.GetExtension(video.VideoFile.FileName).Split(".")[1].ToString().ToLower().Equals("mp4") || Path.GetExtension(video.VideoFile.FileName).Split(".")[1].ToString().ToLower().Equals("avi") || Path.GetExtension(video.VideoFile.FileName).Split(".")[1].ToString().ToLower().Equals("mkv")))
                {
                    error.Error = "Unsupported file!";
                    return BadRequest(error);
                }

                if (!(Path.GetExtension(video.ThumbnailFile.FileName).Split(".")[1].ToString().ToLower().Equals("jpg") || Path.GetExtension(video.ThumbnailFile.FileName).Split(".")[1].ToString().ToLower().Equals("png")))
                {
                    error.Error = "Unsupported thumbnail file!";
                    return BadRequest(error);
                }

                await _videoRepository.AddVideo(video);
            }
            else
            {
                error.Error = "The fields can not be empty!";
                return BadRequest(error);
            }

            success.Message = "Video uploaded successfully!";

            return Ok(success);
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateVideo([FromForm] Video video)
        {
            var error = new ErrorMessage();
            var success = new SuccessMessage();

            if  (video.VideoFile != null)
            {
                if (!(Path.GetExtension(video.VideoFile.FileName).Split(".")[1].ToString().ToLower().Equals("mp4") || Path.GetExtension(video.VideoFile.FileName).Split(".")[1].ToString().ToLower().Equals("avi") || Path.GetExtension(video.VideoFile.FileName).Split(".")[1].ToString().ToLower().Equals("mkv")))
                {
                    error.Error = "Unsupported file!";
                    return BadRequest(error);
                }
            }

            if (video.ThumbnailFile != null)
            {
                if (!(Path.GetExtension(video.ThumbnailFile.FileName).Split(".")[1].ToString().ToLower().Equals("jpg") || Path.GetExtension(video.ThumbnailFile.FileName).Split(".")[1].ToString().ToLower().Equals("png")))
                {
                    error.Error = "Unsupported thumbnail file!";
                    return BadRequest(error);
                }

            }

            await _videoRepository.UpdateVideo(video);

            success.Message = "Video contents updated successfully!";

            return Ok(success);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteVideo(Guid id)
        {
            var error = new ErrorMessage();
            var success = new SuccessMessage();

            if (id != null)
            {
                await _videoRepository.DeleteVideo(id);
            }
            else
            {
                error.Error = "Video id is missing";
                return BadRequest(error);
            }

            success.Message = "The video has successfully been deleted!";

            return Ok(success);
        }

        [HttpPost("like")]
        public async Task<IActionResult> Like([FromBody] Like like)
        {
            var error = new ErrorMessage();
            var success = new SuccessMessage();

            if (like.LikerId != null && like.VideoId != null)
            {
                var previousLike = _context.Likes.Where(l => l.LikerId.Equals(like.LikerId) && l.VideoId.Equals(like.VideoId)).FirstOrDefault();

                if (previousLike == null)
                {
                    var previousDislike = _context.Dislikes.Where(d => d.DislikerId.Equals(like.LikerId) && d.VideoId.Equals(like.VideoId)).FirstOrDefault();

                    if (previousDislike != null)
                    {
                        await _videoRepository.RemoveDislike(previousDislike);
                    }

                    await _videoRepository.AddLike(like);
                }
                else
                {
                    await _videoRepository.RemoveLike(previousLike);

                    success.Message = "Your like has been removed!";
                    return Ok(success);
                }
            }
            else
            {
                error.Error = "Something is missing!";

                return BadRequest(error);
            }

            success.Message = "You have liked this video!";

            return Ok(success);
        }

        [HttpPost("dislike")]
        public async Task<IActionResult> Dislike([FromBody] Dislike dislike)
        {
            var error = new ErrorMessage();
            var success = new SuccessMessage();

            if (dislike.DislikerId != null && dislike.VideoId != null)
            {
                var previousDislike = _context.Dislikes.Where(d => d.DislikerId.Equals(dislike.DislikerId) && d.VideoId.Equals(dislike.VideoId)).FirstOrDefault();

                if (previousDislike == null)
                {
                    var previousLike = _context.Likes.Where(l => l.LikerId.Equals(dislike.DislikerId) && l.VideoId.Equals(dislike.VideoId)).FirstOrDefault();

                    if (previousLike != null)
                    {
                        await _videoRepository.RemoveLike(previousLike);
                    }

                    await _videoRepository.AddDislike(dislike);
                }
                else
                {
                    await _videoRepository.RemoveDislike(previousDislike);

                    success.Message = "Your dislike has been removed!";
                    return Ok(success);
                }
            }
            else
            {
                error.Error = "Something is missing!";

                return BadRequest(error);
            }

            success.Message = "You have disliked this video!";

            return Ok(success);
        }

        [HttpPost("comment")]
        public async Task<IActionResult> Comment([FromBody] Comment comment)
        {
            if (comment.CommenterId != null && comment.VideoId != null && comment.Message != null)
            {
                await _videoRepository.Comment(comment);
            }
            else
            {
                var error = new ErrorMessage();
                error.Error = "Something is missing!";

                return BadRequest(error);
            }

            var success = new SuccessMessage();
            success.Message = "Your comment has successfully been submitted!";

            return Ok(success);
        }

        [HttpPut("update-comment")]
        public async Task<IActionResult> UpdateComment([FromBody] Comment comment)
        {
            var success = new SuccessMessage();
            var error = new ErrorMessage();

            if (comment.CommnetId != null && comment.CommenterId != null && comment.VideoId != null && comment.Message != null)
            {
                /* var previousComment = _context.Comments.Find(comment.CommnetId);

                 if (previousComment.CommenterId.Equals(comment.CommenterId) || previousComment.Video.PostedById.Equals(comment.Video.PostedById))
                 {
                     _context.Update(comment);
                     _context.SaveChanges();
                 }
                 else
                 {
                     error.Error = "You don't have permission to delete the comment!";

                     return BadRequest(error);
                 }*/
                await _videoRepository.UpdateComment(comment);
            }
            else
            {
                error.Error = "Something is missing!";

                return BadRequest(error);
            }

            success.Message = "Your comment has successfully been updated!";

            return Ok(success);
        }

        [HttpDelete("delete-comment/{id}")]
        public async Task<IActionResult> DeleteComment(Guid id)
        {
            if (id != null)
            {
                await _videoRepository.DeleteComment(id);
            }
            else
            {
                var error = new ErrorMessage();
                error.Error = "Comment id is missing!";

                return BadRequest(error);
            }

            var success = new SuccessMessage();
            success.Message = "Your comment has successfully been deleted!";

            return Ok(success);
        }

        [HttpPost("view/{id}")]
        public async Task<IActionResult> AddViewCount(Guid id)
        {
            if (id != null)
            {
                await _videoRepository.AddViewCount(id);

                var success = new SuccessMessage();
                success.Message = "View count added!";

                return Ok(success);
            }

            var error = new ErrorMessage();
            error.Error = "Video id is missing!";

            return BadRequest(error);
        }
    }
}
