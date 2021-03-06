import { client } from "../../sanity";
import { groq } from "next-sanity";

const feedQuery = groq`
*[_type == "tweet" && !blockTweet]{
  _id,
  ...
} | order(_createdAt desc)`;

export default async function handler(req, res) {
  const tweets = await client.fetch(feedQuery);

  res.status(200).json({ tweets });
}
