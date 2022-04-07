import React, { FunctionComponent,Fragment } from "react";
import ReactDom from 'react-dom'
import { Setting } from './container/Setting'
import { GlobalStyle } from './styles'

const SettingPage: FunctionComponent = (): JSX.Element => (
    <Fragment>
        <GlobalStyle />
        <Setting />
    </Fragment>
)

ReactDom.render(<SettingPage />, document.getElementById('id-setting'))