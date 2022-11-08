import { Module } from 'vuex'
import { actionType, actions,initStoreType,actionCreatorType } from '.'

const {
    SET_SEARCH_TEXT,
    SET_TOKENS
} = actionType

const reducer:Module<initStoreType,actionCreatorType> = {
    namespaced: true,
    state:{
        searchText: '',
        tokenGroup:{
            token:undefined,
            tokenStr:undefined,
            backName:''
        }
    },
    actions,
    mutations:{
        [SET_SEARCH_TEXT]: (state,val) => state.searchText = val,
        [SET_TOKENS]: (state,obj) => state.tokenGroup = obj
    }
}

export default reducer