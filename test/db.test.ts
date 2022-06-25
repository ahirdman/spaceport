import app from '../src/api/app';
import request from 'supertest';
import { dummyData } from './../src/db';

describe('API - "Launches"', () => {
  before(async () => {
    await dummyData();
  });

  describe('all', () => {
    it('responds with json', done => {
      request(app).get('/api/launches').expect('Content-Type', /json/).expect(200, done);
    });
  });
});
