import { actionCreatorType } from './types'
import actionType from './actionType'

const actionCreator: actionCreatorType = {
    getListItem: (): object => ({
        type: actionType.getListItem
    }),
    setListToggleAnimate:(status:boolean):object => ({
        type: actionType.setListToggleAnimate,
        status
    }),
    setSelectText:(txt:string):object => ({
        type: actionType.setSelectText,
        txt
    })
}

export default actionCreator