const request = require('supertest');
const app = require('./index');

describe('endpoints', () => {
  test('should serve data on index route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ ok: 'true', name: 'express-app', version: '1.1.0' });
  });
});
