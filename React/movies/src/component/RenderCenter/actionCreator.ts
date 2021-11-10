import { actionCreatorType } from './types'
import actionType from './actionType'

const actionCreator: actionCreatorType = {
    getSingleItems: (singleData: { [key: string]: any }[]): object => ({
        type: actionType.getSingleItem,
        singleData
    }),
    changeBackPostSwitch: (status: boolean): object => ({
        type: actionType.changeBackPostSwitch,
        status
    })
}

export default actionCreator