const userController = require('./controllers/userController');
const scheduleController = require('./controllers/scheduleController');
const testFunctions = require('./controllers/testFunctions');

const express = require('express');

routes = express()

routes.use(express.json())

routes.post('/teste', testFunctions.test)

routes.get('/user/list', userController.index)
routes.post('/user/create', userController.create)
routes.delete('/user/delete/:id', userController.delete)
routes.put('/user/update/:id', userController.update)
routes.post('/user/login', userController.login)

routes.post('/schedule/register', scheduleController.create)

module.exports = routes


