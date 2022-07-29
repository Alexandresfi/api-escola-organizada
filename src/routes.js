import { Router } from 'express'
import SessionController from './app/controllers/SessionController'
import TeacherController from './app/controllers/TeacherController'
import SessionTeacherController from './app/controllers/SessionTeacherController'
import UserController from './app/controllers/UserController'
import AddressController from './app/controllers/AddressController'
import StudentController from './app/controllers/StudentController'

import authMiddleware from './app/middlewares/auth'
import UserAdminController from './app/controllers/UserAdminController'
import SessionAdminController from './app/controllers/SessionAdminController'

const routes = new Router()

routes.post('/session', SessionController.store)

routes.post('/session-admin', SessionAdminController.store)

routes.post('/session-teacher', SessionTeacherController.store)

routes.use(authMiddleware)

routes.post('/user', UserController.store)
routes.get('/users', UserController.index)
routes.put('/user/:id', UserController.update)
routes.delete('/user/:id', UserController.delete)

routes.post('/user-admin', UserAdminController.store)
routes.get('/users-admin', UserAdminController.index)
routes.put('/user-admin/:id', UserAdminController.update)
routes.delete('/user-admin/:id', UserAdminController.delete)

routes.post('/teacher', TeacherController.store)
routes.get('/teachers', TeacherController.index)
routes.put('/teacher/:id', TeacherController.update)
routes.delete('/teacher/:id', TeacherController.delete)

routes.post('/student', StudentController.store)
routes.get('/students', StudentController.index)
routes.put('/student/:id', StudentController.update)
routes.delete('/student/:id', StudentController.delete)

routes.post('/address', AddressController.store)
routes.get('/address', AddressController.index)
routes.put('/address/:id', AddressController.update)
routes.delete('/address/:id', AddressController.delete)

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World' })
})

export default routes
