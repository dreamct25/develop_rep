import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import './globalStyles.scss'
import App from './App'

const root = createRoot(document.querySelector('.app')!)

root.render(
    <StrictMode>
        <App />
    </StrictMode>
)