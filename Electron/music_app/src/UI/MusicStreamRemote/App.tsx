import { createContext, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import $ from '@/utilities/lib/Library'
import { Remote } from './component/Remote'

export const NewContext = createContext<{
    socketClient: Socket
    $: $
}>({
    socketClient: {} as Socket,
    $: $
})

const App: FC = ():TSX => {
    const [_, setForceRender] = useState<boolean>(false)
    const socketClientRef = useRef<Socket | undefined>(undefined)

    useEffect(() => {

        const socketClient = io(`ws://${location.host}`,{ path: '/remote/v1' })

        socketClient.on('connect',() => {
            socketClientRef.current = socketClient
            setForceRender(true)
        })

    }, [])

    return (
        <NewContext.Provider value={{ 
            socketClient: socketClientRef.current, $
        }}>
            {socketClientRef.current ? <Remote /> : <div>連線中</div>}
        </NewContext.Provider>
    )
}

export default App