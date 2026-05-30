import actionTypes from '../RenderSingleForPodcast'
import { fromJS } from 'immutable'
const dataState = fromJS({
    xmlListData:[],
    contentToggle:false,
    currentTargetId:"",
    isPlayed:false,
    timer:null,
    showInputToggle:false,
    imgUrl:"",
    paginationObj:{},
    itemData:[],
    itemDataTemp:[],
})

const callBackState = (state = dataState,action) => {
    switch(action.type){
        case actionTypes.typesName.xmlListData:
            return state.merge({
                xmlListData:fromJS(action.data),
                imgUrl:action.imgUrl
            })
        case actionTypes.typesName.contentToggle:
            return state.set('contentToggle',action.status)
        case actionTypes.typesName.currentTargetId:
            return state.set('currentTargetId',action.id)
        case actionTypes.typesName.isPlayed:
            return state.set("isPlayed",action.status)
        case actionTypes.typesName.timer:
            return state.set('timer',action.item)
        case actionTypes.typesName.showInputToggle:
            return state.set('showInputToggle',action.status)
        case actionTypes.typesName.paginationObjPodcastSingle:
            return state.set('paginationObj',action.obj)
        case actionTypes.typesName.setItemDataPodcastSingle:
            return state.set('itemData',action.data)
        case actionTypes.typesName.setItemDataTempPodcastSingle:
            return state.set('itemDataTempP',action.data)
        case actionTypes.typesName.openSingle:
            return state.set('openSingle',action.status)
        default:
            return state
    }
}

export default callBackState