import React,{ FC } from "react";
import * as ReactDOM from 'react-dom'
import { App } from './App'


const AppEntry:FC = ():JSX.Element => (
    <App />
);

ReactDOM.render(<AppEntry />,document.querySelector('#app')!);
