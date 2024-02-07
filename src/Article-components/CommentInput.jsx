import { useEffect, useState } from "react";
import { postComment } from "../api-calls/comments";
import Button from "../Reusable-components/Button";

const CommentInput = ({
  setShowCommentInput,
  setHideComments,
  articleId,
  setComments,
}) => {
  // on submit check if user is logged in

  const [commentInput, setCommentInput] = useState("");
  const [comment, setcomment] = useState(null);

  const handleComment = (e) => {
    setCommentInput(e.target.value);
  };

  useEffect(() => {
    postComment(comment, setShowCommentInput, setHideComments, articleId);

    // optimistically render the commnent here
    if (comment !== null) {
      setComments((prevState) => [
        ...prevState,
        {
          comment_id: prevState[prevState.length - 1].comment_id + 1,
          body: comment,
          author: "cooljmessy",
          votes: 0,
          created_at: `${new Date()}`,
        },
      ]);
    }
  }, [comment]);

  return (
    <div className="grid w-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setcomment(commentInput);
          setCommentInput("");
        }}
      >
        <textarea
          type="text"
          onChange={handleComment}
          className="rounded-md m-4 box-border text-wrap text-black min-h-24 w-11/12 align-text-top"
          id="comment-body"
          placeholder="Comment here..."
          required={true}
        ></textarea>
        <Button value={"Post Comment"} />
      </form>
    </div>
  );
};

export default CommentInput;
