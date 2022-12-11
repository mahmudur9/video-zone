using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VideoServices.Models;

namespace VideoServices.Interfaces
{
    public interface IVideoRepository
    {
        Task<ICollection<Video>> VideoList();
        Task AddVideo(Video video);
        Task<Video> GetVideo(Guid id);
        Task UpdateVideo(Video video);
        Task DeleteVideo(Guid id);
        Task AddLike(Like like);
        Task RemoveLike(Like like);
        Task AddDislike(Dislike dislike);
        Task RemoveDislike(Dislike dislike);
        Task Comment(Comment comment);
        Task UpdateComment(Comment comment);
        Task DeleteComment(Guid id);
        Task AddViewCount(Guid id);
    }
}
