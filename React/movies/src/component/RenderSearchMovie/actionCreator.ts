import { actionCreatorType } from './types'
import actionType from './actionType'

const actionCreator: actionCreatorType = {
    getSearchMovieItem: ({ searchVal, page }: { searchVal: string, page: number }): object => ({
        type: actionType.getSearchMovieItem,
        searchVal,
        page
    }),
    setSearchMovieItem: (obj: { [key: string]: any }): object => ({
        type: actionType.setSearchMovieItem,
        obj
    }),
    setLoadingState: (status: boolean): object => ({
        type: actionType.setLoadingState,
        status
    })
}

export default actionCreator