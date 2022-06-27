import actionType from './actionType'
import { Collection, fromJS } from 'immutable'
import { Action, Reducer } from 'redux'

const dataState: Collection<any, any> = fromJS({
    volume: "50",
    progress: 0,
    duration: 0,
    totalTime: "0",
    currentTimeText: '',
    havePlay: false,
    videoFooterBarAnimate: false,
    initialStatus: false,
    volumeSliderToggle:false,
    volumeTextToggle:false
})

const callBackState:Reducer<Collection<any, any>, Action<{ [key: string]: any }>> = (state: Collection<any, any> = dataState, action: { [key: string]: any }) => {
    switch (action.type) {
        case actionType.setVolumeVal:
            return state.toMap().set('volume',action.val)
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
        case actionType.setVolumeSliderToggle:
            return state.toMap().set('volumeSliderToggle', action.status)
        case actionType.setVolumeTextToggle:
            return state.toMap().set('volumeTextToggle', action.status)
        default:
            return state
    }
}

export default callBackState