import actionTypes from './actionType'
import { Collection, fromJS } from 'immutable'
import { Action, Reducer } from 'redux'

const dataState: Collection<any, any> = fromJS({
    singleData: [],
    changeBackPostSwitch: false,
    currentPostType:{
        movie:'title',
        tv:'name'
    }
})

const callBackState:Reducer<Collection<any, any>, Action<{ [key: string]: any }>> = (state: Collection<any, any> = dataState, action: { [key: string]: any }) => {
    switch (action.type) {
        case actionTypes.getSingleItem:
            return state.toMap().set('singleData', action.singleData)
        case actionTypes.changeBackPostSwitch:
            return state.toMap().set('changeBackPostSwitch', action.status)
        default:
            return state
    }
}

export default callBackState