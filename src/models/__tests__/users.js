const { open, close, dropDB } = require('../mongoose/_connection');
const {
  createUser, userByUsername, authenticate, updateProfileDetails, getProfileDetails,
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

it('Should update profile details', async () => {
  await updateProfileDetails('myNewTweezlerUserId', 'teezle');

  const updated = await getProfileDetails('myNewTweezlerUserId');

  expect(updated.name).toEqual('teezle');
});

it('Should get profile details', async () => {
  await getProfileDetails('myNewTweezlerUserId');
});
