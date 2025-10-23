import { createContext, useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { io, Socket } from 'socket.io-client'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Main } from '@/component';
import $ from '@/utilities/lib/Library'
import store from './store';


type StoresType = ReturnType<typeof store.getState>

interface ProviderType {
    getReducer:<T>(callBack:(state:StoresType) => T) => T,
    setReducer:<T extends Record<string,any>,N extends keyof T,V extends ReturnType<T[N]>['payload']>(actionCreator: T,actionName: N,value?: V) => void
    $: $,
    socketClient: Socket | undefined,
    toast: typeof toast
    formatLanguage: ReturnType<typeof useTranslation>['0']
    i18n: ReturnType<typeof useTranslation>['1']
}

export const NewContext = createContext<ProviderType>({
    getReducer: callBack => callBack.call(callBack,store.getState()),
    setReducer: (acionCreator,actionName,value) => undefined,
    $: $,
    socketClient: {} as Socket,
    toast: toast,
    formatLanguage: undefined,
    i18n: undefined
})

const App:FC = (): TSX => {

    const [_, setForceRender] = useState<boolean>(false)
    const createDispatch = useDispatch()

    const { t, i18n } = useTranslation()

    const socketClientRef = useRef<Socket | undefined>(undefined)

    const getReducer:ProviderType['getReducer'] = callBack => useSelector<StoresType,any>(callBack)
    const setReducer:ProviderType['setReducer'] = (actionCreator,actionName,value) => value ? createDispatch(actionCreator[actionName](value)) : createDispatch(actionCreator[actionName]())

    const providerObj: ProviderType = {
        getReducer,
        setReducer,
        $,
        socketClient: socketClientRef.current,
        toast,
        formatLanguage: t,
        i18n
    }

    useEffect(() => {

        const socket = io('ws://localhost:10987',{ path: '/remote/v1' })

        socket.on('connect',() => {
            socketClientRef.current = socket
            setForceRender(true)
        })

    }, [])

    return (
        <NewContext.Provider value={providerObj}>
            {socketClientRef.current && <Main />}
        </NewContext.Provider>
    )
}

export default App