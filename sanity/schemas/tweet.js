export default {
  name: "tweet",
  title: "Tweet",
  type: "document",
  fields: [
    {
      name: "text",
      title: "Text in the tweet",
      type: "string",
    },
    {
      name: "blockTweet",
      title: "Block tweet",
      type: "boolean",
      description: "ADMIN controls: Toggle if Tweet is deemed inappriopiate ",
    },
    {
      name: "username",
      title: "Username",
      type: "string",
    },
    {
      name: "profileImage",
      title: "Profile Image",
      type: "string",
    },
    {
      name: "image",
      title: "Tweet Image",
      type: "string",
    },
  ],
};
