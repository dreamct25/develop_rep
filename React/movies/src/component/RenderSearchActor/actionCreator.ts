import { actionCreatorType } from './types'
import actionType from './actionType'

const actionCreator: actionCreatorType = {
    getSearchActorItem: ({ searchVal, page,totalPage }) => ({
        type: actionType.getSearchActorItem,
        searchVal,
        page,
        totalPage
    }),
    setSearchActorItem: obj => ({
        type: actionType.setSearchActorItem,
        obj
    }),
    setFullSearchActorItem: item => ({
        type: actionType.setFullSearchActorItem,
        item
    }),
    setLoadingState: status => ({
        type: actionType.setLoadingState,
        status
    }),
    setCurrentSelectId: id => ({
        type: actionType.setCurrentSelectId,
        id
    }),
    setCastModalToggel: status => ({
        type: actionType.setCastModalToggel,
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
    setRenderData: item => ({
        type: actionType.setRenderData,
        item
    })
}

export default actionCreator