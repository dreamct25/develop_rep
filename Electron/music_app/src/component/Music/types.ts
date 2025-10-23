// import { StyledComponent } from "styled-components";
// import { VideoJsPlayer } from 'video.js'
// import { channelItemType, radioInfoListType, channelRankItemType } from '../../server/server_api/channel_api'

export interface initStateType {
    player?: any,
    radioList: any[],
    filterRadioList: any[],
    radioRankList: any[],
    showfilterRadioList: boolean,
    showTooltip: boolean,
    showSingleTooltip:boolean,
    showLeftBarTooltip:boolean,
    playerVoice: number,
    currentChannel: string,
    currentSearch: string,
    currentMoveToChannel:string
    loadingState: boolean,
    singleRadioSelect: { [key: string]: any },
    alertBageText: string,
    toggleAlertBageText: boolean,
    currentIp:string
}