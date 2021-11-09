import actionTypes from './actionType'
import { Collection, fromJS } from 'immutable'

const dataState: Collection<unknown, unknown> = fromJS({
    singleData: [],
    changeBackPostSwitch: false
})

const callBackState = (state: Collection<unknown, unknown> = dataState, action: { [key: string]: any }) => {
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