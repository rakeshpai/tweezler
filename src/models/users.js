const { hash, compare } = require('bcrypt');
const User = require('./mongoose/users');

const saltRounds = 10;

const encrypt = password => hash(password, saltRounds);

const createUser = async (username, password, email, name) => User.create({
  username,
  password: await encrypt(password),
  email,
  name,
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
    _id: 0, __v: 0, password: 0,
  });

module.exports.createUser = createUser;
module.exports.userByUsername = userByUsername;
module.exports.authenticate = authenticate;
module.exports.updateProfileDetails = updateProfileDetails;
module.exports.getProfileDetails = getProfileDetails;
