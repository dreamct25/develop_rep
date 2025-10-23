import { lazy } from 'react'
import actionType from './actionType'
import actionCreator from './actionCreator'
import Container from './styles'
import reducer from './reducer'

export default lazy(() => import('./AdminLogin'))

export * from './types'
export { Container,actionType,actionCreator,reducer }