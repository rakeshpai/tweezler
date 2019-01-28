const { model, Schema } = require('mongoose');

const Comment = new Schema({
  followerId: String,
  tweetId: Number,
  comment: String,
  time: Date,
});

module.exports = model('Comment', Comment);
