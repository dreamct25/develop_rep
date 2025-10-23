import type { Socket } from 'socket.io'

const socketApi = (socket:Socket) => {
    socket.on('hellow',e => console.log(e))
}


export default socketApi