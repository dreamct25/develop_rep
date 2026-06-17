import { Action } from "redux";
import { StyledComponent } from "styled-components";
import store from "../../store";

export interface actionTypes {
    getSingleVideos: string,
    getSingleVideosUrl: string
    postId: string,
    restUrlObj: string,
    getSingleReview: string,
    setCurrentSelectId: string,
    setCastModalToggel: string,
    setLoadingState: string,
    restAllObj: string
}

export interface actionCreatorType {
    getSingleVideo: (obj: { [key: string]: any }) => Action<any>,
    postCurrentId: (id: number, types: string) => Action<any>,
    getSingleVideoUrl: (obj: { [key: string]: any }) => Action<any>,
    restUrl: (obj: object) => Action<any>,
    getSingleReview: (obj: { [key: string]: any }) => Action<any>,
    setCurrentSelectId: (id: number) => Action<any>,
    setCastModalToggel: (status: boolean) => Action<any>,
    setLoadingState: (status: boolean) => Action<any>,
    restAllObj: () => Action<any>
}

export interface objType {
    singleVideoItem: singleVideoItemType | { [key: string]: any },
    singleVideoItemUrl: { [key: string]: any },
    singleVideoItemReview: { [key: string]: any },
    selectId: number,
    castModalToggel: boolean,
    loadingState: boolean,
    currentPostType: { [key: string]: any }
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

export interface reducerState extends ReturnType<typeof store.getState> { }