const connection = require('../database/connection')
const Moment = require('moment')

module.exports = async function calculateDay(user, date){
  const total_day = await connection('schedule')
  .select('*')
  .where('data', date)
  .where('user_id', user)
  
  if (total_day && hour1) {
    
  }

}