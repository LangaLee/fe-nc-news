const Pagination = ({ currentPage, setCurrentPage, numOfPages }) => {
  const pageNums = [...Array(numOfPages + 1).keys()].slice(1);

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== numOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <nav>
      <ul className="flex justify-center">
        <li>
          <button className="m-2" onClick={prevPage}>
            Previous
          </button>
        </li>

        {pageNums.map((num) => (
          <button key={num} className="m-2" onClick={() => setCurrentPage(num)}>
            {num}
          </button>
        ))}

        <li>
          <button className="m-2" onClick={nextPage}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
