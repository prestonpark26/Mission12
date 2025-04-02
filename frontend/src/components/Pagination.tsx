interface PaginationProps {
  pageNum: number;
  totalPages: number;
  pageSize: number;
  setPageNum: (newPage: number) => void;
  setPageSize: (newSize: number) => void;
}

const Pagination = ({
  pageNum,
  totalPages,
  pageSize,
  setPageNum,
  setPageSize,
}: PaginationProps) => {
  return (
    <div className="flex item-center justify-center mt-4">
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
  );
};

export default Pagination;
