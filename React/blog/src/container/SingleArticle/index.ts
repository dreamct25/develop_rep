import { lazy } from 'react'
import Container from './styles'

export default lazy(() => import('./SingleArticle'))

export * from './types'
export { Container }