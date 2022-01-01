import React,{createContext,useCallback,useRef,useState} from "react";
import PageI from "./PageI";
import PageII from "./PageII"
import Button from "./button"
import Radio from "./Radio";
export const createContextProps = createContext()

const Main = props => {
    // const [objA,setObjA] = useState({})
    // const [objB,setObjB] = useState({})
    // const setA = useCallback(() => setObjA({ componentName:"pageI" }),[objA])
    // const setB = useCallback(() => setObjB({ componentName:"pageII" }),[objB])
    return(
        <div>
            <Radio />
            {/* <createContextProps.Provider value={{pageI:"App to I",pageII:"App to II"}}> */}
                {/* <PageI obj={objA} />
                <Button setProps={setA} text={"show A"}  />
                <PageII obj={objB} />
                <Button setProps={setB} text={"show B"} /> */}
            {/* </createContextProps.Provider> */}
        </div>
    )
}

export default Main