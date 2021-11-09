import actionTypes from './actionType'
import { Collection, fromJS } from 'immutable'

const dataState: Collection<unknown, unknown> = fromJS({
    volumn: 0,
    progress: 0,
    duration: 0,
    totalTime: 0,
    currentTimeText: '',
    havePlay: false,
    videoFooterBarAnimate: false,
    initialStatus: false
})

const callBackState = (state: Collection<unknown, unknown> = dataState, action: { [key: string]: any }) => {
    switch (action.type) {
        case actionTypes.setDuration:
            return state.toMap().set('duration', action.time)
        case actionTypes.setTotalTime:
            return state.toMap().set('totalTime', action.totalTime)
        case actionTypes.setCurrentTimeText:
            return state.toMap().set('currentTimeText', action.currentTimeText)
        case actionTypes.sethavePlay:
            return state.toMap().set('havePlay', action.status)
        case actionTypes.setVideoFooterBarAnimate:
            return state.toMap().set('videoFooterBarAnimate', action.status)
        case actionTypes.setInitialStatus:
            return state.toMap().set('initialStatus', action.status)
        default:
            return state
    }
}

export default callBackState