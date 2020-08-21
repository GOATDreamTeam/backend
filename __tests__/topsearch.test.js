const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');
const TopSearch = require('../lib/models/TopSearch');


describe('top search routes', () => {
  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
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
});

