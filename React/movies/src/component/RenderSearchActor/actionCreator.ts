import { actionCreatorType } from './types'
import actionType from './actionType'

const actionCreator: actionCreatorType = {
    getSearchActorItem: ({ searchVal, page }: { searchVal: string, page: number }): object => ({
        type: actionType.getSearchActorItem,
        searchVal,
        page
    }),
    setSearchActorItem: (obj: object): object => ({
        type: actionType.setSearchActorItem,
        obj
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
    })
}

export default actionCreator