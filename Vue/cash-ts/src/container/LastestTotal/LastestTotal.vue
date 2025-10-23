<template lang="pug">
.page-outer(:class="{'page-outer-active':lastTotalToggle}")
  span.last-total-title 剩餘總額細項
  .row.justify-content-center
      .col-md-10
          .last-total-outer-frame
              .last-total-outer(:class="{'last-total-outer-active':lastTotalToggle}")
                  .row.no-gutters
                      .col-md-6
                          .show-get-group
                              span.get-total-title 收入總計細項
                              span 本月收入 {{ lastTotalData.currentMonthIncomeCount }} 元
                              span 本年收入 {{ lastTotalData.currentYearIncomeCount }} 元
                              span 本月最高收入 {{ lastTotalData.currentMonthIncomeMax }} 元
                              span 本年最高收入 {{ lastTotalData.currentYearIncomeMax }} 元
                      .col-md-6
                          .show-cost-group
                              span.cost-total-title 支出總計細項
                              span 本月支出 {{ lastTotalData.currentMonthExpenditureCount }} 元
                              span 本年支出 {{ lastTotalData.currentYearExpenditureCount }} 元
                              span 本月最高支出 {{ lastTotalData.currentMonthExpenditureMax }} 元
                              span 本年最高支出 {{ lastTotalData.currentYearExpenditureMax }} 元
                  .row
                      .col-md-12
                          .show-last
                              span 本月剩餘 {{ lastTotalData.currentMonthLast }} 元
                              span 本年剩餘 {{ lastTotalData.currentYearLast }} 元
                              span 統計區間 {{ currentDate }}
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

  .last-total-title {
    display: block;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    padding: 20px 0 20px 0;
    color: white;
    text-shadow: 0 2px 1px rgba(0, 0, 0, 0.7);
  }

  .last-total-outer-frame {
    overflow: hidden;

    .last-total-outer {
      margin-top: -700px;
      transition: 1s ease;

      .show-get-group,
      .show-cost-group {
        color: white;
        text-shadow: 0 2px 1px rgba(0, 0, 0, 0.7);
        background-color: rgba(0, 0, 0, 0.7);
        padding: 10px;
        margin: 5px;
        border-radius: 10px;
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
          0 0 2px 1px rgba(0, 0, 0, 0.7);
      }

      .show-last {
        font-weight: bold;
        font-size: 20px;
        margin: 5px;
        color: rgb(200, 200, 200);
      }

      .show-get-group,
      .show-cost-group,
      .show-last {
        span {
          display: block;
          line-height: 2em;
          text-align: center;
          color: white;
          text-shadow: 0 2px 1px rgba(0, 0, 0, 0.7);
        }
        .get-total-title,
        .cost-total-title {
          font-size: 20px;
          font-weight: bold;
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

      &.last-total-outer-active {
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
import { defineComponent,ref,onMounted,inject,toRef } from 'vue'
import { useRouter } from 'vue-router'
import { ProviderObjType } from '../../App.vue'
import { Loading } from '../../component'
import { stateType,methodType,LastTotalDataType } from '.'

export default defineComponent({
  components:{
    Loading
  },
  setup(){
    const { $,Fetch,getReducer,toast } = inject<ProviderObjType>('NewProvider')
    const router = useRouter()
    const { auth } = getReducer(({ Login,Main }) => ({
      auth: toRef(Login.auth) 
    }))

    const state:stateType = {
        lastTotalToggle: ref(false),
        lastTotalData: ref({
            currentMonthExpenditureCount: 0, 
            currentYearExpenditureCount: 0,  
            currentMonthExpenditureMax: 0,
            currentYearExpenditureMax: 0,
            currentMonthIncomeCount: 0,      
            currentYearIncomeCount: 0,       
            currentMonthIncomeMax: 0,
            currentYearIncomeMax: 0,
            currentMonthLast: 0,             
            currentYearLast: 0
        }),
        currentDate: ref(''),
        isLoading: ref(false)
    }

    const method:methodType = {
        goBack:() => {
          state.lastTotalToggle.value = false
          setTimeout(() => router.push("/main"), 1000);
        },
        getData: async (year,month) => {
          state.isLoading.value = true

          const { status,data: result,statusText } = await Fetch.get<LastTotalDataType>(`/get_last_total/full/${year}/${month}`,{
              token: auth.value.token
          })

          if(status >= 200 && status <= 399){
            state.lastTotalData.value = result
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
        },
        dateSetting: async function () {
          const self = this as methodType

          const yearMonthStartTime = new Date()
          yearMonthStartTime.setFullYear(new Date().getFullYear(),0,1)
          yearMonthStartTime.setHours(0,0,0,0)

          const [yearStart,monthStart,dateStart] = ($.formatDateTime({ formatDate: yearMonthStartTime, formatType: 'yyyy-MM-dd' }) as string).split('-')

          const [year,month,date] = ($.formatDateTime({ formatDate: new Date(), formatType: 'yyyy-MM-dd' }) as string).split('-')
          
          state.currentDate.value = `${yearStart}-${monthStart}-${dateStart} ~ ${year}-${month}-${date}`

          await self.getData(year,parseInt(month).toString())
        }
    }

    onMounted(async () => {
        await method.dateSetting()
        setTimeout(() => state.lastTotalToggle.value = true, 1900);
    })

    return { ...state,...method }
  }
})
</script>