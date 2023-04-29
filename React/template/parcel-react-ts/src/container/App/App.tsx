import React,{ FC,createElement, useState, createContext } from "react";
import { Route,Routes,Navigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import routes from "../../router";
import { Container } from '.'
import store from "../../store";

export const NewContext = createContext<{
    getReducer<T>(callBack:(state:ReturnType<typeof store.getState>) => T):T,
    setReducer(actionCreator:{[key:string]:any},actionMethod:string,value?:any):void
}>({
    getReducer:callBack => callBack.call(callBack,store.getState()),
    setReducer:(actionCreator,actionMethod,value) => undefined
})

const App:FC = ():JSX.Element => {
    const createReducer = useSelector((state:ReturnType<typeof store.getState>) => state)
    const createDispatch = useDispatch()

    const getReducer:<T>(callBack:(state:ReturnType<typeof store.getState>) => T) => T = callBack => callBack.call(callBack,createReducer)
    
    const setReducer: (actionCreator:{[key:string]:any},actionMethod:string,value?:any) => void = (actionCreator,actionMethod,value) => value ? createDispatch(actionCreator[actionMethod](value)) : createDispatch(actionCreator[actionMethod]())

    const [count,setCount] = useState<number>(0)

    const addCount:() => void = () => setCount(count + 1)
    
    return (
        <NewContext.Provider value={{ getReducer,setReducer }}>
            <Container>
                <div className="first">123465</div>
                <div>{count}</div>
                <div onClick={addCount}>Add Count</div>
                <div>
                    <Routes>
                        <Route path="/" element={<Navigate replace to={'/main'} />}></Route>
                        {routes.map(({ path,component },index) => (<Route key={index} path={path} element={createElement(component)} />))}
                    </Routes>
                </div>
            </Container>
        </NewContext.Provider>
    )
}

export default App