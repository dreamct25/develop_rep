import React,{ memo,FunctionComponent,createContext, Context } from 'react'
import Main from './Main'
import $ from '../lib/Library'

export const newContext:Context<{
    $:typeof $
}> = createContext({
    $:null
})

const App:FunctionComponent = ():JSX.Element => (
    <newContext.Provider value={{ $ }}>
        <Main />
    </newContext.Provider>
)

export default memo(App)