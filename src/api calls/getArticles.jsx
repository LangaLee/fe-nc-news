import axios from "axios";

const getAllArticles = async (func) => {
  try {
    // https://fun-news.onrender.com
    let query = "https://fun-news.onrender.com/api/articles";

    const response = await axios.get(query);
    const { articles } = response.data;
    func(articles);
  } catch (error) {
    console.log(error);
  }
};

export default getAllArticles;
