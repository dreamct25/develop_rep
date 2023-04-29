import { createStore,compose, Store } from 'redux'
import reducers from './reducers'
import { reducerAssimbleTypes } from './reducerAssimbleTypes'

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const store:Store<reducerAssimbleTypes> = createStore(reducers,composeEnhancers())

export default store