import { useNavigate } from 'react-router-dom';
import { Book } from '../types/Book';
import { useEffect, useState } from 'react';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';
import Filtration from './Filtration';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('title');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          selectedCategories,
          sortOrder,
          sortDirection
        );
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortOrder, sortDirection, selectedCategories]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <>
      <div className="container mt-4">
        <Filtration
          sortOrder={sortOrder}
          sortDirection={sortDirection}
          setSortOrder={setSortOrder}
          setSortDirection={setSortDirection}
        />

        {/* Book Cards */}
        <div className="row">
          {books.map((b) => (
            <div key={b.bookID} className="col-md-4 mb-4 d-flex">
              <div className="card shadow-sm w-100 h-100 d-flex flex-column">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{b.title}</h5>
                  <ul className="list-group list-group-flush flex-grow-1 mb-3">
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
                  <div className="mt-auto">
                    <button
                      className="btn btn-primary w-100"
                      onClick={() =>
                        navigate(`/addToCart/${b.title}/${b.bookID}/${b.price}`)
                      }
                    >
                      <i className="bi bi-cart-plus"></i> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          pageNum={pageNum}
          totalPages={totalPages}
          pageSize={pageSize}
          setPageNum={setPageNum}
          setPageSize={(newSize) => {
            setPageSize(newSize);
            setPageNum(1);
          }}
        />
      </div>
    </>
  );
}

export default BookList;
