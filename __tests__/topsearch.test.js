require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');


describe('top search routes', () => {
  beforeAll(() => {
    return connect(process.env.MONGODB_URI);
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  afterAll(() => {
    return mongoose.connection.close();
  
  });

  it('POST the common and scientific name of a plant', () => {
    return request(app)
      .put('/api/v1/topsearch')
      .send({
        image_url: 'www.test.com',
        common_name: 'Fern',
        scientific_name: 'Fernius',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          image_url: 'www.test.com',
          common_name: 'Fern',
          scientific_name: 'Fernius',
          incrementCounter: 1,
          __v: 0
        });
      });
  });

  it('searches for a query and grabs it through GET', async() => {
    
    await request(app) 
      .put('/api/v1/topsearch')
      .send({
        image_url: 'www.test.com',
        common_name: 'Fern',
        scientific_name: 'Fernius'
      });
  
    return request(app)
      .get('/api/v1/topsearch')
      .then(res => {
        expect(res.body).toEqual([
          { _id: expect.any(String),
            image_url: 'www.test.com',
            common_name: 'Fern',
            scientific_name: 'Fernius',
            incrementCounter: 1,
            __v: 0

          }
        ]);
      });
  });

  it('GETs all images', async() => {
    
    await request(app) 
      .put('/api/v1/topsearch')
      .send({
        image_url: 'www.test.com',
        common_name: 'Fern',
        scientific_name: 'Fernius'
      });
  
    return request(app)
      .get('/api/v1/topsearch/images')
      .then(res => {
        expect(res.body).toEqual([
          { _id: expect.any(String),
            image_url: 'www.test.com'
          }
        ]);
      });
  });
});

