import { Book } from './types/Book';
import { useEffect, useState } from 'react';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('title');
  const [sortDirection, setSortDirection] = useState<string>('asc');

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sort=${sortOrder}&order=${sortDirection}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };
    fetchBooks();
  }, [pageSize, pageNum, totalItems, sortOrder, sortDirection]);

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Book Listings</h1>

        {/* Sorting Controls */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">Sort by:</label>
            <select
              className="form-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="title">Title</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Order:</label>
            <select
              className="form-select"
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Book Cards */}
        <div className="row">
          {books.map((b) => (
            <div key={b.bookID} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{b.title}</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Author:</strong> {b.author}
                    </li>
                    <li className="list-group-item">
                      <strong>Publisher:</strong> {b.publisher}
                    </li>
                    <li className="list-group-item">
                      <strong>ISBN:</strong> {b.isbn}
                    </li>
                    <li className="list-group-item">
                      <strong>Classification:</strong> {b.classification}
                    </li>
                    <li className="list-group-item">
                      <strong>Category:</strong> {b.category}
                    </li>
                    <li className="list-group-item">
                      <strong>Page Count:</strong> {b.pageCount}
                    </li>
                    <li className="list-group-item">
                      <strong>Price:</strong> ${b.price}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setPageNum(pageNum - 1)}
              >
                Previous
              </button>
            </li>

            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index + 1}
                className={`page-item ${pageNum === index + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => setPageNum(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => setPageNum(pageNum + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>

        {/* Page Size Dropdown */}
        <div className="d-flex justify-content-center">
          <label className="me-2 fw-bold">Results per page:</label>
          <select
            className="form-select w-auto"
            value={pageSize}
            onChange={(p) => {
              setPageSize(Number(p.target.value));
              setPageNum(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default BookList;
