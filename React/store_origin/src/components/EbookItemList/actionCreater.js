import actionType from '../EbookItemList'

const actions = {
    getCurrentItemX: (posX) => ({
        type:actionType.typesName.currentItemX,
        posX
    }),
    getCurrentItemY: (posY) => ({
        type:actionType.typesName.currentItemY,
        posY
    }),
    changePreviewFrameToggle:(status) => ({
        type:actionType.typesName.previewFrameToggle,
        status
    }),
    setCurrentTargetId:(txt) => ({
        type:actionType.typesName.currentTragetId,
        txt
    }),
    setPagination:(obj) => ({
        type:actionType.typesName.paginationObj,
        obj
    }),
    setItemData:(data) => ({
        type:actionType.typesName.setItemData,
        data
    }),
    setItemDataTemp:(data) => ({
        type:actionType.typesName.setItemDataTemp,
        data
    })
}

export default actions