import { actionCreatorType } from './types'
import actionType from './actionType'

const actionCreator: actionCreatorType = {
    getSingleCastItem: (val: number): object => ({
        type: actionType.getSingleCastItem,
        val
    }),
    setSingleCastItem: (obj: object): object => ({
        type: actionType.setSingleCastItem,
        obj
    }),
    setMoviePostToggle: (status: boolean): object => ({
        type: actionType.setMoviePostToggle,
        status
    }),
    setLoadingState:(status:boolean):object => ({
        type: actionType.setLoadingState,
        status
    }),
    setPostPath:(path:string):object => ({
        type: actionType.setPostPath,
        path
    })
}

export default actionCreator