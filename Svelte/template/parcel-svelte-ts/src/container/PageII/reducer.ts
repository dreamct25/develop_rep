import { initStoreStateType,actionType } from '.'

const initStoreState:initStoreStateType = {
    memberList:[]
}

const {
    SET_MEMBER
} = actionType

const reducer:(state:initStoreStateType,action:{ type:string,[key:string]:any }) => initStoreStateType = (state = initStoreState,action) => ({
    [action.type]:state,
    [SET_MEMBER]: { ...state,memberList:[...state.memberList,action.memberContent]  },
})[action.type]

export default reducer