const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const server = express()
// const apisI = require("./server_api/db_api")
// require('./db_setting')

server.use(morgan("combined"))
server.use(bodyParser.json())
server.use(cors())

// server.use("/test_api",apisI)
// server.use("/item",apisI)

server.listen(process.env.PORT || 9870)