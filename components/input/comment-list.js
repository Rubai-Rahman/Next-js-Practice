import classes from "./comment-list.module.css";

function CommentList(props) {
  const { items } = props;

  return (
    <ul className={classes.comments}>
      {
        /* Render list of comments - fetched from API */
        items.map((item) => (
          <li key={item._id}>
            <p>{item?.comment.text}</p>
            <div>
              By <address>{item.comment.name}</address>
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default CommentList;
