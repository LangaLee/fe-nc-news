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

export const postComment = (comment, setShowCommentInput, setHideComments) => {
  try {
    if (comment !== null) {
      setShowCommentInput(false);
      setHideComments({
        state: "Hide Comments",
        hidden: false,
      });
    }
    console.log(comment);
  } catch (error) {
    console.log(error);
  }
};

export default getComments;
