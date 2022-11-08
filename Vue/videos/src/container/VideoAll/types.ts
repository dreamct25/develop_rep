import { Ref } from 'vue'

export interface videoSingleObjType {
    videoImgUrl?: string,
    videoID: string,
    videoUrl: string,
    videoTitle: string,
    videoChannelTitle: string,
    videoViewsTimes: string,
    videoDesc: string,
    videoCurrentPlay: boolean,
}

export interface stateType {
    fromCollect: Ref<boolean>
    toggleModalStatus: Ref<boolean>
    videoSingleObj: Ref<videoSingleObjType | undefined>
    showVideoInfoSwitch: Ref<boolean>
    rwdState:Ref<boolean>
    playerComponent: Ref<any>
}

export interface methodType {
    setVideoSingleObj(obj:videoSingleObjType):void
    getShowVideoInfoSwitch(status:boolean):void
}