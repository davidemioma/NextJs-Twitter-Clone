export default async function handler(req, res) {
  const data = JSON.parse(req.body);

  const mutations = {
    mutations: [
      {
        create: {
          _type: "tweet",
          image: data.image,
          profileImage: data.profileImage,
          text: data.text,
          username: data.username,
          blockTweet: false,
        },
      },
    ],
  };

  const result = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.SANITY_TOKEN_KEY}`,
      },
      body: JSON.stringify(mutations),
    }
  );

  const json = await result.json();

  res.status(200).json({ message: "Added" });
}
