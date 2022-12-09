import { lazy } from 'react'
import Container from './styles'
export default lazy(() => import('./AdminArticle'))

export * from './types'
export { Container }