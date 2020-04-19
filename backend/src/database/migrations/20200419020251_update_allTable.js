
exports.up = function(knex) {
  return knex.schema.alterTable('schedule', function(table1){//cria relacionamentos da tabela schedule

    table1.foreign('user_id').references('user_id').inTable('users')

    table1.foreign('obs_id').references('obs_id').inTable('obs')

    table1.foreign('correction_id').references('correction_id').inTable('schedule_correction')

  })
  .alterTable('obs', function(table2){//cria relacionamentos da tabela obs

    table2.foreign('schedule_id').references('schedule_id').inTable('schedule')

    table2.foreign('correction_id').references('correction_id').inTable('schedule_correction')

  })
  .alterTable('schedule_correction', function(table3) {//cria relacionamentos da tabela schedule_correction

    table3.foreign('schedule_id').references('schedule_id').inTable('schedule')

    table3.foreign('obs_id').references('obs_id').inTable('obs')

  })
};

exports.down = function(knex) {
  
};
