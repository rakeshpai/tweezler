const { hash, compare } = require('bcrypt');
const User = require('./mongoose/users');
const Tweets = require('./mongoose/tweets');
const Comment = require('./mongoose/comments');

const saltRounds = 10;

const encrypt = password => hash(password, saltRounds);

const createUser = async (username, password) => User.create({
  username,
  password: await encrypt(password),
});

const userByUsername = async username => User.findOne({ username });

const authenticate = async (username, password) => {
  const user = await userByUsername(username);
  return compare(password, user.password);
};

const generateTweetId = async () => {
  const lastTweet = Tweets.find().sort({ _id: -1 }).limit(1);
  return lastTweet.length > 0 ? lastTweet.tweetId + 1 : 1;
};

const postTweet = async (username, tweet) => {
  const validUser = await userByUsername(username);
  const id = validUser ? await generateTweetId() : null;
  const saveTweet = id ? await Tweets.create({
    username, id, tweet, time: new Date(),
  }) : null;
  return saveTweet ? tweetId : null;
};

const checkPostedTweet = async (id) => {
  const { tweet } = await Tweets.findOne({ id });
  return tweet;
};

const createComment = async (followerId, tweetId, comment) => Comment.create({
  followerId,
  tweetId,
  comment,
  time: new Date(),
});

const getCommentsForTweets = async tweetId => Comment.find({ tweetId });

module.exports.createComment = createComment;
module.exports.createUser = createUser;
module.exports.userByUsername = userByUsername;
module.exports.authenticate = authenticate;
module.exports.postTweet = postTweet;
module.exports.checkPostedTweet = checkPostedTweet;
module.exports.getCommentsForTweets = getCommentsForTweets;
// module.exports.createFollowing = createFollowing;
