import { combineReducers } from 'redux'
import { reducer as PageIReducer } from '../container/PageI'

export default combineReducers({
    PageI:PageIReducer
})