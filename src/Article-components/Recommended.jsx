import { Link } from "react-router-dom";
import Button from "../Reusable-components/Button";

const Recomemended = ({ trending }) => {
  return (
    <div className=" mt-16">
      <h2 className=" text-5xl mb-8">Trending Articles</h2>
      {trending !== null
        ? trending.map((article) => {
            return (
              <article
                key={article.article_id}
                className=" p-2 rounded-2xl shadow-md shadow-white mb-4"
              >
                <h3>{article.title}</h3>
                <img src={article.article_img_url} />
                <div className="flex justify-between">
                  <p className=" m-4 text-2xl">By: {article.author}</p>
                  <Link to={`/${article.article_id}`}>
                    <Button value={"View Article"} />
                  </Link>
                </div>
              </article>
            );
          })
        : null}
    </div>
  );
};

export default Recomemended;
