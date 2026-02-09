import { FunctionComponent } from 'react'

declare global {

    type TSX = JSX.Element

    type FC<P = {}> = FunctionComponent<P>
}
