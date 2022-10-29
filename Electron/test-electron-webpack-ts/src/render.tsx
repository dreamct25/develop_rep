import React, { FC } from "react";
import { createRoot } from 'react-dom/client'
import App from './container/App'

const root = createRoot(document.querySelector('.app')!)

const AppEntry:FC = ():JSX.Element => <App />

root.render(<AppEntry />)