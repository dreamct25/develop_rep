import actionType from './actionType'
import { Collection, fromJS } from 'immutable'
import { Action, Reducer } from 'redux'

const dataState: Collection<any, any> = fromJS({
    data: [],
    newData: [],
    renderData: [],
    movieTitle: '',
    loadingState: false,
    paginationOption: {
        pages: 1,
        partPage: 10,
        pageSize: 10
    },
    paginationObj: {
        totalLength: 0,
        partPage: 0,
        pageTotal: 0,
        currentPage: 1,
        hasPrev: false,
        hasNext: true,
        pageSize: 0
    }
})

const callBackState: Reducer<Collection<any, any>, Action<{ [key: string]: any }>> = (state: Collection<any, any> = dataState, action: { [key: string]: any }) => {
    switch (action.type) {
        case actionType.setItem:
            return state.toMap().set('data', action.obj)
        case actionType.setFullItem:
            return state.toMap().set('newData', action.item)
        case actionType.setMovieTitle:
            return state.toMap().set('movieTitle', action.title)
        case actionType.setLoadingState:
            return state.toMap().set('loadingState', action.status)
        case actionType.setPaginationOption:
            return state.toMap().set('paginationOption', action.options)
        case actionType.setPaginationObj:
            return state.toMap().set('paginationObj', action.obj)
        default:
            return state
    }
}

export default callBackState