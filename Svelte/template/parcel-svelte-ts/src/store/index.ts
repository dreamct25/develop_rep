import { createStore,Store } from 'redux'
import { bindTracked } from 'svelte3-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducerAssimbleType } from './reducerTypeAssimble'
import reducers from './reducers'

const store:Store<reducerAssimbleType> = createStore(reducers,composeWithDevTools())

let storeTracking:reducerAssimbleType | undefined;

const trackingStore = bindTracked(store)

const { subscribe,dispatch } = trackingStore

subscribe(stores => storeTracking = stores)

export { storeTracking as store, dispatch, trackingStore as renderFromStore }