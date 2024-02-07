import axios from "axios";
import { useContext } from "react";
import loggedInUserContext from "../context/loggedInContext";

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
  articleId,
  loggedIn
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
        { username: loggedIn.user, body: comment }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (comment_id) => {
  try {
    await axios.delete(
      `https://fun-news.onrender.com/api/comments/${comment_id}`
    );
  } catch (error) {
    console.log(error);
  }
};

export default getComments;
