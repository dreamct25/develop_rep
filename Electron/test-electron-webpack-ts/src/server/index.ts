import express,{ Router,Request,Response } from 'express'
import bodyParser from 'body-parser'

const server = express()

server.use(bodyParser.json())

const apiRoute = Router()

apiRoute.get('/some',(req:Request,res:Response) => {
    res.json({ message: 'hello express' })
})

server.use('/api',apiRoute)

server.listen(9995)