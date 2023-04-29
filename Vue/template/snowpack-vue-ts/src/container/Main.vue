<template>
    <div class="container">
        <div>Main</div>
        <div class="go-page" @click="goPage('/pageI')">Go PageI</div>
        <div class="go-page" @click="goPage('/pageII')">Go PageII</div>
        <div class="open-modal-btn" @click="toggleModalStatus(true)">Open Modal !</div>
        <div class="route-container">
            Route Area
            <router-view />
        </div>
        <Modal :toggleModal="toggleModal" @toggleModalStatus="toggleModalStatus" />
    </div>
</template>
<style lang="scss" scoped>
.container{
    .go-page,
    .open-modal-btn{
        box-shadow: 0 0 2px 0 rgba(30,30,30,.5);
        width: 100px;
        text-align: center;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
        user-select: none;
    }
    .route-container{
        background-color: blue;
        color: white;
        width: 300px;
        padding: 5px;
        border-radius: 5px;
        box-shadow: 0 0 2px 0 rgba(30,30,30,.5);
    }
}
</style>
<script lang="ts">
import { defineComponent,Ref,ref } from 'vue'
import { useRouter } from 'vue-router'
import Modal from '../component/Modal.vue'

interface stateType {
    toggleModal:Ref<boolean>
}

interface methodType {
    goPage(path:string):void
    toggleModalStatus(status:boolean):void
}

export default defineComponent({
    components:{
        Modal
    },
    setup(){
        const router = useRouter()

        const state:stateType = {
            toggleModal:ref(false)
        }

        const method:methodType = {
            goPage:path => router.push(path),
            toggleModalStatus:status => state.toggleModal.value = status
        }
        
        return { ...state,...method }
    }
})
</script>