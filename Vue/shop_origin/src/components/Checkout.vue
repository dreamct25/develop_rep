<template>
  <div class="bg">
    <div class="container">
      <div v-if="stepCount == 1" class="step-1 page-animate">
        <div class="row justify-content-center">
          <div class="col-md-4">
            <div class="step-status">
              <span>請確認您所購買的產品與填寫訂單資料</span>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="total-items-price-group">
              <div class="accordion" id="accordion">
                <div class="card">
                  <div class="card-header" id="checkout-list">
                    <span class="mb-0 checkout-list-title">結帳商品</span>
                    <i
                      class="fal fa-angle-down list-switch fa-2x"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      @click="showOrderList"
                    ></i>
                    <span class="all-cash ml-auto"
                      >$ {{ Math.floor((totalTemp + 55) * cpCount) }} NT</span
                    >
                  </div>
                  <div
                    id="collapseOne"
                    class="collapse show"
                    aria-labelledby="checkout-list"
                    data-parent="#accordion"
                  >
                    <div class="card-body">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col" width="15%"></th>
                            <th scope="col" width="30%">商品名稱</th>
                            <th scope="col">尺寸</th>
                            <th scope="col">數量</th>
                            <th scope="col" class="cash-total">金額</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(orderList, index) in otLocation"
                            :key="index"
                          >
                            <td>
                              <div class="img-outer-frame">
                                <div class="img-outer">
                                  <img :src="orderList.PDImgUrlI" alt />
                                </div>
                              </div>
                            </td>
                            <td>
                              <span>{{ orderList.PDName }}</span>
                            </td>
                            <td>
                              <span>{{ orderList.ODPDSize }}</span>
                            </td>
                            <td>
                              <span>{{ orderList.ODPDCount }}</span>
                            </td>
                            <td>
                              <span class="cash-total">{{
                                orderList.PDOnSalePrice * orderList.ODPDCount
                              }}</span>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="4" class="cash-total">原總額</td>
                            <td class="cash-total">{{ totalTemp }}</td>
                          </tr>
                          <tr>
                            <td colspan="4" class="cash-total">優惠券</td>
                            <td
                              v-if="ticketValue == ''"
                              class="cash-total notice"
                            >
                              否
                            </td>
                            <td
                              v-else-if="cpValid == false && cpCount == 1"
                              class="cash-total notice"
                            >
                              無效代碼
                            </td>
                            <td v-else class="cash-total success">是</td>
                          </tr>
                          <tr v-if="cpCount !== 1">
                            <td colspan="4" class="cash-total">折扣</td>
                            <td class="cash-total">{{ cpCount * 100 }} %</td>
                          </tr>
                          <tr>
                            <td colspan="4" class="cash-total">小計</td>
                            <td class="cash-total">55</td>
                          </tr>
                          <tr>
                            <td colspan="4" class="cash-total">總額</td>
                            <td class="cash-total">
                              {{ Math.floor((totalTemp + 55) * cpCount) }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="order-info">
              <h2>訂單資訊</h2>
              <div class="row">
                <div class="col-md-6">
                  <div class="order-name-group">
                    <label for="order-name">姓名</label>
                    <input
                      id="order-name"
                      type="text"
                      v-model="paymentName"
                      placeholder="-- 請輸入您的姓名 --"
                    />
                    <span
                      class="notice"
                      v-if="paymentName == '' && paymentNameCheck == false"
                      >此欄不可為空</span
                    >
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="order-email-group">
                    <label for="order-email">電子郵件</label>
                    <input
                      id="order-email"
                      type="email"
                      v-model="paymentEmail"
                      placeholder="-- 請輸入您的電子郵件 --"
                    />
                    <span
                      class="notice"
                      v-if="paymentEmail == '' && paymentEmailCheck == false"
                      >此欄不可為空</span
                    >
                    <span
                      class="success"
                      v-if="paymentEmail !== '' && emCheck == true"
                      >電子郵件格式正確</span
                    >
                    <span
                      class="notice"
                      v-if="paymentEmail !== '' && emCheck == false"
                      >電子郵件格式錯誤</span
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="order-phone-group">
                    <label for="order-phone">電話</label>
                    <input
                      id="order-phone"
                      type="tel"
                      v-model="paymentTel"
                      placeholder="-- 請輸入您的電話 --"
                    />
                    <span
                      class="notice"
                      v-if="paymentTel == '' && paymentTelCheck == false"
                      >此欄不可為空</span
                    >
                    <span
                      class="success"
                      v-if="paymentTel !== '' && telCheck == true"
                      >電話格式正確</span
                    >
                    <span
                      class="notice"
                      v-if="paymentTel !== '' && telCheck == false"
                      >電話格式錯誤</span
                    >
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="order-city-group">
                    <label for="order-city">縣市</label>
                    <select
                      id="order-city"
                      v-model="cityName"
                      @change="changeCityDetails"
                    >
                      <option disabled :value="null">--請選擇縣市--</option>
                      <option
                        :value="city"
                        v-for="(city, index) in cityAll"
                        :key="index"
                      >
                        {{ city }}
                      </option>
                    </select>
                    <span
                      class="notice"
                      v-if="cityName == null && cityNameCheck == false"
                      >此欄不可為空</span
                    >
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="order-block-group">
                    <label for="order-block">( 鄉 / 鎮 / 區 )</label>
                    <select id="order-block" v-model="blockName">
                      <option disabled :value="null">
                        --請選擇( 鄉 / 鎮 / 區 )--
                      </option>
                      <option
                        :value="block"
                        v-for="(block, index) in blockNameAll"
                        :key="index"
                      >
                        {{ block }}
                      </option>
                    </select>
                    <span
                      class="notice"
                      v-if="blockName == null && blockNameCheck == false"
                      >此欄不可為空</span
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <div class="order-post-group">
                    <label for="order-post">郵遞區號</label>
                    <select id="order-post" v-model="postNum">
                      <option disabled :value="null">--請選擇郵遞區號--</option>
                      <option
                        :value="post"
                        v-for="(post, index) in postNumAll"
                        :key="index"
                      >
                        {{ post }}
                      </option>
                    </select>
                    <span
                      class="notice"
                      v-if="postNum == null && postNumCheck == false"
                      >此欄不可為空</span
                    >
                  </div>
                </div>
                <div class="col-md-9">
                  <div class="order-address-group">
                    <label for="order-address">地址</label>
                    <input id="order-address" type="text" v-model="address" />
                    <span
                      class="notice"
                      v-if="address == '' && addressCheck == false"
                      >此欄不可為空</span
                    >
                    <span
                      class="success"
                      v-if="address !== '' && adCheck == true"
                      >地址格式正確</span
                    >
                    <span
                      class="notice"
                      v-if="address !== '' && adCheck == false"
                      >地址格式錯誤</span
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="order-ticket-group">
                    <label for="coupon-ticket">優惠券</label>
                    <input
                      id="coupon-ticket"
                      type="text"
                      v-model="ticketValue"
                      @change="ticketCheck"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="stepCount == 2" class="step-2">
        <div class="row justify-content-center">
          <div class="col-md-4">
            <div class="step-status">
              <span>請選擇付款方式</span>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="pay-frame">
              <div class="pay-choose">
                <div class="creadit" @click="cardChoose((text = 'creadit'))">
                  <span>信用卡</span>
                </div>
                <div
                  class="post pay-choose-active"
                  @click="cardChoose((text = 'post'))"
                >
                  <span>郵寄</span>
                </div>
              </div>
              <div class="pay-outer">
                <div v-if="payChange == 0" class="creadit-pay pay-animate">
                  <span class="pay-type-title">請選擇信用卡支付類型</span>
                  <div class="pay-type-group">
                    <div class="row">
                      <div class="col-md-3">
                        <i
                          class="fab fa-cc-visa fa-7x pay-icon"
                          data-pay="1"
                          @click="creaditChoose((type = 1))"
                        ></i>
                      </div>
                      <div class="col-md-3">
                        <i
                          class="fab fa-cc-mastercard fa-7x pay-icon"
                          data-pay="2"
                          @click="creaditChoose((type = 2))"
                        ></i>
                      </div>
                      <div class="col-md-3">
                        <i
                          class="fab fa-cc-paypal fa-7x pay-icon"
                          data-pay="3"
                          @click="creaditChoose((type = 3))"
                        ></i>
                      </div>
                      <div class="col-md-3">
                        <i
                          class="fab fa-cc-jcb fa-7x pay-icon"
                          data-pay="4"
                          @click="creaditChoose((type = 4))"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div class="pay-input">
                    <span class="card-type-choosing">
                      已選擇類型：
                      <span class="card-type-text">{{ cardType }}</span>
                    </span>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="creadit-num-group">
                          <label for="creadit-num">卡號</label>
                          <input
                            id="creadit-num"
                            type="text"
                            v-model="creaditNums"
                          />
                          <span
                            class="notice"
                            v-if="
                              creaditNums !== '' && creaditNumsCheck == false
                            "
                            >卡號格式錯誤</span
                          >
                          <span
                            class="success"
                            v-if="
                              creaditNums !== '' && creaditNumsCheck == true
                            "
                            >卡號格式正確</span
                          >
                        </div>
                      </div>
                      <div class="col-md-4">
                        <span class="last-date-title">到期年月</span>
                        <div class="last-date">
                          <div class="creadit-month-group">
                            <select v-model="creaditMonth">
                              <option disabled :value="null">-- 月份 --</option>
                              <option
                                :value="month"
                                v-for="(month, index) in 12"
                                :key="index"
                              >
                                {{ month }} 月
                              </option>
                            </select>
                          </div>
                          <span>/</span>
                          <div class="creadit-year-group">
                            <select v-model="creaditYear">
                              <option disabled :value="null">-- 年份 --</option>
                              <option
                                :value="year + 2020"
                                v-for="(year, index) in 40"
                                :key="index"
                              >
                                {{ year + 2020 }} 年
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="creadit-check-code-group">
                          <label for="creadit-check-code">驗證碼</label>
                          <input
                            id="creadit-check-code"
                            type="text"
                            v-model="creaditSafeCheck"
                          />
                          <span
                            class="notice"
                            v-if="
                              creaditSafeCheck !== '' &&
                              creaditSafeCodeType == false
                            "
                            >格式錯誤</span
                          >
                          <span
                            class="success"
                            v-if="
                              creaditSafeCheck !== '' &&
                              creaditSafeCodeType == true
                            "
                            >格式正確</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="payChange == 1" class="post-pay">
                  <span class="post-select-title">請選擇付款方式</span>
                  <span class="post-select-text">{{ postType }}</span>
                  <div class="row">
                    <div class="col-md-6">
                      <div
                        class="post-pay-before post"
                        data-post="1"
                        @click="postChoose((type = 1))"
                      >
                        <i class="fas fa-hand-holding-usd"></i>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div
                        class="post-pay-after post"
                        data-post="2"
                        @click="postChoose((type = 2))"
                      >
                        <i class="fas fa-truck"></i>
                      </div>
                    </div>
                  </div>
                  <div v-if="postAccountShow == 1" class="post-account-group">
                    <span class="post-account">請將金額匯款到以下帳號</span>
                    <p>066-6666-6666-6666</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="stepCount == 3" class="step-3">
        <div class="row justify-content-center">
          <div class="col-md-4">
            <div class="step-status">
              <span>確認完整訂單內容</span>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="completed-order">
              <div class="row justify-content-end">
                <div class="order-list-switch" @click="switchOrderList">
                  切換訂單內容
                </div>
              </div>
              <div v-if="switchCount == 0" class="order-list order-info-active">
                <span class="completed-title">即將建立您的訂單</span>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" width="15%"></th>
                      <th scope="col" width="30%">商品名稱</th>
                      <th scope="col">尺寸</th>
                      <th scope="col">數量</th>
                      <th scope="col" class="cash-total">金額</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(orderList, index) in otLocation" :key="index">
                      <td>
                        <div class="img-outer-frame">
                          <div class="img-outer">
                            <img :src="orderList.PDImgUrlI" alt />
                          </div>
                        </div>
                      </td>
                      <td>
                        <span>{{ orderList.PDName }}</span>
                      </td>
                      <td>
                        <span>{{ orderList.ODPDSize }}</span>
                      </td>
                      <td>
                        <span>{{ orderList.ODPDCount }}</span>
                      </td>
                      <td>
                        <span class="cash-total">{{
                          orderList.PDOnSalePrice * orderList.ODPDCount
                        }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" class="cash-total">小計</td>
                      <td class="cash-total">55</td>
                    </tr>
                    <tr>
                      <td colspan="4" class="cash-total">總額</td>
                      <td class="cash-total">{{ totalTemp + 55 }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else class="order-profile">
                <span class="order-profile-title">買家資料</span>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" width="30%"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody v-for="(payList, index) in getNowPayInfo" :key="index">
                    <tr>
                      <th scope="row">訂單編號</th>
                      <td>{{ payList.PMNum }}</td>
                    </tr>
                    <tr>
                      <th scope="row">買家名稱</th>
                      <td>{{ payList.PMName }}</td>
                    </tr>
                    <tr>
                      <th scope="row">買家電話</th>
                      <td>{{ payList.PMTel }}</td>
                    </tr>
                    <tr>
                      <th scope="row">收件地址</th>
                      <td>{{ payList.PMAddress }}</td>
                    </tr>
                    <tr>
                      <th scope="row">付款方式</th>
                      <td>{{ payList.PMMethod }}</td>
                    </tr>
                    <tr>
                      <th scope="row">付款狀態</th>
                      <td
                        v-if="Boolean(payList.PMState) == false"
                        class="notice"
                      >
                        否
                      </td>
                      <td v-else class="success">是</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <span class="completed-footer"
                >如訂單內容與金額和填寫資料無誤請點選下方結帳按鈕。</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="page-btn-group">
        <div v-if="payDownBack == false" class="row">
          <div class="col-md-6">
            <div class="row justify-content-end">
              <div class="col-md-4">
                <span class="prev-btn" @click="prevStep">{{ prevText }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row justify-content-start">
              <div class="col-md-4">
                <span class="next-btn" @click="nextStep">{{ nextText }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="row justify-content-center">
          <div class="col-md-3">
            <span class="back-btn" @click="backMain">回主頁</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.bg {
  background-image: url("https://unsplash.com/photos/w2uvoJo_woE/download?force=true&w=1920");
  background-position: center center;
  background-size: cover;
  min-height: 100vh;
}
.container {
  overflow: hidden;
  .step-1 {
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
          font-size: 35px;
          font-weight: bold;
          font-style: italic;
          margin: 0 10px 0 10px;
        }
      }
      .card-body {
        padding: 0;
        .table {
          margin-bottom: 0;
          .cash-total {
            text-align: right;
          }
          th {
            text-align: center;
          }
          td {
            padding: 10px;
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
                }
              }
            }
            span {
              display: block;
              padding-top: 10px;
            }
          }
        }
      }
    }
    .order-info {
      color: white;
      background-color: rgba(0, 0, 0, 0.7);
      padding: 10px 20px 30px 20px;
      border-radius: 0 0 10px 10px;
      h2 {
        text-align: center;
        margin: 15px 0 15px 0;
      }
      .order-name-group,
      .order-email-group,
      .order-phone-group,
      .order-city-group,
      .order-block-group,
      .order-post-group,
      .order-address-group,
      .order-ticket-group {
        position: relative;
      }
      label {
        display: block;
        margin-top: 8px;
      }
      input[type="text"],
      input[type="email"],
      input[type="tel"],
      select {
        width: 100%;
        height: 25px;
        margin-bottom: 14px;
        text-align: center;
        border-radius: 15px;
        outline: none;
        border: none;
        box-shadow: inset 0 0 0 0 rgba(0, 162, 255, 0.7),
          0 0 2px 1px rgba(0, 0, 0, 0.7);
        transition: 0.5s ease;
      }
      input[type="text"]:focus,
      input[type="email"]:focus,
      input[type="tel"]:focus,
      select:focus {
        box-shadow: inset 0 0 2px 1px rgba(0, 162, 255, 0.7),
          0 0 2px 1px rgba(0, 0, 0, 0.7);
      }
      span {
        display: block;
        position: absolute;
        bottom: -10%;
        font-size: 14px;
        transition: 0.5s ease;
      }
    }
  }
  .step-2 {
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
      span {
        display: block;
        text-align: center;
      }
    }
    .pay-frame {
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 10px;
      border: 1px solid black;
      overflow: hidden;
      .pay-choose {
        display: flex;
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
        .creadit-pay {
          opacity: 0;
          transform: translateY(10px);
          transition: 1s ease;
          .pay-type-title {
            display: block;
            text-align: center;
            font-size: 20px;
            margin: 10px auto;
          }
          .pay-type-group {
            text-align: center;
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
              display: block;
              margin: 5px 0 5px 0;
              font-size: 18px;
              .card-type-text {
                opacity: 1;
                transition: 0.5s ease;
              }
              .card-type-text-hide {
                opacity: 0;
              }
            }
            input[type="text"],
            select {
              width: 100%;
              outline: none;
              border-radius: 15px;
              border: none;
              box-shadow: inset 0 0 0 0 rgba(0, 162, 255, 0.7),
                0 0 2px 1px rgba(0, 0, 0, 0.7);
              text-align: center;
              transition: 0.5s ease;
            }
            input[type="text"]:focus,
            select:focus {
              box-shadow: inset 0 0 2px 1px rgba(0, 162, 255, 0.7),
                0 0 2px 1px rgba(0, 0, 0, 0.7);
            }
            .last-date-title {
              display: block;
              margin-bottom: 0.5rem;
            }
            .last-date {
              display: flex;
              span {
                margin: 0 4px 0 4px;
              }
              select {
                padding: 2px 0 2px 0;
              }
              .creadit-month-group,
              .creadit-year-group {
                width: 100%;
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
        }
        .post-pay {
          opacity: 0;
          transform: translateY(10px);
          transition: 1s ease;
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
            transition: 0.5s ease;
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
        }
        .pay-animate {
          opacity: 1;
          transform: translateY(0px);
        }
      }
    }
  }
  .step-3 {
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
      .order-list-switch {
        margin: 0 15px 15px 0;
        padding: 5px 10px 5px 10px;
        background-color: rgb(0, 153, 255);
        border-radius: 20px;
        color: white;
        transition: 1s ease;
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
          0 0 2px 1px rgba(0, 0, 0, 0.7);
        cursor: pointer;
        user-select: none;
      }
      .order-list-switch-active {
        background-color: rgb(111, 0, 255);
      }
      .order-list {
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
        .table {
          margin-bottom: 0;
          .cash-total {
            text-align: right;
          }
          th {
            color: white;
            text-align: center;
          }
          td {
            color: white;
            padding: 5px;
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
                }
              }
            }
            span {
              display: block;
              padding-top: 10px;
            }
          }
        }
      }
      .order-profile {
        opacity: 0;
        transform: translateY(-50px);
        transition: 1s ease;
        .order-profile-title {
          display: block;
          text-align: center;
          font-size: 25px;
          font-weight: bold;
        }
        .table {
          margin-bottom: 0;
          thead {
            th {
              border: none;
            }
          }
          tbody {
            tr {
              th {
                color: white;
                text-align: center;
              }
              td {
                color: white;
                padding: 10px;
                text-align: center;
              }
            }
          }
        }
      }
      .completed-footer {
        display: block;
        font-size: 20px;
        text-align: center;
        font-weight: bold;
        margin: 10px 0 10px 0;
        opacity: 0;
        transition: 1s ease;
        transform: translateY(50px);
      }
      .completed-footer-active {
        opacity: 1 !important;
        transform: translateY(0px);
      }
    }
    .order-info-active {
      opacity: 1 !important;
      transform: translateY(0px) !important;
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
<script>
import twZipCode from "../assets/twzipcode.json";
export default {
  data() {
    return {
      otLocation: [],
      pdLocation: [],
      cpLocation: [],
      freightTemp: 0,
      totalTemp: 0,
      totalNum: [],
      listActiveCount: 0,
      cityAll: [],
      paymentName: "",
      paymentEmail: "",
      paymentTel: "",
      cityName: null,
      blockNameAll: [],
      blockName: null,
      postNumAll: [],
      postNum: null,
      address: "",
      paymentNameCheck: null,
      paymentEmailCheck: null,
      emCheck: null,
      paymentTelCheck: null,
      telCheck: null,
      cityNameCheck: null,
      blockNameCheck: null,
      postNumCheck: null,
      addressCheck: null,
      adCheck: null,
      buyAreaAllValue: [],
      ticketValue: "",
      cpValid: false,
      cpCount: 1,
      passBuyArea: false,
      stepCount: 1,
      prevText: "回首頁",
      nextText: "下一步",
      cardTypeData: [
        {
          cardNum: 1,
          cardName: "Visa",
        },
        {
          cardNum: 2,
          cardName: "MasterCard",
        },
        {
          cardNum: 3,
          cardName: "PayPal",
        },
        {
          cardNum: 4,
          cardName: "JCB",
        },
      ],
      cardType: "無",
      creaditNums: "",
      creaditNumsCheck: null,
      creaditMonth: null,
      creaditYear: null,
      creaditSafeCheck: "",
      creaditSafeCodeType: false,
      payChange: 0,
      postType: "無",
      postAccountShow: 0,
      choosePayDown: true,
      beforePayType: "",
      beforePayTypeBar: "",
      beforePayTypeBarNone: "",
      paymentNumHash: null,
      getNowPayInfo: [],
      switchCount: 0,
      payDownBack: false,
    };
  },
  watch: {
    otLocation(array) {
      console.log(array);
      if (array.length != 0) {
        array.forEach((key) =>
          this.totalNum.push(key.PDOnSalePrice * key.ODPDCount)
        );
        this.totalTemp = this.totalNum.reduce((front, end) => front + end);
      }
    },
  },
  computed: {
    // valueRegXp() {
    //   let phoneNum = RegExp("^[0-9]*$", "g").test(this.paymentTel);
    //   let email = RegExp(
    //     "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$"
    //   ).test(this.paymentEmail);
    //   let address = RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$").test(this.address);
    //   email == true ? (this.emCheck = true) : (this.emCheck = false);
    //   phoneNum == true ? (this.telCheck = true) : (this.telCheck = false);
    //   address == true ? (this.adCheck = true) : (this.adCheck = false);
    // },
    // creaditValueCheck() {
    //   let safeCode = RegExp("^[0-9]*$", "g").test(this.creaditSafeCheck);
    //   safeCode == true && this.creaditSafeCheck.length == 3
    //     ? (this.creaditSafeCodeType = true)
    //     : (this.creaditSafeCodeType = false);
    // },
    // creaditNum() {
    //   let numSpliceDashed = this.creaditNums.replace(/-/g, "");
    //   let numCheck = RegExp("^[0-9]*$", "g").test(numSpliceDashed);
    //   let num = this.creaditNums.replace(/-/g, "");
    //   let numToArry = num.split("");
    //   let newNumArry = [];
    //   numToArry.map((nums, index) => {
    //     newNumArry.push(nums);
    //     if ((index + 1) % 4 == 0 && newNumArry.length < 19) {
    //       newNumArry.push("-");
    //     }
    //   });
    //   this.creaditNums = newNumArry.join("");
    //   numCheck == true && numSpliceDashed.length == 16
    //     ? (this.creaditNumsCheck = true)
    //     : (this.creaditNumsCheck = false);
    //   if (this.stepCount == 2) {
    //     this.creaditNums == "" ||
    //     this.creaditMonth == null ||
    //     this.creaditYear == null ||
    //     this.creaditSafeCheck == ""
    //       ? (this.choosePayDown = false)
    //       : (this.choosePayDown = true);
    //   }
    // },
  },
  methods: {
    ticketCheck() {
      this.cpLocation.forEach((key) => {
        if (key.CPCode == this.ticketValue) {
          if (Boolean(key.CPState) == false) {
            this.cpValid = false;
            this.cpCount = 1;
            return;
          } else {
            this.cpCount = key.CPPercent / 100;
            this.cpValid = true;
          }
        }
      });
    },
    changeCityDetails() {
      this.postNumAll = [];
      this.blockNameAll = [];
      this.blockName = null;
      this.postNum = null;
      twZipCode.code.forEach((key) => {
        if (key.city == this.cityName) {
          this.postNumAll.push(key.zip_code);
          this.blockNameAll.push(key.district);
        }
      });
    },
    showOrderList() {
      this.listActiveCount += 1;
      if (this.listActiveCount == 1) {
        document
          .querySelector(".list-switch")
          .classList.add("list-switch-active");
      } else {
        this.listActiveCount = 0;
        document
          .querySelector(".list-switch")
          .classList.remove("list-switch-active");
      }
    },
    cardChoosePartForCreadit() {
      document.querySelector(".creadit").classList.remove("pay-choose-active");
      document.querySelector(".post").classList.add("pay-choose-active");
      document.querySelector(".creadit").classList.remove("pay-choose-active");
      document.querySelector(".post-pay").classList.remove("pay-animate");
      setTimeout(() => (this.payChange = 0), 1000);
      setTimeout(() => {
        document
          .querySelector(".creadit-pay")
          .classList.add("pay-choose-active");
        if (this.stepCount == 2) {
          this.postType = "無";
          this.choosePayDown = false;
        }
      }, 1100);
    },
    cardChoosePartForPost() {
      document.querySelector(".post ").classList.remove("pay-choose-active");
      document.querySelector(".creadit").classList.add("pay-choose-active");
      document.querySelector(".creadit-pay").classList.remove("pay-animate");
      setTimeout(() => (this.payChange = 1), 1000);
      setTimeout(() => {
        document.querySelector(".post-pay").classList.add("pay-animate");
        if (this.stepCount == 2) {
          this.cardType = "無";
          this.creaditNums = "";
          this.creaditMonth = null;
          this.creaditYear = null;
          this.creaditSafeCheck = "";
          this.choosePayDown = false;
        }
      }, 1100);
    },
    cardChoose(text) {
      text == "creadit"
        ? this.cardChoosePartForCreadit()
        : this.cardChoosePartForPost();
    },
    creaditChoose(type) {
      document
        .querySelectorAll(".pay-icon")
        .forEach((key) =>
          Number(key.dataset.pay) == type
            ? key.classList.add("creadit-active")
            : key.classList.remove("creadit-active")
        );
      this.cardTypeData.forEach((key) =>
        key.cardNum == type
          ? setTimeout(() => (this.cardType = key.cardName), 500)
          : null
      );
      document
        .querySelector(".card-type-text")
        .classList.add("card-type-text-hide");
      setTimeout(
        () =>
          document
            .querySelector(".card-type-text")
            .classList.remove("card-type-text-hide"),
        500
      );
    },
    postChooseBank() {
      this.postAccountShow = 1;
      setTimeout(
        () =>
          document
            .querySelector(".post-account-group")
            .classList.add("post-account-group-active"),
        100
      );
      document
        .querySelector(".post-select-text")
        .classList.add("post-select-text-hide");
      setTimeout(() => (this.postType = "郵局轉帳付款"), 490);
      setTimeout(
        () =>
          document
            .querySelector(".post-select-text")
            .classList.remove("post-select-text-hide"),
        500
      );
      this.choosePayDown = true;
    },
    postChooseTruck() {
      this.postAccountShow == 1
        ? document
            .querySelector(".post-account-group")
            .classList.remove("post-account-group-active")
        : null;
      setTimeout(() => (this.postAccountShow = 0), 500);
      document
        .querySelector(".post-select-text")
        .classList.add("post-select-text-hide");
      setTimeout(() => (this.postType = "郵寄貨到付款"), 490);
      setTimeout(
        () =>
          document
            .querySelector(".post-select-text")
            .classList.remove("post-select-text-hide"),
        500
      );
      this.choosePayDown = true;
    },
    postChoose(type) {
      document
        .querySelectorAll(".post")
        .forEach((key) =>
          Number(key.dataset.post) == type
            ? key.classList.add("post-active")
            : key.classList.remove("post-active")
        );
      if (type == 1) {
        this.postChooseBank();
      } else {
        this.postChooseTruck();
      }
    },
    buyAreaCheck() {
      let falseCount = 0;
      this.paymentName == ""
        ? (this.paymentNameCheck = false)
        : (this.paymentNameCheck = true);
      this.paymentEmail == ""
        ? (this.paymentEmailCheck = false)
        : (this.paymentEmailCheck = true);
      this.paymentTel == ""
        ? (this.paymentTelCheck = false)
        : (this.paymentTelCheck = true);
      this.cityName == null
        ? (this.cityNameCheck = false)
        : (this.cityNameCheck = true);
      this.blockName == null
        ? (this.blockNameCheck = false)
        : (this.blockNameCheck = true);
      this.postNum == null
        ? (this.postNumCheck = false)
        : (this.postNumCheck = true);
      this.address == ""
        ? (this.addressCheck = false)
        : (this.addressCheck = true);
      this.buyAreaAllValue.push(
        this.paymentNameCheck,
        this.paymentEmailCheck,
        this.paymentTelCheck,
        this.cityNameCheck,
        this.blockNameCheck,
        this.postNumCheck,
        this.addressCheck,
        this.emCheck,
        this.telCheck,
        this.adCheck
      );
      this.buyAreaAllValue.forEach((key) =>
        key == false ? (falseCount += 1) : null
      );
      falseCount == 0 ? (this.passBuyArea = true) : (this.passBuyArea = false);
    },
    beforePay() {
      if (this.cardType == "無") {
        this.beforePayTypeBar = ".creadit";
        this.beforePayType = ".post-pay";
        this.beforePayTypeBarNone = ".post";
      } else {
        this.beforePayTypeBar = ".post";
        this.beforePayType = ".creadit-pay";
        this.beforePayTypeBarNone = ".creadit";
      }
      document
        .querySelector(`${this.beforePayTypeBarNone}`)
        .classList.remove("pay-choose-active");
      document
        .querySelector(`${this.beforePayTypeBar}`)
        .classList.add("pay-choose-active");
      document
        .querySelector(`${this.beforePayType}`)
        .classList.add("pay-animate");
      this.pdLocation.forEach((key) => {
        if (key.PDName == this.paymentName) {
          this.axios
            .post(`http://127.0.0.1:8088/shop/payment/delete`, {
              id: key.PMID,
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }
      });
    },
    prevStep() {
      this.stepCount == 1
        ? (this.stepCount = 1)
        : setTimeout(() => (this.stepCount -= 1), 990);
      if (this.stepCount == 1) {
        this.$router.push("/main/mainPage");
        window.location.reload();
      } else if (this.stepCount == 2) {
        document.querySelector(".step-2").classList.remove("page-animate");
        setTimeout(() => {
          this.prevText = "回首頁";
          document.querySelector(".step-1").classList.add("page-animate");
        }, 1000);
      } else if (this.stepCount == 3) {
        document.querySelector(".step-3").classList.remove("page-animate");
        setTimeout(() => {
          this.beforePay();
          this.nextText = "下一步";
          document.querySelector(".step-2").classList.add("page-animate");
        }, 1000);
      }
    },
    paymentNumHashCount() {
      let emptyNumArry = [];
      let orderRadomNum = null;
      let orderNumFinalHash = [];
      for (let e = 0; e <= 9; e++) {
        emptyNumArry.push(e);
      }
      for (let d = 0; d < 10; d++) {
        orderRadomNum = Math.floor(Math.random() * emptyNumArry.length);
        orderNumFinalHash.push(emptyNumArry[orderRadomNum]);
      }
      this.paymentNumHash = orderNumFinalHash.join("");
    },
    paymentUseCoupon(code) {
      let couponID;
      let couponFilter = [];
      couponFilter = this.cpLocation.filter((key) => key.CPCode == code);
      couponID = couponFilter[0].CPID;
      return couponID;
    },
    payMethods() {
      let dateTime = new Date();
      let year = dateTime.getFullYear();
      let month = `${dateTime.getMonth() + 1 < 10 ? "0" : ""}${
        dateTime.getMonth() + 1
      }`;
      let date = `${dateTime.getDate() < 10 ? "0" : ""}${dateTime.getDate()}`;
      let fullDate = `${year}-${month}-${date}T00:00:00.000Z`;
      this.paymentNumHashCount();
      // let a = [];
      // a.push({
      //   paymentNum: this.paymentNumHash,
      //   paymentName: this.paymentName,
      //   paymentEmail: this.paymentEmail,
      //   paymentTel: this.paymentTel,
      //   paymentAddress: `${this.postNum}${this.cityName}${this.blockName}${this.address}`,
      //   payMethod: `${this.creaditNums == "" ? this.postType : this.cardType}`,
      //   paymentCouponUse: this.ticketValue == "" ? Number(false) : Number(true),
      //   paymentCouponID:
      //     this.cpValid == true ? this.paymentUseCoupon(this.ticketValue) : 0,
      //   payStatus: 0,
      //   createDate: fullDate,
      // });
      // console.log(a);
      this.axios
        .post("http://127.0.0.1:8088/shop/payment/create", {
          paymentNum: this.paymentNumHash,
          paymentName: this.paymentName,
          paymentEmail: this.paymentEmail,
          paymentTel: this.paymentTel,
          paymentAddress: `${this.postNum}${this.cityName}${this.blockName}${this.address}`,
          payMethod: `${
            this.creaditNums == "" ? this.postType : this.cardType
          }`,
          paymentCouponUse:
            this.ticketValue == "" ? Number(false) : Number(true),
          paymentCouponID:
            this.cpValid == true ? this.paymentUseCoupon(this.ticketValue) : 0,
          payStatus: 0,
          createDate: fullDate,
        })
        .then((res) => {
          if (res.status == 200) {
            this.getPayDownList();
            setTimeout(() => this.getNowPayList(), 500);
          }
        })
        .catch((err) => console.log(err));
    },
    nextStepPart() {
      if (this.stepCount == 1) {
        this.prevText = "上一步";
        document.querySelector(".step-1").classList.remove("page-animate");
        setTimeout(
          () => document.querySelector(".step-2").classList.add("page-animate"),
          1000
        );
        setTimeout(() => (this.choosePayDown = false), 1001);
      } else if (this.stepCount == 2) {
        if (this.choosePayDown == false) return;
        this.payMethods();
        document.querySelector(".step-2").classList.remove("page-animate");
        this.nextText = "結帳";
        setTimeout(
          () => document.querySelector(".step-3").classList.add("page-animate"),
          1100
        );
      }
    },
    nextStep() {
      if (this.stepCount == 3) {
        let patchNum = null;
        this.getNowPayInfo.forEach((key) => (patchNum = key.PMID));
        this.axios
          .post("http://127.0.0.1:8088/shop/payment/paied", {
            id: patchNum,
            payStatus: Number(true),
          })
          .then((res) => {
            if (res.status == 200) {
              this.payDownBack = true;
              this.getPayDownList();
              setTimeout(() => this.getNowPayList(), 300);
            }
          })
          .catch((err) => console.log(err));
        return;
      }
      this.buyAreaCheck();
      if (this.passBuyArea == false) {
        this.buyAreaAllValue = [];
        return;
      }
      this.nextStepPart();
      if (this.choosePayDown == false) return;
      setTimeout(() => (this.stepCount += 1), 990);
    },
    getNowPayList() {
      this.getNowPayInfo = this.pdLocation.filter(
        (key) => key.PMNum == this.paymentNumHash
      );
    },
    switchOrderList() {
      document
        .querySelector(".order-list-switch")
        .classList.add("order-list-switch-active");
      setTimeout(
        () =>
          document
            .querySelector(".order-list-switch")
            .classList.remove("order-list-switch-active"),
        1000
      );
      this.switchCount >= 1
        ? setTimeout(() => (this.switchCount = 0), 995)
        : setTimeout(() => (this.switchCount += 1), 995);
      if (this.switchCount == 0) {
        document
          .querySelector(".order-list")
          .classList.remove("order-info-active");
        setTimeout(() => {
          document
            .querySelector(".order-profile")
            .classList.add("order-info-active");

          document
            .querySelector(".completed-footer")
            .classList.add("completed-footer-active");
        }, 1000);
      } else {
        setTimeout(
          () =>
            document
              .querySelector(".order-list")
              .classList.add("order-info-active"),
          1000
        );
        document
          .querySelector(".order-profile")
          .classList.remove("order-info-active");
        document
          .querySelector(".completed-footer")
          .classList.remove("completed-footer-active");
      }
    },
    backMain() {
      this.payDownBack = false;
      this.$router.push("/main/mainPage");
      window.location.reload();
    },
    renderCityList() {
      twZipCode.code.forEach((key) => {
        let posCity = this.cityAll.indexOf(key.city);
        let posBlock = this.blockNameAll.indexOf(key.district);
        let posPostNum = this.postNumAll.indexOf(key.zip_code);
        posCity == -1 ? this.cityAll.push(key.city) : null;
        posBlock == -1 ? this.blockNameAll.push(key.district) : null;
        posPostNum == -1 ? this.postNumAll.push(key.zip_code) : null;
      });
    },
    getOrderList() {
      this.axios
        .get("http://127.0.0.1:8088/shop/cart/")
        .then((res) => {
          if (res.status == 200) this.otLocation = res.data;
        })
        .catch((err) => console.log(err));
    },
    getPayDownList() {
      this.axios
        .get("http://127.0.0.1:8088/shop/payment")
        .then((res) => {
          if (res.status == 200) this.pdLocation = res.data;
        })
        .catch((err) => console.log(err));
    },
    getCouponCode() {
      this.axios
        .get("http://127.0.0.1:8088/shop/coupon")
        .then((res) => {
          if (res.status == 200) this.cpLocation = res.data;
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.getOrderList();
    this.renderCityList();
    this.getCouponCode();
  },
};
</script>