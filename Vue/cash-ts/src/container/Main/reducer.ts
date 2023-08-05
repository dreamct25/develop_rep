import { defineStore } from 'pinia'
import { storeType,costCatagoryType,costItemType,incomeCatagoryType } from '.'
import $ from '../../lib/Library'
import reducerMembers from 'store/reducerMembersEnum'

const reducer = defineStore<string,storeType<false>,{ 
    costCatagoryOrder(state:storeType<false>):costCatagoryType[],
    costItemOrder(state:storeType<false>):costItemType[]
    incomeCatagoryOrder(state:storeType<false>):incomeCatagoryType[]
}>(reducerMembers.Main,{
    state:() => ({
        costItem:[],
        costCatagory:[],
        incomeCatagory:[]
    }),
    getters:{
        costCatagoryOrder:({ costCatagory }) => $.sort(costCatagory,(a,b) => a.order - b.order),
        costItemOrder:({ costItem }) => $.sort(costItem,(a,b) => a.order - b.order),
        incomeCatagoryOrder:({ incomeCatagory }) => $.sort(incomeCatagory,(a,b) => a.order - b.order)
    }
})

export default reducer