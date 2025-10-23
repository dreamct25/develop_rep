import { storeType as MainReducer } from '@/pages/Main'
import { storeType as LoginReducer } from '@/pages/Login'

export interface reducerAssimbleType {
    Login: LoginReducer<false>,
    Main: MainReducer<false>,
}

type PathAndValue<T> = {
    [K in keyof T]: T[K] extends object
      ? { [P in keyof T[K]]: `${K & string}/${P & string}` }[keyof T[K]]
      : never;
  }[keyof T];
  
export type GetMatchReducerKey = PathAndValue<reducerAssimbleType>;

export type GetMatchReducerValue<T extends string, RefR = 'value'> = T extends `${infer K}/${infer P}`
? K extends keyof reducerAssimbleType
    ? P extends keyof reducerAssimbleType[K]
        ? RefR extends keyof reducerAssimbleType[K][P] ? reducerAssimbleType[K][P][RefR] : never : never
    : never
: never;