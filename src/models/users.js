const { hash, compare } = require('bcrypt');
const User = require('./mongoose/users');

const saltRounds = 10;

const encrypt = password => hash(password, saltRounds);

const createUser = async (username, password, email, name, tweetsCount,
  followingsCount, followersCount) => User.create({
  username,
  password: await encrypt(password),
  email,
  name,
  tweetsCount,
  followingsCount,
  followersCount,
});

const userByUsername = async username => User.findOne({ username });

const authenticate = async (username, password) => {
  const user = await userByUsername(username);
  return compare(password, user.password);
};


const updateProfileDetails = async updateValues => User.update({ username: updateValues.username },
  {
    $set: { name: updateValues.name },
  });

const getProfileDetails = async username => User.findOne({ username },
  {
    _id: 0,
    __v: 0,
    password: 0,
    followersCount: 0,
    followingsCount: 0,
    tweetsCount: 0,
    following: 0,
    followers: 0,
  });


const updateCount = async (username, input) => User.update({ username },
  { $set: { $inc: { [input]: 1 } } });


module.exports.createUser = createUser;
module.exports.userByUsername = userByUsername;
module.exports.authenticate = authenticate;
module.exports.updateProfileDetails = updateProfileDetails;
module.exports.getProfileDetails = getProfileDetails;
module.exports.updateCount = updateCount;
