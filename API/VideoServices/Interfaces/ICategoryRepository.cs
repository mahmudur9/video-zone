using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VideoServices.Models;

namespace VideoServices.Interfaces
{
    public interface ICategoryRepository
    {
        Task<ICollection<Category>> CategoryList();
        Task AddCategory(Category category);
        Task<Category> GetCategory(Guid id);
        Task UpdateCategory(Category category);
        Task DeleteCategory(Guid id);
    }
}
