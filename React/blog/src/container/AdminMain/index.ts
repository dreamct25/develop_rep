import { lazy } from 'react'
import Container from './styles'
import { actionCreator } from '../AdminLogin'

export default lazy(() => import('./AdminMain'))

export { Container,actionCreator }