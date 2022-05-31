import React from "react";
import Moment from "react-moment";
import classes from "./Comment.module.css";

const Comment = ({ comment }) => {
  return (
    <div className={classes.comment}>
      <hr className={classes.line} />

      <img src={comment.profileImage} alt="" />

      <div>
        <div className="profile">
          <p>{comment.username}</p>

          <p className="username">
            @{comment.username.replace(/\s+/g, "").toLowerCase()} .
          </p>

          <Moment className="created_At" fromNow date={comment._createdAt} />
        </div>

        <p className="text">{comment.comment}</p>
      </div>
    </div>
  );
};

export default Comment;
