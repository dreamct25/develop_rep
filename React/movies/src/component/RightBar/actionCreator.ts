import actionType from './actionType'
import { actionCreatorType } from './types'
const actions: actionCreatorType = {
    setRightBarSearchVal: (val: string): object => ({
        type: actionType.setRightBarSearchVal,
        val
    }),
    setRightBarSelectVal: (val: string): object => ({
        type: actionType.setRightBarSelectVal,
        val
    }),
    setSearchBarToggleAnimate: (status: boolean): object => ({
        type: actionType.setSearchBarToggleAnimate,
        status
    })
}

export default actions