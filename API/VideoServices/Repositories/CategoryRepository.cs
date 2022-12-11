using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VideoServices.Context;
using VideoServices.Interfaces;
using VideoServices.Models;

namespace VideoServices.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DBContext _context;

        public CategoryRepository(DBContext context)
        {
            _context = context;
        }

        public async Task AddCategory(Category category)
        {
            await _context.AddAsync(category);
            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<Category>> CategoryList()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task DeleteCategory(Guid id)
        {
            var category = await _context.Categories.FindAsync(id);
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }

        public async Task<Category> GetCategory(Guid id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task UpdateCategory(Category category)
        {
            _context.Update(category);
            await _context.SaveChangesAsync();
        }
    }
}
