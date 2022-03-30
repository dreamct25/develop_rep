import React, { memo, FunctionComponent, createContext, Context } from 'react'
import Main from './Main'
import $ from '../lib/Library'

export const newContext: Context<{
    $: typeof $
}> = createContext({
    $: null
})

const App: FunctionComponent = (): JSX.Element => {
    $.fetch.createBase({
        baseUrl: 'http://localhost:9003/db_api',
        baseHeaders: {
            'Content-Type': 'application/json'
        }
    })
    return (
        <newContext.Provider value={{ $ }}>
            <Main />
        </newContext.Provider>
    )
}

export default memo(App)