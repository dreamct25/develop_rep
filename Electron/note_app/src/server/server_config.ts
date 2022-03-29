const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const sqliteApi = require("./sqlite_route_api")
const server = express()

server.use(bodyParser.json())
server.use(cors())

server.use('/item_api',sqliteApi)

// server.use("/",proxy('http://localhost:9002'))
server.listen(process.env.PORT || 9003)