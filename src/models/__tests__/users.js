const { open, close, dropDB } = require('../mongoose/_connection');
const {

  createUser, userByUsername, authenticate,
  createComment, getCommentsForTweets,
  postTweet, checkPostedTweet,
} = require('../users');

beforeAll(open);
afterAll(() => dropDB().then(close));

it('should create a user', async () => {
  await createUser('myNewTweezlerUserId', 'password', 'myteezle@gmail.com', 'Tweezler', 0, 0, 0);

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

it('Should update profile details', async () => {
  const updateValues = {
    username: 'myNewTweezlerUserId',
    name: 'teezle',
    email: 'myteezle@gmail.com',
  };
  await updateProfileDetails(updateValues);

  const updated = await getProfileDetails('myNewTweezlerUserId');

  expect(updated.name).toEqual('teezle');
});

it('Should get profile details', async () => {
  const getProfileData = await getProfileDetails('myNewTweezlerUserId');

  const result = {
    name: 'teezle',
    email: 'myteezle@gmail.com',
    username: 'myNewTweezlerUserId',
  };
  expect(getProfileData.toJSON()).toEqual(result);
});


it('Should Update count', async () => {
  await updateCount('myNewTweezlerUserId', 'tweetCount');

  const updated = await getProfileDetails('myNewTweezlerUserId');

  expect(updated.username).toEqual('myNewTweezlerUserId');
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
