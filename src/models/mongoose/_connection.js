require('dotenv').config();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const open = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
  });
};

const close = () => mongoose.disconnect();

const dropDB = () => {
  if (process.env.NODE_ENV !== 'test') return Promise.resolve();
  return mongoose.connection.db.dropDatabase();
};

module.exports = { open, close, dropDB };
