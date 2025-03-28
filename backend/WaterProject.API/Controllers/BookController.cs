using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _context;

        public BookController(BookDbContext temp)
        {
            _context = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult Get(int pageSize = 5, int pageNum = 1, string sort = "title", string order = "asc", [FromQuery] List<string>? bookCategory = null)
        {
            var query = _context.Books.AsQueryable();

            // Apply filtering if bookCategory is provided
            if (bookCategory != null && bookCategory.Any())
            {
                query = query.Where(c => bookCategory.Contains(c.Category));
            }

            // Apply sorting
            if (!string.IsNullOrEmpty(sort) && sort.ToLower() == "title")
            {
                query = order.ToLower() == "desc"
                    ? query.OrderByDescending(b => b.Title)
                    : query.OrderBy(b => b.Title);
            }

            // Get the total count of filtered books
            var totalNumBooks = query.Count();

            // Apply pagination
            var bookPage = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var result = new
            {
                totalNumBooks = totalNumBooks,
                Books = bookPage
            };

            return Ok(result);
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        { 
            var bookCategories = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookCategories);
        }
    }
}
