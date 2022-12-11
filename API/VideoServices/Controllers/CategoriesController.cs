using API.Messages;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VideoServices.Interfaces;
using VideoServices.Models;

namespace VideoServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet("")]
        public async Task<IActionResult> CategoryList()
        {
            var categories = await _categoryRepository.CategoryList();

            return Ok(categories);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetCategory(Guid id)
        {
            return Ok(await _categoryRepository.GetCategory(id));
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddCategory(Category category)
        {
            var success = new SuccessMessage();
            var error = new ErrorMessage();

            if (category.CategoryName != null)
            {
                await _categoryRepository.AddCategory(category);
            }
            else
            {
                error.Error = "The fields can not be empty!";

                return BadRequest(error);
            }

            success.Message = "Category added successfully!";

            return Ok(success);
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateCategory(Category category)
        {
            var success = new SuccessMessage();
            var error = new ErrorMessage();

            if (category.CategoryName != null && category.CategoryId != null)
            {
                await _categoryRepository.UpdateCategory(category);
            }
            else
            {
                error.Error = "The fields can not be empty!";

                return BadRequest(error);
            }

            success.Message = "Category updated successfully!";

            return Ok(success);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var success = new SuccessMessage();
            var error = new ErrorMessage();

            if (id != null)
            {
                await _categoryRepository.DeleteCategory(id);
                success.Message = "Category deleted successfully!";

                return Ok(success);
            }

            error.Error = "Category id not found!";

            return BadRequest(error);
        }
    }
}
