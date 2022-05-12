import express,{ Request,Response } from 'express'
import { createServer } from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import { Server } from 'socket.io'
import dbApi from './server_api/db_api'
import channelApi from './server_api/channel_api'
import socketRoute from './soket_setting'
import os from 'os'

const app = express()
const server = createServer(app)
const socketIO = new Server(server)

app.use(morgan("combined"))
app.use(bodyParser.json())
app.use(cors())
app.set('socket',socketIO)

app.use('/get_remote_ip',(req,res) => {
    const ipconfig = os.networkInterfaces()
    let addressIp = ''
    for (const devName in ipconfig) {
        let netList = ipconfig[devName];
        for (var i = 0; i < netList.length; i++) {
            let { address, family, internal } = netList[i]
            if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
                addressIp = address;
                break;
            }
        }
    }
    res.json({
        currentIp:addressIp
    })
})

app.use('/radio_remote',express.static(`${__dirname.replace('main','renderer')}/radio_remote`))

app.use('/socket',socketRoute)
app.use("/db", dbApi)
app.use("/channel", channelApi)

server.listen(9870)