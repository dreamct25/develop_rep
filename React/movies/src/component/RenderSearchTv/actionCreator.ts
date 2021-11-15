import { actionCreatorType } from './types'
import actionType from './actionType'
import { paginationOptions, paginationType } from '../../class/paginationMethod/paginationMethod'

const actionCreator: actionCreatorType = {
    getSearchTvItem: ({ searchVal, page,totalPage }: {[key:string]:string | number}): object => ({
        type: actionType.getSearchTvItem,
        searchVal,
        page,
        totalPage
    }),
    setFullSearchTvItem: (item: { [key: string]: any }[]): object => ({
        type: actionType.setFullSearchTvItem,
        item
    }),
    setSearchTvItem: (obj: { [key: string]: any }): object => ({
        type: actionType.setSearchTvItem,
        obj
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