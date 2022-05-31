import React from "react";
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/outline";
import SidebarItem from "./sidebar-Item/SidebarItem";
import { useSession, signIn, signOut } from "next-auth/react";
import classes from "./Sidebar.module.css";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className={classes.sidebar}>
      <img
        className={classes.logo}
        src="https://links.papareact.com/drq"
        alt=""
      />

      <div className={classes.sidebar_items}>
        <SidebarItem Icon={HomeIcon} title="Home" />

        <SidebarItem Icon={HashtagIcon} title="Explore" />

        <SidebarItem Icon={BellIcon} title="Notifications" />

        <SidebarItem Icon={MailIcon} title="Messages" />

        <SidebarItem Icon={BookmarkIcon} title="Bookmarks" />

        <SidebarItem Icon={CollectionIcon} title="Lists" />

        <SidebarItem
          onClick={session ? signOut : signIn}
          Icon={UserIcon}
          title={session ? "Sign Out" : "Sign In"}
        />

        <SidebarItem Icon={DotsCircleHorizontalIcon} title="More" />
      </div>
    </div>
  );
};

export default Sidebar;
