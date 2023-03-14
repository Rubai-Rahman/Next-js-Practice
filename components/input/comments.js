import { useState, useEffect, useContext } from "react";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "@/store/notification-context";

function Comments(props) {
  const { eventId } = props;
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const notificationCtx = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (showComments) {
      setReload(true);
      setLoading(true);
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setComments(data?.comments);
        });
    }
  }, [showComments, reload]);
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
    setReload(false);
  }

  function addCommentHandler(commentData,event) {
    notificationCtx?.showNotification({
      title: "Sending Comment ...",
      message: "Your Comment is stored",
      status: "pending",
    });
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json()",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        res.json().then((data) => {
          throw new Error(data.message || "Something went Wrong");
        });
      })
      .then((data) => {
        notificationCtx?.showNotification({
          title: "Success",
          message: "Your comment is Saved",
          status: "success",
        });
        event.target.reset();
      })
      .catch((error) => {
        notificationCtx?.showNotification({
          title: "Error...",
          message: error.message || "Something went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && loading && <p>Loading ...</p>}
      {showComments && (
        <NewComment onAddComment={addCommentHandler} setReload={setReload} />
      )}
      {showComments && !loading && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
