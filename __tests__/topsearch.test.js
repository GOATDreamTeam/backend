const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');
const TopSearch = require('../lib/models/TopSearch');


describe('top search routes', () => {
  beforeAll(() => {
    return connect('mongodb://localhost:27017/my-test-db');
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  afterAll(() => {
    return mongoose.connection.close();
  
  });

  it('POST the common and scientific name of a plant', () => {
    return request(app)
      .post('/api/v1/topsearch')
      .send({
        //this plantID is hard coded right now
        plantID: '12345',
        common_name: 'Fern',
        scientific_name: 'Fernius'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          plantID: '12345',
          common_name: 'Fern',
          scientific_name: 'Fernius',
          __v: 0
        });
      });
  });

  it('searches for a query and grabs it through GET', async() => {
    
    await request(app) 
      .post('/api/v1/topsearch')
      .send({
      //this plantID is hard coded right now
        plantID: '12345',
        common_name: 'Fern',
        scientific_name: 'Fernius'
      });
  
    return request(app)
      .get('/api/v1/topsearch')
      .then(res => {
        expect(res.body).toEqual([
          { _id: expect.any(String),
            plantID: '12345',
            common_name: 'Fern',
            scientific_name: 'Fernius',
            __v: 0

          }
        ]);
      });
  });
});

