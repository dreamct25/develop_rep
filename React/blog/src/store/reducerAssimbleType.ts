import { initStoreType as MainReducerType } from '../container/Main'
import { initStoreType as AdminLoginReducerType } from '../container/AdminLogin'

export interface reducerAssimbleType {
    MainReducer:MainReducerType,
    AdminLoginReducer:AdminLoginReducerType
}