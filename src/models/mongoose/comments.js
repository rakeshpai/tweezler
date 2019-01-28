const { model, Schema } = require('mongoose');

const Comment = new Schema({
  followerId: String,
  tweetId: Number,
  comment: String,
  commentTime: Number,
});

module.exports = model('Comment', Comment);
