const { hash } = require('bcrypt');
const User = require('./mongoose/users');

const saltRounds = 10;

const encrypt = password => hash(password, saltRounds);

module.exports.createUser = async (username, password) => User.create({
  username,
  password: await encrypt(password),
});

module.exports.userByUsername = async username => User.findOne({ username });
