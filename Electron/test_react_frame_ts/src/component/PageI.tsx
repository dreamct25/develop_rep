import React,{ FunctionComponent } from "react"
interface PageIProp {
    IProps:string
    anyProps:any
}
const PageI:FunctionComponent<PageIProp> = ({ IProps,anyProps }:PageIProp):JSX.Element => {
    console.log(anyProps)
    return (
        <div>
            <div>this is page</div>
            <div>{IProps}</div>
        </div>
        
    )
}

export default PageI