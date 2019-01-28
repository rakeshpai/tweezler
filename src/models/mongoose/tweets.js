const { model, Schema } = require('mongoose');

const Tweets = new Schema({
  username: String,
  id: Number,
  message: String,
  time: Date,
});

module.exports = model('Tweets', Tweets);
