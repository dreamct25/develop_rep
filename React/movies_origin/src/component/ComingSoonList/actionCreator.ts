import actionType from "./actionType";
import { actionCreatorType } from './types'

const actionCreator: actionCreatorType = {
    getItem: (page,totalPage) => ({
        type: actionType.getItem,
        page,
        totalPage
    }),
    setItem: obj => ({
        type: actionType.setItem,
        obj
    }),
    setFullItem: item => ({
        type: actionType.setFullItem,
        item
    }),
    setLoadingState: status => ({
        type: actionType.setLoadingState,
        status
    }),
    setCurrentPageTemp: page => ({
        type: actionType.setCurrentPageTemp,
        page
    }),
    setPaginationOption: options => ({
        type: actionType.setPaginationOption,
        options
    }),
    setPaginationObj: obj => ({
        type: actionType.setPaginationObj,
        obj
    }),
    setRenderData:item => ({
        type: actionType.setRenderData,
        item
    })
}

export default actionCreator