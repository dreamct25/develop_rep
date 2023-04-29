import React,{ FC } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// import GlobalStyles from './globalStyles'
import store from './store'
import { App } from './container/App'

const AppEntry:FC = ():JSX.Element => (
    <Provider store={store}>
        <BrowserRouter>
            {/* <GlobalStyles /> */}
            <App />
        </BrowserRouter>
    </Provider>
) 

createRoot(document.querySelector('#root')!).render(<AppEntry />)