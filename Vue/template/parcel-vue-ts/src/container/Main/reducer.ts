import { Module } from 'vuex'
import { actionType,actionCreator as actions,initStoreType,actionCreatorType } from '.'

const {
    SET_COUNT,
    SET_ARR
} = actionType

const reducer:Module<initStoreType,actionCreatorType> = {
    namespaced: true,
    state:{
        count: 0,
        arr:[]
    },
    actions,
    mutations:{
        [SET_COUNT]: (state,val) => state.count = val,
        [SET_ARR]: (state,val) => state.arr = [...state.arr,val]
    }
}

export default reducer