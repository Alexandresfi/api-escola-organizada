import { Router } from 'express'
import SessionController from './app/controllers/SessionController'
import TeacherController from './app/controllers/TeacherController'
import SessionTeacherController from './app/controllers/SessionTeacherController'
import UserController from './app/controllers/UserController'
import AddressController from './app/controllers/AddressController'
import StudentController from './app/controllers/StudentController'

import authMiddleware from './app/middlewares/auth'

const routes = new Router()

routes.post('/session', SessionController.store)

routes.post('/session-teacher', SessionTeacherController.store)

routes.post('/user', UserController.store)

routes.post('/teacher', TeacherController.store)

routes.post('/student', StudentController.store)

routes.post('/address', AddressController.store)

routes.use(authMiddleware)

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World' })
})

export default routes
