import { Router } from 'express'
import UserController from './app/controllers/UserController'

const routes = new Router()

routes.post('/users', UserController.store)

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World' })
})

export default routes
