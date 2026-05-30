import actionType from '../PodcastItemList'
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
    getSingleItems: (id) => (
        dispatch => (
            axios.post(`https://itunes.apple.com/lookup?id=${id}&country=tw`).then(
            res => {
                dispatch(thunkAction.hasGetData(false))
                if(res.status === 200){
                    const action = thunkAction.getSingle(res.data.results)
                    dispatch(action)
                    dispatch(thunkAction.hasGetData(true))
                }
            })
        )
    ),
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
    setPagination:(obj) => ({
        type:actionType.typesName.paginationObjForPodcastItem,
        obj
    }),
    setItemData:(data) => ({
        type:actionType.typesName.setItemDataForPodcastItem,
        data
    }),
    setItemDataTemp:(data) => ({
        type:actionType.typesName.setItemDataTempForPodcastItem,
        data
    }),
    clearSingleData:(data) => ({
        type:actionType.typesName.clearSingleData,
        data
    }),
    hasGetData:(status) => ({
        type:actionType.typesName.hasGetData,
        status
    })
}

export default actions