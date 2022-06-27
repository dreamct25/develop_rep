import actionType from './actionType'
import { actionCreatorType } from './types'
const actionCreator: actionCreatorType = {
    postItemVal: (obj,val) => ({
        type: actionType.postItem,
        obj,
        val
    }),
    getSingleMovie: id => ({
        type: actionType.getSingleItem,
        id
    }),
    getCurrentSelect: id => ({
        type: actionType.currentSelect,
        id
    }),
    setToggleBarAnimate: status => ({
        type: actionType.toggleBarAnimate,
        status
    }),
    setSearchVal: val => ({
        type: actionType.setSearchVal,
        val
    }),
    setHotItemType: val => ({
        type: actionType.setHotItemType,
        val
    })
}

export default actionCreator