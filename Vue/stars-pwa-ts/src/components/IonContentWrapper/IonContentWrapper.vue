<template lang="pug">
    IonPage
        IonContent
            .bg
                slot
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IonPage, IonContent } from '@ionic/vue'

export default defineComponent({
    components: {
        IonPage,
        IonContent
    }
})
</script>