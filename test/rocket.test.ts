import app from '../src/api/app';
import request from 'supertest';
import { assert } from 'chai';

describe('API - "Rockets"', () => {
  describe('all', () => {
    it('responds with json', done => {
      request(app).get('/api/rockets').expect('Content-Type', /json/).expect(200, done);
    });
  });

  describe('single', () => {
    it('returns specific rocket', done => {
      const rocket = { rocket_name: 'Falcon 9' };

      request(app)
        .get('/api/rockets/falcon_9')
        .expect('Content-Type', /json/)
        .expect(res => {
          assert.include(res.body, rocket);
        })
        .expect(200, done);
    });
  });
});
