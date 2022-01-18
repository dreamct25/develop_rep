import React, { useState,FunctionComponent } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import PageI from "./component/PageI";
import PageII from "./component/PageII";

import Styles from "./globalStyles";

interface BuildProps {
    aProps:string
}

const BuildTemplate:FunctionComponent<BuildProps> = ({ aProps }:BuildProps):JSX.Element => {
    return(
        <div style={{ color:'white' }}>{aProps} from props</div>
    )
}

const App:FunctionComponent<{}> = ():JSX.Element => {
    const history = useHistory()
    const [text,setText] = useState('')
    const setNewText:(newText:string) => void = newText => {
        setText(newText)
    }

    const goPage:(path:string) => void = path => {
        history.push({
            pathname:path,
            state:{ a:10 }
        })
    }
    return (
        <Styles>
            <div className="all-outer">
                <div className="abc">{text}</div>
                <div className="bbb" onClick={setNewText.bind(this,'skjdfhhhh')}>change</div>
                <BuildTemplate aProps="jshdjkfkjsdhf" />
                <div onClick={goPage.bind(this,'pageI')}>go page I</div>
                <div onClick={goPage.bind(this,'pageII')}>go page II</div>
            </div>
            <Switch>
                <Route exact path="/pageI" render={routProps => PageI({ IProps:"123sddfsdf",anyProps:routProps })} />
                <Route exact path="/pageII" component={PageII} />
            </Switch>
        </Styles>
    )
}

export default App