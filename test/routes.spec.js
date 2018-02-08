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
    .get('/thisisnottherouteyourlookingfor')
    .then(() => { 
    })
    .catch(error => {
      error.should.have.status(404);
    });
  });
});

describe('API Routes', () => {
  before((done) => {
    knex.seed.run()
      .then(() => {
        done();
      })
  })

  describe('GET /api/v1/candidates', () => {
    it('should return all of the projects', () => {
      return chai.request(server)
      .get('/api/v1/candidates')
      .then(response => {
        response.should.have.status(200)
        response.should.be.json;
        response.body.candidates[0].should.have.property('id')
        response.body.candidates[0].should.have.property('last_name')
        response.body.candidates[0].should.have.property('full_name')
        response.body.candidates[0].should.have.property('candidate_id')
        response.body.candidates[0].should.have.property('committee_name')
        response.body.candidates[0].should.have.property('party')
        response.body.candidates[0].should.have.property('active')
        response.body.candidates[0].should.have.property('website')
        response.body.candidates[0].should.have.property('image')

        const foundCandidate= response.body.candidates.find( candidate => candidate.last_name === 'Ginsburg');

        foundCandidate.last_name.should.equal('Ginsburg')
        foundCandidate.full_name.should.equal('Noel Ginsburg')
        foundCandidate.candidate_id.should.equal('20165031885')
        foundCandidate.committee_name.should.equal('Noel For Colorado')
        foundCandidate.party.should.equal('Democrat')
        foundCandidate.active.should.equal(true)
        foundCandidate.website.should.equal('https://www.noelforcolorado.com/')
        foundCandidate.image.should.equal('http://msantray.fatcow.com/governor_photos/noel_ginsburg.jpeg')

      })
      .catch(error => {
        throw error
      })
    })
  })
  describe('GET /api/v1/candidates/:committeeId/contributors', () => {
    it('should return all of the contributors to a specific candidate', () => {
      return chai.request(server)
      .get('/api/v1/candidates/20165031883/contributors')
      .then(response => {
        response.should.have.status(200)
        response.body.contributors.should.be.a('array');
        response.body.contributors.length.should.equal(3)

      })
      .catch(error => {
        throw error
      })
    })
    it('should return an error if the candidate does not exist', () => {
      return chai.request(server)
      .get('/api/v1/candidates/20165031888/contributors')
      .then(response => {

      })
      .catch(error => {
        error.should.have.status(404)
      })
    })
  })
  describe('POST /api/v1/candidates', () => {
    it('should create a new candidate', () => {
      return chai.request(server)
      .post('/api/v1/candidates')
      .send({
          committee_id: '20165031889',
          candidate_id: '20165031881',
          last_name: "Turing",
          full_name: "Alan Turing",
          committee_name: "DECODE!",
          party: "Allies",
          active: "FALSE",
          website: "https://www.noelforcolorado.com/",
          image: "https://media1.britannica.com/eb-media/81/191581-004-95328E05.jpg"
      })
      .then(response => {
        response.should.have.status(201);
        response.body.should.be.a('object')
        response.body.should.have.property('id');
      })
      .catch(error => {
        throw error
      })
    })
    it('should not create a new candidate if the user forgot to include a parameter', () => {
      return chai.request(server)
      .post('/api/v1/candidates')
      .send({
        committee_id: '20165031889',
        candidate_id: '20165031881',
        last_name: "Turing",
        committee_name: "DECODE!",
        party: "Allies",
        active: "FALSE",
        website: "https://www.noelforcolorado.com/",
        image: "https://media1.britannica.com/eb-media/81/191581-004-95328E05.jpg"
    })
      .then(response => {
      })
      .catch(error => {
        error.should.have.status(422)
        error.response.body.error.should.equal('You are missing the required parameter full_name')
      })
    })


    describe('PATCH /api/v1/candidate/:committee', () => {
      it('should be able to patch a specific candidate', () => {
        return chai.request(server)
        .patch('/api/v1/candidate/20165031883')
        .send({
          party: "Rager"
        })
        .then(response => {
          response.should.have.status(202);
        })
        .catch(error => {
          throw error
        })
      })
      it('should return an error if the candidate does not exist', () => {
        return chai.request(server)
        .patch('/api/v1/candidate/20165031000')
        .send({
          party: "Love it"
        })
        .then(response => {
        })
        .catch(error => {
          error.should.have.status(404)
        })
      })
    })

    describe('DELETE /api/v1/candidates/:candidateId', () => {
      it('should be able to delete a candidate', () => {
        return chai.request(server)
        .delete('/api/v1/candidates/20165031883')
        .then(response => {
          response.should.have.status(202)
        })
        .catch(error => {
          throw error
        })
      })
    })
  })


})


