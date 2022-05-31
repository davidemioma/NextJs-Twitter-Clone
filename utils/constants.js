export const fetchTweets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`);

  const data = res.json();

  return data;
};

export const fetchComments = async (tweetId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getComments?tweetId=${tweetId}`
  );

  const data = res.json();

  return data;
};
