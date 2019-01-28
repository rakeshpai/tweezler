const { hash, compare } = require('bcrypt');
const User = require('./mongoose/users');

const saltRounds = 10;

const encrypt = password => hash(password, saltRounds);


const userIdCheck = (userName, followingName) => (!!(userName && followingName));

const createFollowing = async (userName, followingName) => {
  const user = userIdCheck(userName, followingName);
  console.log(user);
};


const createUser = async (username, password) => User.create({
  username,
  password: await encrypt(password),
});


const userByUsername = async username => User.findOne({ username });

const authenticate = async (username, password) => {
  const user = await userByUsername(username);
  return compare(password, user.password);
};


module.exports.createUser = createUser;
module.exports.userByUsername = userByUsername;
module.exports.authenticate = authenticate;
module.exports.createFollowing = createFollowing;
