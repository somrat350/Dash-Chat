import express from 'express'
import { test } from '../controllers/testController.js'
const testRouter = express.Router()

testRouter.get('/', test)

export default testRouter