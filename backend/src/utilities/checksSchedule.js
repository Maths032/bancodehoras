const connection = require('../database/connection');
const Moment = require('moment')



module.exports = async function checkSchedule(schedule, date, user, confirm){

  if (schedule == 1) {
    const search = await connection('schedule').select('*').where('user_id', user).where('date', date).first()

    if(search){
      console.log('check de hora 1 retornou false(horario ja registrado)')
      return false
    }
    if(!search){
      console.log('check de hora 1 retornou true(horario liberado para realizar o registro)')
      return true
    }
  }



  if (schedule == 2) {
    const search = await connection('schedule').select('*').where('user_id', user).where('date', date).first()

    // console.log('retorno do check pelo horario2, horario1:', search.hour1, 'horario2:', search.hour2, 'horario3:', search.hour3,
    // 'horario4:', search.hour4 )
    //será retornado 0 quando a hora1 estiver marcada e a hora2 estiver desmarcada.
    //será retornado 1 quando a hora2 ja estiver marcada
    //será retornado 2 quando a hora3 ja estiver marcada
    //será retornado 3 quando a hora4 ja estiver marcada
    //será retornado 4 quando a hora 1 ainda nao estiver marcada.


    if(!search){
      console.log('check de hora 2 retornou 4(entrada ainda não registrada)')
      return 4
    }
    if(!search.hour2 && search.hour1 && !search.hour4){
      console.log('check da hora 2 retornou 0(liberado)')
      return 0
    }

    if(search.hour2){
      console.log('check da hora 2 retornou 1(ja registrado)')
      return 1
    }

    if(search.hour3){
      console.log('check de hora 2 retornou 2(volta do almoço ja registrada)')
      return 2
    }

    if(search.hour4){
      console.log('check de hora 2 retornou 3(saida ja registrada)')
      return 3
    }

  }



  if (schedule == 3) {
    const search = await connection('schedule').select('*').where('user_id', user).where('date', date).first()

    // console.log('retorno do check pelo horario2, horario1:', search.hour1, 'horario2:', search.hour2, 'horario3:', search.hour3,
    // 'horario4:', search.hour4 )
    //será retornado 0 quando a hora2 e 1 estiverem marcadas e a hora 4, 3 nao.
    //será retornado 1 quando a hora2 ja estiver marcada
    //será retornado 2 quando a hora3 ja estiver marcada
    //será retornado 3 quando a hora4 ja estiver marcada
    //será retornado 4 quando a hora 1 ainda nao estiver marcada.
    

    if(!search){
      console.log('check de hora 3 retornou 4(entrada ainda não registrada)')
      return 4
    }
    if(!search.hour3 && !search.hour4 && search.hour1 && search.hour2){
      console.log('check da hora 3 retornou 0(liberado)')
      return 0
    }

    if(search.hour3){
      console.log('check da hora 3 retornou 1(ja registrado)')
      return 1
    }

    if(!search.hour2){
      console.log('check de hora 3 retornou 2(Saida para o almoço não registrada.)')
      return 2
    }

    if(search.hour4){
      console.log('check de hora 3 retornou 3(saida ja registrada)')
      return 3
    }

  }



  if (schedule == 4){
    
    const search = await connection('schedule').select('*').where('user_id', user).where('date', date).first()
    
    //se o check retornar 1 o registro de entrada  nao foi realizado
    //se o check retornar 2 o usuario não registrou almoço
    //se o check retornar 3 o usuario ja registrou a saida
    //se o check retornar 4 esta pedindo confirmação para marcar saida sem almoço
    //se o check retornar 0 foi liberado para registrar hora com ou sem almoço


    if (!search){
      console.log('check do horario 4 retornou status 1(registro de entrada não foi realizado)')
      return 1
    }

    if (search.hour2 && !search.hour3){
      console.log('check do horario 4 retornou status 2(não registrou saida do almoço)')
      return 2
    }

    if (search.hour4){
      console.log('check do horario 4 retornou status 3(registro de saida ja realizado)')
      return 3
    }

    if (search.hour1 && !search.hour2 && !search.hour3 && !search.hour4){
      if (!confirm) {
        console.log('check do horario 4 retornou status 4(pedindo confirmação para registrar saida sem almoço)')
        return 4
      }

      if (confirm) {
        console.log('check do horario 4 retornou status 0(Liberando o registro de horario, porém sem almoço)')
        return 0
      }
    }

    if (search.hour1 && search.hour2 && search.hour3 && !search.hour4) {
      console.log('check do horario 4 retornou status 0(liberou o registro de horario normal)')      
      return 0
    }
  }
}