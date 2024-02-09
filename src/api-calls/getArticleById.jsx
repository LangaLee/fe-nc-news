import axios from "axios";

const getArticleById = async (id, setArticle, setIsLoading, setError) => {
  try {
    const response = await axios.get(
      `https://fun-news.onrender.com/api/articles/${id}`
    );
    const article = response.data.article;
    setArticle([article]);
    setIsLoading(false);
  } catch (error) {
    setError("Article does not exist");
  }
};

export default getArticleById;
