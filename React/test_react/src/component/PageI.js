import React,{useState,useRef,useEffect} from 'react'
import useInput from './inputHook'
const PageI = (props,state) => {
    const [name,bindName,resetName] = useInput("")
    const [old,bindOld,resetOld] = useInput("")
    const submits = () => {
        alert(`${name} is ${old}`)
        resetName()
        resetOld()
    }
    return(
        <div>
            <div>PageI</div>
            <input type="text" { ...bindName } />
            <input type="text" { ...bindOld } />
            <div onClick={submits}>show</div>
        </div>
    )
}

export default PageI