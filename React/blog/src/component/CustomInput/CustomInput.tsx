import React, { ChangeEvent } from "react";
import { Container } from '.'

interface CustomInputProps {
    label:string
    bindVal:string
    type:string
    changeEvent?(event:ChangeEvent<HTMLInputElement>):void
    clickEvent?(event:MouseEvent):void
    className?:string,
    disabled?:boolean
}

const CustomInput:FC<CustomInputProps> = ({ label,bindVal,type,changeEvent,clickEvent,className,disabled }):TSX => {
    return pug`
        Container
            if changeEvent
                input(className=className || '',disabled=disabled || false,type=type,value=bindVal,onChange=changeEvent)
                p #{label}
                fieldset
                    legend #{label}
            else if clickEvent
                input(className=className || '',disabled=disabled || false,type=type,defaultValue=bindVal,onClick=clickEvent,readOnly)
                p #{label}
                fieldset
                    legend #{label}
            else
                input(className=className || '',disabled=disabled || false,type=type,defaultValue=bindVal,readOnly)
                p #{label}
                fieldset
                    legend #{label}
    `
}

export default CustomInput