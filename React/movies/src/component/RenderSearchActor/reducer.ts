import actionType from './actionType'
import { Collection, fromJS } from 'immutable'

const dataState: Collection<unknown, unknown> = fromJS({
    data: [],
    loadingState: false,
    selectId: 0,
    castModalToggle: false
})

const callBackState = (state: Collection<unknown, unknown> = dataState, action: { [key: string]: any }) => {
    switch (action.type) {
        case actionType.setSearchActorItem:
            return state.toMap().set('data', action.obj)
        case actionType.setLoadingState:
            return state.toMap().set('loadingState', action.status)
        case actionType.setCurrentSelectId:
            return state.toMap().set('selectId', action.id)
        case actionType.setCastModalToggel:
            return state.toMap().set('castModalToggle', action.status)
        // case actionType.postItem:
        //     return state.toMap().merge({
        //         data:action.obj,
        //         hotItemType:action.val
        //     })
        default:
            return state
    }
}

export default callBackState