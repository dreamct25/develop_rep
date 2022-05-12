import React, { Fragment, FunctionComponent } from 'react';
import ReactDom from 'react-dom'
import App from './RadioRemoteApp';
import { GlobalStyle } from './styles';
import '../i18nSet'

const AppEntry:FunctionComponent = ():JSX.Element => (
    <Fragment>
        <GlobalStyle />
        <App />
    </Fragment>
)

ReactDom.render(<AppEntry />,document.querySelector("#root"))

