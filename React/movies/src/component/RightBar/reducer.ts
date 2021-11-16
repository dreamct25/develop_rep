import actionType from './actionType'
import { Collection, fromJS } from 'immutable'
import { Reducer } from 'redux'
import { Action } from 'redux'

const dataState: Collection<any, any> = fromJS({
    selectListItem: [{
        selectText: '--選擇類型--',
        selectVal: ''
    }, {
        selectText: '電影',
        selectVal: 'movie'
    }, {
        selectText: '影集',
        selectVal: 'tv'
    }, {
        selectText: '演員',
        selectVal: 'actor'
    }],
    currentPostType: {
        movie: ['title', 'original_title'],
        tv: ['name', 'original_name']
    },
    rightBarSearchVal: '',
    rightBarSelectVal: '',
    searchBarToggleAnimate: false
})

const callBackState: Reducer<Collection<any, any>, Action<any>> = (state: Collection<any, any> = dataState, action: { [key: string]: any }): Collection<any, any> => {
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