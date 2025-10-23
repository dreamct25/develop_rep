import express,{ RequestHandler, Response } from 'express'
import { createServer } from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import { Server } from 'socket.io'
import path from 'path'
import { socketChannelEvents } from './soketEvents'
import test_api from './test_api'

const staticPathes:{
    remotePage: Record<'usingPath', string>
    player: Record<'usingPath', string>,
    playerFile: Record<'usingPath', string>,
    mainWindow: Record<'usingPath', string>,
    assetDir: Record<'usingPath', string>,
    outputRoutes(pathKey: Exclude<keyof typeof staticPathes, 'outputRoutes'>): RequestHandler<Response<any, Record<string, any>>>
} = {
    remotePage: { usingPath: '/music_stream_remote' },
    player: { usingPath: '/reactPlayerYouTube' },
    playerFile: { usingPath: '/reactPlayerFilePlayer' },
    mainWindow: { usingPath: '/main_window' },
    assetDir: { usingPath: '/asset' },
    outputRoutes(pathKey){
        return express.static(path.join(__dirname.replace('main','renderer'), this[pathKey].usingPath))
    }
}

const app = express()
const server = createServer(app)
const socketIO = new Server(server, { path: '/remote/v1' })

socketIO.on('connection',socketChannelEvents)

app.use(morgan("combined"))
app.use(bodyParser.json())
app.use(cors())

app.use(staticPathes.remotePage.usingPath, staticPathes.outputRoutes('remotePage'))
app.use(staticPathes.player.usingPath, staticPathes.outputRoutes('player'))
app.use(staticPathes.playerFile.usingPath, staticPathes.outputRoutes('playerFile'))
app.use(staticPathes.mainWindow.usingPath, staticPathes.outputRoutes('mainWindow'))
app.use(staticPathes.assetDir.usingPath, staticPathes.outputRoutes('assetDir'))

if(process.env.APP_ENV === 'dev'){
    app.use('/test/v1',test_api)
}

server.listen(10987)