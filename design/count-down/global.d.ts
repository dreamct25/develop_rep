import { FunctionComponent } from 'react'

declare global {
    interface FC<P = {}> extends FunctionComponent<P> {}
    type TSX = JSX.Element
}