import actionType from './actionType'
import { actionCreatorType } from './types'
const actions: actionCreatorType = {
    setRightBarSearchVal: val => ({
        type: actionType.setRightBarSearchVal,
        val
    }),
    setRightBarSelectVal: val => ({
        type: actionType.setRightBarSelectVal,
        val
    }),
    setSearchBarToggleAnimate: status => ({
        type: actionType.setSearchBarToggleAnimate,
        status
    })
}

export default actions