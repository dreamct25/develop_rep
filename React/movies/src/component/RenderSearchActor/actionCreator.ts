import { actionCreatorType } from './types'
import actionType from './actionType'
import { paginationOptions, paginationType } from '../../class/paginationMethod/paginationMethod'

const actionCreator: actionCreatorType = {
    getSearchActorItem: ({ searchVal, page,totalPage }: { [key:string]:string | number }): object => ({
        type: actionType.getSearchActorItem,
        searchVal,
        page,
        totalPage
    }),
    setSearchActorItem: (obj: object): object => ({
        type: actionType.setSearchActorItem,
        obj
    }),
    setFullSearchActorItem: (item: { [key: string]: any }[]): object => ({
        type: actionType.setFullSearchActorItem,
        item
    }),
    setLoadingState: (status: boolean): object => ({
        type: actionType.setLoadingState,
        status
    }),
    setCurrentSelectId: (id: number): object => ({
        type: actionType.setCurrentSelectId,
        id
    }),
    setCastModalToggel: (status: boolean): object => ({
        type: actionType.setCastModalToggel,
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
    })
}

export default actionCreator