import { combineReducers } from 'redux'
import { reducer as MainReducer } from '../container/Main'
import { reducer as AdminLoginReducer } from '../container/AdminLogin'

export default combineReducers({
    MainReducer,
    AdminLoginReducer
})