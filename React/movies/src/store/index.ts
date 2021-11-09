import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../store/reducer'
import createSaga from 'redux-saga'
import sagas from '../store/saga'
const sagaMiddleWare = createSaga()

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleWare))
)

sagaMiddleWare.run(sagas)

export default store