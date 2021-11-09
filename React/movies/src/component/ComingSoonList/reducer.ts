import actionType from './actionType'
import { Collection, fromJS } from 'immutable'

const dataState: Collection<unknown, unknown> = fromJS({
    data:[],
    movieTitle:'',
    loadingState:false
})

const callBackState = (state: Collection<unknown, unknown> = dataState, action: { [key: string]: any }) => {
    switch (action.type) {
        case actionType.setItem:
            return state.toMap().set('data', action.obj)
        case actionType.setMovieTitle:
            return state.toMap().set('movieTitle',action.title)
        case actionType.setLoadingState:
            return state.toMap().set('loadingState',action.status)
        default:
            return state
    }
}

export default callBackState