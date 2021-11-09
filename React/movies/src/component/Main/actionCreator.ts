import actionType from './actionType'
import { actionCreatorType } from './types'
const actionCreator: actionCreatorType = {
    postItemVal: (obj: object,val:string): object => ({
        type: actionType.postItem,
        obj,
        val
    }),
    getSingleMovie: (id: number): object => ({
        type: actionType.getSingleItem,
        id
    }),
    getCurrentSelect: (id: number): object => ({
        type: actionType.currentSelect,
        id
    }),
    setToggleBarAnimate: (status: boolean): object => ({
        type: actionType.toggleBarAnimate,
        status
    }),
    setSearchVal: (val: { [key: string]: any }): object => ({
        type: actionType.setSearchVal,
        val
    }),
    setHotItemType:(val:string):object => ({
        type: actionType.setHotItemType,
        val
    })
}

export default actionCreator