import { StyledComponent } from "styled-components";
import store from "../../store";

export interface actionTypes {
    setTotalTime: string
    setDuration: string
    setCurrentTimeText: string
    sethavePlay: string,
    setVideoFooterBarAnimate: string,
    setInitialStatus: string,
    setVolumeVal:string
}

export interface actionCreatorTypes {
    setTotalTimes: Function
    setDurations: Function
    setCurrentTimeTexts: Function
    setHavePlays: Function,
    setVideoFooterBarAnimates: Function,
    setInitialStatus: Function,
    setVolumeVal:Function
}

export interface VideoProps {
    url: string
}

export interface objType {
    volume:string,
    durationVal: number,
    totalTime: string
    currentTimeText: string,
    havePlay: boolean,
    videoFooterBarAnimate: boolean,
    initialStatus: boolean
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}

export interface reducerState extends ReturnType<typeof store.getState> {}