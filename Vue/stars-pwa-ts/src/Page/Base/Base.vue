<template lang="pug">
</template>
<script lang="ts">
import { defineComponent, inject, onMounted } from 'vue'
import { useIonRouter } from '@ionic/vue'
import { ProviderObjType } from '@/App.vue'

export default defineComponent({
    
    setup(){
        const { getReducer } = inject<ProviderObjType>('NewProvider')!

        const { allStars } = getReducer(state => state.Base)

        const router = useIonRouter()

        onMounted(() => {
            
            if(allStars.value.length === 0) {
                router.navigate('/', 'back', 'pop')
            }
        })
    }
})
</script>