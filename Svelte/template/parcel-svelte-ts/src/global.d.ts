import { reducerAssimbleType } from '../store/reducerTypeAssimble'
import { renderFromStore } from '../store'

declare global {
    interface UtilesContextType {
        getReducer<T>(callBack:(state:reducerAssimbleType) => T):T
        setReducer(actionCreator:{ [key:string]:any },actionMethod:string,value?:any):void
        renderFromStore:typeof renderFromStore
    }
}