import actionTypes from '../Dialog'
import { fromJS } from 'immutable'
const dataState = fromJS({
    dialogIsOpen:false
})

const callBackState = (state = dataState,action) => {
    switch(action.type){
        case actionTypes.typesName.dialogIsOpen:
            return state.set('dialogIsOpen',action.status)
        default:
            return state
    }
}

export default callBackState