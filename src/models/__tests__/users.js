const { open, close, dropDB } = require('../mongoose/_connection');
const {
  createUser, userByUsername, authenticate, createComment,
} = require('../users');

beforeAll(open);
afterAll(() => dropDB().then(close));

it('should create a user', async () => {
  await createUser('myNewTweezlerUserId', 'password');

  const createdUser = await userByUsername('myNewTweezlerUserId');
  expect(createdUser.username).toEqual('myNewTweezlerUserId');
});

it('should authenticate a user', async () => {
  await createUser('anotherUser', 'sAfEPaSsWoRd');

  const isValid = await authenticate('anotherUser', 'sAfEPaSsWoRd');
  expect(isValid).toEqual(true);

  const isValid2 = await authenticate('anotherUser', 'invalid-password');
  expect(isValid2).toEqual(false);
});

it('should create command for a tweet', async () => {
  const createComments = await createComment('myNewTweezlerUserId', 1, 'hello');
  expect(createComments.tweetId).toEqual(1);
});
