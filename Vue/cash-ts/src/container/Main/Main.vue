<template lang="pug">
.page-animate(:class="{'page-animate-active': pageIsLoaded}")
  .system-title 收支管理選項
  .row.justify-content-center
    .col-md-10
      .select-box-outer
        .row.no-gutters.row-hide-frame(:class="{'row-hide':openStatus}")
          .col-md-3(v-for="(row,index) in selectItem",:key="index")
            .select-box(
              :class="{'select-box-active': currentPath === row.selectUrl}"
              @click="goFunction(row)"
            )
              span {{ row.selectName }}
.page-animate(:class="{'page-animate-active': goOtherPage}")
  router-view(name="addExpenditure")
  router-view(name="editExpenditure")
  router-view(name="addIncome")
  router-view(name="editIncome")
  router-view(name="currentExpenditureMonth")
  router-view(name="currentIncomeMonth")
  router-view(name="everyExpenditureMonth")
  router-view(name="everyIncomeMonth")
  router-view(name="lastestTotal")
  router-view(name="costTest")
Loading(:loadingStatus="isLoading")
</template>
<style lang="scss" scoped>
.page-animate {
  max-height: 0;
  opacity: 0;
  transition: 1s ease;

  .system-title {
    display: block;
    text-align: center;
    padding: 20px 0 20px 0;
    font-size: 30px;
    color: white;
    font-weight: bold;
    text-shadow: 0 2px 1px rgba(0, 0, 0, 0.7);
  }

  .select-box-outer {
    overflow: hidden;

    .row-hide-frame {
      margin-top: -500px;
      transition: 1s ease;

      @media screen and (max-width: 414px) {
        margin-top: -1450px;
      }

      &.row-hide {
        margin-top: 0;
      }

      .select-box {
        color: white;
        cursor: pointer;
        user-select: none;
        background-color: rgba(0, 0, 0, 0.7);
        transition: 1s ease;
        margin: 5px;
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
          0 0 2px 1px rgba(0, 0, 0, 0.7);
        border-radius: 10px;

        span {
          display: block;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          padding: 100px 0 100px 0;

          @media screen and (max-width: 768px) {
            padding: 50px 0 50px 0;
          }

          @media screen and (max-width: 414px) {
            padding: 20px 0 20px 0;
          }
        }

        &.select-box-active {
            color: black;
            background-color: rgba(255, 255, 255, 0.7);
            box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.7),
            0 0 2px 1px rgba(0, 0, 0, 0.7);
        }
      }
    }
  }

  &.page-animate-active {
    max-height: 100vh;
    opacity: 1;
  }
}
</style>
<script lang="ts">
import { defineComponent,onMounted,ref,inject,toRef,watch } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { selectItem } from '../../assets/json'
import { ProviderObjType } from '../../App.vue'
import { costCatagoryType,costItemType,incomeCatagoryType } from '.'
import { Loading } from '../../component'
import { stateType,methodType } from '.'

export default defineComponent({
  components:{
    Loading
  },
  setup(){
    const { Fetch,setReducer,getReducer } = inject<ProviderObjType>('NewProvider')
    const router = useRouter()
    const route = useRoute()
    const { auth } = getReducer(({ Login }) => ({
      auth: toRef(Login.auth)
    }))

    const state:stateType = {
      pageIsLoaded: ref(false),
      goOtherPage: ref(false),
      openStatus: ref(false),
      selectItem: ref([]),
      currentPath: ref(''),
      isLoading: ref(false)
    }

    const method:methodType = {
      goFunction: row => {
        state.currentPath.value = row.selectUrl
        router.push(`/main/${row.selectUrl}`)
      },
      getCostResults: async () => {
        state.isLoading.value = true

        const { data:costCatagory } = await Fetch.get<costCatagoryType[]>('/get_cost_catagory',{
          token: auth.value.token
        })

        const { data:costItem } = await Fetch.get<costItemType[]>('/get_cost_item',{
          token: auth.value.token
        })

        const { data:incomeCatagory } = await Fetch.get<incomeCatagoryType[]>('/get_income_catagory',{
          token: auth.value.token
        })

        setReducer('Main',{ costItem,costCatagory,incomeCatagory })

        state.isLoading.value = false
      },
      goCurrentPage: path => {
        if(path === 'main'){
          state.goOtherPage.value = false
          setTimeout(() => state.pageIsLoaded.value = true,1100)
          setTimeout(() => state.openStatus.value = true, 1200);
        } else {
          state.currentPath.value = ''
          state.openStatus.value = false
          setTimeout(() => state.pageIsLoaded.value = false, 100);
          setTimeout(() => state.goOtherPage.value = true, 1900);
        }
      }
    }

    watch(route,cur => method.goCurrentPage(cur.name.toString()),{ deep: true })

    onMounted(async () => {
      state.selectItem.value = selectItem

      if(sessionStorage.getItem('temp')){
        await method.getCostResults()
        method.goCurrentPage(route.name.toString())
      }
    })

    return { ...state,...method }
  }
})
</script>