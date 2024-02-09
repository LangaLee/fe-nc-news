import { useEffect, useState } from "react";

const Pagination = ({ currentPage, setCurrentPage, numOfPages }) => {
  const pageNums = [...Array(numOfPages + 1).keys()].slice(1);
  const [prevNum, setPrevNum] = useState(0);
  const [num, setNum] = useState(3);
  const [curPages, setCurPages] = useState([]);
  useEffect(() => {
    setCurPages(pageNums.slice(prevNum, num));
    if (currentPage === curPages[2]) {
      setPrevNum((prev) => prev + 3);
      setNum((prev) => prev + 3);
      setCurPages(pageNums.slice(prevNum, num));
    }
  }, [pageNums.length, currentPage]);
  // console.log(prevNum, num, curPages, numOfPages, currentPage);
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
  // console.log(curPages, pageNums);
  //fix pagination for mobile such that it doesnt force window width to be greater than device width
  return (
    <nav>
      <ul className="flex justify-center w-screen">
        <li>
          <button className="m-2" onClick={prevPage}>
            Previous
          </button>
        </li>

        {curPages.map((num) => (
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
