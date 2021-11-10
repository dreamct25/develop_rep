import { createStore, applyMiddleware, compose, Store } from 'redux'
import { Collection } from 'immutable'
import reducer from '../store/reducer'
import createSaga, { SagaMiddleware } from 'redux-saga'
import sagas from '../store/saga'
const sagaMiddleWare:SagaMiddleware<object> = createSaga()

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const store:Store<Collection<any,any>> = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleWare))
)

sagaMiddleWare.run(sagas)

export default store