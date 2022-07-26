import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyle from './globalStyles'
import App from './App'
import './i18Init'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename='/color_converter'>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
