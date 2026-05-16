import { FunctionComponent } from 'react'

declare global {
    
    type FC<P = {}> = FunctionComponent<P>

    type TSX = JSX.Element

    interface Window {
        registration?: ServiceWorkerRegistration;
    }

    interface Navigator {
        standalone?: boolean
    }
}

export {}