import { actionCreatorType } from './types'
import actionType from './actionType'

const actionCreator: actionCreatorType = {
    getSingleVideo: obj => ({
        type: actionType.getSingleVideos,
        obj
    }),
    postCurrentId: (id, types) => ({
        type: actionType.postId,
        id,
        types
    }),
    getSingleVideoUrl: obj => ({
        type: actionType.getSingleVideosUrl,
        obj
    }),
    restUrl: obj => ({
        type: actionType.restUrlObj,
        obj
    }),
    getSingleReview: obj => ({
        type: actionType.getSingleReview,
        obj
    }),
    setCurrentSelectId: id => ({
        type: actionType.setCurrentSelectId,
        id
    }),
    setCastModalToggel: status => ({
        type: actionType.setCastModalToggel,
        status
    }),
    setLoadingState: status => ({
        type: actionType.setLoadingState,
        status
    }),
    restAllObj: () => ({
        type: actionType.restAllObj,
    })
}

export default actionCreator