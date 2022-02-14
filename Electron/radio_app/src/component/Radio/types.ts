import { StyledComponent } from "styled-components";
import { VideoJsPlayer } from 'video.js'
import { initStateType as mainInitStateType } from '../Main/types'
import { channelItemType, radioInfoListType, channelRankItemType } from '../../server/server_api/channel_api'

export interface cssSetPropertys {
    Container: StyledComponent<"div", any>
}

export interface RadioProps {
    mainInitState: mainInitStateType,
    setMainInitStateStatus: React.Dispatch<React.SetStateAction<mainInitStateType>>,
}

export interface initStateType {
    player?: VideoJsPlayer,
    radioList: channelItemType[],
    filterRadioList: channelItemType[],
    radioRankList: channelRankItemType[],
    showfilterRadioList: boolean,
    showTooltip: boolean,
    playerVoice: number,
    currentChannel: string,
    currentSearch: string,
    loadingState: boolean,
    singleRadioSelect: { [key: string]: any } | radioInfoListType,
    alertBageText: string,
    toggleAlertBageText: boolean,
}