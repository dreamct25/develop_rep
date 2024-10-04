import React, { ChangeEvent,Fragment } from "react";
import { Container } from '.'

interface CustomInputProps {
    label:string
    bindVal:string
    type:string
    changeEvent?(event:ChangeEvent<HTMLInputElement>):void
    className?:string,
    disabled?:boolean
}

const CustomTextArea:FC<CustomInputProps> = ({ label,bindVal,type,changeEvent,className,disabled }):TSX => {
    return pug`
        Container
            if changeEvent
                textarea(className=className || '',disabled=disabled || false,cols="30",rows="10",value=bindVal,onChange=changeEvent)
                p #{label}
                fieldset
                    legend #{label}
            else
                textarea(className=className || '',disabled=disabled || false,cols="30",rows="10",value=bindVal,readOnly)
                p #{label}
                fieldset
                    legend #{label}
    `
}

export default CustomTextArea