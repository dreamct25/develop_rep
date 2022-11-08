import { Ref } from 'vue'
import { youtubeSingleDataTempType } from '../Home'

export interface stateType {
    urlTemp: Ref<string>,
    videoDetails: Ref<youtubeSingleDataTempType[]>,
    toggleModalStatus: Ref<boolean>,
    showVideoInfoSwitch: Ref<boolean>,
    rwdState:Ref<boolean>,
    playerComponent: Ref<any>
}