import actionTypes from './actionType'
import { Collection, fromJS } from 'immutable'
import { Action, Reducer } from 'redux'

const dataState: Collection<any, any> = fromJS({
    data: [],
    loadingState: false
})

const callBackState:Reducer<Collection<any, any>, Action<{ [key: string]: any }>> = (state: Collection<any, any> = dataState, action: { [key: string]: any }) => {
    switch (action.type) {
        case actionTypes.setSearchMovieItem:
            return state.toMap().set('data', action.obj)
        case actionTypes.setLoadingState:
            return state.toMap().set('loadingState', action.status)
        default:
            return state
    }
}

export default callBackState