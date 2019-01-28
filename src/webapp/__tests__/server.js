const request = require('supertest');
const server = require('../server');

it('should serve a hello world (temporary test)', () => request(server)
  .get('/')
  .expect(200)
  .then(response => expect(response.body).toEqual({ hello: 'world' })));


it('should serve a created data', () => request(server)
  .post('/comments')
  .send({
    followerId: 'myNewTweezlerUserId',
    tweetId: 1,
    comment: 'Hello',
  })
  .set('Content-Type', 'application/json')
  .expect(200)
  .then(response => expect(response.body.comment).toEqual('Hello')));
