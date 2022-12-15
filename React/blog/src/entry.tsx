import React,{ StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import GlobalStyles from "./globalStyles";
import App from './App'
import store from "./store";

const root = createRoot(document.querySelector('.app')!)

root.render(
    pug`
        StrictMode
            Provider(store=store)
                HashRouter
                    GlobalStyles
                    App
    `
)


