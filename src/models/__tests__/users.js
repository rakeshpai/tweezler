const { open, close, dropDB } = require('../mongoose/_connection');
const {
  createUser, userByUsername, authenticate, updateProfileDetails, getProfileDetails,
  updateCount,
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
});
