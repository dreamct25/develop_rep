import { StyledComponent } from 'styled-components'

export interface cssSetPropertys {
    Container: StyledComponent<"div", any>
}

export interface initStateType {
    lang: string,
    currentPath: string,
    topToggleStatus: boolean,
    fullscreenState: boolean,
    toggleModal: boolean,
    toggleCopyRightModal: boolean
}