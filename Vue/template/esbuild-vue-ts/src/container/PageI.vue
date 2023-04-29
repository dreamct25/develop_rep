<template lang="pug">
.container
    |PageI
    br
    |This is PageI content.
    br
    |Route Params is {{ Object.keys(params).length > 0 ? params : 'none' }}
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    setup(){
        const { params } = useRoute()

        return { params }
    }
})
</script>