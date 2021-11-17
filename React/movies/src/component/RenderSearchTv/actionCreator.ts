import { actionCreatorType } from './types'
import actionType from './actionType'

const actionCreator: actionCreatorType = {
    getSearchTvItem: ({ searchVal, page, totalPage }) => ({
        type: actionType.getSearchTvItem,
        searchVal,
        page,
        totalPage
    }),
    setSearchTvItem: obj => ({
        type: actionType.setSearchTvItem,
        obj
    }),
    setFullSearchTvItem: item => ({
        type: actionType.setFullSearchTvItem,
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
    setRenderData: item => ({
        type: actionType.setRenderData,
        item
    }),
    setFilterValue: obj => ({
        type: actionType.setFilterValue,
        obj
    }),
    setFilterListToggleAnimate: status => ({
        type: actionType.setFilterListToggleAnimate,
        status
    })
}

export default actionCreator