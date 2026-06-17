import { actionCreatorType } from './types'
import actionType from './actionType'

const actionCreator: actionCreatorType = {
    getSearchMovieItem: ({ searchVal, page, totalPage, haveAdult }) => ({
        type: actionType.getSearchMovieItem,
        searchVal,
        page,
        totalPage,
        haveAdult
    }),
    setSearchMovieItem: obj => ({
        type: actionType.setSearchMovieItem,
        obj
    }),
    setFullSearchMovieItem: item => ({
        type: actionType.setFullSearchMovieItem,
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