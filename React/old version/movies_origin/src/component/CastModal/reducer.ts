import actionType from './actionType'
import { Collection, fromJS } from 'immutable'
import { Reducer,Action } from 'redux'

const dataState: Collection<any, any> = fromJS({
    data: {},
    moviePostToggle: false,
    loadingState:false,
    postPath:''
})

const callBackState:Reducer<Collection<any, any>, Action<{ [key: string]: any }>> = (state: Collection<any, any> = dataState, action: { [key: string]: any }) => {
    switch (action.type) {
        case actionType.setSingleCastItem:
            return state.toMap().set('data', action.obj)
        case actionType.setMoviePostToggle:
            return state.toMap().set('moviePostToggle', action.status)
        case actionType.setLoadingState:
            return state.toMap().set('loadingState',action.status)
        case actionType.setPostPath:
            return state.toMap().set('postPath',action.path)
        default:
            return state
    }
}

export default callBackState