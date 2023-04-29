import { actionType,initStoreType } from '.'

const initStore:initStoreType = {
    arr:[],
    counts:0
}

const {
    SET_ARR,
    SET_COUNTS
} = actionType

const reducer:(state:initStoreType,action:{ type:string,[key:string]:any }) => initStoreType = (state = initStore,action) => ({
    [action.type]: state, // when initialize
    [SET_ARR]: { ... state,arr:[...state.arr,action.val] },
    [SET_COUNTS]: { ...state,counts: action.val }
})[action.type]

export default reducer