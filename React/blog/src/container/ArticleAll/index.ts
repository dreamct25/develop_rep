import { lazy } from 'react'
import Container from './styles'

export default lazy(() => import('./ArticleAll'))

export * from './types'
export { Container }