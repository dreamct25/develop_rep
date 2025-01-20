import express from 'express'
import { createServer } from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import { Server } from 'socket.io'
import path from 'path'
import { socketChannelEvents } from './soketEvents'
import test_api from './serverApi/test_api'
import '../utilities/readIniFile'

const app = express()
const server = createServer(app)
const socketIO = new Server(server, { path: '/remote/v1' })
const remotePagePath = express.static(path.join(__dirname.replace('main','renderer'),'/music_stream_remote'))
const playerStaticPath = express.static(path.join(__dirname.replace('main','renderer'),'/reactPlayerYouTube'))
const playerFileStaticPath = express.static(path.join(__dirname.replace('main','renderer'),'/reactPlayerFilePlayer'))
const mainWindowStaticPath = express.static(path.join(__dirname.replace('main','renderer'),'/main_window'))
const assetDirStaticPath = express.static(path.join(__dirname.replace('main','renderer'),'/asset'))

socketIO.on('connection',socketChannelEvents)

app.use(morgan("combined"))
app.use(bodyParser.json())
app.use(cors())

app.use('/music_stream_remote', remotePagePath)
app.use('/reactPlayerYouTube', playerStaticPath)
app.use('/reactPlayerFilePlayer', playerFileStaticPath)
app.use('/main_window', mainWindowStaticPath)
app.use('/asset', assetDirStaticPath)
// app.use("/channel", channelApi)

if(process.env.APP_ENV.trim() === 'dev'){
    app.use('/test/v1',test_api)
}

server.listen(10987)