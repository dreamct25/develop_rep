import { FunctionComponent } from 'react'

declare global {
    
    const MAIN_WINDOW_VITE_DEV_SERVER_URL: string
    const MAIN_WINDOW_VITE_NAME: string

    type FC<P = {}> = FunctionComponent<P>
    type TSX = JSX.Element
    
    interface ActionPayLoad<S,P extends keyof S> {
        payload: S[P];
    }
}

// export {}