import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import classes from "./Widgets.module.css";

const Widgets = () => {
  const [input, setInput] = useState("");

  const [screenName, setScreenName] = useState("kingjames");

  const handleSubmit = (e) => {
    e.preventDefault();

    setScreenName(input);

    setInput("");
  };

  return (
    <div className={classes.widgets}>
      <form onSubmit={handleSubmit} className={classes.search}>
        <SearchIcon width="20px" height="20px" color="#cccccc" />

        <input
          value={input}
          type="text"
          placeholder="Search Twitter"
          onChange={(e) => setInput(e.target.value)}
        />
      </form>

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName={screenName}
        options={{ height: 1000 }}
      />
    </div>
  );
};

export default Widgets;
