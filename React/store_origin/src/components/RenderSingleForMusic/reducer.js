import actionTypes from '../RenderSingleForMusic'
import { fromJS } from 'immutable'
const dataState = fromJS({
    rangeVal:0,
    rangeMaxVal:0,
    trackDurationVal:"",
    isPlayed:false,
    timer:null,
    showInputToggle:false
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
        case actionTypes.typesName.rangeVal:
            return state.set("rangeVal",action.val)
        case actionTypes.typesName.rangeMaxVal:
            return state.set("rangeMaxVal",action.val)
        case actionTypes.typesName.trakcDurationVal:
            return state.set("trackDurationVal",timeFormate(action.val))
        case actionTypes.typesName.isPlayed:
            return state.set("isPlayed",action.status)
        case actionTypes.typesName.timer:
            return state.set('timer',action.item)
        case actionTypes.typesName.showInputToggle:
            return state.set('showInputToggle',action.status)
        default:
            return state
    }
}

export default callBackState