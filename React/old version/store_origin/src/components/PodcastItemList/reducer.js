import actionTypes from '../PodcastItemList'
import { fromJS } from 'immutable'
const dataState = fromJS({
    singleData:[],
    hasGetData:false,
    currentItemX:0,
    currentItemY:0,
    paginationObj:{},
    itemData:[],
    itemDataTemp:[]
})

const callBackState = (state = dataState,action) => {
    switch(action.type){
        case actionTypes.typesName.getSingleItem:
            return state.set('singleData',action.data)
        case actionTypes.typesName.currentItemX:
            return state.set('currentItemX',action.posX)
        case actionTypes.typesName.currentItemY:
            return state.set('currentItemY',action.posY)
        case actionTypes.typesName.hasGetData:
            return state.set('hasGetData',action.status)
        case actionTypes.typesName.paginationObjForPodcastItem:
            return state.set('paginationObj',action.obj)
        case actionTypes.typesName.setItemDataForPodcastItem:
            return state.set('itemData',action.data)
        case actionTypes.typesName.setItemDataTempForPodcastItem:
            return state.set('itemDataTemp',action.data)
        default:
            return state
    }
}

export default callBackState