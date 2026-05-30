import { FunctionComponent } from 'react'
import router from '@/routes'

declare global {

    type TSX = JSX.Element

    type FC<P = Record<string, any>> = FunctionComponent<P>

    interface ActionPayLoad<S,P extends keyof S> {
        payload: S[P];
    }
}


// declare module '@tanstack/react-router' {
//   interface Register {
//     router: typeof router
//   }
// }
