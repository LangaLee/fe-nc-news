import axios from "axios";

const getAllArticles = async (func, func2, request) => {
  try {
    let query = "https://fun-news.onrender.com/api/articles";
    if (request !== undefined && request !== "trending") {
      query += `?topic=${request}`;
    } else {
      query += "?sort_by=votes";
    }
    const response = await axios.get(query);
    const { articles } = response.data;

    func2 !== null ? func2(false) : null;

    if (request === "trending") {
      func(articles.slice(0, 3));
    } else func(articles);
  } catch (error) {
    console.log(error);
  }
};

export default getAllArticles;
