
import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalStyles } from './styles'
import './i18Init'
import App from './App'


const root = createRoot(document.querySelector('.app')!)

root.render(
    <StrictMode>
        <GlobalStyles />
        <App />
    </StrictMode>
)