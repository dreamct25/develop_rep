import { defineStore } from 'pinia'
import { UnwrapRefStoreTypeTemp, storeTypeTemp } from '.'
import reducerMembers from '@/store/reducerMembersEnum'

const reducer = defineStore<string,UnwrapRefStoreTypeTemp<storeTypeTemp>>(reducerMembers.Login,{
    state:() => ({
        token: ''
    })
})

export default reducer