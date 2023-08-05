<template lang="pug">
.page-outer(:class="{'page-outer-animate':getCashGroup}")
  span.add-title-get {{ isEditMode ? '編輯收入項目' : '新增收入項目' }}
  .get-cash-group-outer-frame(:class="{ 'disabled-hidden':disabledHidden }")
      .get-cash-group-outer(:class="{'get-cash-group-outer-active':getCashGroup}")
          .row.justify-content-center
              .col-md-10
                  .get-cash-group
                      .row
                          .col-md-6
                              .get-date-outer
                                  .get-date
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
                              .get-cash-details-outer
                                .get-name-outer
                                  CustomInput(
                                    label="收入名稱"
                                    type="text"
                                    size="sm"
                                    align="center"
                                    usingType="input"
                                    :inputValTemp="getInputVals.getName"
                                    @changeEvent="val => getInputVals.getName = val"
                                  )
                                .get-cash-amount
                                  CustomInput(
                                    label="收入金額"
                                    type="text"
                                    size="sm"
                                    align="center"
                                    usingType="input"
                                    :inputValTemp="getInputVals.getCash"
                                    @changeEvent="val => getInputVals.getCash = val"
                                  )
                                .get-cash-type-outer
                                  CustomInput(
                                    label="收入項目"
                                    type="text"
                                    size="sm"
                                    align="center"
                                    usingType="list"
                                    :options="JSON.parse(JSON.stringify(incomeCatagoryOrder))"
                                    :selectedRowTemp="getInputVals.getCashWay"
                                    @getOptionVal="val => getInputVals.getCashWay = val"
                                  )
                          .col-md-6
                              .get-cash-details-show
                                  span.get-cash-date-show 日期：{{ dateInputVals.year || '--' }} / {{ 10 > dateInputVals.month && dateInputVals.month ? '0':'' }}{{ dateInputVals.month || '--' }} / {{ 10 > dateInputVals.date && dateInputVals.date ? '0' : '' }}{{ dateInputVals.date || '--' }}
                                  span.get-name-show 名稱：{{ getInputVals.getName || '無' }}
                                  span.get-cash-show 金額：{{ getInputVals.getCash ? `${getInputVals.getCash} 元` : '無'}}
                                  span.get-cash-type-show 項目：{{ getInputVals.getCashWayDesc || '無' }}
                      .send-outer(@click="isEditMode ? updateIncome() : createIncome()")
                          .send {{ isEditMode ? '修改' : '新增' }}
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

  .add-title-get {
    display: block;
    text-align: center;
    font-size: 30px;
    padding: 20px 0 20px 0;
    color: white;
    font-weight: bold;
    text-shadow: 0 2px 1px rgba(0, 0, 0, 0.7);
  }
  .get-cash-group-outer-frame {
    overflow: hidden;
    padding: 5px;

    .get-cash-group-outer {
      margin-top: -700px;
      transition: 1s ease;

      .get-cash-group {
        position: relative;
        color: white;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 15px;
        border-radius: 10px;
        box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.7),
          0 0 3px 1px rgba(0, 0, 0, 0.7);

        .get-date-outer {

          .get-date {
            display: flex;

            .choose-month {
              margin: 0 10px;
            }
          }
        }

        .get-cash-details-outer {
          display: flex;
          justify-content: center;
          flex-direction: column;

          .get-cash-type-outer{

            .input-outer{
              margin-bottom: 0;
            }
          }
        }

        .get-cash-details-show {
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

      &.get-cash-group-outer-active {
        margin-top: 0;
      }
    }

    &.disabled-hidden {
      overflow: unset;
    }
  }

  &.page-outer-animate {
    opacity: 1;
  }
}
</style>
<script lang="ts">
import { defineComponent,ref,onMounted,toRef,inject,watch } from 'vue'
import { useRouter } from 'vue-router'
import { ProviderObjType } from '../../App.vue'
import { CustomInput,Loading } from '../../component'
import { stateType,methodType,singleIncomeDataType } from '.'

export default defineComponent({
    components:{
      CustomInput,
      Loading
    },
    setup(){
        const router = useRouter()

        const { $,getReducer,Fetch,toast } = inject<ProviderObjType>('NewProvider')

        const { incomeCatagoryOrder,auth } = getReducer(({ Main,Login }) => ({ 
          incomeCatagoryOrder: Main.incomeCatagoryOrder,
          auth: toRef(Login.auth)
        }))
        
        const state:stateType = {
            dateInputVals: ref({
                year: null,
                month: null,
                date: null
            }),
            getInputVals: ref({
                getName: null,
                getCash: null,
                getCashWay: null,
                getCashWayDesc: null
            }),
            getCashGroup: ref(false),
            disabledHidden: ref(false),
            isEditMode: ref(false),
            isLoading: ref(false)
        }

        const method:methodType = {
          goBack:() => {
            state.disabledHidden.value = false
            setTimeout(() => state.getCashGroup.value = false,200)
            
            setTimeout(() => router.push('/main'),1200)
          },
          createIncome: async () => {
            const dateInputCheck = ($.objDetails(state.dateInputVals.value,'values') as string[]).filter(row => row === '' || row === null)
            const getInputCheck = ($.objDetails(state.getInputVals.value,'values') as string[]).filter(row => row === '' || row === null)

            if(dateInputCheck.length > 0 || getInputCheck.length > 0) {
                toast.error('其餘欄位不可為空',{ 
                  icon: 'far fa-times-circle'
                })

                return
            }

            state.isLoading.value = true

            const { getName,getCash,getCashWay } = state.getInputVals.value

            const { status,data:result } = await Fetch.post<{ message:string }>('/create_income',{
                token: auth.value.token,
                data: {
                    name: getName,
                    amount: parseInt(getCash),
                    cashWay: getCashWay,
                    cashType: undefined,
                    wayCategory: 'income',
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
              toast.success('新增收入成功',{ 
                icon: 'far fa-check-circle' 
              })
              
              state.dateInputVals.value = {
                  year: null,
                  month: null,
                  date: null
              }

              state.getInputVals.value = {
                  getName: null,
                  getCash: null,
                  getCashWay: null,
                  getCashWayDesc: null
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
          updateIncome: async () => {
            const dateInputCheck = ($.objDetails(state.dateInputVals.value,'values') as string[]).filter(row => row === '' || row === null)
            const getInputCheck = ($.objDetails(state.getInputVals.value,'values') as string[]).filter(row => row === '' || row === null)

            if(dateInputCheck.length > 0 || getInputCheck.length > 0) {
                toast.error('其餘欄位不可為空',{ 
                  icon: 'far fa-times-circle'
                })
                return
            }

            state.isLoading.value = true

            const { getName,getCash,getCashWay } = state.getInputVals.value

            const { status,data:result } = await Fetch.put<{ message:string }>('/update_single/income',{
                token: auth.value.token,
                data: {
                  name: getName,
                  amount: parseInt(getCash),
                  cashWay: getCashWay,
                  cashType: undefined,
                  uuid: window.history.state.uuid,
                  wayCategory: 'income',
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
              toast.success('修改收入成功',{ 
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
          getSingleIncome: async uuid => {
            if(!uuid) return

            state.isEditMode.value = true

            state.isLoading.value = true

            const res = await Fetch.post<singleIncomeDataType>('/get_single_data/income',{
              data: { uuid }
            })

            if(res.status >= 200 && res.status <= 399){
              const { cashWay:getCashWay,name:getName,uuid,amount,wayFullDate } = res.data

              const [year,month,date] = wayFullDate.split('-')

              state.dateInputVals.value = {
                  year,
                  month: parseInt(month).toString(),
                  date: parseInt(date).toString()
              }
              
              state.getInputVals.value = {
                ...state.getInputVals.value,
                getName,
                getCash: amount.toString(),
                getCashWay
              }
            }

            state.isLoading.value = false
          }
        }

        watch(state.getInputVals,cur => {
          if(cur.getCashWay){
              const [filterDesc] = $.filter(incomeCatagoryOrder.value,({ key }) => key === cur.getCashWay)
              cur.getCashWayDesc = filterDesc.ways
          }
        },{
          deep: true
        })

        onMounted(() => {
          method.getSingleIncome(window.history.state.uuid)
          setTimeout(() => state.getCashGroup.value = true, 1900);
          setTimeout(() => state.disabledHidden.value = true,2400)
        })

        return { ...state,...method,incomeCatagoryOrder }
    }
})
</script>