<template lang="pug">
.page-outer(:class="{'page-outer-active':currentIncomeToggle}")
  span.current-month-title {{ titleDateVal.year }} 年 {{ titleDateVal.month }} 月收入清單
  .row.justify-content-center
      .col-md-10
          .tool-box-outer
            .tool-box
              .choose-date-outer
                |查詢年月
                .choose-date
                  input(type="month",v-model="dateInputVal")
              .to-chart(:class="{toggle:isRenderChart}",@click="changeTab(true)") 圖表分析
              .to-list(:class="{toggle:!isRenderChart}",@click="changeTab(false)") 明細列表
          .current-month-income-outer-frame
              .current-month-income-outer(:class="{'current-month-income-outer-active':currentIncomeToggle}")
                .inside-layout
                  .chart-layout(:class="{toggle:isRenderChart}")
                      .row.justify-content-center.align-items-center
                        .col-md-6
                          ChartPie(:chartObj="chartObj")
                        .col-md-6
                          .right-list
                              .list-item(v-for="(row,index) in incomeHistorySumList",:key="index")
                                  span(:style="`background-color:${row.cashWayBarColor.replace('rgb','rgba').replace(')',',.8)')};`") {{ row.cashWayName }}
                                  span {{ row.cashWayTotal === 0 ? '本月無統計資料' : `${row.cashWayTotal} 元` }}
                  .current-month-income-list-outer(:class="{'toggle':!isRenderChart}")
                    .current-month-income-list
                      .table-header
                        div 名稱
                        div 類別
                        div 金額
                        div 日期
                        div 調整
                      .table-body
                        .items(v-for="(incomes,index) in showIncomeGroup",:key="index")
                          div {{ incomes.name }}
                          div {{ incomes.cashWay }}
                          div(:class="{'imcome-alert':incomes.amount >= 1000}") {{ incomes.amount }}
                          div {{ incomes.wayFullDate }}
                          .config-group
                            .edit-btn(@click="goEdit(incomes.uuid)") 修改
                            .delete-btn(@click="goDelete(incomes)") 刪除
                      .table-footer(:class="{'no-data': allIncomeCount === -1}")
                        div(v-if="allIncomeCount === -1") -- 本月無收入資料 --
                        div(v-else-if="allIncomeCount !== -1") 收入總額 {{ allIncomeCount }} 元
                .row.justify-content-center
                    .col-md-5
                        .back
                            span(@click="goBack") 返回功能選項
CustomModal(:modalParams="modalParams",@handleEvent="modalEvent")
Loading(:loadingStatus="isLoading")
</template>
<style lang="scss" scoped>
.page-outer {
  opacity: 0;
  transition: 1s ease;

  .current-month-title {
    display: block;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    padding: 20px 0 20px 0;
    color: white;
    text-shadow: 0 2px 1px rgba(0, 0, 0, 0.7);
  }

  .tool-box-outer{
    color: white;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .tool-box {
      display: flex;
      align-items: center;
      background-color: rgba(30, 30, 30, 0.7);
      border-radius: 5px;
      overflow: hidden;

      .choose-date-outer {
        display: flex;
        align-items: center;
        padding: 3px 7px;

        .choose-date {
          display: flex;

          input {
            border: none;
            outline: none;
            border-radius: 5px;
            background-color: transparent;
            color: white;
            width: 22px;

            &::placeholder {
              color: rgba(255, 255, 255, 0.7);
              font-size: 16px;
              text-align: center;
            }

            &[type="month"] {
              &::-webkit-calendar-picker-indicator {
                filter: invert(1);
                border-radius: 5px;
                background-color: transparent;
                cursor: pointer;
                user-select: none;
              }
            }
          }
        }
        .choose-date-active {
          margin-right: 0;
        }
      }

      .to-chart {
        font-weight: bold;
        background-color: rgba(30, 30, 30, 0.7);
        padding: 3px 7px;
        border-right: 1.5px solid rgba(255, 255, 255, 0.3);
        border-left: 1.5px solid rgba(255, 255, 255, 0.3);
        cursor: pointer;
        user-select: none;
        transition: .5s ease;

        &.toggle{
          background-color: rgba(255, 255, 255, 0.7);
          box-shadow: inset 0 0 2px 1px rgba(30, 30, 30, 0.7);
          color: black;
        }
      }

      .to-list{
        font-weight: bold;
        padding: 3px 7px;
        cursor: pointer;
        user-select: none;
        transition: .5s ease;

        &.toggle{
          background-color: rgba(255, 255, 255, 0.7);
          box-shadow: inset 0 0 2px 1px rgba(30, 30, 30, 0.7);
          color: black;
        }
      }
    }
  }

  .current-month-income-outer-frame {
    overflow: hidden;

    .current-month-income-outer {
      margin-top: -700px;
      transition: 1s ease;

      .inside-layout {
        display: grid;
        grid-template-columns: 100% 100%;

        .chart-layout {
          padding: 35px 5px;
          transform: translateX(-100%);
          transition: .5s ease;

          .right-list {
              .list-item {
                  display: grid;
                  grid-template-columns: 30% 70%;
                  margin: 0 0 20px 0;
                  border-radius: 5px;
                  overflow: hidden;

                  span {
                      text-align: center;
                      padding: 12px 0;

                      &:first-child{
                        font-weight: bold;
                        color: white;
                        text-shadow: 1px 1px 2px rgba(30, 30, 30, 0.7);
                      }

                      &:last-child{
                        color: white;
                        background-color: rgba(30, 30, 30, 0.7);
                      }
                  }
              }
          }

          &.toggle{
            transform: translateX(0);
          }
        }

        .current-month-income-list-outer{
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 35px 5px;
          transform: translateX(0);
          transition: .5s ease;

          .current-month-income-list{
            width: 100%;
            background-color: rgba(30, 30, 30, 0.7);
            border-radius: 5px;
            box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);

            .table-header{
              display: grid;
              grid-template-columns: 20% 20% 20% 20% 20%;
              padding: 12px;
              border-bottom: 2px solid rgba(255, 255, 255, 0.5);

              div{
                color: white;
                font-weight: bold;
                text-align: center;
              }
            }

            .table-body{

              .items{
                display: grid;
                grid-template-columns: 20% 20% 20% 20% 20%;
                padding: 12px;
                border-bottom: .5px solid rgba(255, 255, 255, 0.5);

                &:last-child{
                  border-bottom: unset;
                }

                div{
                  color: white;
                  text-align: center;
                  
                  &.imcome-alert{
                    color: rgb(51,255,51);
                  }
                }

                .config-group{
                  display: flex;
                  justify-content: center;

                  .edit-btn{
                    cursor: pointer;
                    user-select: none;
                    margin-right: 6px;
                    box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.7);
                    border-radius: 5px;
                    padding: 0 6px;
                  }

                  .delete-btn{
                    cursor: pointer;
                    user-select: none;
                    margin-left: 6px;
                    box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.7);
                    border-radius: 5px;
                    padding: 0 6px;
                  }
                }
              }
            }

            .table-footer{
              display: flex;
              justify-content: flex-end;
              padding: 12px;
              color: white;
              border-top: 2px solid rgba(255, 255, 255, 0.5);

              &.no-data{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 315px;
              }
            }
          }

          &.toggle{
            transform: translateX(-100%);
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
    }
    .current-month-income-outer-active {
      margin-top: 0;
    }
  }

  &.page-outer-active {
    opacity: 1;
  }
}
</style>
<script lang="ts">
import { defineComponent,ref,onMounted,inject,watch, toRef } from 'vue'
import { useRouter } from 'vue-router'
import { ProviderObjType } from '../../App.vue'
import { ChartPie,ChartBackgroundColorEnum,CustomModal,Loading } from '../../component'
import { stateType,methodType,incomeHistoryDataType } from '.'

export default defineComponent({
    components:{
      ChartPie,
      CustomModal,
      Loading
    },
    setup(){
        const { $,Fetch,getReducer,toast } = inject<ProviderObjType>('NewProvider')
        const router = useRouter()
        const { auth } = getReducer(({ Login,Main }) => ({
          auth: toRef(Login.auth) 
        }))

        const state:stateType = {
            showIncomeGroup: ref([]),
            allIncomeCount: ref(-1),
            dateInputVal: ref(''),
            titleDateVal: ref({ year:'',month:'' }),
            incomeHistory: ref([]),
            incomeHistorySumList: ref([]),
            currentIncomeToggle: ref(false),
            chartObj: ref({
              renderData: [],
              categorys: [],
              pieCategory: '',
              pieCategoryBackgroundColor: []
            }),
            isRenderChart: ref(true),
            isLoading: ref(false),
            modalParams: ref({
              isOpen: false,
              content: '',
              uuid: ''
            })
        }

        const method:methodType = {
            goBack:() => {
              state.currentIncomeToggle.value = false
              setTimeout(() => router.push("/main"), 1000);
            },
            getData: async (year,month) => {
              state.isLoading.value = true

              const { status,data: result,statusText } = await Fetch.get<incomeHistoryDataType[]>(`/get_current_month/income/${year}/${month}`,{
                token: auth.value.token
              })

              if(status >= 200 && status <= 399){
                state.incomeHistory.value = result
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
            changeTab: status => {
              state.isRenderChart.value = status
            },
            goEdit: uuid => {
              router.push({ path:'edit_income',state: { uuid } })
            },
            goDelete: row => {
              const { uuid,name } = row

              state.modalParams.value = {
                isOpen: true,
                content: `確定要刪除 ${name} 此筆收入紀錄嗎`,
                uuid
              }
            },
            modalEvent: async status => {

              if(status){
                state.isLoading.value = true

                const { status,statusText } = await Fetch.delete<{ message:string }>('/delete_history',{ data: { uuid:state.modalParams.value.uuid } })

                if(status >= 200 && status <= 399){
                  toast.success('刪除收入紀錄成功',{ 
                    icon: 'far fa-check-circle' 
                  })

                  const { year,month } = state.titleDateVal.value

                  method.getData(year,month)
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

              state.modalParams.value = {
                isOpen: false,
                content: '',
                uuid: ''
              }
            }
        }

        watch(state.incomeHistory,(cur) => {
          if(cur.length === 0) {
            state.chartObj.value = {
              renderData: [1],
              categorys: [],
              pieCategory: '',
              pieCategoryBackgroundColor: ['PINK']
            }

            state.incomeHistorySumList.value = [{
              cashWayName: '無',
              cashWayTotal: 0,
              cashWayBarColor: ChartBackgroundColorEnum.PINK
            }]
            return
          }

          state.showIncomeGroup.value = $.maps(cur,row => ({
            uuid: row.uuid,
            name: row.name,
            cashWay: row.cashWay,
            amount: row.amount,
            wayFullDate: row.wayFullDate
          }))

          const filterCategory =  new Set($.maps(cur,row => row.cashWay)).toArray<string>()

          const incomeHistorySum = $.maps(filterCategory,(cashWayName,index) => {
            const filterItem = $.filter(cur,filterRow => filterRow.cashWay === cashWayName)

            const cashWayBarColor = $.objDetails(ChartBackgroundColorEnum,'values')[index] as string
            
            return {
              cashWayName,
              cashWayTotal: $.maps(filterItem, x => x.amount).reduce((a,b) => a + b),
              cashWayBarColor
            }
          })

          state.incomeHistorySumList.value = incomeHistorySum

          state.allIncomeCount.value = $.maps(incomeHistorySum,row => row.cashWayTotal).reduce((a,b) => a + b)

          state.chartObj.value = {
            renderData: $.maps(incomeHistorySum,row => row.cashWayTotal),
            categorys: $.maps(incomeHistorySum,row => row.cashWayName),
            pieCategory: '金額',
            pieCategoryBackgroundColor: $.createArray({ type: 'fake',item: { random: incomeHistorySum.length } },num => {
              return ($.objDetails(ChartBackgroundColorEnum,'keys') as (keyof typeof ChartBackgroundColorEnum)[])[num]
            })
          }
        },{
          deep: true
        })

        watch(state.dateInputVal,async (cur,prev) => {
          const [year,month] = cur.split('-')
          state.titleDateVal.value = { year,month:parseInt(month).toString() }
          state.showIncomeGroup.value = []
          state.allIncomeCount.value = -1
          await method.getData(year,parseInt(month).toString())
        },{
          deep: true
        })

        onMounted(() => {
          const [year,month] = ($.formatDateTime({ formatDate: new Date(), formatType: 'yyyy-MM' }) as string).split('-')
          state.dateInputVal.value = `${year}-${month}`
          state.titleDateVal.value = { year,month:parseInt(month).toString() }
          setTimeout(() => state.currentIncomeToggle.value = true, 1900);
        })

        return { ...state,...method }
    }
    
})
</script>