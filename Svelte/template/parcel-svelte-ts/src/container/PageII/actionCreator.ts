import { actionType,actionCreatorType } from '.'

const {
    SET_MEMBER
} = actionType

const actionCreator:actionCreatorType = {
    setMember:memberContent => ({ type:SET_MEMBER,memberContent })
}

export default actionCreator
