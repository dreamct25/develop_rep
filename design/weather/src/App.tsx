import React,{ createContext } from 'react'
import './lib/Library'
import $ from './lib/Library'
import { Main } from './container'

export const NewContext = createContext<{ 
    $:$
}>({ 
    $:$
})

const App:FC = ():TSX => {
    return (
        <NewContext.Provider value={{ $ }}>
            <Main />
        </NewContext.Provider>
    )
}

export default App