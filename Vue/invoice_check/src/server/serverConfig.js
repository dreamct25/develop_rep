const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const app = express()
const pythonRoute = require('./pythonRoute')

app.use(cors())
app.use(bodyParser.json())
app.use("/call",pythonRoute)

app.listen(process.env.PORT || 8088)