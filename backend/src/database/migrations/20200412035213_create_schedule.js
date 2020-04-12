
exports.up = function(knex) {
  return knex.schema.createTable('schedule', function(table){
    table.increments('schedule_id').primary()
    
    table.integer('user_id', 10).notNull().unsigned()
    table.foreign('user_id').references('user_id').inTable('users')

    table.integer('obs_id', 10).notNull()

    table.date('date').notNull()
    table.time('hour1').notNull()
    table.time('hour2').notNull()
    table.time('hour3').notNull()
    table.time('hour4').notNull()
  })  
};
exports.down = function(knex) {
  return knex.schema.dropTable('schedule')
};
