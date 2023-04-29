<template lang="pug">
.container
    |Color has {{ isColorChange ? 'changed' : 'recovered' }}
    .routes-layout
        router-view
    .btn-group
        div(@click="goPage('pageI')") Go PageI
        div(@click="goPage('pageII')") Go PageII
</template>
<style lang="scss" scoped>
    .container{
        .routes-layout{
            margin: 5px 0;
            background-color: blue;
            border-radius: 5px;
            width: 301px;
            padding: 5px;
            color: white;
        }
        .btn-group{
            display: flex;
            gap: 5px;
            
            div{
                background-color: rgb(30,30,30);
                color: white;
                cursor: pointer;
                user-select: none;
                padding: 5px;
                border-radius: 5px;
            }
        }
    }
</style>
<script lang="ts">
import { defineComponent,toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    props:['isColorChange'],
    setup(props){
        const router = useRouter()

        const goPage:(pathname:string) => void = pathname => {
            if(pathname === 'pageI'){
                router.push({ name:pathname,params:{ say:'Hello PageI' } })
            } else {
                router.push({ name:pathname,query:{ say:'Hello PageII' } })
            }
        }
        return { ...toRefs(props),goPage }
    }
})

</script>