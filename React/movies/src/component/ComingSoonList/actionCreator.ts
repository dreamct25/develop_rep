import actionType from "./actionType";
import { actionCreatorType } from './types'
import { paginationOptions, paginationType } from '../../class/paginationMethod/paginationMethod'

const actionCreator: actionCreatorType = {
    getItem: (page: number, totalPage: number): object => ({
        type: actionType.getItem,
        page,
        totalPage
    }),
    setItem: (obj: object): object => ({
        type: actionType.setItem,
        obj
    }),
    setFullItem: (item: { [key: string]: any }[]): object => ({
        type: actionType.setFullItem,
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
    })
}

export default actionCreator