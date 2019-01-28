const { hash, compare } = require('bcrypt');
const User = require('./mongoose/users');
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
module.exports.getCommentsForTweets = getCommentsForTweets;
