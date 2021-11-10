import actionType from './actionType'
import { Collection, fromJS } from 'immutable'
import { Action, Reducer } from 'redux'

const dataState: Collection<any, any> = fromJS({
    data: [],
    newData: [],
    movieTitle: '',
    loadingState: false
})

const callBackState: Reducer<Collection<any, any>, Action<{ [key: string]: any }>> = (state: Collection<any, any> = dataState, action: { [key: string]: any }) => {
    switch (action.type) {
        case actionType.setItem:
            return state.toMap().set('data', action.obj)
        case actionType.setFullItem:
            return state.toMap().set('newData', action.item)
        case actionType.setMovieTitle:
            return state.toMap().set('movieTitle', action.title)
        case actionType.setLoadingState:
            return state.toMap().set('loadingState', action.status)
        default:
            return state
    }
}

export default callBackState