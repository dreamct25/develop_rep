export interface initStoreStateType {
    count:number,
    arr:number[]
}

export interface actionCreatorType {
    setCount(count:number):{ type:string,count:number }
    setArr(num:number):{ type:string,num:number }
}