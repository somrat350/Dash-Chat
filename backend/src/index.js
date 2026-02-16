import express from 'express'
import 'dotenv/config'
import testRouter from './routes/test.routes.js'
const app = express()
const port = process.env.PORT


app.get('/', (req, res) => {
    res.send({
        status: 200,
        message: 'server running',

    })
})

app.use('/api/test', testRouter)
app.listen(port, () => {
        console.log('server running on port:', port);
        
    })