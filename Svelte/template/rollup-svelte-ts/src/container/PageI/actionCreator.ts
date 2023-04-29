import { actionType } from '.'

const actionCreator:{[key:string]:any} = {
    changeSome:(val) => ({
        type:actionType.CHANGE_SOME,
        val
    })
}

export default actionCreator