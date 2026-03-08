import express from 'express'
import { isAuthenticated } from '../middleware/auth.middleware'
import { sendRequest } from '../controllers/friends.controllers'

const friendsRouter = express.Router()

friendsRouter.use(isAuthenticated)

friendsRouter.post('/send-req', sendRequest)

export default friendsRouter