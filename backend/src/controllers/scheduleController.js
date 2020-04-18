const connection = require('../database/connection');
const checkSchedule = require('../utilities/checksSchedule')
const Moment = require('moment')

module.exports = {
  async create(request, response){
    const dados = request.body; 
    const date = Moment(Moment.now()).format('YYYY-MM-DD')
    const hour = Moment(Moment.now()).format('HH:mm:ss')
    console.log(hour)
    
    
    if (dados.schedule == 1) {

      const check1 = await checkSchedule(dados.schedule, date , dados.user_id)
      
      if (check1 == true) {

        try {
           await connection('schedule').insert({
            user_id: dados.user_id,
            date: date, 
            hour1: hour
          })
          return response.json({sucess: 'Sua entrada foi registrada com sucesso.'})
        } catch (err) {
          return response
          .status(500)
          .json({error: 'Houve um problema ao registrar seu horario, se o erro permanecer favor  informar a t.i'})
        }
      }
      if (check1 == false) {
        return response.json({waring: 'Esse Horario já foi registrado, caso esteja incorreto favor solicitar uma correção'})
      }
    }

    if (dados.schedule == 2) {

      const check2 = await checkSchedule(dados.schedule, date , dados.user_id)
      
      if (check2 == 0) { 

        try {
           await connection('schedule').update({hour2: hour}).where({
             user_id: dados.user_id,
             date: date
           })
          return response.json({sucess: 'Sua saida p/ almoço foi registrada com sucesso.'})
        } catch (err) {
          console.log('Ao tentar registrar o horario 2 retornou o seguinte erro   ', err)
          console.log('data enviada: ', dados.date )
          return response
          .status(500)
          .json({error: 'Houve um problema ao registrar seu horario, se o erro permanecer favor  informar a t.i'})
        }
      }
      if (check2 == 1){
        return response.json({waring: 'Esse Horario já foi registrado, caso esteja incorreto favor solicitar uma correção'})
      }
      if (check2 == 2){
        return response.json({waring: 'Volta do almoço ja foi registrada'})
      } 
      if (check2 == 3){
        return response.json({waring: 'Saida ja foi registrada.'})
      }
      if (check2 == 4){
        return response.json({waring: 'Registre sua entrada primeiro.'})
      }
    
    }    

    if (dados.schedule == 3) {

      const check3 = await checkSchedule(dados.schedule, date , dados.user_id)
      
      if (check3 == 0) { 

        try {
           await connection('schedule').update({hour3: hour}).where({
             user_id: dados.user_id,
             date: date
           })
          return response.json({sucess: 'Sua volta do almoço foi registrada com sucesso.'})
        } catch (err) {
          console.log('Ao tentar registrar o horario 3 retornou o seguinte erro   ', err)
          console.log('data enviada: ', dados.date )
          return response
          .status(500)
          .json({error: 'Houve um problema ao registrar seu horario, se o erro permanecer favor  informar a t.i'})
        }
      }
      
      if (check3 == 1){
        return response.json({waring: 'Esse Horario já foi registrado, caso esteja incorreto favor solicitar uma correção'})
      }
      if (check3 == 2){
        return response.json({waring: 'Sua saida para o almoço ainda não foi registrada.'})
      } 
      if (check3 == 3){
        return response.json({waring: 'Sua saida ja foi registrada.'})
      }
      if (check3 == 4){
        return response.json({waring: 'Registre sua entrada primeiro.'})
      }
    }

    if (dados.schedule == 4) {

      const check4 = await checkSchedule(4, date, dados.user_id, dados.confirm)

      if (check4 == 0){
        try {
          await connection('schedule').update({hour4: hour}).where({user_id: dados.user_id, date: date})

          return response.json({sucess: 'Sua saida foi registrada com sucesso.'})
        } catch (err) {
          console.log('Ao tentar registrar o horario 3 retornou o seguinte erro   ', err)
          console.log('data enviada: ', dados.date )

          return response
          .status(500)
          .json({error: 'Houve um problema ao registrar seu horario, se o erro permanecer favor  informar a t.i'})
        }
      }

      if(check4 == 1){
        return response.json({waring: 'Registre sua entrada primeiro.'})
      }

      if(check4 == 2){
        return response.json({waring: 'Marque a saida do almoço primeiro.'})
      }

      if(check4 == 3){
        return response.json({waring: 'Sua saida ja foi registrada.'})
      }

      if(check4 == 4){
        return response.json({waring: 'Confirme que você deseja registrar saida sem almoço'})
      }

    }
  },    
 
  async search(request, response){

  },

  async update(request, response){

  },
}