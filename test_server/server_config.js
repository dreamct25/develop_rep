const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const server = express()
const apisI = require("./server_api/item_api")
const apisII = require("./server_api/channel")

server.use(morgan("combined"))
server.use(bodyParser.json())
server.use(cors())

// server.use("/test_api",apisI)
server.use("/radio",apisII)

server.listen(process.env.PORT || 9870)