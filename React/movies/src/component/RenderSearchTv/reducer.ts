import actionTypes from './actionType'
import { Collection, fromJS } from 'immutable'

const dataState: Collection<unknown, unknown> = fromJS({
    data: [],
    loadingState: false
})

const callBackState = (state: Collection<unknown, unknown> = dataState, action: { [key: string]: any }) => {
    switch (action.type) {
        case actionTypes.setSearchTvItem:
            return state.toMap().set('data', action.obj)
        case actionTypes.setLoadingState:
            return state.toMap().set('loadingState', action.status)
        default:
            return state
    }
}

export default callBackState