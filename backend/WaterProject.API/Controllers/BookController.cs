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
        public IActionResult Get(int pageSize = 5, int pageNum = 1, string sort = "title", string order = "asc")
        {
            var booksQuery = _context.Books.AsQueryable();

            if (!string.IsNullOrEmpty(sort) && sort.ToLower() == "title")
            {
                booksQuery = order.ToLower() == "desc"
                    ? booksQuery.OrderByDescending(b => b.Title)
                    : booksQuery.OrderBy(b => b.Title);
            }

            var bookPage = booksQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _context.Books.Count();

            var someObject = new
            {
                totalNumBooks = totalNumBooks,
                Books = bookPage
            };

            return Ok(someObject);
        }
    }
}
