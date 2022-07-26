import { StyledComponent } from 'styled-components'

export type containerType = StyledComponent<'div',any>

export interface initStateType {
    toggleMode: boolean
    inRGB_RVal: string,
    inRGB_GVal: string,
    inRGB_BVal: string,
    inRGB_HexVal: string,
    inHex_RVal: string,
    inHex_GVal: string,
    inHex_BVal: string,
    inHex_HexVal: string,
    isCopyed: boolean
}