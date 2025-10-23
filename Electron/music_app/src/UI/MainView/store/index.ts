import { configureStore,Store } from '@reduxjs/toolkit'
import reducers from './reducers'
import { reducerAssimbleType } from './reducerAssimbleType'

const store:Store<reducerAssimbleType> = configureStore({
    reducer: reducers,
    devTools:false,
})

export default store

