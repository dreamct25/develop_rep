const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const api = require('./api')

const server = express()

server.use(bodyParser.json())

// can setting like Allow Origin CORS
server.use(cors())

// with api
server.use('/test',api)

// only set
server.use('/',(req,res) => res.send('Hello World !'))

server.listen(9999)