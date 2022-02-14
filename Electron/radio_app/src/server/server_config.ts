const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const server = express()
const dbApi = require("./server_api/db_api")
const channelApi = require("./server_api/channel_api")

server.use(morgan("combined"))
server.use(bodyParser.json())
server.use(cors())

server.use("/db", dbApi)
server.use("/channel", channelApi)

server.listen(process.env.PORT || 9870)