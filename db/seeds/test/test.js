const contributionsTestData = require('../../../data/test_data/contributionsTestData');
const candidatesTestData = require('../../../data/test_data/candidateTestData');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contributors').del()
  .then(() => knex('candidates').del())
    .then(() => {
      // Inserts seed entries
      let candidatePromises = []
      let contributionPromises = []
      candidatesTestData.forEach((candidate) => {
        candidatePromises.push(createCandidate(knex, candidate))
      })
      contributionsTestData.forEach((contribution) => {
        contributionPromises.push(createContributor(knex, contribution))
      })
      return Promise.all([...candidatePromises, ...contributionPromises])
    });
  }



const createCandidate = (knex, candidate) => {
  return knex('candidates').insert(candidate)
}

const createContributor = (knex, contributor) => {
  return knex('contributors').insert(contributor)
}