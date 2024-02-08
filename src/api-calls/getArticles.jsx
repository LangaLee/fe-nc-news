import axios from "axios";

const getAllArticles = async (func, func2, request) => {
  try {
    let query = "https://fun-news.onrender.com/api/articles";

    const response = await axios.get(query);
    const { articles } = response.data;

    func2 !== null ? func2(false) : null;

    if (request === "trending") {
      const articlesCopy = JSON.parse(JSON.stringify(articles));
      articlesCopy.sort((a, b) => b.votes - a.votes);
      func(articlesCopy.slice(0, 3));
    } else if (request !== undefined) {
      const articlesCopy = JSON.parse(JSON.stringify(articles));
      func(articlesCopy.filter((article) => article.topic === request));
    } else func(articles);
  } catch (error) {
    console.log(error);
  }
};

export default getAllArticles;
