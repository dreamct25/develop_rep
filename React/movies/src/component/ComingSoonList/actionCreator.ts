import actionType from "./actionType";
import { actionCreatorType } from './types'

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
    })
}

export default actionCreator