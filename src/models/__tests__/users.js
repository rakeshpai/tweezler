const { open, close, dropDB } = require('../mongoose/_connection');
const {
  createUser, userByUsername, authenticate,
  createComment, getCommentsForTweets,
  postTweet, checkPostedTweet,
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

it('should post tweet success', async () => {
  const tweetId = await postTweet('myNewTweezlerUserId', 'my first tweet');
  const tweetCheck = await checkPostedTweet(Number(tweetId));
  expect(tweetCheck).toEqual('my first tweet');
});

it('should create comment for a tweet', async () => {
  const sample = {
    followerId: 'myNewTweezlerUserId',
    tweetId: 1,
    comment: 'Hello',
  };
  const createComments = await createComment(sample.followerId, sample.tweetId, sample.comment);
  expect(createComments.tweetId).toEqual(1);

  const comments = await getCommentsForTweets(sample.tweetId);
  expect(comments[0].tweetId).toEqual(sample.tweetId);
});
