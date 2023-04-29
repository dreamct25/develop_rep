import { computed,ComputedRef } from 'vue'

export interface ProviderType {
    getReducer<T>(reducerName:string,callBack:(states:T) => T):ComputedRef<T>
    setReducer(actionName: string, value?: any):void;
}

export const createProvider:ProviderType = {
    getReducer:(reducerName,callBack) => computed<any>(() => 'any'),
    setReducer:(actionName,value) => undefined
}