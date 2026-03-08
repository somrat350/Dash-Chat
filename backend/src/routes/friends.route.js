import express from 'express'
import { isAuthenticated } from '../middleware/auth.middleware'
import { acceptRequest, sendRequest } from '../controllers/friends.controllers'

const friendsRouter = express.Router()

friendsRouter.use(isAuthenticated)

friendsRouter.post('/send-req', sendRequest)

friendsRouter.patch('/accept-req', acceptRequest)

export default friendsRouter