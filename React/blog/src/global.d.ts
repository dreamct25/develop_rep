import { FunctionComponent } from 'react'

declare global {
    type TSX = JSX.Element
    interface FC<P = {}> extends FunctionComponent<P> {}
    const pug:(...str:any) => JSX.Element
}

