import { defineStore } from 'pinia'
import { storeType } from '.'
import reducerMembers from '@/store/reducerMembersEnum'

const reducer = defineStore<string,UnwrapRefStoreType<storeType>>(reducerMembers.Base,{
    state:() => ({
        currentSelectStar: '',
        isSettingStars: false,
        allStars: [],
        starsKeyPare: undefined,
        starMatches: [],
        starExplain: [],
        startPredictFortuneToday: undefined
    }),
})

export default reducer