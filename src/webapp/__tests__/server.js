const request = require('supertest');
const server = require('../server');

it('should serve a hello world (temporary test)', () => request(server)
  .get('/')
  .expect(200)
  .then(response => expect(response.body).toEqual({ hello: 'world' })));
