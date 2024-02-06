import axios from "axios";

const getArticleById = async (id, func) => {
  try {
    const response = await axios.get(
      `https://fun-news.onrender.com/api/articles/${id}`
    );
    const article = response.data.article;
    func([article]);
  } catch (error) {
    console.log(error);
  }
};

export default getArticleById;
