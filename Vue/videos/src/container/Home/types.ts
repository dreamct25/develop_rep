import { Ref } from 'vue'
import { ActionTree,Commit } from 'vuex'

export interface youtubeVideosDataType {
    kind: string,
    etag: string,
    prevPageToken?:string,
    nextPageToken: string,
    regionCode: string,
    pageInfo: {
        totalResults: number,
        resultsPerPage: number
    },
    items: youtubeVideosObj[]
}

export interface youtubeVideosObj {
    kind: string,
    etag: string,
    id: {
        kind: string,
        videoId: string
    },
    snippet: {
        publishedAt: string,
        channelId: string,
        title: string,
        description: string,
        thumbnails: {
            default: {
                url: string,
                width: number,
                height: number
            },
            medium?: {
                url: string,
                width: number,
                height: number
            },
            high?: {
                url: string,
                width: number,
                height: number
            },
            standard?: {
                url: string,
                width: number,
                height: number
            },
            maxres?: {
                url: string,
                width: number,
                height: number
            }
        },
        channelTitle: string,
        liveBroadcastContent: string,
        publishTime: string
    }
}

export interface youtubeVideoSingleDataType {
    kind: string,
    etag: string,
    prevPageToken?:string,
    nextPageToken?: string,
    items: youtubeVideoSingleObj[],
    pageInfo: {
        totalResults: number,
        resultsPerPage: number
    }
}

export interface youtubeVideoSingleObj {
    kind: string,
    etag: string,
    id: string,
    snippet: {
        publishedAt: string,
        channelId: string,
        title: string,
        description: string,
        thumbnails: {
            default: {
                url: string,
                width: number,
                height: number
            },
            medium?: {
                url: string,
                width: number,
                height: number
            },
            high?: {
                url: string,
                width: number,
                height: number
            },
            standard?: {
                url: string,
                width: number,
                height: number
            },
            maxres?: {
                url: string,
                width: number,
                height: number
            }
        },
        channelTitle: string,
        tags: string[],
        categoryId: string,
        liveBroadcastContent: string,
        localized: {
            title: string,
            description: string
        },
        defaultAudioLanguage: string
    },
    contentDetails: {
        duration: string
        dimension: string,
        definition: string,
        caption: string,
        licensedContent: boolean,
        contentRating: {[key:string]:any},
        projection: string
    },
    statistics: {
        viewCount: string,
        likeCount: string,
        favoriteCount: string,
        commentCount: string
    }
}

export interface youtubeSingleDataTempType {
    videoChannelID:string,
    videoChannelTitle:string,
    videoID:string,
    videoResolution:string,
    videoImgUrl?:string,
    videoTitle:string,
    videoDesc:string,
    videoDuration:string,
    videoUploadDate:string,
    videoViewsTimes:string,
    haveCollect:boolean
}

export interface actionCreatorType extends ActionTree<initStoreType,any> {
    setSearchText({ commit }:{ commit:Commit },val:number):void,
    setTokenGroup({ commit }:{ commit:Commit },val:any):void
}

export interface initStoreType {
    searchText:string,
    tokenGroup:{
        token?:string,
        tokenStr?:string
        backName?:string
    }
}

export interface returnStoreType {
    searchText:string,
    tokenGroup:{
        token?:string,
        tokenStr?:string,
        backName?:string
    }
}

export interface collectDataType {
    videoImgUrl: string,
    videoID: string,
    videoUrl: string,
    videoTitle: string,
    videoChannelTitle: string,
    videoViewsTimes: string,
    videoDesc: string,
    videoCurrentPlay: boolean,
}

export interface stateType {
    searchText: Ref<string>,
    youtubeDataTemp: Ref<youtubeSingleDataTempType[]>,
    youtubeData: Ref<youtubeSingleDataTempType[]>,
    collectTemp: Ref<collectDataType[]>,
    pagesToken: Ref<{ prev:string,next:string }[]>,
    prevAnimate: Ref<boolean>,
    nextAnimate: Ref<boolean>,
    toggleCollectAlert: Ref<boolean>,
    collectAlertText: Ref<string>,
    currentToken: Ref<{
        token?: string,
        tokenStr?: string,
        backName?: string,
    }>,
}

export interface methodType {
    videoTimeFormat(timeText:string):string
    dateTimeFormat(dateText:string):string
    viewTimesFormat(num:string):string
    textFormat(text:string):string
    goVideo(id:string):void
    getSearch(haveToken:string, searchText:string):void
    getSearchSingleDetails(data:youtubeVideosObj[]):void
    setCollect(obj:youtubeSingleDataTempType):void
    tokenOption(token?:string, tokenStr?:string):string
    getYoutube(searchText:string, token?:string, tokenStr?:string):void
}