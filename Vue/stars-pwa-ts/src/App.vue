<template lang="pug">
  IonApp
    IonContent
      IonRouterOutlet
    BottomBar
    Base
</template>
<script lang="ts">
import { defineComponent, provide, reactive, readonly } from 'vue'
import { IonApp, IonContent, IonRouterOutlet } from '@ionic/vue'
import { storeToRefs } from 'pinia'
import $ from '@/lib/Library'
import { Utiles, Fetch } from './utiles'
import { BottomBar } from '@/components'
import { Base } from '@/Page'
import { GetMatchReducerKey, GetMatchReducerValue, reducerAssimbleType } from '@/store/reducerAssimbleType'
import store from './store'

export interface ProviderObjType {
  $:$,
  Utiles: typeof Utiles,
  getReducer<T>(callBack: (states: reducerAssimbleType) => T): T,
  setReducer<T extends GetMatchReducerKey>(storeMember:T,setVal:GetMatchReducerValue<T>): void,
  Fetch: typeof Fetch
}

export default defineComponent({
  components: {
    IonApp,
    IonContent,
    BottomBar,
    IonRouterOutlet,
    Base
  },
  setup(){

    const providerObj:ProviderObjType = {
      $,
      Utiles,
      getReducer: callBack => callBack.call(callBack,Object.fromEntries(Object.entries(store).map(([keyName,value]) => [keyName,storeToRefs(value())])) as unknown as reducerAssimbleType),
      setReducer: (storeMember,setVal) => ((store as Record<string,any>)[storeMember.split('/')[0]]()).$patch({ [storeMember.split('/')[1]]:setVal }),
      Fetch
    }

    provide("NewProvider",
      readonly(
        reactive<ProviderObjType>(providerObj)
      )
    );
  }
})

</script>
