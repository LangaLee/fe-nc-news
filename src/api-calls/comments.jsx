import axios from "axios";

const getComments = async (articleId, setComments) => {
  try {
    const response = axios.get(
      `https://fun-news.onrender.com/api/articles/${articleId}/comments`
    );
    const comments = (await response).data.comments;
    setComments(comments);
  } catch (error) {
    console.log(error);
  }
};

export const postComment = async (
  comment,
  setShowCommentInput,
  setHideComments,
  articleId
) => {
  try {
    if (comment !== null) {
      setShowCommentInput(false);
      setHideComments({
        state: "Hide Comments",
        hidden: false,
      });

      await axios.post(
        `https://fun-news.onrender.com/api/articles/${articleId}/comments`,
        { username: "cooljmessy", body: comment }
      );
    }
    console.log(articleId);
    console.log(comment);
  } catch (error) {
    console.log(error);
  }
};

export default getComments;
