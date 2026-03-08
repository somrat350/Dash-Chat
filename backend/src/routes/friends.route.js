import express from 'express'
import { isAuthenticated } from '../middleware/auth.middleware'
import { acceptedFriendRequest, sendRequest, updateRequest } from '../controllers/friends.controllers'

const friendsRouter = express.Router()

friendsRouter.use(isAuthenticated)

friendsRouter.post('/send-req', sendRequest)

friendsRouter.patch('/update-req', updateRequest)

friendsRouter.get('/accepted-friends/:id', acceptedFriendRequest)

export default friendsRouter