import React, { useState } from "react";
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { fetchTweets } from "../../../utils/constants";
import toast from "react-hot-toast";
import classes from "./TweetBox.module.css";

const TweetBox = ({ setTweets }) => {
  const { data: session } = useSession();

  const [input, setInput] = useState("");

  const [image, setImage] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const [imageUrlBoxOpen, setImageUrlBoxOpen] = useState(false);

  const addImageToTweet = (e) => {
    e.preventDefault();

    if (!imageUrl.trim()) return;

    setImage(imageUrl);

    setImageUrlBoxOpen(false);

    setImageUrl("");
  };

  const postTweet = async () => {
    const tweetBody = {
      text: input,
      username: session?.user?.name || "Unknown User",
      profileImage: session?.user?.image || "https://links.papareact.com/gll",
      image: image,
    };

    const req = await fetch("/api/addTweet", {
      method: "POST",
      body: JSON.stringify(tweetBody),
    });

    const result = await req.json();

    const newTweets = await fetchTweets();

    setTweets(newTweets.tweets);

    toast.success("Tweet Posted");

    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postTweet();

    setInput("");

    setImage("");

    setImageUrlBoxOpen(false);
  };

  return (
    <>
      <div className={classes.container}>
        <img
          src={session?.user.image || "https://links.papareact.com/gll"}
          alt=""
        />

        <div className={classes.form}>
          <form>
            <input
              className={classes.input}
              value={input}
              type="text"
              placeholder="What's Happening"
              onChange={(e) => setInput(e.target.value)}
            />

            <div className={classes.contents}>
              <div className={classes.icons}>
                <PhotographIcon
                  className={classes.icon}
                  onClick={() => setImageUrlBoxOpen(!imageUrlBoxOpen)}
                />

                <SearchCircleIcon className={classes.icon} />

                <EmojiHappyIcon className={classes.icon} />

                <CalendarIcon className={classes.icon} />

                <LocationMarkerIcon className={classes.icon} />
              </div>

              <button
                className={!input.trim() && classes.disabled}
                onClick={session && handleSubmit}
                disabled={!input.trim() || !session}
              >
                Tweet
              </button>
            </div>
          </form>
        </div>
      </div>

      {image && (
        <div className={classes.seleted_img}>
          <img src={image} alt="" />
        </div>
      )}

      {imageUrlBoxOpen && (
        <form className={classes.image_url_box}>
          <input
            type="text"
            placeholder="Enter Image Url..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <button disabled={!imageUrl.trim()} onClick={addImageToTweet}>
            Add Image
          </button>
        </form>
      )}
    </>
  );
};

export default TweetBox;
