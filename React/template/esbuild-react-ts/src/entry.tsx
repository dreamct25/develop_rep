import React, { FC } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'

const root = createRoot(document.querySelector('.app')!)

const AppEntry:FC = ():JSX.Element => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

root.render(<AppEntry />)