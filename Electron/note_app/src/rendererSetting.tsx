import React, { FunctionComponent } from "react";
import ReactDom from 'react-dom'
import { Setting } from './container/Setting'

const SettingPage: FunctionComponent = (): JSX.Element => (
    <Setting />
)

ReactDom.render(<SettingPage />, document.getElementById('id-setting'))