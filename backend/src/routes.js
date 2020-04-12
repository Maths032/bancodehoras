const userController = require('./controllers/userController')
const express = require('express');

routes = express()

routes.use(express.json())



routes.get('/user/list', userController.index)
routes.post('/user/create', userController.create)
routes.delete('/user/delete/:id', userController.delete)
routes.put('/user/update/:id', userController.update)
routes.post('/user/login', userController.login)


module.exports = routes


