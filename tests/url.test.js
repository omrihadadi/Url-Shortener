const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/db');
const Url = require('../src/models/urlModel');


beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('URL Shortener API', () => {
  
  it('should create a short URL', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({ originalUrl: 'https://www.example.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('shortUrl');
  });

  it('should retrieve the original URL', async () => {
    const url = await Url.create({ originalUrl: 'https://www.example.com', shortUrl: 'abcd1234' });

    const res = await request(app)
      .get(`/api/${url.shortUrl}`);

    expect(res.statusCode).toBe(200); // Assuming your response status is 200 OK
    expect(res.body).toHaveProperty('originalUrl');
    expect(res.body.originalUrl).toBe('https://www.example.com');
  });
});
