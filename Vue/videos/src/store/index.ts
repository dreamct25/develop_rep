import { createStore } from 'vuex'
import { reducer as HomeReducer } from '../container/Home'

export default createStore({
    modules:{
        HomeReducer
    }
})