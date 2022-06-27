import { actionCreatorType } from './types'
import actionType from './actionType'

const actionCreator: actionCreatorType = {
    getSingleCastItem: val => ({
        type: actionType.getSingleCastItem,
        val
    }),
    setSingleCastItem: obj => ({
        type: actionType.setSingleCastItem,
        obj
    }),
    setMoviePostToggle: status => ({
        type: actionType.setMoviePostToggle,
        status
    }),
    setLoadingState: status => ({
        type: actionType.setLoadingState,
        status
    }),
    setPostPath: path => ({
        type: actionType.setPostPath,
        path
    })
}

export default actionCreator