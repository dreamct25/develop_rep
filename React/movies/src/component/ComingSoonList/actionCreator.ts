import actionType from "./actionType";
import { actionCreatorType } from './types'

const actionCreator:actionCreatorType = {
    getItem:(page:number):object => ({
        type:actionType.getItem,
        page
    }),
    setItem:(obj:object):object => ({
        type:actionType.setItem,
        obj
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