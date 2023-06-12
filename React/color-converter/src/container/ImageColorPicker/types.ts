import { StyledComponent } from 'styled-components'

export type containerType = StyledComponent<'div',any>

export interface initStateType {
    fileUrl:string,
    toggleImg:boolean,
    rgb:number[],
    isVertical:boolean,
    zoomSize:number
}

export type convertType = "rgb" | "hex"