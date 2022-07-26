import { StyledComponent } from 'styled-components'

export type containerType = StyledComponent<'div',any>

export interface initStateType {
    width:number,
    height:number,
    radLarge:number,
    radSmall:number,
    cx:number,
    cy:number,
    points:number,
    angle:number,
    rgbVal:string,
    hexVal:string,
    hslVal:string
}