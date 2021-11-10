import { actionCreatorType } from './types'
import actionType from './actionType'

const actionCreator: actionCreatorType = {
    postCurrentId: (id: number, types: string) => ({
        type: actionType.postId,
        id,
        types
    }),
    getSingleVideo: (obj: { [key: string]: any }[]): object => ({
        type: actionType.getSingleVideos,
        obj
    }),
    getSingleVideoUrl: (obj: { [key: string]: any }): object => ({
        type: actionType.getSingleVideosUrl,
        obj
    }),
    restUrl: (obj: object): object => ({
        type: actionType.restUrlObj,
        obj
    }),
    getSingleReview: (obj: { [key: string]: any }): object => ({
        type: actionType.getSingleReview,
        obj
    }),
    setCurrentSelectId: (id: number): object => ({
        type: actionType.setCurrentSelectId,
        id
    }),
    setCastModalToggel:(status:boolean):object => ({
        type: actionType.setCastModalToggel,
        status
    }),
    setLoadingState:(status:boolean):object => ({
        type: actionType.setLoadingState,
        status
    }),
    restAllObj:():object => ({
        type: actionType.restAllObj,
    })
}

export default actionCreator