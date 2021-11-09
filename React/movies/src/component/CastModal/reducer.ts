import actionType from './actionType'
import { Collection, fromJS } from 'immutable'

const dataState: Collection<unknown, unknown> = fromJS({
    data: {},
    moviePostToggle: false,
    loadingState:false,
    postPath:''
})

const callBackState = (state: Collection<unknown, unknown> = dataState, action: { [key: string]: any }) => {
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