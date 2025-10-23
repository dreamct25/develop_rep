<template lang="pug">
  .bottom-bar(:class="{ toggle: route.path !== '/wel_come' ? isUsingNotExiste()  ? true : false : false }")
    .tab-btn(
      v-for="(item, index) in tabPathGroup"
      :key="index"
      :class="{ active: route.path.match(item.path) }", 
      @click="controlTab(item.path)"
    ) {{ item.pathName }}
</template>
<style lang="scss" scoped>
  .bottom-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background-color: rgb(30,30,30);
    z-index: 300;
    transform: translateY(200px);
    transition: .5s ease;
    box-shadow: 0 0 6px 5px rgb(30,30,30);

    &.toggle {
      transform: translateY(0);
    }

    .tab-btn {
      position: relative;
      padding: 10px 0 14px 0;
      text-align: center;
      cursor: pointer;
      user-select: none;
      font-size: 14px;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -10px;
        width: 80%;
        margin: 0 auto;
        height: 10px;
        box-shadow: 0 0 0 0 white;
        border-radius: 50%;
        transition: .5s ease;
      }

      &.active {
        
        &::after {
          box-shadow: 0 0 12px 0 white;
        }
      }
    }
  }
</style>
<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import { useIonRouter } from '@ionic/vue'
import { useRoute } from 'vue-router'
import { ProviderObjType } from '@/App.vue'

export default defineComponent({
    setup(){

      const { setReducer, $ } = inject<ProviderObjType>('NewProvider')!

      const pathGroup = [
        'star_forecast|運勢預報',
        'star_match|星座配對',
        'star_explain|星座說明',
        'setting|設定'
      ]

      const tabPathGroup = ref<{ path: string, pathName: string }[]>(
        $.maps(pathGroup, row => {
          const [path, pathName] = row.split('|')
          return { path, pathName }
        })
      )

      const router = useIonRouter()

      const route = useRoute()

      const isUsingNotExiste: () => boolean = () => {

        const allPathArr = route.path.split('/')
        const filterItem = allPathArr.filter(row => 
          row === 'star_forecast' || 
          row === 'star_match' || 
          row === 'star_explain' || 
          row === 'setting'
        )

        const isPageExiste = filterItem.length > 0

        setReducer('BottomBar/isPageExiste', isPageExiste)

        return filterItem.length > 0
      }

      const controlTab: (path: string) => void = path => {
        router.navigate(`/${path}`,'none','push')
      }

      return { controlTab, route, isUsingNotExiste, tabPathGroup }
    }
})

</script>