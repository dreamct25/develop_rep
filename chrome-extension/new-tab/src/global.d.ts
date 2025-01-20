import { FunctionComponent } from 'react'

declare global {

    type TSX = JSX.Element

    // eslint-disable-next-line @typescript-eslint/ban-types
    type FC<P = {}> = FunctionComponent<P>

    interface ActionPayLoad<S,P extends keyof S> {
        payload: S[P];
    }
}
