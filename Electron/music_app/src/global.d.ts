import { FunctionComponent } from 'react'

declare global {

    type FC<P = {}> = FunctionComponent<P>
    type TSX = JSX.Element
    
    interface ActionPayLoad<S,P extends keyof S> {
        payload: S[P];
    }

    interface IniFileType {
        AppInfo: { author: string, version: string }
    }

    namespace NodeJS {

        interface ProcessEnv {
            APP_ENV: string
        }
    }
}

// export {}