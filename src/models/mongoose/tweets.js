const { model, Schema } = require('mongoose');

const Tweets = new Schema({
  username: String,
  tweetId: Number,
  tweetMsg: String,
  tweetedTime: Date,
});

module.exports = model('Tweets', Tweets);
