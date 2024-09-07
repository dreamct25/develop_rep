<template lang="pug">
router-view
</template>

<style lang="scss">
  html {

    body {
      background-color: unset;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

      .Vue-Toastification__container {
        padding: 8px;

        .custom-toast-class {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          min-height: auto;
          padding: 12px 18px 12px 12px;
          border-radius: 5px;

          .Vue-Toastification__toast-body {
            padding-top: 2px;
          }

          &.Vue-Toastification__toast--error {
            
            background-color: rgba(255,51,51,.7);
          }

          &.Vue-Toastification__toast--info {
            background-color: rgba(255,0,200,.7);
          }

          &.Vue-Toastification__toast--success {
            background-color: rgb(76,175,80,.7);
          }

          .Vue-Toastification__icon {
            margin: auto 12px auto 0px;
          }
        }
      }
      

      #app {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 100vh;  
      }

      a,.link {
        font-weight: bold;
        color: #ffffff !important;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
        transition: 0.5s ease;
        
        &.router-link-exact-active {
          color: #ff00c8 !important;
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
        }

        &:hover {
          text-decoration: none !important;
        }
      }

      *::-webkit-scrollbar {
        width: 15px;
        background-color: rgba(0, 0, 0, 1);
      }

      *::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: white;
        border: 5px solid rgba(0, 0, 0, 1);
      }

      .link {
        cursor: pointer;
        user-select: none;
      }
    }
  }
</style>
<script lang="ts">
import { defineComponent, provide, readonly, reactive, ref, Ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useToast, POSITION } from 'vue-toastification'
import $ from '@/lib/Library'
import store from '@/store'
import Fetch from '@/utiles/fetch'
import { reducerAssimbleType, GetMatchReducerKey, GetMatchReducerValue } from '@/store/reducerAssimbleType'

export interface ProviderObjType {
  $:$,
  getReducer<T>(callBack: (states: reducerAssimbleType) => T): T;
  setReducer<T extends GetMatchReducerKey>(storeMember:T,setVal:GetMatchReducerValue<T>):void,
  useSleep(time: number): Promise<void>
  toast: ReturnType<typeof useToast>,
  Fetch: typeof Fetch,
  rwdMod: Ref<boolean>
}

export default defineComponent({

  setup(){
    const toast = useToast()
    const providerObj:ProviderObjType = {
      $,
      getReducer: callBack => callBack.call(callBack,Object.fromEntries(Object.entries(store).map(([keyName,value]) => [keyName,storeToRefs(value())])) as unknown as reducerAssimbleType),
      setReducer: (storeMember,setVal) => ((store as Record<string,any>)[storeMember.split('/')[0]]()).$patch({ [storeMember.split('/')[1]]:setVal }),
      useSleep: time => new Promise((resolve) => setTimeout(() => resolve(),time)),
      toast,
      Fetch,
      rwdMod: ref(false)
    }

    provide("NewProvider",
      readonly(
        reactive<ProviderObjType>(providerObj)
      )
    );

    watch(providerObj.rwdMod,cur => {

      if(cur){
        toast.updateDefaults({
          toastClassName: "custom-toast-class",
          position: POSITION.TOP_CENTER,
          timeout: 2500,
          hideProgressBar: true
        })
      }
    })

    onMounted(() => {
      providerObj.rwdMod.value = window.innerWidth <= 414
    })
  }
})
</script>
