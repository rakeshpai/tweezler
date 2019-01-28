const { model, Schema } = require('mongoose');

const Tweets = new Schema({
  username: String,
  tweet: String,
  time: Date,
});

module.exports = model('Tweets', Tweets);
