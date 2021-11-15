import { actionCreatorType } from './types'
import actionType from './actionType'
import { paginationOptions, paginationType } from '../../class/paginationMethod/paginationMethod'

const actionCreator: actionCreatorType = {
    getSearchMovieItem: ({ searchVal, page,totalPage,haveAdult }: {[key:string]:string | number | boolean}): object => ({
        type: actionType.getSearchMovieItem,
        searchVal,
        page,
        totalPage,
        haveAdult
    }),
    setSearchMovieItem: (obj: { [key: string]: any }): object => ({
        type: actionType.setSearchMovieItem,
        obj
    }),
    setFullSearchMovieItem: (item: { [key: string]: any }[]): object => ({
        type: actionType.setFullSearchMovieItem,
        item
    }),
    setLoadingState: (status: boolean): object => ({
        type: actionType.setLoadingState,
        status
    }),
    setCurrentPageTemp:(page:number):object => ({
        type: actionType.setCurrentPageTemp,
        page
    }),
    setPaginationOption: (options: paginationOptions): object => ({
        type: actionType.setPaginationOption,
        options
    }),
    setPaginationObj: (obj: paginationType): object => ({
        type: actionType.setPaginationObj,
        obj
    }),
    setRenderData:(item:{[key:string]:any}[]):object => ({
        type: actionType.setRenderData,
        item
    }),
    setFilterValue:(obj:{[key:string]:any}):object => ({
        type: actionType.setFilterValue,
        obj
    }),
    setFilterListToggleAnimate:(status:boolean) => ({
        type: actionType.setFilterListToggleAnimate,
        status
    })
}

export default actionCreator