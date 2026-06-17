import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import * as reducers from './reducers'
import { type InitStoreAssimbleType } from './reducerAssimbleType'

const store = create<InitStoreAssimbleType>()(
    immer(
        devtools(
            (set, get, store) => ({
                ...reducers
            })
            ,{
                name: 'store',
                enabled: import.meta.env.VITE_APP_ENV === 'development' // 開發環境用 true | 生產環境用 false
            }
        )
    )
)

type Store = typeof store

export { store, type Store }

