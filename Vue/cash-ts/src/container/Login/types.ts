import { Ref } from 'vue'

export interface storeType {
    auth?:{ ac:string,token:string,createDate:string }
}

export interface stateType {
    account: Ref<string>,
    password: Ref<string>,
    loginStatus: Ref<boolean>,
    loginInput: Ref<boolean>,
    isLoading: Ref<boolean>
}

export interface methodType {
    login(): Promise<void>
}