import actionTypes from './actionType'
import { Collection, fromJS } from 'immutable'
import actionType from './actionType'

const dataState: Collection<unknown, unknown> = fromJS({
    singleVideoItem: {},
    singleVideoItemUrl: {},
    singleVideoItemReview: {},
    selectId: 0,
    castModalToggel:false,
    loadingState:false
})

const callBackState = (state: Collection<unknown, unknown> = dataState, action: { [key: string]: any }) => {
    switch (action.type) {
        case actionTypes.getSingleVideos:
            return state.toMap().set('singleVideoItem', action.obj)
        case actionTypes.getSingleVideosUrl:
            return state.toMap().set('singleVideoItemUrl', action.obj)
        case actionTypes.getSingleReview:
            return state.toMap().set('singleVideoItemReview', action.obj)
        case actionType.setCurrentSelectId:
            return state.toMap().set('selectId', action.id)
        case actionType.setCastModalToggel:
            return state.toMap().set('castModalToggel',action.status)
        case actionType.setLoadingState:
            return state.toMap().set('loadingState',action.status)
        case actionType.restAllObj:
            return state.toMap().merge({
                singleVideoItem:{},
                singleVideoItemUrl:{},
                singleVideoItemReview:{}
            })
        default:
            return state
    }
}

export default callBackState