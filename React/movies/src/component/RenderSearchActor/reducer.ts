import actionType from './actionType'
import { Collection, fromJS } from 'immutable'
import { Action, Reducer } from 'redux'

const dataState: Collection<any, any> = fromJS({
    data: [],
    loadingState: false,
    selectId: 0,
    castModalToggle: false
})

const callBackState:Reducer<Collection<any, any>, Action<{ [key: string]: any }>> = (state: Collection<any, any> = dataState, action: { [key: string]: any }) => {
    switch (action.type) {
        case actionType.setSearchActorItem:
            return state.toMap().set('data', action.obj)
        case actionType.setLoadingState:
            return state.toMap().set('loadingState', action.status)
        case actionType.setCurrentSelectId:
            return state.toMap().set('selectId', action.id)
        case actionType.setCastModalToggel:
            return state.toMap().set('castModalToggle', action.status)
        default:
            return state
    }
}

export default callBackState