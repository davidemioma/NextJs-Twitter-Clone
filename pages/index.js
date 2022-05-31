import React from "react";
import Head from "next/head";
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../components/feed/Feed";
import Widgets from "../components/widgets/Widgets";
import { fetchTweets } from "../utils/constants";
import { Toaster } from "react-hot-toast";

const Home = ({ tweets }) => {
  return (
    <div className="container">
      <Head>
        <title>Twitter Clone</title>
      </Head>

      <Toaster />

      <main className="app">
        <Sidebar />

        <Feed data={tweets} />

        <Widgets />
      </main>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const tweets = await fetchTweets();

  return {
    props: {
      tweets,
    },
  };
};

export default Home;
