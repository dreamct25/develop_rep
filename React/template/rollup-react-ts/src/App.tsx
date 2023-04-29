import React, { FC,useState } from "react";
import Container from './styles'

interface stateType {
    count:number,
    toggleColor:boolean
}

const App:FC = ():JSX.Element => {
    const [{
        count,
        toggleColor
    },setInitState] = useState<stateType>({
        count:0,
        toggleColor:false
    })

    const addCount:() => void = () => {
        setInitState(prevState => ({
            ...prevState,
            count:prevState.count + 1,
            toggleColor:!prevState.toggleColor
        }))
    }

    return (
        <Container>
            <div>
                Hellow React & Rollup !
                <div className={toggleColor ? "count-text active" : "count-text"}>{count}</div>
                <div onClick={addCount}>Click</div>
            </div>
        </Container>
    )
}

export default App