const DisplayArticles = ({ articles }) => {
  return articles.map((article) => {
    return (
      <div
        key={article.article_id}
        className=" m-2 mb-4 rounded-xl w-80 border-solid border-white border-2 p-2"
      >
        <p>{article.title}</p>
        <img variant="top" src={article.article_img_url} className="" />
        <div className="flex justify-between ">
          <h5>By: {article.author}</h5>
          <button className=" rounded-md border-solid border-2 border-lime-950 hover:bg-blue-500 hover:text-black ">
            View Article
          </button>
        </div>
      </div>
    );
  });
};

export default DisplayArticles;
