import { GlobalStyle } from './styles'
import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { HashRouter, Router } from "react-router-dom";
import { createBrowserHistory } from 'history'
import './i18nSet'

const AppFrame = () => {
    return (
        <Router history={createBrowserHistory()}>
            <HashRouter>
                <GlobalStyle />
                <App />
            </HashRouter>
        </Router>
    )
}

ReactDom.render(<AppFrame />, document.getElementById('root'))
