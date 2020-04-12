
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table){
    table.increments('user_id').primary().unsigned(false)
    table.string('user_login', 20).notNullable().unique()
    table.string('user_name', 40).notNullable()
    table.string('password').notNullable()
    table.string('perm', 255).notNullable()
  })    
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
