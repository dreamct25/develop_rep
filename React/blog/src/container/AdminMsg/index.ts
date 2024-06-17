import { lazy } from 'react'
import Container from './styles'

export default lazy(() => import('./AdminMsg'))

export * from './types'
export { Container }