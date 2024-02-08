import axios from "axios";

const getAllArticles = async (
  func,
  func2,
  request,
  setError,
  sortParameter
) => {
  try {
    let query = "https://fun-news.onrender.com/api/articles";
    if (request !== undefined && request !== "trending") {
      query += `?topic=${request}`;
    } else if (sortParameter !== undefined) {
      query += `?sort_by=${sortParameter}`;
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
    if (error.response.status === 400) {
      setError("Invalid sort query");
    } else if (error.response.status === 404) {
      setError("Topic not found");
    }
  }
};

export default getAllArticles;
