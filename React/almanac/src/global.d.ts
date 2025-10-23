import { FunctionComponent } from 'react'

declare global {
    
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    type FC<P = {}> = FunctionComponent<P>

    type TSX = JSX.Element
}

export {}