
exports.up = function(knex) {
  return knex.schema.createTable('schedule_correction', function(table){
    table.increments('correction_id').primary()

    table.integer('schedule_id').notNull().unsigned()//toda correção é obrigada a ter um horário
   // table.foreign('schedule_id').references('schedule_id').inTable('schedule')

    table.integer('obs_id').notNull().unsigned()//toda correção é obrigada a ter uma observação
   // table.foreign('obs_id').references('obs_id').inTable('obs')

    table.time('hour1_correction')
    table.time('hour1_current')
    table.integer('hour1_status').default(0)
    table.string('hour1_attendant_nm')    

    table.time('hour2_correction')
    table.time('hour2_current')
    table.integer('hour2_status').default(0)
    table.string('hour2_attendant_nm')

    table.time('hour3_correction')
    table.time('hour3_current')
    table.integer('hour3_status').default(0)
    table.string('hour3_attendant_nm')

    table.time('hour4_correction')
    table.time('hour4_current')
    table.integer('hour4_status').default(0)
    table.string('hour4_attendant_nm')

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('schedule_correction')
};
