<template lang="pug">
.page-outer(:class="{'page-outer-active':chooseIncomeToggle}")
  span.income-year-title {{ currentYear }} 年每月收入
  .row.justify-content-center
      .col-md-10
          .income-year-choose-outer-frame
              .income-year-choose-outer(:class="{'income-year-choose-outer-active':chooseIncomeToggle}")
                  .chart-layout
                    .income-year-choose
                      |查詢年份
                      select.choose-year(v-model="currentYear")
                        option(:value="null",disabled) 請選擇年
                        option(
                            v-for="(years,index) in Array.from({ length:21 },(_,num) => num + 2020)"
                            :key="index"
                            :value="years"
                        ) {{ years }} 年
                    ChartBar(:chartObj="chartObj")
                  .row.justify-content-center
                      .col-md-5
                          .back
                              span(@click="goBack") 返回功能選項        
Loading(:loadingStatus="isLoading")
</template>
<style lang="scss" scoped>
.page-outer {
  opacity: 0;
  transition: 1s ease;

  .income-year-title {
    display: block;
    text-align: center;
    font-size: 30px;
    padding: 20px 0 20px 0;
    color: white;
    font-weight: bold;
    text-shadow: 0 2px 1px rgba(0, 0, 0, 0.7);
  }

  .income-year-choose-outer-frame {
    overflow: hidden;

    .income-year-choose-outer {
      padding: 5px 0 5px 0;
      margin-top: -700px;
      transition: 1s ease;

      .chart-layout{
        position: relative;
        margin: 5px 0 25px 0;
        background-color: rgba(30, 30, 30, 0.7);
        backdrop-filter: blur(5px);
        padding: 10px 15px;
        border-radius: 8px;
        box-shadow: inset 0 0 2px .5px rgba(255, 255, 255, 0.7), 0 0 3px 0 rgba(30, 30, 30, 0.7);
        overflow: hidden;

        .income-year-choose {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          color: white;
          position: absolute;
          top: 0;
          right: 0;
          margin: 10px;

          select {
            cursor: pointer;
            user-select: none;
            -webkit-appearance: none;
            padding: 2px 3px 0px 3px;
            border-radius: 5px;
            outline: none;
            border: none;
            color: white;
            text-align: center;
            background-color: transparent;
            box-shadow: inset 0 0 0 0 rgba(0, 102, 255, 0.7);
            transition: 0.5s ease;

            option {
              -webkit-appearance: none;
              color: black;
            }
          }
          select:focus {
            box-shadow: inset 0 0 2px 1px rgba(0, 102, 255, 0.7);
          }
        }
      }

      .back {
        cursor: pointer;
        user-select: none;
        margin: 15px 0 15px 0;
        background-color: rgb(0, 102, 255);
        border-radius: 20px;

        span {
          text-align: center;
          color: white;
          display: block;
          padding: 5px 0 5px 0;
        }
      }

      &.income-year-choose-outer-active {
        margin-top: 0;
      }
    }
  }

  &.page-outer-active {
    opacity: 1;
  }
}
</style>
<script lang="ts">
import { defineComponent,ref,onMounted,toRef,inject,watch } from 'vue'
import { useRouter } from 'vue-router'
import { ProviderObjType } from '../../App.vue'
import { ChartBar,ChartBackgroundColorEnum,Loading } from '../../component'
import { stateType,methodType,everyIncomeMonthDataType } from '.'

export default defineComponent({
    components: {
        ChartBar,
        Loading
    },
    setup(){
        const { $,Fetch,getReducer,toast } = inject<ProviderObjType>('NewProvider')
        const router = useRouter()
        const { auth } = getReducer(({ Login,Main }) => ({
          auth: toRef(Login.auth) 
        }))

        const state:stateType = {
            chooseIncomeToggle: ref(false),
            currentYear: ref(''),
            chartObj: ref({
              renderData: [],
              categorys: [],
              pieCategory: '',
              pieCategoryBackgroundColor: []
            }),
            everyIncomeMonthData: ref([]),
            isLoading: ref(false)
        }

        const method:methodType = {
            goBack: () => {
              state.chooseIncomeToggle.value = false
              setTimeout(() => router.push("/main"), 1000);
            },
            getData: async year => {
              state.isLoading.value = true

              const { status,data: result,statusText } = await Fetch.get<everyIncomeMonthDataType[]>(`/get_every_month/income/${year}`,{
                token: auth.value.token
              })

              if(status >= 200 && status <= 399){
                  state.everyIncomeMonthData.value = result
              } else if(status === 403) {
                toast.error('請重新登入再做操作',{ 
                  icon: 'far fa-times-circle'
                })
              } else {
                toast.error(statusText,{ 
                  icon: 'far fa-times-circle'
                })
              }

              state.isLoading.value = false
            }
        }

        watch(state.currentYear,async cur => await method.getData(cur))

        watch(state.everyIncomeMonthData,cur => {
          state.chartObj.value = {
            renderData: $.maps(cur,row => row.total),
            categorys: $.maps(cur,row => `${row.month} 月`),
            pieCategory: '收入總額',
            pieCategoryBackgroundColor: [...$.createArray({ type:'fake',item: { random: cur.length } },() => 'OPACITYBLUE' as keyof typeof ChartBackgroundColorEnum)]
          }
        })

        onMounted(async () => {
          state.currentYear.value = new Date().getFullYear().toString()
          await method.getData(new Date().getFullYear().toString())
          setTimeout(() => state.chooseIncomeToggle.value = true, 1900);
        })

        return { ...state,...method }
    }
})
</script>