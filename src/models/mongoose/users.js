const { model, Schema } = require('mongoose');

const User = new Schema({
  name: String,
  email: String,
  username: { type: String, unique: true, required: true },
  password: String,
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tweets: Number,


});

module.exports = model('User', User);
