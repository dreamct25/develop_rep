import { ActionTree,Commit } from 'vuex'

export interface initStoreType {
    count:number,
    arr:any[]
}

export interface returnStoreType {
    count:number,
    arr:any[]
}

export interface actionCreatorType extends ActionTree<initStoreType,any> {
    setCount({ commit }:{ commit:Commit },val:number):void,
    setArr({ commit }:{ commit:Commit },val:any):void
}