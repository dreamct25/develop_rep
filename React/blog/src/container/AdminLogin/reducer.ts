import { actionType,initStoreType } from '.'

const {
    SET_AUTH_INFO
} = actionType

const initStore:initStoreType = {
    authInfo:{
        ac:'',
        token:''
    }
}

const reducer:(store:initStoreType,action:{ type:string,[key:string]:any }) => initStoreType = (store = initStore,action) => ({
    [action.type]: store,
    [SET_AUTH_INFO]: { ...store,authInfo:action.obj }
})[action.type]

export default reducer

