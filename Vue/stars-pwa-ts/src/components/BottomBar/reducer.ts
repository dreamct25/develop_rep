import { defineStore } from 'pinia'
import { storeType } from '.'
import reducerMembers from '@/store/reducerMembersEnum'

const reducer = defineStore<string,UnwrapRefStoreType<storeType>>(reducerMembers.BottomBar,{
    state:() => ({
        isPageExiste: false
    }),
})

export default reducer