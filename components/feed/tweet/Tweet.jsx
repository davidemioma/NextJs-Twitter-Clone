import React, { useEffect, useState } from "react";
import {
  HeartIcon,
  UploadIcon,
  ChatAlt2Icon,
  SwitchHorizontalIcon,
} from "@heroicons/react/outline";
import Moment from "react-moment";
import { fetchComments } from "../../../utils/constants";
import { useSession } from "next-auth/react";
import Comment from "../comment/Comment";
import toast from "react-hot-toast";
import classes from "./Tweet.module.css";

const Tweet = ({ tweet }) => {
  const { data: session } = useSession();

  const [comments, setComments] = useState([]);

  const [input, setInput] = useState("");

  const [commentBoxOpen, setCommentBoxOpen] = useState(false);

  const addComment = async () => {
    const commentBody = {
      comment: input,
      username: session?.user?.name || "Unknown User",
      profileImage: session?.user?.image || "https://links.papareact.com/gll",
      tweetId: tweet._id,
    };

    const req = await fetch("/api/addComment", {
      method: "POST",
      body: JSON.stringify(commentBody),
    });

    const result = await req.json();

    const newComments = await fetchComments();

    setComments(newComments);

    toast.success("Comment Added");

    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addComment();

    setInput("");

    setCommentBoxOpen(false);
  };

  useEffect(() => {
    fetchComments(tweet._id).then((response) =>
      setComments(response?.comments)
    );
  }, [tweet._id]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <img className={classes.profile_img} src={tweet.profileImage} alt="" />

        <div>
          <div className="profile">
            <p>{tweet.username}</p>

            <p className="username">
              @{tweet.username.replace(/\s+/g, "").toLowerCase()} .
            </p>

            <Moment className="created_At" fromNow date={tweet._createdAt} />
          </div>

          <p className="text">{tweet.text}</p>
        </div>
      </div>

      {tweet.image && (
        <img className={classes.image} src={tweet.image} alt="" />
      )}

      <div className={classes.icons}>
        <div
          className={classes.icon}
          onClick={() => session && setCommentBoxOpen(!commentBoxOpen)}
        >
          <ChatAlt2Icon width="20px" height="20px" />

          <p>{comments.length}</p>
        </div>

        <div className={classes.icon}>
          <SwitchHorizontalIcon width="20px" height="20px" />
        </div>

        <div className={classes.icon}>
          <HeartIcon width="20px" height="20px" />
        </div>

        <div className={classes.icon}>
          <UploadIcon width="20px" height="20px" />
        </div>
      </div>

      {commentBoxOpen && (
        <form onSubmit={handleSubmit} className={classes.comment_form}>
          <input
            value={input}
            type="text"
            placeholder="Write a comment..."
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            className={!input.trim() && classes.disabled}
            type="submit"
            onClick={handleSubmit}
            disabled={!input.trim()}
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className={classes.comments}>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tweet;
