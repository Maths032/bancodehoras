
exports.up = function(knex) {
  return knex.schema.createTable('obs', function(table){
    table.increments('obs_id').primary()

    table.integer('schedule_id', 10).notNull().unsigned()
    //table.foreign('schedule_id').references('schedule_id').inTable('schedule')


    table.integer('correction_id', 10).notNull().unsigned()
    //table.foreign('correction_id').references('correction_id').inTable('schedule_correction')

    table.string('obs1', 255)
    table.string('obs2', 255) 
    table.string('obs3', 255)
    table.string('obs4', 255)
    
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('obs')
};
