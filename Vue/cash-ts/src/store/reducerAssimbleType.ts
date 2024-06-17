import { storeType as LoginReducer } from '../container/Login'
import { storeType as MainReducer } from '../container/Main'

export interface reducerAssimbleType {
    Login: LoginReducer,
    Main: MainReducer<true>
}

export type storeMemberType = keyof reducerAssimbleType

export type getMatchReducer<T extends storeMemberType> = T extends keyof reducerAssimbleType ? reducerAssimbleType[T] : never