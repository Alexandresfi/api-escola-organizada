import { Router } from 'express'
import SessionController from './app/controllers/SessionController'
import TeacherController from './app/controllers/TeacherController'
import SessionTeacherController from './app/controllers/SessionTeacherController'
import UserController from './app/controllers/UserController'

const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/teachers', TeacherController.store)

routes.post('/session', SessionController.store)

routes.post('/session-teacher', SessionTeacherController.store)

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World' })
})

export default routes
