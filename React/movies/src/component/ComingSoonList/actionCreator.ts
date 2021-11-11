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
    setMovieTitle: (title: string): object => ({
        type: actionType.setMovieTitle,
        title
    }),
    getItemPage: ({ searchVal, page }: { searchVal: string, page: number }): object => ({
        type: actionType.getItemPage,
        searchVal,
        page
    }),
    setLoadingState: (status: boolean): object => ({
        type: actionType.setLoadingState,
        status
    }),
    setPaginationOption: (options: paginationOptions): object => ({
        type: actionType.setPaginationOption,
        options
    }),
    setPaginationObj: (obj: paginationType): object => ({
        type: actionType.setPaginationObj,
        obj
    })
}

export default actionCreator