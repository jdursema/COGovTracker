process.env.NODE_ENV = 'test';

const chai = require('chai')
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');

chai.use(chaiHttp);

describe('Client routes', function() {
  it('should return the home page', () => {
    return chai.request(server)
    .get('/')
    .then(response => {
      response.should.have.status(200)
    })
    .catch(error => {
      throw error;
    })
  })
  it('should return a 404 for a route that does not exist', () => {
    return chai.request(server)
    .get('/notgonnawork')
    .then(() => { 
    })
    .catch(error => {
      error.should.have.status(404);
    });
  });
});


