<template>
    <div class="main">
        <div class="abc">123456</div>
        <Main />
    </div>
</template>
<style lang="scss">
    .main{
        .abc{
            color: red;
        }
    }
</style>
<script lang="ts">
import { defineComponent } from 'vue'
import Main from './container/Main.vue'
export default defineComponent({
    components:{
        Main
    }
})
</script>