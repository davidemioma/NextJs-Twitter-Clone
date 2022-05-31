import React, { useState } from "react";
import { RefreshIcon } from "@heroicons/react/outline";
import { fetchTweets } from "../../utils/constants";
import TweetBox from "./tweet-box/TweetBox";
import Tweet from "./tweet/Tweet";
import toast from "react-hot-toast";
import classes from "./Feed.module.css";

const Feed = ({ data }) => {
  const [tweets, setTweets] = useState(data?.tweets);

  const handleRefresh = async () => {
    const refreshToast = toast.loading("Refreshing");

    const refreshedTweets = await fetchTweets();

    setTweets(refreshedTweets?.tweets);

    toast.success("Feed Updated", {
      id: refreshToast,
    });
  };

  return (
    <div className={classes.feed}>
      <div className={classes.header}>
        <h1>Home</h1>

        <RefreshIcon onClick={handleRefresh} className={classes.header_icon} />
      </div>

      <TweetBox setTweets={setTweets} />

      <div className={classes.tweets}>
        {tweets.map((tweet) => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
