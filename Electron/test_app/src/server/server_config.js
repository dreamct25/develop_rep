const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const server = express()
const apisI = require("./server_route")
const apisII = require("./server_file_route")

server.use(bodyParser.json())
server.use(cors())

server.use("/python",apisI)
server.use("/fs",apisII)

server.listen(process.env.PORT || 9870)

module.exports = server