import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import sqliteApi from './sqlite_route_api'

const server = express()

server.use(bodyParser.json())
server.use(cors())

server.use('/db_api', sqliteApi)

// server.use("/",proxy('http://localhost:9002'))
server.listen(process.env.PORT || 9003)