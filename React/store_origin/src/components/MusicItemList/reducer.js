import actionTypes from '../MusicItemList'
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
        case actionTypes.typesName.paginationObj:
            return state.set('paginationObj',action.obj)
        case actionTypes.typesName.setItemData:
            return state.set('itemData',action.data)
        case actionTypes.typesName.setItemDataTemp:
            return state.set('itemDataTemp',action.data)
        default:
            return state
    }
}

export default callBackState