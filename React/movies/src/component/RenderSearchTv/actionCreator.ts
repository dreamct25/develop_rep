import { actionCreatorType } from './types'
import actionType from './actionType'

const actionCreator: actionCreatorType = {
    getSearchTvItem: ({ searchVal, page }: { searchVal: string, page: number }): object => ({
        type: actionType.getSearchTvItem,
        searchVal,
        page
    }),
    setSearchTvItem: (obj: { [key: string]: any }): object => ({
        type: actionType.setSearchTvItem,
        obj
    }),
    setLoadingState: (status: boolean): object => ({
        type: actionType.setLoadingState,
        status
    })
}

export default actionCreator