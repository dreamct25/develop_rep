const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { apisEntry, baseApisEntry } = require('./apis')
const server = express()

//#region if using ssl
// const { createServer } = require('https')
// const fs = require('fs')
// const path = require('path')

// const httpsServer = createServer({
//     key: fs.readFileSync(path.join(__dirname.replace('server', ''), 'ssl_web/server.key')),
//     cert: fs.readFileSync(path.join(__dirname.replace('server', ''), 'ssl_web/server.pem'))
// },server)
//#endregion

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true })) // set this one to make multer diskStorage destination method's req can get req.body property

server.use('/',baseApisEntry)
server.use('/api',apisEntry)

//#region if using ssl
// httpsServer.listen(process.env?.PORT.trim() || 9999)
//#endregion

server.listen(process.env.PORT || 9999)