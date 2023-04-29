import { lazy } from 'react'
import actionType from './actionType'
import actionCreator from './actionCreator'
import reducer from './reducer'
export * from './types'

const Main = lazy(() => import('./Main'))

export { Main,actionType,actionCreator,reducer }