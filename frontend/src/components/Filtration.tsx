interface FiltrationProps {
  sortOrder: string;
  sortDirection: string;
  setSortOrder: (newOrder: string) => void;
  setSortDirection: (newDirection: string) => void;
}

const Filtration = ({
  sortOrder,
  sortDirection,
  setSortOrder,
  setSortDirection,
}: FiltrationProps) => {
  return (
    <>
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
    </>
  );
};

export default Filtration;
