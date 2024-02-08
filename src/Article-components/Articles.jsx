import getAllArticles from "../api-calls/getArticles";
import { useState, useEffect, useContext } from "react";
import DisplayArticles from "../Main-components/DisplayArticles";
import Pagination from "../Reusable-components/Pagination";
import Loading from "../Main-components/Loading";
import urlContext from "../context/urlContext";
import { useParams } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerRow = Math.floor(window.innerWidth / 350);
  const [articlesPerPage] = useState(articlesPerRow * 3);
  const [isLoading, setIsLoading] = useState(true);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const articlesToDisplay = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const numOfPages = Math.ceil(articles.length / articlesPerPage);

  const { setUrl } = useContext(urlContext);

  const topic = useParams().topic;
  const displayProperty = topic || "Popularity";
  console.log(topic);
  useEffect(() => {
    setUrl("/articles");
    getAllArticles(setArticles, setIsLoading, topic);
  }, []);
  return (
    <div>
      <h2 className=" text-3xl mb-7 text-center">
        Displaying articles by {displayProperty}
      </h2>
      <div className="flex flex-wrap justify-center ">
        {isLoading ? (
          <Loading />
        ) : (
          <DisplayArticles articles={articlesToDisplay} />
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numOfPages={numOfPages}
      />
    </div>
  );
};

export default Articles;
