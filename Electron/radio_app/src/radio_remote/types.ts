import { StyledComponent } from "styled-components";

export interface initStateType<radioListType>{
    voiceVal:string,
    currentIp:string,
    currentChannel:string,
    playState:boolean,
    radioList:radioListType[],
    languageToggleListStatus:boolean,
    language:string
}

export interface cssSetPropertys { 
    Container: StyledComponent<"div", any> 
}