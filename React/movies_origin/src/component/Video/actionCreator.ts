import { actionCreatorTypes } from './types'
import actionType from './actionType'

const actionCreator: actionCreatorTypes = {
    setTotalTimes: totalTime => ({
        type: actionType.setTotalTime,
        totalTime
    }),
    setDurations: time => ({
        type: actionType.setDuration,
        time
    }),
    setCurrentTimeTexts: currentTimeText => ({
        type: actionType.setCurrentTimeText,
        currentTimeText
    }),
    setHavePlays: status => ({
        type: actionType.sethavePlay,
        status
    }),
    setVideoFooterBarAnimates: status => ({
        type: actionType.setVideoFooterBarAnimate,
        status
    }),
    setInitialStatus: status => ({
        type: actionType.setInitialStatus,
        status
    }),
    setVolumeVal: val => ({
        type: actionType.setVolumeVal,
        val
    }),
    setVolumeSliderToggle: status => ({
        type: actionType.setVolumeSliderToggle,
        status
    }),
    setVolumeTextToggle: status => ({
        type: actionType.setVolumeTextToggle,
        status
    })
}

export default actionCreator