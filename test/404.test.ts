import app from '../src/api/app';
import request from 'supertest';
import { assert } from 'chai';

describe('API - 404', () => {
  const notFound = { error: 'Resource not found' };

  it('responds with json', done => {
    request(app).get('/api/locatins').expect('Content-Type', /json/).expect(404, done);
  });

  it('invalid path', done => {
    request(app)
      .get('/api/location/')
      .expect(res => {
        assert.deepEqual(res.body, notFound);
      })
      .expect(404, done);
  });
});
