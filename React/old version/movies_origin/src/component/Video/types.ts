import { Action } from "redux";
import { StyledComponent } from "styled-components";
import store from "../../store";

export interface actionTypes {
    setTotalTime: string
    setDuration: string
    setCurrentTimeText: string
    sethavePlay: string,
    setVideoFooterBarAnimate: string,
    setInitialStatus: string,
    setVolumeVal:string,
    setVolumeSliderToggle:string,
    setVolumeTextToggle:string
}

export interface actionCreatorTypes {
    setTotalTimes: (totalTime: string) => Action<any>
    setDurations: (time: number) => Action<any>
    setCurrentTimeTexts: (currentTimeText: string) => Action<any>
    setHavePlays: (status: boolean) => Action<any>,
    setVideoFooterBarAnimates: (status: boolean) => Action<any>,
    setInitialStatus: (status: boolean) => Action<any>,
    setVolumeVal:(val:string) => Action<any>,
    setVolumeSliderToggle:(status:boolean) => Action<any>,
    setVolumeTextToggle:(status:boolean) => Action<any>
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
    initialStatus: boolean,
    volumeSliderToggle:boolean,
    volumeTextToggle:boolean
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}

export interface reducerState extends ReturnType<typeof store.getState> {}