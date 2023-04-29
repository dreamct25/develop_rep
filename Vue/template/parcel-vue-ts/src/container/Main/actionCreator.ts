import { actionType,actionCreatorType } from '.'

const {
    SET_COUNT,
    SET_ARR
} = actionType

const actionCreator:actionCreatorType = {
    setCount:({ commit }, val) => commit(SET_COUNT,val),
    setArr:({ commit }, val) => commit(SET_ARR,val),
}

export default actionCreator