import actionType from './actionType'
import { Collection, fromJS } from 'immutable'
import { Action, Reducer } from 'redux'

const dataState: Collection<any, any> = fromJS({
    singleVideoItem: {},
    singleVideoItemUrl: {},
    singleVideoItemReview: {},
    selectId: 0,
    castModalToggel: false,
    loadingState: false,
    currentPostType: {
        movie: ['title', 'original_title', 'release_date'],
        tv: ['name', 'original_name', 'first_air_date']
    }
})

const callBackState: Reducer<Collection<any, any>, Action<{ [key: string]: any }>> = (state: Collection<any, any> = dataState, action: { [key: string]: any }) => {
    switch (action.type) {
        case actionType.getSingleVideos:
            return state.toMap().set('singleVideoItem', action.obj)
        case actionType.getSingleVideosUrl:
            return state.toMap().set('singleVideoItemUrl', action.obj)
        case actionType.getSingleReview:
            return state.toMap().set('singleVideoItemReview', action.obj)
        case actionType.setCurrentSelectId:
            return state.toMap().set('selectId', action.id)
        case actionType.setCastModalToggel:
            return state.toMap().set('castModalToggel', action.status)
        case actionType.setLoadingState:
            return state.toMap().set('loadingState', action.status)
        case actionType.restAllObj:
            return state.toMap().merge({
                singleVideoItem: {},
                singleVideoItemUrl: {},
                singleVideoItemReview: {}
            })
        default:
            return state
    }
}

export default callBackState