import { lazy } from 'react'
import actionType from './actionType'
import actionCreator from './actionCreator'
import reducer from './reducer'
import Container from './styles'

export * from './types'
export default lazy(() => import('./Main'))

export { Container,actionType,actionCreator,reducer }