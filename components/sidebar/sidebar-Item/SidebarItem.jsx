import React from "react";
import classes from "./SidebarItem.module.css";

const SidebarItem = ({ title, Icon, onClick }) => {
  return (
    <div className={classes.container} onClick={() => onClick?.()}>
      <Icon width="20px" height="20px" />

      <p>{title}</p>
    </div>
  );
};

export default SidebarItem;
