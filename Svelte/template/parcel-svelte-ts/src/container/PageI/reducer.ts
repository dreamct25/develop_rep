import { initStoreStateType,actionType } from '.'

const initStoreState:initStoreStateType = {
    count:0,
    arr:[]
}

const {
    SET_COUNT,
    SET_ARR
} = actionType

const reducer:(state:initStoreStateType,action:{ type:string,[key:string]:any }) => initStoreStateType = (state = initStoreState,action) => ({
    [action.type]:state,
    [SET_COUNT]: { ...state,count:action.count  },
    [SET_ARR]: { ...state,arr: [...state.arr,action.num] }
})[action.type]

export default reducer