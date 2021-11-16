import { actionCreatorTypes } from './types'
import actionType from './actionType'

const actionCreator: actionCreatorTypes = {
    setTotalTimes: (totalTime: string): object => ({
        type: actionType.setTotalTime,
        totalTime
    }),
    setDurations: (time: number): object => ({
        type: actionType.setDuration,
        time
    }),
    setCurrentTimeTexts: (currentTimeText: string): object => ({
        type: actionType.setCurrentTimeText,
        currentTimeText
    }),
    setHavePlays: (status: boolean): object => ({
        type: actionType.sethavePlay,
        status
    }),
    setVideoFooterBarAnimates: (status: boolean): object => ({
        type: actionType.setVideoFooterBarAnimate,
        status
    }),
    setInitialStatus: (status: boolean): object => ({
        type: actionType.setInitialStatus,
        status
    }),
    setVolumeVal:(val:string):object => ({
        type: actionType.setVolumeVal,
        val
    }),
    setVolumeSliderToggle:(status:boolean):object => ({
        type: actionType.setVolumeSliderToggle,
        status
    })
}

export default actionCreator