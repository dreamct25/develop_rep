<template lang="pug">
.page-outer(:class="{'page-outer-active':testCountToggle}")
  span.test-count-title 支出試算
  .row.justify-content-center
      .col-md-5
          .test-count-outer-frame
              .test-count-outer(:class="{'test-count-outer-active':testCountToggle}")
                  .test-count
                      .test-count-header
                          .get-num-show
                              .get-for-month
                                  span 本月餘額
                                  span 本年餘額
                              .get-for-year
                                  span {{ lastOnlyData.currentMonthLast }} 元
                                  span {{ lastOnlyData.currentYearLast }} 元
                          .prepped-for-pay
                              span 預計支出
                              span {{ !showNum ?'等待輸入中':`${showNum} 元`}}
                          .final-count
                              span.final-count-title 計算結果
                              .final-count-month
                                  span 本月支出後餘額
                                  span {{ !lastOnlyFinalCountData.finalMonthCount ? '等待計算中':`${lastOnlyFinalCountData.finalMonthCount} 元` }}
                              .final-count-year
                                  span 本年支出後餘額
                                  span {{ !lastOnlyFinalCountData.finalYearCount ? '等待計算中':`${lastOnlyFinalCountData.finalYearCount} 元` }}
                      .test-count-body
                          span.show-count-title(@click="showCal = !showCal")
                              |{{ showCal ? '關閉計算機' : '開起計算機' }}
                              i.fal.fa-angle-up.arrow(:class="{'arrow-active':showCal}")
                          .test-count-outer
                              .test-count(:class="{'test-count-active':showCal}")
                                  .num-btn-group
                                      .num-btn.num(
                                          v-for="(num,index) in 9"
                                          :key="index"
                                          :data-num="num"
                                          :class="{'num-btn-active': currentNum === num.toString() }"
                                          @click="numCounter(num)"
                                      ) {{ num }}
                                      .num-btn-zero.num(:class="{'num-btn-active': currentNum === '0' }",@click="numCounter(0)") 0
                                  .num-count-group
                                      .back-btn(:class="{'num-btn-active': currentNum === '<' }",@click="deleteNum")
                                          i.fas.fa-angle-left
                                      .clear-btn(:class="{'num-btn-active': currentNum === 'C' }",@click="deleteAll") C
                                      .count-btn(:class="{'num-btn-active': currentNum === '=' }",@click="countCounter") 計算
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

  .test-count-title {
    display: block;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    padding: 20px 0 20px 0;
    color: white;
    text-shadow: 0 2px 1px rgba(0, 0, 0, 0.7);
  }

  .test-count-outer-frame {
    overflow: hidden;

    .test-count-outer {
      margin-top: -700px;
      transition: 1s ease;

      .test-count {

        .test-count-header {

          .get-num-show {
            display: flex;
            justify-content: space-between;

            .get-for-month,
            .get-for-year {

              span {
                display: block;
                text-align: center;
                color: white;
                font-weight: bold;
                font-size: 20px;
                text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
              }
            }

            .get-for-year {

              span {
                text-align: right;
              }
            }
          }

          .prepped-for-pay {
            display: flex;
            justify-content: space-between;

            span {
              display: block;
              text-align: center;
              color: white;
              font-weight: bold;
              font-size: 20px;
              text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
            }
          }
          .final-count {
            margin: 20px 0 20px 0;

            .final-count-title {
              display: block;
              color: white;
              font-weight: bold;
              font-size: 20px;
              text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
            }

            .final-count-month {
              display: flex;
              justify-content: space-between;

              span {
                display: block;
                text-align: center;
                color: white;
                font-weight: bold;
                font-size: 20px;
                text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
              }
            }

            .final-count-year {
              display: flex;
              justify-content: space-between;

              span {
                display: block;
                text-align: center;
                color: white;
                font-weight: bold;
                font-size: 20px;
                text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
              }
            }
          }
        }

        .test-count-body {

          .show-count-title {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            color: white;
            font-weight: bold;
            font-size: 20px;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 7);
            cursor: pointer;
            user-select: none;

            .arrow {
              padding: 5px;
              font-size: 25px;
              transform: rotate(0deg);
              transition: 0.7s ease;

              &.arrow-active {
                transform: rotate(180deg);
              }
            }
          }

          .test-count-outer {
            overflow: hidden;
            margin: 10px 0 5px 0;

            .test-count {
              display: flex;
              justify-content: center;
              margin-top: -100%;
              transition: 0.7s ease;

              .num-btn-group {
                display: flex;
                flex-wrap: wrap;
                width: 264px;

                .num-btn {
                  width: 86px;
                  height: 86px;
                  display: flex;
                  justify-content: center;
                  flex-direction: column;
                  align-items: center;
                  color: white;
                  background-color: rgba(0, 0, 0, 0.9);
                  font-size: 25px;
                  margin: 1px;
                  border-radius: 8px;
                  box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.6);
                  cursor: pointer;
                  user-select: none;
                  transition: 0.3s ease;
                }

                .num-btn-zero {
                  width: 262px;
                  height: 86px;
                  font-size: 25px;
                  display: flex;
                  justify-content: center;
                  flex-direction: column;
                  align-items: center;
                  background-color: rgba(0, 0, 0, 0.9);
                  color: white;
                  margin: 1px;
                  border-radius: 8px;
                  box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.6);
                  cursor: pointer;
                  user-select: none;
                  transition: 0.3s ease;
                }

                .num-btn-active {
                  color: black;
                  background-color: rgba(255, 255, 255, 0.9);
                  box-shadow: inset 0 0 3px 1px rgba(0, 0, 0, 0.6);
                }
              }

              .num-count-group {

                .back-btn,
                .clear-btn,
                .count-btn {
                  width: 86px;
                  height: 86px;
                  display: flex;
                  justify-content: center;
                  flex-direction: column;
                  align-items: center;
                  color: white;
                  font-size: 25px;
                  background-color: rgba(0, 0, 0, 0.9);
                  margin: 2px 1px 2px 1px;
                  border-radius: 8px;
                  box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.6);
                  cursor: pointer;
                  user-select: none;
                  transition: 0.3s ease;
                }

                .back-btn {
                  margin: 1px 1px 2px 1px;
                }

                .count-btn {
                  height: 174px;
                  margin: 2px 1px 2px 1px;
                }

                .num-btn-active {
                  color: black;
                  background-color: rgba(255, 255, 255, 0.9);
                  box-shadow: inset 0 0 3px 1px rgba(0, 0, 0, 0.6);
                }
              }

              &.test-count-active {
                margin-top: 0;
              }
            }
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

      &.test-count-outer-active {
        margin-top: 0;
      }
    }
  }
}
.page-outer-active {
  opacity: 1;
}
</style>
<script lang="ts">
import { defineComponent,ref,onMounted,inject,watch, toRef } from 'vue'
import { useRouter } from 'vue-router'
import { ProviderObjType } from '../../App.vue'
import { Loading } from '../../component'
import { stateType,methodType,lastOnlyDataType } from '.'

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
      testCountToggle: ref(false),
      showNum: ref(''),
      lastOnlyFinalCountData: ref({
          finalMonthCount: 0,
          finalYearCount: 0
      }),
      showCalText: ref('開起計算機'),
      showCal: ref(false),
      renderNumArray: ref([]),
      lastOnlyData: ref({
          currentMonthLast: 0,
          currentYearLast: 0
      }),
      currentNum: ref(''),
      isLoading: ref(false)
    }

    const method:methodType = {
      goBack:() => {
        state.testCountToggle.value = false
        setTimeout(() => router.push("/main"), 1000);
      },
      numCounter: num => {
          const numToStr = num.toString()

          state.currentNum.value = numToStr

          setTimeout(() =>  state.currentNum.value = '',300)

          state.renderNumArray.value.append(numToStr)

          if(state.renderNumArray.value.at(0) === '0'){
              state.renderNumArray.value = []
              return
          }

          state.showNum.value = state.renderNumArray.value.join('')
      },
      deleteNum: () => {
          state.currentNum.value = '<'

          setTimeout(() =>  state.currentNum.value = '',300)

          if(state.showNum.value.split('').length !== 1) {
              state.renderNumArray.value = state.showNum.value.split('')
              state.renderNumArray.value.removeLast()
              state.showNum.value = state.renderNumArray.value.join('')
          } else {
              state.renderNumArray.value = []
              state.showNum.value = ''
          }
      },
      deleteAll: () => {
          state.currentNum.value = 'C'

          setTimeout(() =>  state.currentNum.value = '',300)

          state.renderNumArray.value = []
          state.showNum.value = ''
      },
      countCounter: () => {
          state.currentNum.value = '='

          setTimeout(() =>  state.currentNum.value = '',300)

          const inCalculatorNum = parseInt(state.showNum.value)

          state.lastOnlyFinalCountData.value = {
              finalMonthCount: state.lastOnlyData.value.currentMonthLast - inCalculatorNum,
              finalYearCount: state.lastOnlyData.value.currentYearLast - inCalculatorNum
          }
      },
      getData: async (year,month) => {
        state.isLoading.value = true

        const { status,data: result,statusText } = await Fetch.get<lastOnlyDataType>(`/get_last_total/only/${year}/${month}`,{
            token: auth.value.token
        })

        if(status >= 200 && status <= 399){
          state.lastOnlyData.value = result
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

    onMounted(async () => {
        await method.getData(new Date().getFullYear(),new Date().getMonth() + 1)
        setTimeout(() => state.testCountToggle.value = true, 1900);
    })

    return { ...state,...method }
  }
})
</script>