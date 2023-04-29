import { actionType,actionCreatorType } from '.'

const {
    SET_COUNT,
    SET_ARR
} = actionType

const actionCreator:actionCreatorType = {
    setCount:count => ({ type:SET_COUNT,count }),
    setArr:num => ({ type:SET_ARR,num })
}

export default actionCreator
