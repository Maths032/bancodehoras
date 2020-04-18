const connection = require('../database/connection')
const crypto = require('crypto')



module.exports = { 

  async create(request, response){
    const { user_login, user_name, password, password_confirmation, perm } = request.body
    try {

      if (password !== password_confirmation) {//confirma a senha
        return response.status(400).json({error: 'senhas não conferem'}).send()
      }

      //consulta se o login ja existe
      const consulta = await connection('users').select('user_login').where({user_login}).first();

    if(!consulta){ //se o login nao existir

        const password_md5 =  crypto.createHash('md5').update(`'${password}'`).digest('hex')
        const perm_md5 =  crypto.createHash('md5').update(`'${perm}'`).digest('hex')
        
        await connection('users').insert({
          user_login,
          user_name,
          password: password_md5,
          perm: perm_md5
        });
        return response.json({message: `O login ${user_login} foi cadastrado com sucesso.`})
    }

    if(consulta){
       return response.status(400).json({error: 'Login ja existe'}).send()
    }
      
    } catch (err) {
      return response.status(400).json({error: `${err}Não foi possivel cadastrar o usuario, tente novamente mais tarde.`})
    }
  },


  async index(request, response){//lista todos os usuarios
    const users = await connection('users').select('*')
    return response.json(users)
  },


  async delete(request, response){//deleta com base no id enviado no query parm
    const {id } = request.params
    try {
      await connection('users').delete().where('user_id', id)
      return response.status(200).json(`O usuario com ID: ${id} foi deletado com sucesso.`)
    } catch (error) {
      return response.json(error)
    }
  },

  async update(request, response){//altera os dados que forem enviados no corpo da requisição
    const { id } = request.params
    const { user_login, user_name, password, password_confirmation, perm } = request.body

    if (password) {//verifica se deve realizar o update de senha
      if (password === password_confirmation) {//confirma a senha

        try {
          const password_md5 =  crypto.createHash('md5').update(`'${password}'`).digest('hex');
          await connection('users').update('password', password_md5).where('user_id', id)

        } catch (err) {
          return response.status(500).json(`Houve um erro ao tentar alterar a senha, tente novamente mais tarde ${err}`)
        }

      }
      else{
        return response.status(400).json({error: 'As senhas informadas não correspondem.'})
      }
    }

    if (user_login) {//verifica se deve fazer o update do login
      try {
        const consulta_login = await connection('users').select().where('user_login', user_login).first()
        
        if (!consulta_login) {
          await connection('users').update('user_login', user_login).where('user_id', id)  
        }
        else{
          return response.status(400).json({ error: 'Esse login ja existe, por favor escolha outro'})
        }
        
      } catch (err) {
        return response.status(500).json('Houve um erro ao tentar alterar o login, tente novamente mais tarde')
      }
    }

    if (user_name){//verifica se deve fazer o update do nome
      try {
        await connection('users').update('user_name', user_name).where('user_id', id)
      } catch (err) {
        return response.status(500).json('Houve um erro ao tentar alterar o nome, tente novamente mais tarde')
      }
    }

    if(perm){
      try {
        const perm_md5 =  crypto.createHash('md5').update(`'${perm}'`).digest('hex')
        await connection('users').update('perm', perm_md5).where('user_id', id)
      } catch (err) {
        return response.status(500).json('Houve um erro ao tentar alterar a permissão, tente novamente mais tarde')
      }
    }
    return response.json({ sucess: 'Todos os dados enviados foram atualizados com sucesso'})

  },
  async login(request, response){
    const { user_login, password } = request.body

    const password_md5 = crypto.createHash('md5').update(`'${password}'`).digest('hex')
console.log(password_md5)
    const login = await connection('users')
    .select('user_name', 'perm', 'user_id')
    .where({ 
     'user_login': user_login, 
     'password': password_md5
    }).first()

    if(login){
      return response.status(200).json( {login, status: 'logado'})
    }
    if(!login){
      return response.status(401) .json({status: 'Login e/ou senha incorretos'})
    }

  }

};

