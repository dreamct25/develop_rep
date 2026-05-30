import actionType from '../SoftwareItemList'
import axios from 'axios'

const thunkAction = {
    getSingle:(data)=>({
        type:actionType.typesName.getSingleItem,
        data
    }),
    hasGetData:(status) => ({
        type:actionType.typesName.hasGetData,
        status
    })
}

const actions = {
    getSingleItems: (id) => {
        return dispatch => (
            axios.post(`https://itunes.apple.com/lookup?id=${id}&country=tw`).then(
            res=>{
                dispatch(thunkAction.hasGetData(false))
                if(res.status === 200){
                    const action = thunkAction.getSingle(res.data.results)
                    dispatch(action)
                    dispatch(thunkAction.hasGetData(true))
                }
            })
        )
    },
    showSingleDialog: (status) => ({
        type:actionType.typesName.hasGetData,
        status
    }),
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
    getCurrentTargetId:(id) => ({
        type:actionType.typesName.currentTargetId,
        id
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