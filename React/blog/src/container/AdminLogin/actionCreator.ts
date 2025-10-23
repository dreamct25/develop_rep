import { actionType } from '.'

const actionCreator:{
    setAuthInfo(obj:{ac:string,token:string}):{ type:string,obj:{ac:string,token:string} }
} = {
    setAuthInfo: obj => ({
        type: actionType.SET_AUTH_INFO,
        obj
    })
}

export default actionCreator