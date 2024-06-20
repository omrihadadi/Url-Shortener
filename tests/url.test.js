const request = require('supertest');
const app = require('../src/app'); // Your Express application instance
const sequelize = require('../src/config/db'); // Sequelize instance for database interaction
const Url = require('../src/models/urlModel'); // Model for interacting with the Urls table

// Before all tests, sync the Sequelize models (create tables)
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

// After all tests, close the Sequelize connection
afterAll(async () => {
  await sequelize.close();
});

// Describe block for URL Shortener API tests
describe('URL Shortener API', () => {
  
  // Test case: Create a short URL
  it('should create a short URL', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({ originalUrl: 'https://www.example.com' });

    expect(res.statusCode).toBe(201); // Expect HTTP status code 201 (Created)
    expect(res.body).toHaveProperty('shortUrl'); // Expect response body to have 'shortUrl' property
  });

  // Test case: Redirect to the original URL
  it('should redirect to the original URL', async () => {
    // Create a sample URL entry in the database
    const url = await Url.create({ originalUrl: 'https://www.example.com', shortUrl: 'abcd1234' });

    // Make a GET request to the short URL endpoint
    const res = await request(app)
      .get(`/api/${url.shortUrl}`);

    expect(res.statusCode).toBe(302); // Expect HTTP status code 302 (Redirect)
    expect(res.headers.location).toBe(url.originalUrl); // Expect redirect location to match originalUrl
  });
});
