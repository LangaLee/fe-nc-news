import { useState } from "react";
import Pagination from "../Reusable-components/Pagination";
const DisplayComments = ({ comments }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const [numOfPages] = useState(Math.ceil(comments.length / commentsPerPage));
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;

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

  console.log(comments);
  return (
    <div className="m-4">
      {commentsToDisplay.map((comment) => (
        <div className="mb-8 border-4 p-2 rounded-2xl" key={comment.comment_id}>
          <h4 className="text-2xl font-medium">@{comment.author}</h4>
          <p>{comment.body}</p>
          <p>Votes: {comment.votes}</p>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numOfPages={numOfPages}
      />
    </div>
  );
};

export default DisplayComments;
