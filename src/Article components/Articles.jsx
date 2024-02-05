import getAllArticles from "../api calls/getArticles";
import { useState, useEffect } from "react";
import DisplayArticles from "../Main components/DisplayArticles";
import Pagination from "../Main components/Pagination";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerRow = Math.floor(window.innerWidth / 320);
  const [articlesPerPage] = useState(articlesPerRow * 3);

  const indexOfLastRecord = currentPage * articlesPerPage;
  const indexOfFirstRecord = indexOfLastRecord - articlesPerPage;
  const articlesToDisplay = articles.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const numOfPages = Math.ceil(articles.length / articlesPerPage);

  useEffect(() => {
    getAllArticles(setArticles);
  }, []);

  return (
    <>
      <h2 className=" text-3xl mb-7">Displaying articles by popularity</h2>
      <div className="flex flex-wrap ">
        <DisplayArticles articles={articlesToDisplay} />
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numOfPages={numOfPages}
      />
    </>
  );
};

export default Articles;
