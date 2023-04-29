import { combineReducers } from 'redux'
import { reducer as PageIReducer } from '../container/PageI'
import { reducer as PageIIReducer } from '../container/PageII'

export default combineReducers({
    PageIReducer,
    PageIIReducer
})