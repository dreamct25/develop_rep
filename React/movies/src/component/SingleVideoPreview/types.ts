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