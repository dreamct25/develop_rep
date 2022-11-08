import { Ref } from 'vue'

export interface returnStoreType {
    tokenGroup:{
        token?:string,
        tokenStr?:string,
        backName?:string
    }
}

export interface stateType {
    collect: Ref<collectTempType[]>,
    collectTemp: Ref<collectTempType[]>,
    collectPageTemp: Ref<collectTempType[]>,
    rwdState: Ref<boolean>,
    rwdStateOnPad: Ref<boolean>,
    searchText: Ref<string>,
    searchCount: Ref<number>,
    message: Ref<string>,
    hasConfirm: Ref<boolean>,
    indexTemp: Ref<number>,
    filterArray: Ref<any[]>,
    toggleModalStatus: Ref<boolean>,
    toggleAlertStatus: Ref<boolean>
    paginationItem: Ref<{[key:string]:any}>,
}

export interface methodType {
    paginationPart(pages?:number):collectTempType[] | []
    getCollect(pages?:number):void
    goVideo(postUrl:string,id:string):void
    showDeleteModal(id:string):void
    deleteCollect({ type,status }:{ type:string,status:boolean }):void
}

export interface paginationObjType {
    totalLength?:number,
    partPage?:number,
    pageTotal?:number,
    currentPage?:number,
    beforPage?:boolean,
    afterPage?:boolean
}

export interface collectTempType {
    videoImgUrl?: string,
    videoID: string,
    videoUrl: string,
    videoTitle: string,
    videoChannelTitle: string,
    videoViewsTimes: string,
    videoDesc: string,
    videoCurrentPlay: boolean,
}