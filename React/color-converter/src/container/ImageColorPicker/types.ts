import { StyledComponent } from 'styled-components'

export type containerType = StyledComponent<'div',any>

export interface initStateType {
    fileUrl:string,
    toggleImg:boolean,
    rgb:number[]
}

export type convertType = "rgb" | "hex"