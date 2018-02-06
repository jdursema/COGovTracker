
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('candidates', function (table) {
      table.increments('id').primary();
      table.string('last_name');
      table.string('first_name');
      table.integer('candidate_id');
      table.integer('committee_id');
      table.string('comittee_name');
      table.string('party');
      table.boolean('active');
      table.string('website');
      table.string('image');
    }),
    knex.schema.createTable('contributors', function (table) {
      table.increments('id').primary();
      table.integer('committee_id').unsigned();
      table.foreign('committee_id').references('candidates.committee_id');
      table.string('committee_name');
      table.integer('contribution_amount');
      table.date('contribution_date');
      table.string('donor_last');
      table.string('donor_first');
      table.string('donor_address');
      table.string('donor_city');
      table.string('donor_state');
      table.string('donor_zip');
      table.string('record_id');
      table.string('contribution_type');
      table.string('donor_type');
      table.string('committee_type');
      table.string('candidate_name');
      table.string('donor_employer');
      table.string('donor_occupation');
      table.string('jurisdiction');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('candidates'),
    knex.schema.dropTable('contributors')


  ])
};
