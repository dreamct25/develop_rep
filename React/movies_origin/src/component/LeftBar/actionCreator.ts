import { actionCreatorType } from './types'
import actionType from './actionType'

const actionCreator: actionCreatorType = {
    getListItem: () => ({
        type: actionType.getListItem
    }),
    setListToggleAnimate: status => ({
        type: actionType.setListToggleAnimate,
        status
    }),
    setSelectText:txt => ({
        type: actionType.setSelectText,
        txt
    })
}

export default actionCreator