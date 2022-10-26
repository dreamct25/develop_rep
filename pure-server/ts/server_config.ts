import express,{ Request,Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import api from './api'

const server = express()

server.use(bodyParser.json())

// can setting like Allow Origin CORS
server.use(cors())

// with api
server.use('/test',api)

// only set
server.use('/',(req:Request,res:Response) => res.send('Hello World !'))

server.listen(9999)