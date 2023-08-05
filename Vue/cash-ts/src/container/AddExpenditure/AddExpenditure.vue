<template lang="pug">
.page-outer(:class="{'page-outer-animate':costColumn}")
  span.add-title-cost {{ isEditMode ? '編輯支出項目' : '新增支出項目' }}
  .row.justify-content-center
      .col-md-10
          .cost-column-outer-frame(:class="{ 'disabled-hidden':disabledHidden }")
              .cost-column-outer(:class="{ 'cost-column-outer-active':costColumn }")
                  .cost-column
                      .row
                          .col-md-6
                              .date-input-group
                                .date-choose
                                  .choose-year
                                    CustomInput(
                                      label="年份"
                                      type="text"
                                      size="sm"
                                      align="center"
                                      usingType="list"
                                      :selectedRowTemp="dateInputVals.year"
                                      :options="Array.from({ length:21 },(_,num) => num + 2020)"
                                      @getOptionVal="val => dateInputVals.year = val"
                                    )
                                  .choose-month
                                    CustomInput(
                                      label="月份"
                                      type="text"
                                      size="sm"
                                      align="center"
                                      usingType="list"
                                      :selectedRowTemp="dateInputVals.month"
                                      :options="Array.from({ length:12 },(_,num) => num + 1)"
                                      @getOptionVal="val => dateInputVals.month = val"
                                    )
                                  .choose-date
                                    CustomInput(
                                      label="日期"
                                      type="text"
                                      size="sm"
                                      align="center"
                                      usingType="list"
                                      :selectedRowTemp="dateInputVals.date"
                                      :options="Array.from({ length:31 },(_,num) => num + 1)"
                                      @getOptionVal="val => dateInputVals.date = val"
                                    )
                              .cost-input-group
                                  .cost-name-outer
                                    CustomInput(
                                      label="支出名稱"
                                      type="text"
                                      size="sm"
                                      align="center"
                                      usingType="input"
                                      :inputValTemp="costInputVals.costName"
                                      @changeEvent="val => costInputVals.costName = val"
                                    )
                                  .cost-cash-outer
                                    CustomInput(
                                      label="支出金額"
                                      type="tel"
                                      size="sm"
                                      align="center"
                                      usingType="input"
                                      :inputValTemp="costInputVals.costCash"
                                      @changeEvent="val => costInputVals.costCash = val"
                                    )
                                  .cost-type-outer
                                    CustomInput(
                                      label="支出項目"
                                      type="text"
                                      size="sm"
                                      align="center"
                                      usingType="list"
                                      :options="JSON.parse(JSON.stringify(costItemOrder))"
                                      :selectedRowTemp="costInputVals.costType"
                                      @getOptionVal="val => costInputVals.costType = val"
                                    )
                                  .cost-way-outer
                                    CustomInput(
                                      label="支付類別"
                                      type="text"
                                      size="sm"
                                      align="center"
                                      usingType="list"
                                      :options="JSON.parse(JSON.stringify(costCatagoryOrder))"
                                      :selectedRowTemp="costInputVals.costWay"
                                      @getOptionVal="val => costInputVals.costWay = val"
                                    )
                          .col-md-6
                              .cost-details
                                  span.cost-date-show 日期：{{ dateInputVals.year || '--' }} / {{ 10 > dateInputVals.month && dateInputVals.month ? '0':'' }}{{ dateInputVals.month || '--' }} / {{ 10 > dateInputVals.date && dateInputVals.date ? '0' : '' }}{{ dateInputVals.date || '--' }}
                                  span 名稱：{{ costInputVals.costName || '無' }}
                                  span 金額：{{ costInputVals.costCash ? `${costInputVals.costCash} 元` : '無' }}
                                  span 項目：{{ costInputVals.costTypeDesc || '無' }}
                                  span 類別：{{ costInputVals.costWayDesc || '無' }}
                      .send-outer(@click="isEditMode ? updateCost() : createCost()")
                        .send {{ isEditMode ? '修改' : '新增' }}
                  .row.justify-content-center
                      .col-md-5
                          .back
                              span(@click="goBack") 返回功能選項
Loading(:loadingStatus="isLoading")
</template>
<style lang="scss" scoped>
.page-outer{
  opacity: 0;
  transition: 1s ease;

  .add-title-cost {
    display: block;
    text-align: center;
    font-size: 30px;
    padding: 20px 0 20px 0;
    color: white;
    font-weight: bold;
    text-shadow: 0 2px 1px rgba(0, 0, 0, 0.7);
  }

  .cost-column-outer-frame {
    overflow: hidden;

    .cost-column-outer {
      margin-top: -700px;
      transition: 1s ease;

      .cost-column {
        position: relative;
        color: white;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 15px;
        border-radius: 10px;
        box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.7),
          0 0 3px 1px rgba(0, 0, 0, 0.7);

        .date-input-group {

          .date-choose {
            display: flex;

            .choose-month {
              margin: 0 10px;
            }
          }
        }
        
        .cost-input-group {
          display: flex;
          justify-content: center;
          flex-direction: column;

          .cost-way-outer{
            
            .input-outer{
              margin-bottom: 0;
            }
          }
        }

        .cost-details {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;

          span {
            display: block;
            margin: 10px 0 10px 0;
          }
        }

        .send-outer {
          position: absolute;
          bottom: 0;
          right: 0;
          background-color: rgb(0, 110, 255);
          border-radius: 5px;
          padding: 5px 18px 2px 18px;
          margin: 10px;
          cursor: pointer;
          user-select: none;

          .send {
            text-align: center;
            font-size: 18px;
          }

          @media screen and (max-width: 414px) {
            padding: 3px 0 0 0;
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

      &.cost-column-outer-active {
        margin-top: 0;
      }
    }
    
    &.disabled-hidden {
      overflow: unset;
    }
  }

  &.page-outer-animate{
    opacity: 1;
  }
}
</style>
<script lang="ts">
import { defineComponent,ref,onMounted,inject,toRef,watch } from 'vue'
import { useRouter } from 'vue-router'
import { ProviderObjType } from '../../App.vue'
import { CustomInput,Loading } from '../../component'
import { singleExpenditureDataType,stateType,methodType } from '.'

export default defineComponent({
    components: {
      CustomInput,
      Loading
    },
    setup(){
        const router = useRouter()
        
        const { $,getReducer,Fetch,toast } = inject<ProviderObjType>('NewProvider')
        
        const { costItemOrder,costCatagoryOrder,auth } = getReducer(({ Main,Login }) => ({ 
          costCatagoryOrder: Main.costCatagoryOrder,
          costItemOrder: Main.costItemOrder,
          auth: toRef(Login.auth)
        }))

        const state:stateType = {
            dateInputVals: ref({
                year: null,
                month: null,
                date: null
            }),
            costInputVals: ref({
                costName: null,
                costCash: null,
                costType: null,
                costTypeDesc: null,
                costWay: null,
                costWayDesc: null
            }),
            pageAnimate: ref(false),
            costColumn: ref(false),
            disabledHidden: ref(false),
            isEditMode: ref(false),
            isLoading: ref(false)
        }

        const method:methodType = {
          goBack: () => {
            state.disabledHidden.value = false
            setTimeout(() => state.costColumn.value = false,200)
            
            setTimeout(() => router.push('/main'),1200)
          },
          createCost: async () => {
            const dateInputCheck = ($.objDetails(state.dateInputVals.value,'values') as string[]).filter(row => row === '' || row === null)
            const costInputCheck = ($.objDetails(state.costInputVals.value,'values') as string[]).filter(row => row === '' || row === null)
            
            if(dateInputCheck.length > 0 || costInputCheck.length > 0) {
              toast.error('其餘欄位不可為空',{ 
                icon: 'far fa-times-circle'
              })
              return
            }

            state.isLoading.value = true

            const { costName,costCash,costType,costWay } = state.costInputVals.value

            const { status,data:result } = await Fetch.post<{ message:string }>('/create_expenditure',{
              token: auth.value.token,
              data: {
                name: costName,
                amount: parseInt(costCash),
                cashType: costType,
                cashWay: costWay,
                wayCategory: 'expenditure',
                wayFullDate: $.formatDateTime({ 
                  formatDate: new Date(
                    parseInt(state.dateInputVals.value.year),
                    parseInt(state.dateInputVals.value.month) - 1,
                    parseInt(state.dateInputVals.value.date)
                  ),
                  formatType: 'yyyy-MM-dd'
                }) as string,
                createDate: $.formatDateTime({ formatDate: new Date(),formatType: 'yyyy-MM-dd HH:mm:ss' })
              }
            })

            if(status >= 200 && status <= 399){
              toast.success('新增支出成功',{ 
                icon: 'far fa-check-circle' 
              })

              state.dateInputVals.value = {
                year: null,
                month: null,
                date: null
              }

              state.costInputVals.value = {
                costName: null,
                costCash: null,
                costType: null,
                costTypeDesc: null,
                costWay: null,
                costWayDesc: null
              }
            } else if(status === 403) {
              toast.error('請重新登入再做操作',{ 
                icon: 'far fa-times-circle'
              })
            } else {
              toast.error(result.message,{ 
                icon: 'far fa-times-circle'
              })
            }

            state.isLoading.value = false
          },
          updateCost: async () => {
            const dateInputCheck = ($.objDetails(state.dateInputVals.value,'values') as string[]).filter(row => row === '' || row === null)
            const costInputCheck = ($.objDetails(state.costInputVals.value,'values') as string[]).filter(row => row === '' || row === null)
            
            if(dateInputCheck.length > 0 || costInputCheck.length > 0) {
              toast.error('其餘欄位不可為空',{ 
                icon: 'far fa-times-circle'
              })
              return
            }

            state.isLoading.value = true

            const { costName,costCash,costType,costWay } = state.costInputVals.value

            const { status,data:result } = await Fetch.put<{ message:string }>('/update_single/expenditure',{
              token: auth.value.token,
              data: {
                name: costName,
                amount: parseInt(costCash),
                cashType: costType,
                cashWay: costWay,
                uuid: window.history.state.uuid,
                wayCategory: 'expenditure',
                wayFullDate: $.formatDateTime({ 
                  formatDate: new Date(
                    parseInt(state.dateInputVals.value.year),
                    parseInt(state.dateInputVals.value.month) - 1,
                    parseInt(state.dateInputVals.value.date)
                  ),
                  formatType: 'yyyy-MM-dd'
                }) as string,
                createDate: $.formatDateTime({ formatDate: new Date(),formatType: 'yyyy-MM-dd HH:mm:ss' })
              }
            })

            if(status >= 200 && status <= 399){
              toast.success('修改支出成功',{ 
                icon: 'far fa-check-circle' 
              })

            } else if(status === 403) {
              toast.error('請重新登入再做操作',{ 
                icon: 'far fa-times-circle'
              })
            } else {
              toast.error(result.message,{ 
                icon: 'far fa-times-circle'
              })
            }

            state.isLoading.value = false
          },
          getSingleCost: async uuid => {
            if(!uuid) return

            state.isEditMode.value = true

            state.isLoading.value = true

            const res = await Fetch.post<singleExpenditureDataType>('/get_single_data/expenditure',{
              data: { uuid }
            })

            if(res.status >= 200 && res.status <= 399){
              const { cashType:costType,cashWay:costWay,name:costName,uuid,amount,wayFullDate } = res.data

              const [year,month,date] = wayFullDate.split('-')

              state.dateInputVals.value = {
                  year,
                  month: parseInt(month).toString(),
                  date: parseInt(date).toString()
              }
              
              state.costInputVals.value = {
                  ...state.costInputVals.value,
                  costName,
                  costCash: amount.toString(),
                  costType,
                  costWay,
              }
            }

            state.isLoading.value = false
          }
        }

        watch(state.costInputVals,cur => {
          if(cur.costType){
            const [filterDesc] = $.filter(costItemOrder.value,({ key }) => key === cur.costType)
            cur.costTypeDesc = filterDesc.names
          }

          if(cur.costWay){
            const [filterDesc] = $.filter(costCatagoryOrder.value,({ key }) => key === cur.costWay)
            cur.costWayDesc = filterDesc.ways
          }
        },{
            deep: true
        })

        onMounted(() => {
          method.getSingleCost(window.history.state.uuid)
          setTimeout(() => state.costColumn.value = true,1900)
          setTimeout(() => state.disabledHidden.value = true,2400)
        })

        return { ...state,...method,costItemOrder,costCatagoryOrder }
    }
})
</script>