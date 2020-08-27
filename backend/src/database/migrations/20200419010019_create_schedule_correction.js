
exports.up = function(knex) {
  return knex.schema.createTable('schedule_correction', function(table){
    table.increments('correction_id').primary()

    table.integer('request_user_id').notNull().unsigned()//toda correção é obrigada a ter um solicitante
   
    table.integer('correction_user_id').unsigned()//toda correção é obrigada a ter um atendente
   
    table.integer('obs_id').notNull().unsigned()//toda correção é obrigada a ter uma observação
   // table.foreign('obs_id').references('obs_id').inTable('obs')
    
    table.date('date').notNull()
    table.integer('hour_type').notNull()
    table.time('hour_required').notNull()
    table.time('hour_current').notNull()
    
    table.integer('correction_status').default(0).notNull()
    table.timestamp('correction_created')//.default().current_timestamp().notNull()
    table.dateTime('correction_update')
    

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('schedule_correction')
};
