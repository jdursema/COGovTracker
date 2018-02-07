const contributionsData = require('../../../data/contributionsSeed.js');
const candidatesData = require('../../../data/candidateLookup');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contributors').del()
  .then(() => knex('candidates').del())
    .then(() => {
      // Inserts seed entries
      let candidatePromises = []
      candidatesData.forEach((candidate) => {
        candidatePromises.push(createCandidate(knex, candidate))
      })
      return Promise.all(candidatePromises)
    });
};



const createCandidate = (knex, candidate) => {
  return knex('candidates').insert(candidate)
}

const createContributor = (knex, contributor) => {
  return knex('contributors').insert(contributor)
}
