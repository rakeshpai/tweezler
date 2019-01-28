const Comment = require('./mongoose/comments');

const createComment = async ({ followerId, tweetId, comment }) => Comment.create({
  followerId,
  tweetId,
  comment,
  time: new Date(),
});

const getCommentsForTweets = async tweetId => Comment.find({ tweetId });

module.exports.createComment = createComment;

module.exports.getCommentsForTweets = getCommentsForTweets;
