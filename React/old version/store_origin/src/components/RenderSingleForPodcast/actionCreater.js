import actionType from '../RenderSingleForPodcast'

const actions = {
    postXMLListData:(data,imgUrl) => ({
        type:actionType.typesName.xmlListData,
        data,
        imgUrl
    }),
    changeContentState:(status) => ({
        type:actionType.typesName.contentToggle,
        status
    }),
    getCurrentTargetId:(id) => ({
        type:actionType.typesName.currentTargetId,
        id
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
    }),
    setPagination:(obj) => ({
        type:actionType.typesName.paginationObjPodcastSingle,
        obj
    }),
    setItemData:(data) => ({
        type:actionType.typesName.setItemDataPodcastSingle,
        data
    }),
    setItemDataTemp:(data) => ({
        type:actionType.typesName.setItemDataTempPodcastSingle,
        data
    })
}

export default actions