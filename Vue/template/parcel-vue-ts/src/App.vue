<template lang="pug">
.outer
    .first 123sdfasds
    div(v-if="count < 5") small {{ count }}
    div(v-else) Big {{ count }}
    div(@click="addCount") Add Count
    .list-outer
        .list-item(v-for="(item,index) in arr",:key="index") {{ `${index + 1} Item ${item}` }}
    div
        div Router Space
        div
            router-view
</template>
<style lang="scss" scoped>
    .outer{
        .first{
            color:red;
        }
    }
</style>
<script lang="ts">
import { defineComponent,ref,reactive,computed,provide,readonly } from 'vue'
import { useStore } from 'vuex'
import { ProviderType } from './provide'

export default defineComponent({
    setup(){
        const store = useStore()

        provide('NewProvider',readonly(
            reactive<ProviderType>({
                getReducer<T>(reducerName:string,callBack:(states:T) => T){
                    return computed<T>(() => callBack.call(callBack,store.state[reducerName]))
                },
                setReducer:(actionName: string, value?: any) => value ? store.dispatch(actionName, value) : store.dispatch(actionName, value)
            })
        ))

        const state = {
            count: ref<number>(0),
            arr: ref<number[]>([])
        }

        const method = {
            addCount:() => {
                state.count.value += 1
                state.arr.value = [...state.arr.value,state.count.value]
            }
        }

        return { ...state,...method }
    }
})
</script>