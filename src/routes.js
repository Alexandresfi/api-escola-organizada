import { Router } from 'express'
import SessionController from './app/controllers/SessionController'
import UserController from './app/controllers/UserController'

const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/login', SessionController.store)

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World' })
})

export default routes
