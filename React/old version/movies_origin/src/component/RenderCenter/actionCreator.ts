import { actionCreatorType } from './types'
import actionType from './actionType'

const actionCreator: actionCreatorType = {
    getSingleItems: singleData => ({
        type: actionType.getSingleItem,
        singleData
    }),
    changeBackPostSwitch: status => ({
        type: actionType.changeBackPostSwitch,
        status
    })
}

export default actionCreator