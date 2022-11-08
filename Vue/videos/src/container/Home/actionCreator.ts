import { actionType,actionCreatorType } from '.'

const {
    SET_SEARCH_TEXT,
    SET_TOKENS
} = actionType

const actionCreator:actionCreatorType = {
    setSearchText:({ commit }, val) => commit(SET_SEARCH_TEXT,val),
    setTokenGroup:({ commit }, obj) => commit(SET_TOKENS,obj),
}

export default actionCreator