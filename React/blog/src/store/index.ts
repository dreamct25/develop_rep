import { createStore,Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'
import { reducerAssimbleType } from './reducerAssimbleType'

const store:Store<reducerAssimbleType> = createStore(reducers,composeWithDevTools())

export default store
