const Moment = require('moment')

module.exports = async function calculateDays(mes, ano) {
  
  try {
      
    const dtInicio = `${ano}-${mes}-01`//passar o primeiro dia do mes seguinte

    const dtFormatada = Moment(dtInicio).format('DD/MM/YYYY')
    const subtrair = Moment(dtInicio).subtract(1, "days")//tira 1 dia pra obter o total de dias do mes anterior

    var totalDias = 0
    var totalDias = Moment(subtrair).format('DD')
    var data = Moment(subtrair).format('YYYY-MM-DD')
    var data = Moment(subtrair).subtract(totalDias, "days")//coloca a data para o primeiro dia do mes

    console.log(totalDias)

    var var1 = 0
    var fimSemana = 0
    var qtdDomingo = 0
    var qtdSabado = 0
    var qtdFeriado = 0
    while (var1 < totalDias) {//vai calcular todas as variáveis acima 
        
        
        var data = Moment(data).add(1, "days")

        var diaSemana = Moment(data).days()
        console.log('dia da semana', diaSemana)

        var dataFinal = Moment(data).format('DD/MM/YYYY')

        if (diaSemana == 6 || diaSemana == 0) {

        fimSemana += 1
          if (diaSemana == 0) {
            qtdDomingo += 1
          }


          if (diaSemana == 6) {
            qtdSabado += 1
          }
        }

        if (
          dataFinal == '02/02/2020' || //cadastre feriados aqui 
          dataFinal == '01/02/2020' 
          ) {
          qtdFeriado += 1
        }

        console.log('--------------------------')
        console.log('Log ao vivo')
        console.log('Sábados', qtdSabado)
        console.log('Domingos', qtdDomingo)
        console.log('Dia Final de Semana', fimSemana)
        console.log('data', dataFinal)
        console.log('Quantidade de feriados', qtdFeriado)
        //imprime todas as datas dentro da quantidade de dias que foi informado pela variável totalDias

        var1 += 1
        console.log('sequencia do while', var1)
        console.log('--------------------------')
    }

    const diasUteis = (totalDias - fimSemana - qtdFeriado)
    console.log(diasUteis)


      return response.json({
        MesRef: Moment(data).format('MM/YYYY'),
        QtdSábados: qtdSabado, 
        qtdDomingo: qtdDomingo, 
        Finais_semana: fimSemana, 
        Feriados: qtdFeriado,
        DiaUtil: diasUteis
      })
      
    } catch (error) {
      return response.json(`nao rodou erro      ${error}`)
    }

}