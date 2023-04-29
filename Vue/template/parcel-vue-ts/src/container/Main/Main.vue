<template>
    <div>
        <div>Main Router</div>
        <div>{{ vuexStore.count }}</div>
        <div>
            <div v-for="(item,index) in vuexStore.arr" :key="index">{{ index + 1 }}.Itema {{ item }}</div>
        </div>
        <div @click="addCount">Add Count</div>
    </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue'
import { ProviderType,createProvider } from '../../provide'
import { returnStoreType } from '.'
export default defineComponent({
    setup(){
        const { getReducer,setReducer } = inject<ProviderType>("NewProvider",createProvider)

        const vuexStore = getReducer<returnStoreType>('MainReducer',state => ({ ...state }))

        const addCount:() => void = () => {
            setReducer('MainReducer/setCount',vuexStore.value.count + 1)
            setReducer('MainReducer/setArr',vuexStore.value.count)
        }

        return { vuexStore,addCount }
    }
})
</script>