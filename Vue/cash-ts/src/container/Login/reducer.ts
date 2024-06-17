import { defineStore } from 'pinia'
import { storeType } from '.'
import reducerMembers from 'store/reducerMembersEnum'

const reducer = defineStore<string,storeType>(reducerMembers.Login,{
    state:() => ({
        auth:undefined
    }),
})

export default reducer