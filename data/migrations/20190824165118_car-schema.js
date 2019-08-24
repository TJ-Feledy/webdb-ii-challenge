
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments()
    tbl.integer('VIN').unique().notNullable()
    tbl.string('make').notNullable()
    tbl.string('model').notNullable()
    tbl.float('mileage').notNullable()
    tbl.string('transmission')
    tbl.string('titleStatus')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
