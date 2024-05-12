import express from 'express'
import usersHandlers from '../../handlers/users'
import { tokenVerifyMiddleware } from '../../middlewares/tokenVerifyMiddleware'

const usersRoutes = express.Router()

usersRoutes.post('/create', usersHandlers.createUser)
usersRoutes.get('/', usersHandlers.getUsers)
usersRoutes.get('/:id', usersHandlers.getUserId)
usersRoutes.delete('/:id', tokenVerifyMiddleware, usersHandlers.deleteUser)
usersRoutes.put('/:id', tokenVerifyMiddleware, usersHandlers.updateUser)
usersRoutes.post('/authenticate', usersHandlers.authenticate)

export default usersRoutes
