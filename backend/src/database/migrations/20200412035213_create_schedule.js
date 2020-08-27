
exports.up = function(knex) {
  return knex.schema.createTable('schedule', function(table){
    table.increments('schedule_id').primary()
    
    table.integer('user_id', 10).notNull().unsigned()
    //table.foreign('user_id').references('user_id').inTable('users')
    

    table.integer('obs_id', 10).unsigned()
    //table.foreign('obs_id').references('obs_id').inTable('obs')


    table.integer('correction_id', 10).unsigned()
    //table.foreign('correction_id').references('correction_id').inTable('schedule_correction')

    table.date('date').notNull()
    table.time('hour1')
    table.time('hour2')
    table.time('hour3')
    table.time('hour4')

    table.time('total_hours')
  })  
};
exports.down = function(knex) {
  return knex.schema.dropTable('schedule')
};
