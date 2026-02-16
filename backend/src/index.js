import express from 'express'
import 'dotenv/config'
import testRouter from './routes/test.routes.js'
import { connectDb } from './lib/connection.js'
import authRouter from './routes/auth.route.js'
import { errorHandler } from './middleware/errorHandler.js'
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//general route
app.get('/', (req, res) => {
    res.send({
        status: 200,
        message: 'server running',

    })
})

//server connecting function
const server = async () => {
    try {
        await connectDb()
        app.listen(port, () => {
          console.log("server running on port:", port);
        });
    } catch (error) {
        next
        console.log('Db conneting error', error);
        
    }
}

server()

//test route
app.use('/api/test', testRouter)

//auth route
app.use('/api/auth', authRouter)




// error handler
app.use(errorHandler)