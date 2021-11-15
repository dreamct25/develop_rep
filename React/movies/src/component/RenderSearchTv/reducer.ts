import actionType from './actionType'
import { Collection, fromJS } from 'immutable'
import { Action, Reducer } from 'redux'

const dataState: Collection<any, any> = fromJS({
    data: [],
    newData:[],
    renderData:[],
    loadingState: false,
    currentPageTemp:1,
    paginationOption: {},
    paginationObj: {
        totalLength: 0,
        partPage: 0,
        pageTotal: 0,
        currentPage: 1,
        hasPrev: false,
        hasNext: true,
        pageSize: 0
    },
    filterListItem:[{
        title:'包含成人項',
        disTitle:'取消成人項',
        value:'adult'
    },{
        title:'按照日期項',
        disTitle:'取消日期項',
        value:'date'
    },{
        title:'按照評分項',
        disTitle:'取消評分項',
        value:'rate'
    }],
    filterValue:{},
    filterListToggle:false
})

const callBackState:Reducer<Collection<any, any>, Action<{ [key: string]: any }>> = (state: Collection<any, any> = dataState, action: { [key: string]: any }) => {
    switch (action.type) {
        case actionType.setSearchTvItem:
            return state.toMap().set('data', action.obj)
        case actionType.setFullSearchTvItem:
            return state.toMap().set('newData', action.item)
        case actionType.setRenderData:
            return state.toMap().set('renderData',action.item)
        case actionType.setLoadingState:
            return state.toMap().set('loadingState', action.status)
        case actionType.setCurrentPageTemp:
            return state.toMap().set('currentPageTemp',action.page)
        case actionType.setPaginationOption:
            return state.toMap().set('paginationOption', action.options)
        case actionType.setPaginationObj:
            return state.toMap().set('paginationObj', action.obj)
        case actionType.setFilterValue:
            return state.toMap().set('filterValue',action.obj)
        case actionType.setFilterListToggleAnimate:
            return state.toMap().set('filterListToggle',action.status)
        default:
            return state
    }
}

export default callBackState