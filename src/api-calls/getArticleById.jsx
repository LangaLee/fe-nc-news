import axios from "axios";

const getArticleById = async (id, setArticle, setIsLoading) => {
  try {
    const response = await axios.get(
      `https://fun-news.onrender.com/api/articles/${id}`
    );
    const article = response.data.article;
    setArticle([article]);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export default getArticleById;
