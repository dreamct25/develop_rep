import { StyledComponent } from "styled-components";
import store from "../../store";

export interface actionTypes {
    getSingleVideos: string,
    getSingleVideosUrl: string
    postId: string,
    restUrlObj: string,
    getSingleReview: string,
    setCurrentSelectId: string,
    setCastModalToggel:string,
    setLoadingState:string,
    restAllObj:string
}

export interface actionCreatorType {
    getSingleVideo: Function,
    postCurrentId: Function,
    getSingleVideoUrl: Function
    restUrl: Function,
    getSingleReview: Function,
    setCurrentSelectId: Function
    setCastModalToggel:Function,
    setLoadingState:Function,
    restAllObj:Function
}

export interface objType {
    singleVideoItem: singleVideoItemType | {[key:string]:any},
    singleVideoItemUrl: {[key:string]:any},
    singleVideoItemReview: {[key:string]:any},
    selectId: number,
    castModalToggel: boolean,
    loadingState: boolean
}

export interface singleVideoItemType {
    overview: string,
    vote_average: number,
    genres: string[]
}

export interface singleVideoItemCastType {
    id: number
    profile_path: string,
    original_name: string,
    character: string
}

export interface singleVideoItemReviewType {
    author_details: {
        username: string,
        rating: number
    },
    updated_at: string
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}

export interface reducerState extends ReturnType<typeof store.getState> {}