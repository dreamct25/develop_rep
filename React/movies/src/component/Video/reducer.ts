import actionType from './actionType'
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
        case actionType.setVolumnVal:
            return state.toMap().set('volumn',action.val)
        case actionType.setDuration:
            return state.toMap().set('duration', action.time)
        case actionType.setTotalTime:
            return state.toMap().set('totalTime', action.totalTime)
        case actionType.setCurrentTimeText:
            return state.toMap().set('currentTimeText', action.currentTimeText)
        case actionType.sethavePlay:
            return state.toMap().set('havePlay', action.status)
        case actionType.setVideoFooterBarAnimate:
            return state.toMap().set('videoFooterBarAnimate', action.status)
        case actionType.setInitialStatus:
            return state.toMap().set('initialStatus', action.status)
        default:
            return state
    }
}

export default callBackState