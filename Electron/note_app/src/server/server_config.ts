import express,{ Request,Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import sqliteApi from './sqlite_route_api'
import x from 'electron-font-manager'
console.log(x)

const server = express()

server.use(bodyParser.json())
server.use(cors())

server.use('/db_api', sqliteApi)

server.use("/get_font_setting", (req: Request, res: Response) => {

})

// server.use("/",proxy('http://localhost:9002'))
server.listen(process.env.PORT || 9003)