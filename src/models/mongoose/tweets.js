const { model, Schema } = require('mongoose');

const tweets = new Schema({
  username: String,
  tweet: String,
  time: Date,
});

module.exports = model('tweets', tweets);
