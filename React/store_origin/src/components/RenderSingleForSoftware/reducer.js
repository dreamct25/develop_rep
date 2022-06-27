import actionTypes from '../RenderSingleForSoftware'
import { fromJS } from 'immutable'
const dataState = fromJS({
    supportToggle:false,
    descriptToggle:false,
    updateToggle:false
})

const callBackState = (state = dataState,action) => {
    switch(action.type){
        case actionTypes.typesName.supportToggle:
            return state.set('supportToggle',action.status)
        case actionTypes.typesName.descriptToggle:
            return state.set('descriptToggle',action.status)
        case actionTypes.typesName.updateToggle:
            return state.set('updateToggle',action.status)
        default:
            return state
    }
}

export default callBackState