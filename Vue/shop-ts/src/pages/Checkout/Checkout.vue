<template lang="pug">
.bg
  .step-1(:class="{ 'page-animate': stepAnimateCount === 1, 'd-block': stepCount === 1 }")
    .row.no-gutters.justify-content-center
      .col-11.col-md-8
        .step-status
          span 請確認您所購買的產品與填寫訂單資料
    .row.no-gutters.justify-content-center
      .col-11.col-md-8
        .total-items-price-group
          .accordion#accordion
            .card
              .card-header#checkout-list
                span.mb-0.checkout-list-title 結帳商品
                span.all-cash.ml-auto {{ originTotal !== 0 ? `NT $${finalTotal || originTotal}` : '---' }}
                i.fal.fa-angle-down.list-switch.fa-2x(
                  :class="{ 'list-switch-active': isListActive }"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  @click="isListActive = !isListActive"
                )
              #collapseOne.collapse.show(
                aria-labelledby="checkout-list"
                data-parent="#accordion"
              )
                .card-body
                  .card-table
                    .top
                      .table-head
                        .table-row
                          .table-col
                          .table-col 商品名稱
                          .table-col 尺寸
                          .table-col 數量
                          .table-col 金額
                      .table-body
                        .table-row(
                          v-for="(row, index) in otLocation.orderLists"
                          :key="index"
                        )
                          .table-col
                            .img-outer-frame
                              .img-outer
                                img(:src="row.orderProductImgUrlI")
                          .table-col {{ row.orderProductName }}
                          .table-col {{ row.orderProductSize }}
                          .table-col {{ row.orderCount }}
                          .table-col {{ row.orderAllCash }}
                    .bottom
                      .table-footer
                        .table-row
                          .table-col
                          .table-col
                          .table-col
                          .table-col.font-weight-bold 原總額
                          .table-col {{ originTotal }}
                        .table-row
                          .table-col
                          .table-col
                          .table-col
                          .table-col.font-weight-bold 優惠券
                          .table-col.notice(v-if="!ticketValue") 否
                          
                          .table-col.notice(v-else-if="cpValid === false") 無效代碼
                          .table-col.success(v-else-if="cpValid") 是
                          .table-col.notice(v-else-if="ticketValue") 檢驗代碼中
                        .table-row(v-if="cpValid")
                          .table-col
                          .table-col
                          .table-col
                          .table-col.font-weight-bold 折扣
                          .table-col.notice {{ cpCount }} %
                        .table-row
                          .table-col
                          .table-col
                          .table-col
                          .table-col.font-weight-bold 總額
                          .table-col {{ finalTotal || originTotal }}
        .order-info
          h2 訂單資訊
          .row
            .col-md-6
              .order-name-group
                CustomInput(
                  size="md"
                  :label="paymentValueCheck('name') ? '請輸入您的姓名' : '姓名格式錯誤'"
                  usingType="input"
                  useStyle="white"
                  type="text"
                  :isValidStatus="!paymentValueCheck('name')"
                  :inputValTemp="paymentName"
                  @changeEvent="val => paymentName = val"
                )
            .col-md-6
              .order-email-group
                CustomInput(
                  size="md"
                  :label="paymentValueCheck('email') ? '請輸入您的 Email' : 'Email 格式錯誤'"
                  usingType="input"
                  useStyle="white"
                  type="email"
                  :isValidStatus="!paymentValueCheck('email')"
                  :inputValTemp="paymentEmail"
                  @changeEvent="val => paymentEmail = val"
                )
            .col-md-4
              .order-phone-group
                CustomInput(
                  size="md"
                  :label="paymentValueCheck('phone') ? '請輸入您的電話' : '電話格式錯誤'"
                  usingType="input"
                  useStyle="white"
                  type="tel"
                  :isValidStatus="!paymentValueCheck('phone')"
                  :inputValTemp="paymentTel"
                  @changeEvent="val => paymentTel = val"
                )
            .col-md-4
              .order-city-group
                CustomInput(
                  size="md"
                  label="縣市"
                  usingType="list"
                  useStyle="white"
                  type="text"
                  :selectedRowTemp="cityName"
                  :options="cityAll.map(row => row)"
                  @getOptionVal="changeCityDetails"
                )
            .col-md-4
              .order-block-group
                CustomInput(
                  size="md"
                  :label="cityName ? '地區' : '---'"
                  usingType="list"
                  useStyle="white"
                  type="text"
                  :disabled="!cityName"
                  :selectedRowTemp="blockName"
                  :options="blockNameAll.map(row => row)"
                  @getOptionVal="val => blockName = val"
                )
            .col-md-3
              .order-post-group
                CustomInput(
                  size="md"
                  :label="cityName ? '郵遞區號' : '---'"
                  usingType="list"
                  useStyle="white"
                  type="text"
                  :disabled="!cityName"
                  :selectedRowTemp="postNum"
                  :options="postNumAll.map(row => row)"
                  @getOptionVal="val => postNum = val"
                )
            .col-md-9
              .order-address-group
                CustomInput(
                  size="md"
                  :label="cityName ? paymentValueCheck('address') ? '地址' : '地址格式錯誤' : '---'"
                  usingType="input"
                  useStyle="white"
                  type="text"
                  :isValidStatus="!paymentValueCheck('address')"
                  :disabled="!cityName"
                  :inputValTemp="address"
                  @changeEvent="val => address = val"
                )
            .col-md-12
              .order-ticket-group
                CustomInput(
                  size="md"
                  label="優惠券(選填)"
                  usingType="input"
                  useStyle="white"
                  type="text"
                  :inputValTemp="ticketValue"
                  @blurEvent="ticketCheck"
                )
  .step-2(:class="{ 'page-animate': stepAnimateCount === 2, 'd-block': stepCount === 2 }")
    .row.no-gutters.justify-content-center
      .col-11.col-md-8
        .row.justify-content-center
          .col-md-4
            .step-status
              span 請選擇付款方式
    .row.no-gutters.justify-content-center
      .col-11.col-md-8
        .pay-frame
          .pay-choose
            .creadit(:class="{ 'pay-choose-active': paymentMethod === 'post' }",@click="cardChoose('creadit')")
              span 信用卡
            .post(:class="{ 'pay-choose-active': paymentMethod === 'creadit' }",@click="cardChoose('post')")
              span 郵寄
          .pay-outer
            .creadit-pay(:class="{ 'pay-animate': paymentMethod === 'creadit' }")
              span.pay-type-title 請選擇信用卡支付類型
              .pay-type-group
                template(v-if="!rwdMod")
                  .type-row(@wheel=`(event) => {
                    event.preventDefault();

                    if(event.target.className === 'type-row'){
                      event.target.scrollLeft += event.deltaY
                      return
                    }
                    
                    event.target.parentElement.parentElement.scrollLeft += event.deltaY
                  }`)
                    .type-col(v-for="(item, index) in cardTypeData",:key="index")
                      i.fab.fa-7x.pay-icon(
                        :class="{ 'creadit-active': item.cardName === cardType, [item.cardClass]: true }"
                        @click="creaditChoose(item.cardName)"
                      )
                template(v-else)
                  .type-row
                    .type-col(v-for="(item, index) in cardTypeData",:key="index")
                      i.fab.fa-7x.pay-icon(
                        :class="{ 'creadit-active': item.cardName === cardType, [item.cardClass]: true }"
                        @click="creaditChoose(item.cardName)"
                      )
              .pay-input
                span.card-type-choosing
                  |已選擇類型：
                  span.card-type-text(:class="{ 'card-type-text-hide': toggleCardTypeTextStatus }") {{ cardTypeTemp }}
                .row
                  .col-md-6
                    .creadit-num-group
                      CustomInput(
                        size="sm"
                        :label="creaditValueCheck('creaditNum') ? '卡號' : '卡號格式錯誤'"
                        usingType="input"
                        type="text"
                        :inputValTemp="creaditNums"
                        :isValidStatus="!creaditValueCheck('creaditNum')"
                        @changeEvent="val => creaditNums = val"
                      )
                  .col-md-6
                    .bottom
                      .creadit-month-group
                        CustomInput(
                          size="sm"
                          :label="creaditValueCheck('creaditMonth') ? '月份' : '請輸入月份'"
                          usingType="list"
                          listPos="-170px"
                          type="text"
                          labelAlign="center"
                          align="center"
                          :isValidStatus="!creaditValueCheck('creaditMonth')"
                          :selectedRowTemp="creaditMonth"
                          :options="Array.from({ length: 12 },(_, num) => num + 1)"
                          @getOptionVal="val => creaditMonth = val"
                        )
                      .creadit-year-group
                        CustomInput(
                          size="sm"
                          :label="creaditValueCheck('creaditYear') ? '年份' : '請輸入年份'"
                          usingType="list"
                          listPos="-170px"
                          type="text"
                          labelAlign="center"
                          align="center"
                          :isValidStatus="!creaditValueCheck('creaditYear')"
                          :selectedRowTemp="creaditYear"
                          :options="Array.from({ length: 41 },(_, num) => 2020 + num)"
                          @getOptionVal="val => creaditYear = val"
                        )
                      .creadit-check-code-group
                        CustomInput(
                          size="sm"
                          :label="creaditValueCheck('safeCode') ? '驗證碼' : '格式錯誤'"
                          usingType="input"
                          type="text"
                          labelAlign="center"
                          align="center"
                          :isValidStatus="!creaditValueCheck('safeCode')"
                          :inputValTemp="creaditSafeCheck"
                          @changeEvent="val => creaditSafeCheck = val"
                        )
            .post-pay(:class="{ 'pay-animate': paymentMethod === 'post' }")
              span.post-select-title 請選擇付款方式
              span.post-select-text(:class="{ 'post-select-text-hide': postType === '' }") {{ postType }}
              .row
                .col-md-6
                  .post-pay-before.post(:class="{ 'post-active': postMethod === 'bank' }",@click="postChoose('bank')")
                    i.fas.fa-hand-holding-usd
                .col-md-6
                  .post-pay-after.post(:class="{ 'post-active': postMethod === 'trunk' }",@click="postChoose('trunk')")
                    i.fas.fa-truck
              .post-account-group(:class="{ 'post-account-group-active': postMethod === 'bank'}")
                span.post-account 請將金額匯款到以下帳號
                p 066-6666-6666-6666
  .step-3(:class="{ 'page-animate': stepAnimateCount === 3, 'd-block': stepCount === 3 }")
    .row.no-gutters.justify-content-center
      .col-11.col-md-8
        .row.justify-content-center
          .col-md-4
            .step-status
              span {{  getNowPayInfo?.PMID && !getNowPayInfo?.PMState ? '訂單建立已建立' : getNowPayInfo?.PMState ? '訂單付款完成' : '確認完整訂單內容' }}
    .row.no-gutters.justify-content-center
      .col-11.col-md-8
        .completed-order
          .order-list-switch(@click="toggleOrderListPayDownStatus = !toggleOrderListPayDownStatus") 切換訂單內容
          .order-list(:class="{ 'order-info-active': toggleOrderListPayDownStatus }")
            span.completed-title {{ nextText === '結帳' ? '訂單建立完成' : '即將建立您的訂單' }} 
            .order-table
              .table-head
                .head-row
                  .head-col 
                  .head-col 商品名稱
                  .head-col 尺寸
                  .head-col 數量
                  .head-col 金額
              .table-body
                .body-row(v-for="(row, index) in otLocation.orderLists",:key="index")
                  .body-col
                    .img-outer-frame
                      .img-outer
                        img(:src="row.orderProductImgUrlI")
                  .body-col {{ row.orderProductName }}
                  .body-col {{ row.orderProductSize }}
                  .body-col {{ row.orderCount }}
                  .body-col {{ row.orderAllCash }}
              .table-foot
                .foot-row
                  .foot-col
                  .foot-col
                  .foot-col
                  .foot-col 總額
                  .foot-col {{ originTotal }}
          .order-profile(:class="{ 'order-info-active': !toggleOrderListPayDownStatus }")
            span.order-profile-title 買家資料
            .order-profile-table
              .table-body(v-if="getNowPayInfo")
                .table-row
                  .table-col 訂單編號
                  .table-col {{ getNowPayInfo.PMNum }}
                .table-row
                  .table-col 買家名稱
                  .table-col {{ getNowPayInfo.PMName }}
                .table-row
                  .table-col 買家電話
                  .table-col {{ getNowPayInfo.PMTel }}
                .table-row
                  .table-col 收件地址
                  .table-col {{ getNowPayInfo.PMAddress }}
                .table-row
                  .table-col 付款金額
                  .table-col NT ${{ getNowPayInfo.PMTotal }}
                .table-row
                  .table-col 付款方式
                  .table-col {{ getNowPayInfo.PMMethod }}
                .table-row
                  .table-col 付款狀態
                  .table-col.font-weight-bold(:class=`{ 
                    notice: !getNowPayInfo.PMState, 
                    success: getNowPayInfo.PMState 
                  }`) {{ getNowPayInfo.PMState ? '付款完成' : '尚未付款' }}
          span.completed-footer(
            :class="{ 'completed-footer-active': !toggleOrderListPayDownStatus }"
          ) {{ getNowPayInfo?.PMState ? '付款成功' : `請確認內容無誤後點${nextText}按鈕` }}
  .page-btn-group
      .row.no-gutters.justify-content-center
        .col-11.col-md-8(v-if="!payDownBack")
          .row.justify-content-center
            .col-md-4
              span.prev-btn(@click="prevStep") {{ prevText }}
            .col-md-4
              span.next-btn(@click="nextStep") {{ nextText }}
        .col-11.col-md-8(v-else)
            .row.justify-content-center
              .col-md-4
                span.back-btn(@click="backMain") 回主頁
Loading(:toggleLoadingStatus="toggleLoadingStatus")
</template>
<style lang="scss" scoped>
.bg {
  min-height: 100vh;
  overflow: hidden;

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("https://unsplash.com/photos/w2uvoJo_woE/download?force=true&w=1920");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    z-index: -1;
  }
}

.step-1 {
  display: none;
  opacity: 0;
  transform: translateX(100px);
  transition: 1s ease;

  .step-status {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    padding: 10px;
    margin: 60px 0;
    box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.7),
      0 0 2px 0 rgba(0, 0, 0, 0.7);
    
    @media screen and (max-width: 540px) {
      margin: 30px 0;
    }

    span {
      display: block;
      text-align: center;
    }
  }

  .card {
    border-radius: 10px 10px 0 0;
    border: none;

    .card-header {
      display: flex;
      align-items: center;
      padding: 12px 6px 12px 15px;

      .checkout-list-title {
        display: block;
        font-size: 20px;
        font-weight: bold;
      }

      .list-switch {
        margin: 0 10px 0 10px;
        cursor: pointer;
        user-select: none;
        transform: rotate(0deg);
        transition: 0.5s ease;
      }
      .list-switch-active {
        transform: rotate(-180deg);
      }

      .all-cash {
        color: red;
        font-size: 25px;
        font-weight: bold;
        font-style: italic;
        margin-right: 7px;

        @media screen and (max-width: 414px) {
          font-size: 25px;
        }
      }
    }

    .card-body {
      padding: 0;
      
      .card-table {

        .top {
          overflow-x: auto;
          overflow-y: hidden;

          .table-head {

            .table-row {
              display: grid;
              grid-template-columns: 
                minmax(105px, 1fr) 
                minmax(105px, 1fr) 
                minmax(105px, 1fr) 
                minmax(105px, 1fr) 
                minmax(105px, 1fr);

              .table-col {
                text-align: center;
                padding: 12px;
                font-weight: bold;
              }
            }
          }

          .table-body {
            overflow-x: hidden;
            overflow-y: auto;

            @media screen and (max-width: 650px) {
              width: 524px;
            }
          
            .table-row {
              display: grid;
              grid-template-columns: 
                minmax(105px, 1fr) 
                minmax(105px, 1fr) 
                minmax(105px, 1fr) 
                minmax(105px, 1fr) 
                minmax(105px, 1fr);
              align-items: center;
              position: relative;

              &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                width: 95%;
                background-color: rgba(30, 30, 30, .2);
                height: 1px;
                margin: 0 auto;
              }

              .table-col {
                padding: 12px;
                text-align: center;

                .img-outer-frame {
                  display: flex;
                  justify-content: center;

                  .img-outer {
                    width: 50px;
                    height: 50px;

                    img {
                      width: 100%;
                      height: 100%;
                      border-radius: 5px;
                      box-shadow: 1px 1px 2px rgba(30, 30, 30, 0.7);
                    }
                  }
                }
              }
            }
          }
        }

        .bottom {

          .table-footer {

            .table-row {
              display: grid;
              grid-template-columns: 
                1fr 1fr 1fr 
                minmax(105px, 1fr) 
                minmax(105px, 1fr);
              position: relative;

              &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                width: 95%;
                background-color: rgba(30, 30, 30, .2);
                height: 1px;
                margin: 0 auto;
              }

              .table-col {
                text-align: center;
                padding: 12px;
              }
            }
          }
        }
      }
    }
  }

  .order-info {
    color: white;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px 20px 2px 20px;
    border-radius: 0 0 10px 10px;

    h2 {
      text-align: center;
      margin: 15px 0 15px 0;
    }

    .row {
      margin: 0 -8px;

      .col-md-3,
      .col-md-4,
      .col-md-6,
      .col-md-9,
      .col-md-12 {
        padding: 0 8px;
      }
    }
  }
}

.step-2 {
  display: none;
  opacity: 0;
  transform: translateX(100px);
  transition: 1s ease;

  .step-status {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    padding: 10px;
    margin: 60px 0 60px 0;
    box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.7),
      0 0 2px 0 rgba(0, 0, 0, 0.7);

    @media screen and (max-width: 540px) {
      margin: 30px 0;
    }
    
      span {
      display: block;
      text-align: center;
    }
  }

  .pay-frame {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    box-shadow: inset 0 0 1px .5px rgba(30,30,30,.5);

    .pay-choose {
      display: flex;
      border-radius: 10px 10px 0 0;
      overflow: hidden;

      .creadit {
        width: 100%;
        border-right: 0.1px solid black;
        box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.7);
        transition: 0.5s ease;
        cursor: pointer;
        user-select: none;

        span {
          display: block;
          text-align: center;
          font-size: 20px;
          padding: 5px 0 5px 0;
        }
      }

      .post {
        width: 100%;
        border-left: 0.1px solid black;
        box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.7);
        transition: 0.5s ease;
        cursor: pointer;
        user-select: none;
        span {
          display: block;
          text-align: center;
          font-size: 20px;
          padding: 5px 0 5px 0;
        }
      }

      .pay-choose-active {
        color: white;
        background-color: rgba(30, 30, 30, 0.7);
        box-shadow: inset 0 -1px 8px 0 rgba(0, 0, 0, 0.7);
      }
    }

    .pay-outer {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 40px 20px 40px;
      height: 330px;
      position: relative;

      @media screen and (max-width: 768px) {
        height: 452px;
      }

      .creadit-pay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        z-index: -1;
        transform: translateY(10px);
        transition: 1s ease;
        padding: 20px 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        @media screen and (max-width: 768px) {
          padding: 32px 40px 20px 40px;
        }

        .pay-type-title {
          display: block;
          text-align: center;
          font-size: 20px;
          margin: 12px auto;
        }

        .pay-type-group {
          text-align: center;

          .type-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            overflow-y: hidden;
            overflow-x: hidden;

            @media screen and (max-width: 679px) {
              overflow-x: auto;
            }
            
          }

          .pay-icon {
            transition: 0.5s ease;
            color: rgba(0, 0, 0, 0.7);
            transform: scale(1);
            cursor: pointer;
            user-select: none;
          }
          .creadit-active {
            color: rgba(0, 162, 255, 0.7);
            transform: scale(1.03);
          }
        }

        .pay-input {

          .card-type-choosing {
            display: flex;
            overflow: hidden;
            margin: 20px 0 12px 0;
            font-size: 18px;

            .card-type-text {
              display: block;
              opacity: 0;
              transform: translateY(100%);
              transition: 0.5s ease;
            }

            .card-type-text-hide {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .bottom {
            display: grid;
            grid-template-columns: repeat(3,1fr);
            gap: 15px;

            .option-list-outer {
              margin-top: -165px;
              max-height: 120px;
            }

           
          }

          .creadit-num-group,
          .creadit-check-code-group {
            position: relative;

            span {
              display: block;
              position: absolute;
              font-size: 14px;
              transition: 0.5s ease;
            }
          }
        }

        &.pay-animate {
          transition-delay: 1s;
          opacity: 1;
          transform: translateY(0px);
          z-index: 1;
        }
      }

      .post-pay {
        position: absolute;
        top: 35px;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        z-index: -1;
        transform: translateY(10px);
        transition: 1s ease;
        padding: 20px 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .post-select-title {
          display: block;
          text-align: center;
          font-size: 20px;
        }
        .post-select-text {
          display: block;
          text-align: center;
          font-size: 20px;
          margin: 10px auto 20px auto;
          opacity: 1;
          transition: .5s ease;
          height: 30px;
        }

        .post-select-text-hide {
          opacity: 0;
        }
        .post-pay-before,
        .post-pay-after {
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          text-align: center;
          font-size: 68px;
          padding: 5px 55px 5px 55px;
          margin: 5px;
          border-radius: 10px;
          transform: scale(1);
          transition: 0.5s ease;
          cursor: pointer;
          user-select: none;
        }
        .post-active {
          background-color: rgba(0, 162, 255, 0.7);
          transform: scale(1.03);
        }
        .post-account-group {
          margin: 20px auto;
          font-size: 20px;
          opacity: 0;
          transform: translateY(-10px);
          transition: 0.5s ease;
          .post-account {
            display: block;
            text-align: center;
          }
          p {
            text-align: center;
            color: red;
            font-weight: bold;
            font-style: italic;
          }
        }
        .post-account-group-active {
          opacity: 1;
          transform: translateY(0px);
        }

        &.pay-animate {
          transition-delay: 1s;
          opacity: 1;
          transform: translateY(0px);
          z-index: 1;
        }
      }
    }
  }
}

.step-3 {
  display: none;
  opacity: 0;
  transform: translateX(100px);
  transition: 1s ease;

  .step-status {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    padding: 10px;
    margin: 60px 0;
    box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.7),
      0 0 2px 0 rgba(0, 0, 0, 0.7);

    @media screen and (max-width: 540px) {
      margin: 30px 0;
    }

    span {
      display: block;
      text-align: center;
    }
  }

  .completed-order {
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    overflow: hidden;
    padding: 10px;
    color: white;
    box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
      0 0 2px 1px rgba(0, 0, 0, 0.7);
    position: relative;
    height: 455px;

    .order-list-switch {
      position: absolute;
      top: 12px;
      right: 0;
      z-index: 5;
      margin-right: 12px;
      padding: 5px 10px 5px 10px;
      background-color: rgb(0, 153, 255);
      border-radius: 10px;
      color: white;
      transition: 1s ease;
      box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
        0 0 2px 1px rgba(0, 0, 0, 0.7);
      cursor: pointer;
      user-select: none;
    }

    .order-list {
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      opacity: 0;
      transform: translateY(-50px);
      transition: 1s ease;

      .completed-title {
        display: block;
        text-align: center;
        font-size: 25px;
        margin-bottom: 20px;
        font-weight: bold;
      }

      .order-table {
        overflow-x: auto;
        overflow-y: hidden;
          
        .table-head {

          .head-row {
            display: grid;
            grid-template-columns: 
              minmax(105px, 1fr) 
              minmax(105px, 1fr) 
              minmax(105px, 1fr) 
              minmax(105px, 1fr) 
              minmax(105px, 1fr);

            .head-col {
              text-align: center;
              padding: 12px;
              font-weight: bold;
            }
          }
        }

        .table-body {
          overflow-x: hidden;
          overflow-y: auto;

          @media screen and (max-width: 650px) {
            width: 524px;
          }

          .body-row {
            display: grid;
            grid-template-columns: 
              minmax(105px, 1fr) 
              minmax(105px, 1fr) 
              minmax(105px, 1fr) 
              minmax(105px, 1fr) 
              minmax(105px, 1fr);
            align-items: center;
            position: relative;

            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              width: 95%;
              background-color: rgba(255, 255, 255, .2);
              height: 1px;
              margin: 0 auto;
            }

            .body-col {
              text-align: center;
              padding: 12px;

              .img-outer-frame {
                display: flex;
                justify-content: center;

                .img-outer {
                  width: 50px;
                  height: 50px;

                  img {
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                    box-shadow: 1px 1px 2px rgba(30, 30, 30, 0.7);
                  }
                }
              }
            }
          }
        }

        .table-foot {

          .foot-row {
            display: grid;
            grid-template-columns: 
              minmax(105px, 1fr) 
              minmax(105px, 1fr) 
              minmax(105px, 1fr) 
              minmax(105px, 1fr) 
              minmax(105px, 1fr);
            position: relative;

            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              width: 95%;
              background-color: rgba(255, 255, 255, .2);
              height: 1px;
              margin: 0 auto;
            }

            .foot-col {
              text-align: center;
              padding: 12px;
            }
          }
        }
      }

      &.order-info-active {
        transition-delay: 1s;
        opacity: 1;
        transform: translateY(0px);
        z-index: 2;
      }
    }

    .order-profile {
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      opacity: 0;
      transform: translateY(-50px);
      transition: 1s ease;

      .order-profile-title {
        display: block;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
      }

      .order-profile-table {
        overflow-x: auto;
        overflow-y: hidden;

        .table-body {

          @media screen and (max-width: 700px) {
            width: 535px;
          }

          .table-row {
            display: grid;
            grid-template-columns: 
              minmax(105px, 1fr) 
              minmax(430px, 4fr);
            position: relative;

            &:first-child {

              &::before {
                content: unset;
              }
            }

            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              width: 95%;
              background-color: rgba(255, 255, 255, .2);
              height: 1px;
              margin: 0 auto;
            }

            .table-col {
              text-align: center;
              padding: 12px;
            }
          }
        }
      }

      &.order-info-active {
        transition-delay: 1s;
        opacity: 1;
        transform: translateY(0px);
        z-index: 1;
      }
    }

    .completed-footer {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      display: block;
      font-size: 20px;
      text-align: center;
      font-weight: bold;
      margin: 10px 0;
      opacity: 0;
      transition: 1s ease;
      transform: translateY(50px);

      @media screen and (max-width: 540px) {
        font-size: 17px;
      }

      &.completed-footer-active {
        transition-delay: 1s;
        opacity: 1;
        transform: translateY(0px);
      }
    }
  }
}

.page-animate {
  opacity: 1;
  transform: translateY(0px);
}

.success {
  color: rgb(0, 255, 0) !important;
  transition: 0.5s ease;
}

.notice {
  color: red !important;
  transition: 0.5s ease;
}

.page-btn-group {
  margin: 30px auto;
  
  .prev-btn,
  .next-btn,
  .back-btn {
    display: block;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px;
    border-radius: 15px;
    cursor: pointer;
    user-select: none;
    margin: 5px 0 5px 0;
  }
}
</style>
<script lang="ts">
import { defineComponent, Ref, ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { ProviderObjType } from '@/App'
import { CustomInput, Loading } from '@/component'
import { twZipCode } from "@/assets/setting";

interface PageStateType {
  otLocation: Ref<{
    orderID: string,
    orderLists: {
      orderProductID: string,
      orderProductName: string,
      orderProductSize: string,
      orderProductImgUrlI: string,
      orderCount: number,
      orderAllCash: number,
      orderSingleItemID: string
    }[]
  }>,
  originTotal: Ref<number>,
  finalTotal: Ref<number>
  isListActive: Ref<boolean>,
  cityAll: Ref<string[]>,
  paymentName: Ref<string>,
  paymentEmail: Ref<string>,
  paymentTel: Ref<string>,
  cityName: Ref<any>,
  blockNameAll: Ref<string[]>,
  blockName: Ref<string | null>,
  postNumAll: Ref<any[]>,
  postNum: Ref<any>,
  address: Ref<string>,
  ticketValue: Ref<string>,
  cpValid: Ref<boolean | undefined>,
  cpCount: Ref<number>,
  stepCount: Ref<number>,
  stepAnimateCount: Ref<number>,
  prevText:  Ref<string>,
  nextText:  Ref<string>,
  cardTypeData: Ref<{ cardClass: string,cardNum: number, cardName: string }[]>,
  cardType: Ref<string>,
  cardTypeTemp: Ref<string>,
  toggleCardTypeTextStatus: Ref<boolean>,
  creaditNums: Ref<string>,
  creaditNumsCheck: Ref<any>,
  creaditMonth: Ref<any>,
  creaditYear: Ref<any>,
  creaditSafeCheck: Ref<string>,
  creaditSafeCodeType: Ref<boolean>,
  postType: Ref<string>,
  choosePayDown: Ref<boolean>,
  getNowPayInfo: Ref<{
    CPID?: string | number,
    PMAddress: string,
    PMCouponIsUse: number,
    PMCreateDate?: string,
    PMEmail: string,
    PMMethod:string,
    PMName: string,
    PMNum: number,
    PMTotal: number,
    PMState: boolean,
    PMTel: string,
    PMID?: string
  } | undefined>,
  toggleOrderListPayDownStatus: Ref<boolean>,
  payDownBack: Ref<boolean>,
  paymentMethod: Ref<string>
  postMethod: Ref<string>,
  paymentNum: Ref<number>
  rwdMod: Ref<boolean>,
  toggleLoadingStatus: Ref<boolean>
}

interface MethodType {
  ticketCheck(ticketVal: string): Promise<void>;
  paymentValueCheck(type: string): boolean
  creaditValueCheck(type: string): boolean
  changeCityDetails(cityName: string): void;
  cardChoose(text: string): void;
  creaditChoose(type: any): Promise<void>;
  postChoose(type: string): Promise<void>
  paymentInfoCheck(): boolean
  creaditInfoCheck(): boolean
  beforePay(): void
  prevStep(): Promise<void>
  createPayment(): Promise<void>
  deletePayment(): Promise<boolean>
  nextStepPart(): void
  nextStep(): Promise<void>
  backMain(): void
  getOrderList(): Promise<void>
  getPaymentList(): Promise<void>
}

export default defineComponent({
  components: {
    CustomInput,
    Loading
  },
  setup(){

    const router = useRouter()
    const { Fetch, getReducer, setReducer, useSleep, $, rwdMod, toast } = inject<ProviderObjType>('NewProvider')!

    const { token } = getReducer(state => state.Login)

    const pageState: PageStateType = {
      otLocation: ref({ orderID: '', orderLists: [] }),
      originTotal: ref(0),
      finalTotal: ref(0),
      isListActive: ref(false),
      cityAll: ref($.createArray({ type: 'new', item: new Set(twZipCode.map(row => row.city)) })),
      paymentName: ref(""),
      paymentEmail: ref(""),
      paymentTel: ref(""),
      cityName: ref(null),
      blockNameAll: ref([]),
      blockName: ref(null),
      postNumAll: ref([]),
      postNum: ref(null),
      address: ref(""),
      ticketValue: ref(""),
      cpValid: ref(undefined),
      cpCount: ref(1),
      stepCount: ref(1),
      stepAnimateCount: ref(1),
      prevText: ref("回首頁"),
      nextText: ref("下一步"),
      cardTypeData: ref([
        "Visa|fa-cc-visa", 
        "MasterCard|fa-cc-mastercard",
        "PayPal|fa-cc-paypal", 
        "JCB|fa-cc-jcb"
      ].map((row, index) => ({
        cardClass: row.split('|')[1],
        cardNum: index + 1, 
        cardName: row.split('|')[0]  
      }))),
      cardType: ref("無"),
      cardTypeTemp: ref('無'),
      toggleCardTypeTextStatus: ref(false),
      creaditNums: ref(""),
      creaditNumsCheck: ref(null),
      creaditMonth: ref(null),
      creaditYear: ref(null),
      creaditSafeCheck: ref(""),
      creaditSafeCodeType: ref(false),
      postType: ref("無"),
      choosePayDown: ref(true),
      getNowPayInfo: ref(undefined),
      toggleOrderListPayDownStatus: ref(false),
      payDownBack: ref(false),
      paymentMethod: ref('creadit'),
      postMethod: ref(''),
      paymentNum: ref(0),
      rwdMod,
      toggleLoadingStatus: ref(false)
    }

    const method: MethodType = {
      ticketCheck: async ticketVal => {

        pageState.ticketValue.value = ticketVal

        pageState.cpValid.value = undefined;
        pageState.cpCount.value = 1;
        pageState.finalTotal.value = 0

        const res = await Fetch.get<{ data?: {
          CPCode: string,
          CPCreateDate: string,
          CPDisableDate: string | null,
          CPEnableDate: string | null,
          CPName: string,
          CPPercent: number,
          CPState: number,
          CPID: string | number
        } }>(`/coupon/get/${pageState.ticketValue.value}`,{ token: token.value })

        if(res.status === 200){

          if(res.data.data?.CPState !== undefined){

            if(Boolean(res.data.data.CPState)){
              pageState.cpCount.value = res.data.data.CPPercent;
              pageState.cpValid.value = true;

              pageState.finalTotal.value = Math.floor(pageState.originTotal.value * (res.data.data.CPPercent / 100))
              return
            }

            pageState.cpValid.value = false;
            pageState.cpCount.value = 1;
          }

          pageState.cpValid.value = false;
          pageState.cpCount.value = 1;
        }
      },
      paymentValueCheck: type => {

        const action:Record<string,() => boolean> = {
          [type]: () => false,
          name: () => {
            if(!pageState.paymentName.value) return true

            const nameReg = RegExp("^[A-Za-z\u4e00-\u9fa5]+$").test(pageState.paymentName.value);

            return nameReg ? true : false
          },
          phone: () => {
            if(!pageState.paymentTel.value) return true

            const phoneNumReg = RegExp("^[0-9]*$", "g").test(pageState.paymentTel.value);
            
            return phoneNumReg ? true : false
          },
          email: () => {
            if(!pageState.paymentEmail.value) return true

            const emailReg = RegExp(
              "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$"
            ).test(pageState.paymentEmail.value);

            return emailReg ? true : false
          },
          address: () => {
            if(!pageState.address.value) return true

            const addressReg = RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$").test(pageState.address.value);

            return addressReg ? true : false
          }
        }

        return action[type]()
      },
      creaditValueCheck: type => {

        const action:Record<string,() => boolean> = {
          [type]: () => false,
          creaditNum: () => {
            if(!pageState.creaditNums.value) return true

            if(pageState.creaditNums.value.length > 19) return false

            const numSpliceDashed = pageState.creaditNums.value.replace(/-/g, "");
            const numCheck = RegExp("^[0-9]*$", "g").test(numSpliceDashed);
            let numToArry = numSpliceDashed.split("");

            const newNumArry = numToArry.reduce<string[]>((emptyArr, nums, index) => {
              
              if (index % 4 === 0) emptyArr.push("-")

             emptyArr.push(nums)

              return emptyArr
            },[]);

            newNumArry.shift()

            pageState.creaditNums.value = newNumArry.join("");
            
            return numCheck && numSpliceDashed.length === 16
          },
          creaditYear: () => {
            if(!pageState.creaditYear.value) return true

            return pageState.creaditYear.value !== ''
          },
          creaditMonth: () => {
            if(!pageState.creaditMonth.value) return true

            return pageState.creaditYear.value !== ''
          },
          safeCode: () => {
            if(!pageState.creaditSafeCheck.value) return true

            const safeCode = RegExp("^[0-9]*$", "g").test(pageState.creaditSafeCheck.value);
            
            return safeCode && pageState.creaditSafeCheck.value.length === 3
          }

        }

        return action[type]()
      },
      changeCityDetails: cityName => {
        pageState.cityName.value = cityName
        pageState.blockName.value = null;
        pageState.postNum.value = null;
        pageState.address.value = ''

        const filterItem = $.filter(twZipCode,row => row.city === cityName)

        pageState.postNumAll.value = $.maps(filterItem,row => row.zip_code);
        pageState.blockNameAll.value = $.maps(filterItem,row => row.district)
      },
      cardChoose(text) {

        if(text === 'creadit'){
          pageState.cardType.value = "無";
          pageState.creaditNums.value = "";
          pageState.creaditMonth.value = null;
          pageState.creaditYear.value = null;
          pageState.creaditSafeCheck.value = "";
        }

        if(text === 'post'){
          pageState.postMethod.value = ''
        }

        if(text === ''){
          pageState.cardType.value = "無";
          pageState.creaditNums.value = "";
          pageState.creaditMonth.value = null;
          pageState.creaditYear.value = null;
          pageState.creaditSafeCheck.value = "";
          pageState.postMethod.value = ''
        }

        pageState.choosePayDown.value = false;
        pageState.paymentMethod.value = text
      },
      creaditChoose: async type => {

        pageState.toggleCardTypeTextStatus.value = false

        const [filterItem] = pageState.cardTypeData.value.filter((key) =>
          key.cardName === type
        );

        pageState.cardType.value = filterItem.cardName

        await useSleep(500)

        pageState.cardTypeTemp.value = filterItem.cardName

        pageState.toggleCardTypeTextStatus.value = true
      },
      postChoose: async type => {

        pageState.postType.value = ''

        pageState.postMethod.value = type

        pageState.choosePayDown.value = true;

        await useSleep(500)

        if(type === 'bank'){
          pageState.postType.value = "郵局轉帳付款"
        }

        if(type === 'trunk'){
          pageState.postType.value = "郵寄貨到付款"
        }
      },
      paymentInfoCheck() {
        let pass = true;

        if(!pageState.paymentName.value) pass = false
        if(!pageState.paymentEmail.value) pass = false
        if(!pageState.paymentTel.value) pass = false
        if(!pageState.cityName.value) pass = false
        if(!pageState.blockName.value) pass = false
        if(!pageState.postNum.value) pass = false
        if(!pageState.address.value) pass = false

        if(!pass){
          toast.error('填入資訊不完整')
          return false
        }

        if(pageState.paymentName.value){
          
          if(!method.paymentValueCheck('name')){
            toast.error('姓名格式錯誤')
            return false
          }
        }

        if(pageState.paymentEmail.value){
          
          if(!method.paymentValueCheck('email')){
            toast.error('Email 格式錯誤')
            return false
          }
        }

        if(pageState.paymentTel.value){

          if(!method.paymentValueCheck('phone')){
            toast.error('電話格式錯誤')
            return false
          }
        }

        if(pageState.address.value){

          if(!method.paymentValueCheck('address')){
            toast.error('地址格式錯誤')
            return false
          }
        }

        return pass
      },
      creaditInfoCheck: () => {
        let pass = true

        if(pageState.paymentMethod.value === "post") {
          
          if(!pageState.choosePayDown.value) {
            toast.error('請選擇郵寄類別')
            return false
          }

          return true
        } 

        if(!pageState.cardType.value) {
          toast.error('請選擇卡片類別')
          pass = false
        }

        if(!pageState.creaditNums.value) pass = false
        if(!pageState.creaditYear.value) pass = false
        if(!pageState.creaditMonth.value) pass = false
        if(!pageState.creaditSafeCheck.value) pass = false

        if(!pass){
          toast.error('填入資訊不完整')
          return false
        }

        if(pageState.creaditNums.value){
          
          if(!method.creaditValueCheck('creaditNum')){
            toast.error('信用卡格式錯誤')
            return false
          }
        }

        if(pageState.creaditSafeCheck.value){

          if(!method.creaditValueCheck('safeCode')){
            toast.error('驗證碼格式錯誤')
            return false
          }
        }

        pageState.choosePayDown.value = true;

        return pass
      },
      beforePay: () => {

        pageState.getNowPayInfo.value = {
          CPID: pageState.cpValid.value ? pageState.ticketValue.value : 0,
          PMAddress: `${pageState.postNum.value}${pageState.cityName.value}${pageState.blockName.value}${pageState.address.value}`,
          PMCouponIsUse: pageState.ticketValue.value ? Number(false) : Number(true),
          PMEmail: pageState.paymentEmail.value,
          PMMethod: `${pageState.creaditNums.value ? pageState.cardType.value : pageState.postType.value}`,
          PMName: pageState.paymentName.value,
          PMNum: +new Date(),
          PMState: false,
          PMTotal: pageState.finalTotal.value || pageState.originTotal.value,
          PMTel: pageState.paymentTel.value,
        }
      },
      prevStep: async () => {
        
        if (pageState.stepCount.value === 1) {
          router.push("/main");
        } 
        
        if (pageState.stepCount.value === 2) {
          await useSleep(1000)
          pageState.prevText.value = "回首頁";
        } 
        
        if (pageState.stepCount.value === 3) {
          await useSleep(1000)

          const isDelete = await method.deletePayment()

          if(!isDelete){
            toast.error('網路異常')
            return
          }

          pageState.getNowPayInfo.value = undefined
          pageState.nextText.value = "下一步";
        }

        pageState.stepAnimateCount.value = 0

        await useSleep(1000)
        
        pageState.stepCount.value === 1
          ? pageState.stepCount.value = 1
          : pageState.stepCount.value -= 1
        
        await useSleep(100)

        pageState.stepAnimateCount.value = pageState.stepCount.value
      },
      createPayment: async () => {

        if(!pageState.getNowPayInfo.value) return

        pageState.toggleLoadingStatus.value = true

        pageState.paymentNum.value = pageState.getNowPayInfo.value.PMNum

        const res = await Fetch.post("/payment/create", {
          data: {
            paymentOrderID: pageState.otLocation.value.orderID,
            paymentNum: pageState.paymentNum.value,
            paymentName: pageState.getNowPayInfo.value.PMName,
            paymentEmail: pageState.getNowPayInfo.value.PMEmail,
            paymentTel: pageState.getNowPayInfo.value.PMTel,
            paymentAddress: pageState.getNowPayInfo.value.PMAddress,
            payMethod: pageState.getNowPayInfo.value.PMMethod,
            paymentCouponUse: pageState.getNowPayInfo.value.PMCouponIsUse,
            paymentCouponID: pageState.getNowPayInfo.value.CPID,
            paymentTotal: pageState.getNowPayInfo.value.PMTotal,
            payStatus: pageState.getNowPayInfo.value.PMState,
            createDate: $.formatDateTime({ formatDate: new Date(), formatType: 'yyyy-MM-dd HH:mm:ss' }),
          },
          token: token.value
        })
          
        if (res.status == 200) {
          await method.getPaymentList();
          
          toast.success('建立訂單成功')

          pageState.nextText.value = "結帳"
        }

        pageState.toggleLoadingStatus.value = false
      },
      deletePayment: async () => {
        let pass = true

        const res = await Fetch.delete(`/payment/delete/${pageState.getNowPayInfo.value!.PMID}`, { token: token.value })
        
        if(res.status !== 200){
          pass = false
        }

        return pass
      },
      nextStepPart() {
        if (pageState.stepCount.value === 1) {
          pageState.prevText.value = "上一步";
          setTimeout(() => (pageState.choosePayDown.value = false), 1001);
        } 
        
        if (pageState.stepCount.value === 2) {

          if (!pageState.choosePayDown.value) return;
          pageState.nextText.value = "建立訂單";
        }
      },
      nextStep: async () => {
        if (pageState.stepCount.value === 3) {

          if(pageState.nextText.value === '建立訂單'){
            method.createPayment()
            return
          }

          pageState.toggleLoadingStatus.value = true

          const res = await Fetch.post("/payment/paied",{ data: { PMID: pageState.getNowPayInfo.value!.PMID }, token: token.value })
          
          if (res.status == 200) {
            pageState.payDownBack.value = true;
            await method.getPaymentList();
          }
          
          pageState.toggleLoadingStatus.value = false

          return;
        }

        if(pageState.stepCount.value === 1){

          const allPaymentValuePass = method.paymentInfoCheck();
          
          if (!allPaymentValuePass) return
        }

        if(pageState.stepCount.value === 2){

          const allCreditValuePass = method.creaditInfoCheck()

          if(
            !allCreditValuePass && 
            !pageState.choosePayDown.value
          ) return

          method.beforePay();
        }

        method.nextStepPart();

        pageState.stepAnimateCount.value = 0

        await useSleep(1000)

        pageState.stepCount.value += 1

        await useSleep(100)

        pageState.stepAnimateCount.value = pageState.stepCount.value
      },
      backMain() {
        pageState.payDownBack.value = false;
        router.push("/main");
      },
      async getOrderList() {
        const res = await Fetch.get<{ data: {
          ODID: string,
          PayStatus: boolean
          DownCase: boolean,
          List: {
            OPID: string
            ODPDCount: number
            ODPDSize: string
            PDID: string
            PDImgUrlI: string
            PDName: string
            PDOnSalePrice: number
          }[]
        }[] }>("/cart/get",{ token: token.value })

        if(res.status === 200){
          const [result] = res.data.data

          const orderLists = $.maps(result.List, listRow => ({
            orderProductID: listRow.PDID,
            orderProductName: listRow.PDName,
            orderProductSize: listRow.ODPDSize,
            orderProductImgUrlI: listRow.PDImgUrlI,
            orderCount: listRow.ODPDCount,
            orderAllCash: listRow.ODPDCount * listRow.PDOnSalePrice,
            orderSingleItemID: listRow.OPID
          }))

          pageState.otLocation.value = {
            orderID: result.ODID,
            orderLists
          }

          pageState.originTotal.value = $.sum(pageState.otLocation.value.orderLists.map(row => row.orderAllCash), (a, b) => a + b)
        }
      },
      getPaymentList: async () => {
        const res = await Fetch.get<{ 
          data: PageStateType['getNowPayInfo']['value'][] 
        }>(`/payment/get/${pageState.paymentNum.value}`,{ token: token.value })
        
        if (res.status == 200){
          const [item] = res.data.data

          pageState.getNowPayInfo.value = item
        };
      }
    }

    onMounted(async () => {

      const localToken = localStorage.getItem('token')

      if(!token.value && localToken) {
        setReducer('Login/token',localToken)
      }

      if(token.value){
        await method.getOrderList();
      }
    })

    return { ...pageState, ...method }
  }
})
</script>