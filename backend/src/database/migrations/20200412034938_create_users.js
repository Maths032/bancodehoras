
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table){
    table.increments('user_id').primary().unsigned(false)
    table.string('user_login', 20).notNullable().unique()
    table.string('user_name', 40).notNullable()
    table.string('user_email')
    table.string('user_phone')
    table.string('password').notNullable()
    table.string('perm', 255).notNullable()
    table.time('user_hour1')
    table.time('user_hour2')
    table.time('user_hour3')
    table.time('user_hour4')
    table.string('user_sector')
  })    
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
