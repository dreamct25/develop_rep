<template lang="pug">
.container
    |PageII
    br
    |This is PageII content.
    br
    |Route Query is {{ Object.keys(query).length > 0 ? query : 'none' }}
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    setup(){
        const { query } = useRoute()

        return { query }
    }
})
</script>