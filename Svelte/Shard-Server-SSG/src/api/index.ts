import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { apisEntry, baseApisEntry } from './apis'
const apis = express()

// const httpsServer = createServer({
//     key: fs.readFileSync('ssl_web/key.pem'),
//     cert: fs.readFileSync('ssl_web/cert.pem')
// },server)

apis.use(cors())
apis.use(bodyParser.json())
apis.use(bodyParser.urlencoded({ extended: true })) // set this one to make multer diskStorage destination method's req can get req.body property

apis.use('/',baseApisEntry)
apis.use('/api',apisEntry)

export default apis