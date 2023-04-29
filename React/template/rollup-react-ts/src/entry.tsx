import React, { FC,StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const root = createRoot(document.querySelector('.app')!)

const AppEntry:FC = ():JSX.Element => (
    <StrictMode>
        <App />
    </StrictMode>
)

root.render(<AppEntry />)