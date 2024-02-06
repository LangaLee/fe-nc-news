import axios from "axios";

const getComments = async (id, setComments) => {
  try {
    const response = axios.get(
      `https://fun-news.onrender.com/api/articles/${id}/comments`
    );
    const comments = (await response).data.comments;
    setComments(comments);
  } catch (error) {
    console.log(error);
  }
};

export default getComments;
