import { createStore,compose } from 'redux'
import { bind } from 'svelte3-redux'
import reducers from './reducers'

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const store = bind(createStore(reducers,composeEnhancers()))

export default store
