import actionType from '../RenderSingleForMusicVideo'

const actions = {
    changePlayedState:(status) => ({
        type:actionType.typesName.isPlayed,
        status
    }),
    changeRangeVal:(val) => ({
        type:actionType.typesName.rangeVal,
        val
    }),
    changeRangeMaxVal:(val) => ({
        type:actionType.typesName.rangeMaxVal,
        val
    }),
    setTimer:(timer) => ({
        type:actionType.typesName.setTimer,
        timer
    }),
    changeDurationTime:(val) => ({
        type:actionType.typesName.durationTime,
        val
    }),
    changeVoiceVal:(val) => ({
        type:actionType.typesName.voiceVal,
        val
    }),
    changeTextShowState:(status) => ({
        type:actionType.typesName.textShowToggle,
        status
    }),
    changeTextShowContent:(txt) => ({
        type:actionType.typesName.textShowContent,
        txt
    }),
    changeVideoBarToggle:(status) => ({
        type:actionType.typesName.videoBarToggle,
        status
    }),
    changeVoiceValToggle:(status) => ({
        type:actionType.typesName.voiceValToggle,
        status
    })
}

export default actions