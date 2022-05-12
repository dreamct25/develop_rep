import { Router,Request,Response } from 'express'

interface ResType {
    message:string
}

const route = Router()

route.post('/set_voice',(req:Request,res:Response<ResType>) => {
    const socket = req.app.get('socket')
    res.json({
        message:'success'
    })
    socket.emit('setVoiceFromRemote',{ voiceVal:req.body.voiceVal })
})

route.post('/set_channel',(req:Request,res:Response<ResType>) => {
    const socket = req.app.get('socket')
    res.json({
        message:'success'
    })
    socket.emit('setChannelFromRemote',{ channel:req.body.channel })
})

route.post('/post_current_setting',(req:Request,res:Response<ResType>) => {
    const socket = req.app.get('socket')
    res.json({
        message:'success'
    })
    socket.emit('getCurrentSetting',req.body)
})

route.post('/post_current_play_state',(req:Request,res:Response<ResType>) => {
    const socket = req.app.get('socket')
    res.json({
        message:'success'
    })
    socket.emit('setPlayStateFromRemote',{ playState:req.body.playState })
})

route.post('/remote_language_setting',(req:Request,res:Response<ResType>) => {
    const socket = req.app.get('socket')
    res.json({
        message:'success'
    })
    socket.emit('whenChangeLaguageFromRemote',{ language:req.body.language })
})

route.post('/remote_is_start',(req:Request,res:Response<ResType>) => {
    const socket = req.app.get('socket')
    res.json({
        message:'success'
    })
    socket.emit('remoteIsStart',{ isStart:req.body.isStart })
})

route.get('/check_remote_is_start',(req:Request,res:Response<ResType>) => {
    const socket = req.app.get('socket')
    res.json({
        message:'success'
    })
    socket.emit('checkRemoteIsStart')
})

export default route