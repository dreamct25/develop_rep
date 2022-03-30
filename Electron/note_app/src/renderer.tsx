/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import React, { Fragment, FunctionComponent } from 'react';
import ReactDom from 'react-dom'
import App from './container/App/App';
import { GlobalStyle } from './styles';

const AppEntry:FunctionComponent = ():JSX.Element => (
    <Fragment>
        <GlobalStyle />
        <App />
    </Fragment>
    
)

ReactDom.render(<AppEntry />,document.querySelector("#root"))

console.log('👋 This message is being logged by "renderer.js", included via webpack');
