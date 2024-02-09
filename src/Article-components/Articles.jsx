import getAllArticles from "../api-calls/getArticles";
import { useState, useEffect, useContext } from "react";
import DisplayArticles from "../Main-components/DisplayArticles";
import Pagination from "../Reusable-components/Pagination";
import Loading from "../Main-components/Loading";
import urlContext from "../context/urlContext";
import { useParams, useSearchParams } from "react-router-dom";
import Button from "../Reusable-components/Button";
import ShowSortOptions from "../Reusable-components/HandleSort";
import errorContext from "../context/error";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerRow = Math.floor(window.innerWidth / 350);
  const [articlesPerPage] = useState(articlesPerRow * 3);
  const [isLoading, setIsLoading] = useState(true);
  const { setUrl } = useContext(urlContext);
  const { setError } = useContext(errorContext);
  const sortBy = useSearchParams();
  const [sortParameter, setSortParameter] = useState(
    sortBy[0].get("sort_by") || "created_at"
  );
  const topic = useParams().topic;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const [order, setOrder] = useState("DESC");

  const articlesCopy = JSON.parse(JSON.stringify(articles));
  const [articlesToDisplay, setArticlesToDisplay] = useState([]);

  useEffect(() => {
    const numSortkeys = ["votes", "article_id", "comment_count"];
    if (order === "DESC" && numSortkeys.includes(sortParameter)) {
      articlesCopy.sort((a, b) => b[sortParameter] - a[sortParameter]);
    } else if (order === "ASC" && numSortkeys.includes(sortParameter)) {
      articlesCopy.sort((a, b) => a[sortParameter] - b[sortParameter]);
    }
    const stringSortKeys = ["created_at", "title", "topic", "author"];
    if (order === "DESC" && stringSortKeys.includes(sortParameter)) {
      articlesCopy.sort((a, b) =>
        b[sortParameter].localeCompare(a[sortParameter])
      );
    } else if (order === "ASC" && stringSortKeys.includes(sortParameter)) {
      articlesCopy.sort((a, b) =>
        a[sortParameter].localeCompare(b[sortParameter])
      );
    }
    setArticlesToDisplay(
      articlesCopy.slice(indexOfFirstArticle, indexOfLastArticle)
    );
  }, [order, articles.length, sortParameter, currentPage]);

  const numOfPages = Math.ceil(articles.length / articlesPerPage);

  const displayProperty = topic;

  const handleOrder = () => {
    if (order === "DESC") setOrder("ASC");
    else setOrder("DESC");
  };

  useEffect(() => {
    setUrl("/articles");
    getAllArticles(setArticles, setIsLoading, topic, setError, sortParameter);
  }, []);
  return (
    <div>
      <div className="flex justify-between sticky top-20 bg-slate-950 h-20 overflow-visible">
        <h2 className=" text-3xl mt-4 text-center">
          {displayProperty
            ? `Displaying all ${displayProperty} articles`
            : `Displaying All Articles`}
        </h2>
        <div className="flex flex-row">
          <div className="flex flex-row">
            <ShowSortOptions
              sortParameter={sortParameter}
              setSortParameter={setSortParameter}
            />
          </div>
          <Button value={order} func={handleOrder} />
        </div>
      </div>
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
