import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import getArticleById from "../api-calls/getArticleById";
import updateVotes from "../api-calls/updateVotes";
import { useParams } from "react-router-dom";
import Loading from "../Main-components/Loading";
import getComments from "../api-calls/comments";
import DisplayComments from "./DisplayComments";
import Button from "../Reusable-components/Button";
import CommentInput from "./CommentInput";
import urlContext from "../context/urlContext";
import loggedInUserContext from "../context/loggedInContext";
import errorContext from "../context/error";
import getLikes from "../api-calls/getLikes";
import { postLikes, patchLikes } from "../api-calls/getLikes";

const Article = () => {
  const { loggedIn } = useContext(loggedInUserContext);
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const articleId = useParams().article_id;
  const [hideComments, setHideComments] = useState({
    state: "Show Comments",
    hidden: true,
  });
  const [likes, setLikes] = useState({ likes: 0 });
  const [comments, setComments] = useState(null);
  const [errorVoting, setErrorVoting] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [errorPostingComment, setErrorPostingComment] = useState(null);
  const { setError } = useContext(errorContext);
  const { setUrl } = useContext(urlContext);
  const [likesLoaded, setLikesLoaded] = useState(false);
  const addComment = () => {
    setShowCommentInput(true);
  };

  const toggleComments = () => {
    if (hideComments.hidden === true) {
      setHideComments({ state: "Hide Comments", hidden: false });
    } else {
      setHideComments({
        state: "Show Comments",
        hidden: true,
      });
    }
  };
  const displayArticle = () => {
    return article.map((article) => {
      const Image = () => {
        return (
          <div>
            <img alt={`image for article`} src={article.article_img_url} />
          </div>
        );
      };

      return (
        <div key={article.article_id}>
          <h2 className="m-4 text-5xl">{article.title}</h2>
          <div className="flex justify-between m-4">
            <div className="max-w-7xl p-1">
              <h3 className="text-2xl font-semibold mt-4">
                Topic: {article.topic}
              </h3>
              <h4 className="text-2xl font-semibold mt-4">
                Author: {article.author}
              </h4>
              {window.innerWidth < 1600 ? Image() : null}
              <p className="mt-4">{article.body}</p>{" "}
              <div className="flex justify-around">
                {errorVoting ? (
                  <p className="text-2xl mt-4">There was an issue voting</p>
                ) : (
                  <p className="text-2xl font-semibold mt-4">
                    Votes: {article.votes}
                  </p>
                )}
                <div>
                  {likesLoaded && likes.likes !== 1 ? (
                    <button
                      onClick={() => {
                        if (
                          likes.likes === 0 ||
                          (errorVoting === false && likes.likes !== 1)
                        ) {
                          updateVotes(articleId, true, setErrorVoting);
                          if (likes.likes === 0) {
                            setLikes((prevState) => {
                              return {
                                username: loggedIn.user,
                                article_id: article.article_id,
                                likes: 1,
                              };
                            });
                            postLikes(loggedIn.user, {
                              username: loggedIn.user,
                              article_id: article.article_id,
                              likes: 1,
                            });
                          } else if (likes.likes === -1) {
                            setLikes((prevState) => {
                              return { ...prevState, likes: 1 };
                            });
                            patchLikes(loggedIn.user, article.article_id, {
                              likes: 1,
                            });
                          }
                          const articleCopy = { ...article };
                          articleCopy.votes = articleCopy.votes + 1;
                          setArticle([articleCopy]);
                        }
                      }}
                      className="p-1 rounded-md border-solid border-2 hover:bg-blue-900 mt-4 text-2xl"
                    >
                      add Vote
                    </button>
                  ) : null}
                  {likesLoaded && likes.likes !== -1 ? (
                    <button
                      onClick={() => {
                        if (
                          likes.likes === 0 ||
                          (errorVoting === false && likes.likes !== -1)
                        ) {
                          updateVotes(articleId, false, setErrorVoting);
                          if (likes.likes === 0) {
                            setLikes((prevState) => {
                              return {
                                username: loggedIn.user,
                                article_id: article.article_id,
                                likes: -1,
                              };
                            });
                            postLikes(loggedIn.user, {
                              username: loggedIn.user,
                              article_id: article.article_id,
                              likes: -1,
                            });
                          } else if (likes.likes === 1) {
                            setLikes((prevState) => {
                              return { ...prevState, likes: -1 };
                            });
                            patchLikes(loggedIn.user, article.article_id, {
                              likes: -1,
                            });
                          }
                          const articleCopy = { ...article };
                          articleCopy.votes = articleCopy.votes - 1;
                          setArticle([articleCopy]);
                        }
                      }}
                      className="p-1 rounded-md border-solid border-2 hover:bg-blue-900 mt-4 ml-4 text-2xl"
                    >
                      remove Vote
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
            {window.innerWidth > 1600 ? Image() : null}
          </div>
        </div>
      );
    });
  };
  useEffect(() => {
    getComments(articleId, setComments, setError);
    getArticleById(articleId, setArticle, setIsLoading, setError);
    setUrl(`/${articleId}`);
  }, []);
  useEffect(() => {
    if (loggedIn.user) {
      getLikes(loggedIn.user, setLikes, articleId, setLikesLoaded);
    }
  }, [loggedIn.user]);
  const commentsCopy = JSON.parse(JSON.stringify(comments));
  const [sortedComments, setSortedComments] = useState([]);
  useEffect(() => {
    if (comments !== null) {
      setSortedComments(
        commentsCopy.sort((a, b) => {
          return b.created_at.localeCompare(a.created_at);
        })
      );
    }
  }, [comments]);
  const [deletedComment, setDeletedComment] = useState([]);

  return (
    <div className="text-xl">
      {isLoading ? <Loading /> : displayArticle()}
      <div>
        {loggedIn.value ? (
          <Button value={"Add Comment"} func={addComment} />
        ) : null}
        {showCommentInput ? (
          <CommentInput
            setShowCommentInput={setShowCommentInput}
            setHideComments={setHideComments}
            articleId={articleId}
            setComments={setComments}
          />
        ) : null}
      </div>
      <div className="flex justify-between mr-4">
        <Button value={hideComments.state} func={toggleComments} />
        <div>
          <label htmlFor="back-to-articles">All articles here 👉</label>
          <Link to={"/articles"}>
            <button
              id="back-to-articles"
              className="rounded-md border-solid border-2 hover:bg-blue-900 ml-4  text-2xl p-1"
            >
              Articles
            </button>
          </Link>
        </div>
      </div>
      <div>
        {hideComments.hidden ? null : (
          <DisplayComments
            comments={sortedComments}
            deletedComment={deletedComment}
            setDeletedComment={setDeletedComment}
          />
        )}
      </div>
    </div>
  );
};

export default Article;
