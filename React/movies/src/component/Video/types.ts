import { StyledComponent } from "styled-components";
import store from "../../store";

export interface actionTypes {
    setTotalTime: string
    setDuration: string
    setCurrentTimeText: string
    sethavePlay: string,
    setVideoFooterBarAnimate: string,
    setInitialStatus: string,
    setVolumnVal:string
}

export interface actionCreatorTypes {
    setTotalTimes: Function
    setDurations: Function
    setCurrentTimeTexts: Function
    setHavePlays: Function,
    setVideoFooterBarAnimates: Function,
    setInitialStatus: Function,
    setVolumnVal:Function
}

export interface VideoProps {
    url: string
}

export interface objType {
    durationVal: number,
    totalTime: number
    currentTimeText: string,
    havePlay: boolean,
    videoFooterBarAnimate: boolean,
    initialStatus: boolean
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}

export interface reducerState extends ReturnType<typeof store.getState> {}