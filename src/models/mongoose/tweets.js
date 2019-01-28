const { model, Schema } = require('mongoose');

const tweets = new Schema({
  username: String,
  tweetMessage: String,
  tweetTime: Date,
});

module.exports = model('tweets', tweets);
