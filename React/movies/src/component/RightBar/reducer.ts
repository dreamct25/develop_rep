import actionType from './actionType'
import { Collection, fromJS } from 'immutable'

const dataState: Collection<unknown, unknown> = fromJS({
    selectListItem: {
        item: [{
            selectText: '',
            selectVal: '--選擇類型--'
        }, {
            selectText: '電影',
            selectVal: 'movie'
        }, {
            selectText: 'tv',
            selectVal: '影集'
        }, {
            selectText: 'actor',
            selectVal: '演員'
        }]
    },
    rightBarSearchVal: '',
    rightBarSelectVal: '',
    searchBarToggleAnimate: false
})

const callBackState = (state: Collection<unknown, unknown> = dataState, action: { [key: string]: any }) => {
    switch (action.type) {
        case actionType.setRightBarSearchVal:
            return state.toMap().set('rightBarSearchVal', action.val)
        case actionType.setRightBarSelectVal:
            return state.toMap().set('rightBarSelectVal', action.val)
        case actionType.setSearchBarToggleAnimate:
            return state.toMap().set('searchBarToggleAnimate', action.status)
        default:
            return state
    }
}

export default callBackState