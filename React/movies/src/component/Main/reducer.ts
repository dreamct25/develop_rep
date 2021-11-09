import actionType from './actionType'
import { Collection, fromJS } from 'immutable'

const dataState: Collection<unknown, unknown> = fromJS({
    data: [],
    imgId: 0,
    toggleBarAnimate: false,
    search: {},
    hotItemType:''
})

const callBackState = (state: Collection<unknown, unknown> = dataState, action: { [key: string]: any }) => {
    switch (action.type) {
        case actionType.postItem:
            return state.toMap().merge({
                data:action.obj,
                hotItemType:action.val
            })
        case actionType.currentSelect:
            return state.toMap().set('imgId', action.id)
        case actionType.toggleBarAnimate:
            return state.toMap().set('toggleBarAnimate', action.status)
        case actionType.setSearchVal:
            return state.toMap().set('search', action.val)
        default:
            return state
    }
}

export default callBackState