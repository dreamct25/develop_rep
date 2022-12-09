import { actionType,initStoreType } from '.'

const initStore:initStoreType = {
    articleData:[]
}

const {
    SET_ARTICLE_DATA
} = actionType

const reducer:(store:initStoreType,action:{ type:string,[key:string]:any }) => initStoreType = (store = initStore,action) => ({
    [action.type]:store,
    [SET_ARTICLE_DATA]:{ ...store,articleData:action.data }
})[action.type]

export default reducer