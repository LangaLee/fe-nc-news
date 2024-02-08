import axios from "axios";
import { useContext } from "react";
import loggedInUserContext from "../context/loggedInContext";

const getComments = async (articleId, setComments, setError) => {
  try {
    const response = axios.get(
      `https://fun-news.onrender.com/api/articles/${articleId}/comments`
    );
    const comments = (await response).data.comments;
    setComments(comments);
  } catch (error) {
    setError((prev) => {
      if (prev === false) return "Could not load comments";
    });
  }
};

export const postComment = async (
  comment,
  setShowCommentInput,
  setHideComments,
  articleId,
  setCommentInputError
) => {
  try {
    if (!/\w/gi.test(comment.body)) {
      throw { msg: "whitespaces only" };
    }
    if (comment.body !== null) {
      setShowCommentInput(false);
      setHideComments({
        state: "Hide Comments",
        hidden: false,
      });

      await axios.post(
        `https://fun-news.onrender.com/api/articles/${articleId}/comments`,
        comment
      );
    }
  } catch (error) {
    if (error.msg === "whitespaces only") {
      setCommentInputError(true);
    }
  }
};

export const deleteComment = async (comment_id) => {
  try {
    await axios.delete(
      `https://fun-news.onrender.com/api/comments/${comment_id}`
    );
  } catch (error) {
    // setError(true);
  }
};

export default getComments;
