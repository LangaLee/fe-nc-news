import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getArticleById from "../api-calls/getArticleById";
import addVotes from "../api-calls/addVotes";
import { useParams } from "react-router-dom";

const Article = () => {
  const [article, setArticle] = useState(null);

  const articleId = useParams().article_id;

  const displayArticle = () => {
    return article.map((article) => {
      const Image = () => {
        return (
          <div>
            <img alt={`image for article`} src={article.article_img_url} />
          </div>
        );
      };

      return (
        <div key={article.article_id}>
          <h2 className="m-4 text-5xl">{article.title}</h2>
          <div className="flex justify-between m-4">
            <div className="max-w-7xl p-1">
              <h3 className="text-2xl font-semibold mt-4">
                Topic: {article.topic}
              </h3>
              <h4 className="text-2xl font-semibold mt-4">
                Author: {article.author}
              </h4>
              {window.innerWidth < 1600 ? Image() : null}
              <p className="mt-4">{article.body}</p>{" "}
              <div className="flex justify-around">
                <p className="text-2xl font-semibold mt-4">
                  Votes: {article.votes}
                </p>
                <button
                  onClick={() => {
                    addVotes(articleId);
                    const articleCopy = { ...article };
                    articleCopy.votes = articleCopy.votes + 1;
                    setArticle([articleCopy]);
                  }}
                  className="rounded-md border-solid border-2 hover:bg-blue-900 mt-4 text-2xl"
                >
                  add Vote
                </button>
              </div>
            </div>
            {window.innerWidth > 1600 ? Image() : null}
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    getArticleById(articleId, setArticle);
  }, [articleId]);

  return (
    <div className="text-xl">
      {article === null ? null : displayArticle()}
      <div className="flex justify-end mr-4">
        <label htmlFor="back-to-articles">All articles here 👉</label>
        <Link to={"/articles"}>
          <button className="rounded-md border-solid border-2 hover:bg-blue-900 ml-4  text-2xl">
            Articles
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Article;
