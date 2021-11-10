import actionType from './actionType'
import { Collection, fromJS } from 'immutable'
import { Reducer } from 'redux'
import { Action } from 'redux'

const dataState: Collection<any, any> = fromJS({
    listItem: [{
        titleName: '熱門電影',
        titleVal:'movie'
    }, {
        titleName: '熱門影集',
        titleVal:'tv'
    }, {
        titleName: '即將上映',
        titleVal:'soon'
    }],
    listToggleAnimate:false,
    selectText:'movie'
})

const callBackState:Reducer<Collection<any, any>, Action<{ [key: string]: any }>> = (state: Collection<any, any> = dataState, action: { [key: string]: any }) => {
    switch (action.type) {
        case actionType.setListToggleAnimate:
            return state.toMap().set('listToggleAnimate', action.status)
        case actionType.setSelectText:
            return state.toMap().set('selectText',action.txt)
        default:
            return state
    }
}

export default callBackState