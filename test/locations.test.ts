import app from '../src/api/app';
import request from 'supertest';

describe('API - "Locations"', () => {
  describe('all', () => {
    it('responds with json', done => {
      request(app).get('/api/locations').expect('Content-Type', /json/).expect(200, done);
    });
  });
});
