import actionTypes from '../RenderSingleForMusicVideo'
import { fromJS } from 'immutable'
const dataState = fromJS({
    isPlayed:false,
    rangeVal:0,
    rangeMaxVal:0,
    voiceVal:0,
    voiceValToggle:false,
    timer:null,
    durationTime:0,
    textShowToggle:false,
    textShowContent:"",
    videoBarToggle:false
})

const timeFormate = timeVal => {
    if (isNaN(timeVal) === true) timeVal = 0;
    let min = Math.floor(timeVal / 60)
    let sec = Math.floor(timeVal) - min * 60
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;
    return `${min} : ${sec}`;
}

const callBackState = (state = dataState,action) => {
    switch(action.type){
        case actionTypes.typesName.isPlayed:
            return state.set('isPlayed',action.status)
        case actionTypes.typesName.rangeVal:
            return state.set('rangeVal',action.val)
        case actionTypes.typesName.rangeMaxVal:
            return state.set('rangeMaxVal',action.val)
        case actionTypes.typesName.setTimer:
            return state.set('timer',action.timer)
        case actionTypes.typesName.durationTime:
            return state.set('durationTime',timeFormate(action.val))
        case actionTypes.typesName.voiceVal:
            return state.set('voiceVal',action.val)
        case actionTypes.typesName.textShowToggle:
            return state.set('textShowToggle',action.status)
        case actionTypes.typesName.textShowContent:
            return state.set('textShowContent',action.txt)
        case actionTypes.typesName.videoBarToggle:
            return state.set('videoBarToggle',action.status)
        case actionTypes.typesName.voiceValToggle:
            return state.set('voiceValToggle',action.status)
        default:
            return state
    }
}

export default callBackState