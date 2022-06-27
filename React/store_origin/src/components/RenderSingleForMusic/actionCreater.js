import actionType from '../RenderSingleForMusic'

const actions = {
    getRangeVal:(val) => ({
        type:actionType.typesName.rangeVal,
        val
    }),
    getMaxRangeVal:(val) => ({
        type:actionType.typesName.rangeMaxVal,
        val
    }),
    getTrackDurationVal:(val) => ({
        type:actionType.typesName.trakcDurationVal,
        val
    }),
    currentPlayState:(status) => ({
        type:actionType.typesName.isPlayed,
        status
    }),
    setTimer:(item) => ({
        type:actionType.typesName.timer,
        item
    }),
    showInputToggle:(status) => ({
        type:actionType.typesName.showInputToggle,
        status
    })
}

export default actions