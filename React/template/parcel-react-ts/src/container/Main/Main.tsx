import React,{ FC, useContext, useEffect } from "react";
import { NewContext } from '../App/App'
import { returnStoreType,actionCreator } from '.'

const Main:FC = ():JSX.Element => {
    
    const { getReducer,setReducer } = useContext(NewContext)
    const { arr,counts } = getReducer<returnStoreType>(state => state.MainReducer)
    
    const addCount:() => void = () => {
        setReducer(actionCreator,'setCount',counts + 1)
        setReducer(actionCreator,'setArr',counts + 1)
    }

    return (
        <div>
            <div>Main Router</div>
            <div>{counts}</div>
            <div>
                {arr.map((item:number,index:number) => <div key={index}>{item}</div>)}
            </div>
            <div onClick={addCount}>Add Count</div>
        </div>
    )
}

export default Main