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

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            var existingBook = _context.Books.Find(bookID);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _context.Books.Update(existingBook);
            _context.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _context.Books.Find(bookID);

            if (book == null)
            {
                return NotFound(new {message = "Book not found"});
            }

            _context.Books.Remove(book);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
