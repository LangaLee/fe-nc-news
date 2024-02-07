import { useContext, useState } from "react";
import Pagination from "../Reusable-components/Pagination";
import loggedInUserContext from "../context/loggedInContext";
import { deleteComment } from "../api-calls/comments";

const DisplayComments = ({ comments, deletedComment, setDeletedComment }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const [numOfPages] = useState(Math.ceil(comments.length / commentsPerPage));
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const { loggedIn } = useContext(loggedInUserContext);

  const commentsCopy = JSON.parse(JSON.stringify(comments));

  // sort the comments by date creaed so that when a user makes a new comment they can see it
  const [sortedComments, setSortedComments] = useState(
    commentsCopy.sort((a, b) => {
      return b.created_at.localeCompare(a.created_at);
    })
  );

  const commentsToDisplay = sortedComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  return (
    <div className="m-4">
      {commentsToDisplay.map((comment) => {
        return deletedComment.includes(comment.comment_id) ? null : (
          <div
            className="mb-8 border-4 p-2 rounded-2xl"
            key={comment.comment_id}
          >
            <h4 className="text-2xl font-medium">@{comment.author}</h4>
            <p>{comment.body}</p>
            <div className="flex justify-between">
              <p>Votes: {comment.votes}</p>
              {loggedIn.user === comment.author ? (
                <button
                  className="rounded-md border-solid border-2 hover:bg-blue-900 m-4 text-2xl p-1"
                  onClick={() => {
                    setDeletedComment([...deletedComment, comment.comment_id]);
                    deleteComment(comment.comment_id);
                  }}
                >
                  Delete
                </button>
              ) : null}
            </div>
          </div>
        );
      })}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numOfPages={numOfPages}
      />
    </div>
  );
};

export default DisplayComments;
