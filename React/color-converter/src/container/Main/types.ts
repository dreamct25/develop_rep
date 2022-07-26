import { StyledComponent } from 'styled-components'

export type containerType = StyledComponent<'div',any>

export interface initStateType {
    toggleNavStatus:boolean,
    toggleLanguageList:boolean
}
