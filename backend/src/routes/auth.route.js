import express from 'express'
import { Register } from '../controllers/register.js'
import { login } from '../controllers/login.js'

const authRouter = express.Router()

authRouter.post('/register', Register)

authRouter.get('/login', login )

export default authRouter