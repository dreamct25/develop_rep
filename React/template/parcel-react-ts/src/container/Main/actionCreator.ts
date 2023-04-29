import { actionType } from '.'

interface actionCreatorType {
    setArr(val:any):{ type:string,val:any }
    setCount(val:number):{ type:string,val:any }
}

const actionCreator:actionCreatorType = {
    setArr:val => ({ type:actionType.SET_ARR, val }),
    setCount:val => ({ type:actionType.SET_COUNTS, val })
}

export default actionCreator