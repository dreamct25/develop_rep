import { StyledComponent } from "styled-components";
import { VideoJsPlayer } from 'video.js'
import { initStateType as mainInitStateType } from '../Main/types'
import { radioInfoListType } from '../../server/server_api/channel_api';
import { RouteComponentProps } from "react-router-dom";

export interface cssSetPropertys {
    Container: StyledComponent<"div", any>
}

export interface collectItem {
    uuid: number,
    radio_id: string,
    radio_name: string,
    radio_img_url: string,
    create_date: string
}

export interface initStateType {
    collectData: collectItem[],
    filterCollectList: collectItem[],
    showCollectList: boolean,
    showTooltip: boolean,
    showLeftBarTooltip: boolean,
    singleRadioSelect: { [key: string]: any } | radioInfoListType,
    player?: VideoJsPlayer,
    playerVoice: number,
    playState: boolean,
    currentChannel: string,
    deleteIdTemp: number,
    deleteItemTextTemp: string,
    currentSearch: string,
    currentMoveToChannel: string
}

export interface alertBageType {
    alertBageText: string,
    toggleAlertBageText: boolean
}

export interface RadioCollectProps {
    routeProps:RouteComponentProps<{[key: string]: string }>
    language:string
    setMainInitStateStatus: React.Dispatch<React.SetStateAction<mainInitStateType>>,
}