import { StyledComponent } from "styled-components";
import { VideoJsPlayer } from 'video.js'
import { initStateType as mainInitStateType } from '../Main/types'
import { channelItemType, radioInfoListType, channelRankItemType } from '../../server/server_api/channel_api'
import { RouteComponentProps } from "react-router-dom";

export interface cssSetPropertys {
    Container: StyledComponent<"div", any>
}

export interface RadioProps {
    routeProps:RouteComponentProps<{[key: string]: string }>
    language:string
    setMainInitStateStatus: React.Dispatch<React.SetStateAction<mainInitStateType>>,
}

export interface initStateType {
    player?: VideoJsPlayer,
    radioList: channelItemType[],
    filterRadioList: channelItemType[],
    radioRankList: channelRankItemType[],
    showfilterRadioList: boolean,
    showTooltip: boolean,
    showSingleTooltip:boolean,
    showLeftBarTooltip:boolean,
    playerVoice: number,
    currentChannel: string,
    currentSearch: string,
    currentMoveToChannel:string
    loadingState: boolean,
    singleRadioSelect: { [key: string]: any } | radioInfoListType,
    alertBageText: string,
    toggleAlertBageText: boolean
}