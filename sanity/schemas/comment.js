export default {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
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
      name: "comment",
      title: "Comment",
      type: "string",
    },
    {
      name: "tweet",
      title: "Tweet",
      description: "Reference the tweet the comment is assioated with.",
      type: "reference",
      to: {
        type: "tweet",
      },
    },
  ],
};
