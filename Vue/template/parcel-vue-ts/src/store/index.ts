import { createStore } from 'vuex'
import { reducer as MainReducer } from '../container/Main'

export default createStore({
    modules:{
        MainReducer
    }
})