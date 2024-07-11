const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { apisEntry, baseApisEntry } = require('./apis')
const server = express()

// const httpsServer = createServer({
//     key: fs.readFileSync('ssl_web/key.pem'),
//     cert: fs.readFileSync('ssl_web/cert.pem')
// },server)

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true })) // set this one to make multer diskStorage destination method's req can get req.body property

server.use('/',baseApisEntry)
server.use('/api',apisEntry)

server.listen(process.env.PORT || 9999)