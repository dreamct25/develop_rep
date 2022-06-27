<template>
  <div class="page-outer" :class="{ 'page-outer-active': pageActive }">
    <div style="color: white">{{ counter(50) }}</div>
    <div
      class="fortune-title"
      :class="{ 'fortune-title-hide': fortuneTitleAniamte }"
    >
      星座運勢
    </div>
    <div
      class="all-select-outer"
      :class="{ 'all-select-outer-hide': allSelectAnimate }"
    >
      <div class="type-select-outer" :class="{ 'outer-active': outerAnimate }">
        <div class="row justify-content-center">
          <div class="auto-col">
            <div class="row no-gutters">
              <div
                class="col-md-3"
                v-for="(item, index) in selectTitleItem"
                :key="index"
              >
                <div
                  class="type-title"
                  :data-types="index"
                  @click="clickAnimate(item.titleVal, index)"
                >
                  {{ item.titleStr }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="select-outer" :class="{ 'outer-active': outerAnimate }">
        <select
          class="select"
          v-model="selectVal"
          @focus="arrowAnimate = true"
          @blur="arrowAnimate = false"
        >
          <option :value="null" selected disabled>-- 請選擇星座 --</option>
          <option
            v-for="(textItem, index) in starTextArray"
            :key="index"
            :value="textItem.zh"
          >
            {{ textItem.zh }}
          </option>
        </select>
        <i
          class="far fa-chevron-up arrow"
          :class="{ 'arrow-toggle': arrowAnimate }"
        ></i>
        <div class="select-search-btn" @click="getAPI">查詢</div>
      </div>
    </div>
    <div
      class="fortune-show"
      :class="{ 'fortune-show-active': fortuneAnimate }"
    >
      <div class="loading-outer">
        <div
          class="loading-body"
          v-if="loadingState == true && getArray.length == 0"
        >
          <div class="loading-icon-outer">
            <div class="loading-throw">
              <div class="loading-in"></div>
            </div>
          </div>
          <div class="loading-text">讀取資料中</div>
        </div>
        <div
          class="loading-body"
          v-else-if="loadingState == true && getArray.lenght != 0"
        >
          <div class="loading-icon-outer">
            <div class="loading-throw">
              <div class="loading-complated"></div>
            </div>
          </div>
          <div class="loading-text">讀取完成</div>
        </div>
      </div>
      <div class="show-fortun-section" v-if="titleValGet == 'today'">
        <div
          class="fortune-section"
          v-for="(item, index) in chooseFortuneItem"
          :key="index"
        >
          <span>{{ item.starDateTitle }}</span>
          <img :src="item.starImg" />
          <span class="star-title">{{ item.starName }}</span>
          <span class="percent-g"
            >本日整體運勢：
            <div class="percent-prograss-outer">
              <div class="percent-prograss"></div>
              <span class="percent">{{ item.starAllPerc }}</span>
            </div>
          </span>
          <span class="percent-g"
            >事業運指數：
            <div class="percent-prograss-outer">
              <div class="percent-prograss"></div>
              <span class="percent">{{ item.starWorkPerc }}</span>
            </div>
          </span>
          <span class="percent-g"
            >健康運指數：
            <div class="percent-prograss-outer">
              <div class="percent-prograss"></div>
              <span class="percent">{{ item.starHealthPerc }}</span>
            </div>
          </span>
          <span class="percent-g"
            >錢財運指數：
            <div class="percent-prograss-outer">
              <div class="percent-prograss"></div>
              <span class="percent">{{ item.starMoneyPerc }}</span>
            </div>
          </span>
          <span class="percent-g"
            >愛情運指數：
            <div class="percent-prograss-outer">
              <div class="percent-prograss"></div>
              <span class="percent">{{ item.starLovePerc }}</span>
            </div>
          </span>
          <span>幸運顏色：{{ item.starLuckyColor }}</span>
          <span>幸運數字：{{ item.starLuckyNum }}</span>
          <span>適合戀人：{{ item.starLover }}</span>
          <span class="long-dec">本日運勢概述：{{ item.starTodayDec }}</span>
        </div>
      </div>
      <div class="show-fortun-section" v-else-if="titleValGet == 'week'">
        <div
          class="fortune-section"
          v-for="(item, index) in chooseFortuneItem"
          :key="index"
        >
          <img :src="item.starImg" />
          <span class="star-title">{{ item.starName }}</span>
          <span>{{ item.starDateTitle }}</span>
          <span class="star-title-dec percent-g"
            >本週整體運勢：
            <div class="percent-prograss-outer">
              <div class="percent-prograss"></div>
              <span class="percent">{{ item.starWeekPerc }}</span>
            </div>
          </span>
          <span class="star-title-dec">學業運勢概述</span>
          <span class="long-dec">{{ item.starWeekLearnDec }}</span>
          <span class="star-title-dec">事業運勢概述</span>
          <span class="long-dec">{{ item.starWeekWorkDec }}</span>
          <span class="star-title-dec">錢財運勢概述</span>
          <span class="long-dec">{{ item.starWeekMoneyDec }}</span>
          <span class="star-title-dec">愛情運勢概述</span>
          <span class="long-dec">{{ item.starWeekLoveDec }}</span>
        </div>
      </div>
      <div class="show-fortun-section" v-else-if="titleValGet == 'month'">
        <div
          class="fortune-section"
          v-for="(item, index) in chooseFortuneItem"
          :key="index"
        >
          <img :src="item.starImg" />
          <span class="star-title">{{ item.starName }}</span>
          <span>{{ item.starDateTitle }}</span>
          <span class="star-title-dec">整體運勢</span>
          <span class="long-dec">{{ item.starMonthAllDec }}</span>
          <span class="star-title-dec">事業運概述</span>
          <span class="long-dec">{{ item.starMonthWorkDec }}</span>
          <span class="star-title-dec">健康狀況概述</span>
          <span class="long-dec">{{ item.starMonthHealthDec }}</span>
          <span class="star-title-dec">錢財運概述</span>
          <span class="long-dec">{{ item.starMonthMoneyDec }}</span>
          <span class="star-title-dec">愛情運概述</span>
          <span class="long-dec">{{ item.starMonthLoveDec }}</span>
        </div>
      </div>
      <div class="show-fortun-section" v-else-if="titleValGet == 'year'">
        <div
          class="fortune-section"
          v-for="(item, index) in chooseFortuneItem"
          :key="index"
        >
          <img :src="item.starImg" />
          <span class="star-title">{{ item.starName }}</span>
          <span class="star-title-dec">{{ item.starDateTitle }}</span>
          <span class="star-title-dec">幸運石</span>
          <span>{{ item.starLuckyStone }}</span>
          <span class="star-title-dec">運勢重點</span>
          <span>{{ item.starYearAllPoint }}</span>
          <span class="star-title-dec">運勢概述</span>
          <span class="long-dec">{{ item.starYearAllDec }}</span>
          <span class="star-title-dec">事業運概述</span>
          <span class="long-dec">{{ item.starYearWorkDec }}</span>
          <span class="star-title-dec">健康運概述</span>
          <span class="long-dec">{{ item.starYearHealthDec }}</span>
          <span class="star-title-dec">錢財運概述</span>
          <span class="long-dec">{{ item.starYearMoneyDec }}</span>
          <span class="star-title-dec">愛情運概述</span>
          <span class="long-dec">{{ item.starYearLoveDec }}</span>
        </div>
      </div>
    </div>
    <div
      class="back-search"
      :class="{ 'back-search-active': searchAnimateSwitch }"
      @click="backSearch"
    >
      查詢其他星座
    </div>
    <Modal :str="modalText" v-on:close="emitClose" />
  </div>
</template>
<style lang="scss" scoped>
.page-outer {
  opacity: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  transition: 1s ease;
  .fortune-title {
    opacity: 1;
    font-size: 35px;
    color: white;
    transform: translateY(0px);
    margin: 20px 0 20px 0;
    transition: 0.7s ease;
  }
  .fortune-title-hide {
    opacity: 0;
    transform: translateY(-15px);
  }
  .all-select-outer {
    display: block;
    .type-select-outer {
      opacity: 0;
      transform: translateX(100%);
      transition: 1s ease;
      .type-title {
        cursor: pointer;
        user-select: none;
        color: white;
        background-color: rgb(0, 162, 255);
        border-radius: 20px;
        padding: 3px 20px 3px 20px;
        margin: 5px;
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
        transition: 0.7s ease;
      }
      .type-title-active {
        color: black;
        background-color: white;
        box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.7);
      }
    }
    .select-outer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin: 20px 0 20px 0;
      opacity: 0;
      transform: translateX(-100%);
      transition: 0.7s ease;
      .arrow {
        position: absolute;
        top: 0;
        transform: translate(10px, 6px) rotate(0deg);
        transition: 0.7s ease;
      }
      .arrow-toggle {
        transform: translate(10px, 6px) rotate(-180deg);
      }
      .select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding: 2px 30px 2px 10px;
        outline: none;
        border: none;
        border-radius: 20px;
        margin: 0 5px 0 5px;
        background-color: white;
        box-shadow: inset 0 0 0 0 rgb(0, 162, 255),
          0 0 2px 1px rgba(0, 0, 0, 0.7);
        transition: 1s ease;
      }
      .select:focus {
        box-shadow: inset 0 0 3px 1px rgb(0, 162, 255),
          0 0 2px 1px rgba(0, 0, 0, 0.7);
      }
      .select-search-btn {
        color: white;
        margin: 0 5px 0 5px;
        border-radius: 20px;
        padding: 2px 30px 2px 30px;
        background-color: rgb(0, 119, 255);
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
        cursor: pointer;
        user-select: none;
      }
    }
    .outer-active {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .all-select-outer-hide {
    display: none;
  }
  .fortune-show {
    color: white;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    transform: translate(100%, 0);
    transition: 1s ease;
    .percent-g {
      display: flex;
      align-items: center;
      justify-content: center;
      .percent-prograss-outer {
        position: relative;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 20px;
        box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.7);
        height: 20px;
        width: 150px;
        overflow: hidden;
        .percent-prograss {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          width: 0;
          border-radius: 20px;
          background-color: #0077ff;
          box-shadow: inset 0 0 3px 0.3px rgba(255, 255, 255, 0.7);
          overflow: hidden;
        }
        .percent {
          color: white;
          margin-bottom: unset;
          position: absolute;
          top: 8%;
          right: 0;
          left: 0;
          font-size: 16px;
          transform: translate(0%, -15%);
          transition: 0.7s ease;
        }
        .percent-show {
          opacity: 1;
        }
      }
    }
    .loading-outer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      padding: 12px;
      opacity: 1;
      transition: 1s ease;
      .loading-body {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        opacity: 0;
        transform: translateY(100%);
        transition: 0.7s ease;
        .loading-icon-outer {
          overflow: hidden;
          padding: 10px;
          .loading-throw {
            opacity: 0;
            transform: translateY(200px);
            transition: 0.7s ease;
            .loading-complated {
              width: 40px;
              height: 40px;
              border: 4px solid transparent;
              border-radius: 6.5px;
              transform: rotate(0deg);
              box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
                0 0 2px 1px rgba(255, 255, 255, 0.7);
              animation: loading-complate 3s linear infinite;
            }
            .loading-in {
              width: 40px;
              height: 40px;
              border: 4px solid transparent;
              border-radius: 6.5px;
              transform: rotate(0deg);
              box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
                0 0 2px 1px rgba(255, 255, 255, 0.7);
              animation: loading 3s linear infinite;
            }
          }
          .loading-throw-active {
            opacity: 1;
            transform: translateY(0);
          }
          @keyframes loading {
            0% {
              border-top-color: transparent;
              border-right-color: transparent;
              border-bottom-color: transparent;
              border-left-color: transparent;
            }
            12.5% {
              border-top-color: rgb(255, 255, 255);
              border-right-color: transparent;
              border-bottom-color: transparent;
              border-left-color: transparent;
            }
            25% {
              border-top-color: transparent;
              border-right-color: transparent;
              border-bottom-color: transparent;
              border-left-color: transparent;
            }
            37.5% {
              border-top-color: transparent;
              border-right-color: rgb(255, 255, 255);
              border-bottom-color: transparent;
              border-left-color: transparent;
            }
            50% {
              border-top-color: transparent;
              border-right-color: transparent;
              border-bottom-color: transparent;
              border-left-color: transparent;
            }
            62.5% {
              border-top-color: transparent;
              border-right-color: transparent;
              border-bottom-color: rgb(255, 255, 255);
              border-left-color: transparent;
            }
            75% {
              border-top-color: transparent;
              border-right-color: transparent;
              border-bottom-color: transparent;
              border-left-color: transparent;
            }
            87.5% {
              border-top-color: transparent;
              border-right-color: transparent;
              border-bottom-color: transparent;
              border-left-color: rgb(255, 255, 255);
            }
            100% {
              transform: rotate(360deg);
              border-top-color: transparent;
              border-right-color: transparent;
              border-bottom-color: transparent;
              border-left-color: transparent;
            }
          }
          @keyframes loading-complate {
            0% {
              border-color: transparent;
              box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.7),
                0 0 2px 1px rgba(0, 0, 0, 0.7);
            }
            50% {
              border-color: rgb(255, 255, 255);
              box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
                0 0 2px 1px rgba(255, 255, 255, 0.7);
            }
            100% {
              transform: rotate(360deg);
              border-color: transparent;
              box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.7),
                0 0 2px 1px rgba(0, 0, 0, 0.7);
            }
          }
        }
        .loading-text {
          color: white;
          font-size: 18px;
          margin: 15px 0 15px 0;
        }
      }
      .loading-body-active {
        opacity: 1;
        transform: translateY(0);
      }
    }

    span {
      text-align: center;
      display: block;
      margin-bottom: 20px;
      font-size: 20px;
    }
    img {
      background-color: rgba(255, 255, 255, 0.7);
      width: 95px;
      padding: 8px 10px 7px 10px;
      border-radius: 10px;
      box-shadow: inset 0 0 7px 1px rgba(0, 0, 0, 0.7),
        0 0 10px 1px rgba(255, 255, 255, 0.7);
    }
    .star-title {
      font-size: 25px;
      font-weight: bold;
      text-align: center;
      margin-top: 20px;
    }
    .star-title-dec {
      font-size: 25px;
      color: rgb(255, 87, 247);
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
      margin: 8px 0 8px 0;
    }
    .long-dec {
      text-align: justify;
    }
  }
  .fortune-show-active {
    opacity: 1;
    transform: translate(0, 0);
  }
  @media screen and (max-width: 414px) {
    .fortune-show {
      transform: translate(100%, 0);
    }
  }
  @media screen and (max-width: 414px) {
    .fortune-show-active {
      transform: translate(0, 0);
    }
  }
  .back-search {
    margin: 20px 0 20px 0;
    opacity: 0;
    transform: translateY(10%) scale(0.1);
    transition: 0.7s ease;
    color: white;
    background-color: rgb(0, 119, 255);
    border-radius: 20px;
    padding: 5px 30px 5px 30px;
    box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
    cursor: pointer;
    user-select: none;
  }
  .back-search-active {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.page-outer-active {
  opacity: 1;
}
@media screen and (max-width: 414px) {
  .page-outer {
    min-height: 75vh;
  }
}
</style>
<script>
import imgA from "../assets/1-Aries.png";
import imgB from "../assets/2-Taurus.png";
import imgC from "../assets/3-Gemini.png";
import imgD from "../assets/4-Cancer.png";
import imgE from "../assets/5-Leo.png";
import imgF from "../assets/6-Virgo.png";
import imgG from "../assets/7-Libra.png";
import imgH from "../assets/8-Scorpio.png";
import imgI from "../assets/9-Sagittarius.png";
import imgJ from "../assets/10-Capricorn.png";
import imgK from "../assets/11-Aquarius.png";
import imgL from "../assets/12-Pisces.png";
import Modal from "../components/Modal.vue";
export default {
  data() {
    return {
      selectVal: null,
      titleValGet: "",
      outerAnimate: false,
      fortuneAnimate: false,
      fortuneTitleAniamte: false,
      allSelectAnimate: false,
      arrowAnimate: false,
      pageActive: false,
      chooseFortuneItem: [],
      selectTitleItem: [
        {
          titleStr: "本日運勢",
          titleVal: "today",
        },
        {
          titleStr: "本週運勢",
          titleVal: "week",
        },
        {
          titleStr: "本月運勢",
          titleVal: "month",
        },
        {
          titleStr: "本年運勢",
          titleVal: "year",
        },
      ],
      starImgItem: [
        {
          starName: "牡羊座",
          starImg: imgA,
        },
        {
          starName: "金牛座",
          starImg: imgB,
        },
        {
          starName: "雙子座",
          starImg: imgC,
        },
        {
          starName: "巨蟹座",
          starImg: imgD,
        },
        {
          starName: "獅子座",
          starImg: imgE,
        },
        {
          starName: "處女座",
          starImg: imgF,
        },
        {
          starName: "天秤座",
          starImg: imgG,
        },
        {
          starName: "天蠍座",
          starImg: imgH,
        },
        {
          starName: "射手座",
          starImg: imgI,
        },
        {
          starName: "摩羯座",
          starImg: imgJ,
        },
        {
          starName: "水瓶座",
          starImg: imgK,
        },
        {
          starName: "雙魚座",
          starImg: imgL,
        },
      ],
      starTextArray: [
        {
          zh: "牡羊座",
          cn: "白羊座",
        },
        {
          zh: "金牛座",
          cn: "金牛座",
        },
        {
          zh: "雙子座",
          cn: "双子座",
        },
        {
          zh: "巨蟹座",
          cn: "巨蟹座",
        },
        {
          zh: "獅子座",
          cn: "狮子座",
        },
        {
          zh: "處女座",
          cn: "处女座",
        },
        {
          zh: "天秤座",
          cn: "天秤座",
        },
        {
          zh: "天蠍座",
          cn: "天蝎座",
        },
        {
          zh: "射手座",
          cn: "射手座",
        },
        {
          zh: "摩羯座",
          cn: "摩羯座",
        },
        {
          zh: "水瓶座",
          cn: "水瓶座",
        },
        {
          zh: "雙魚座",
          cn: "双鱼座",
        },
      ],
      showFortuneFnArray: [
        {
          chooseText: "today",
          chooseFn: (items, img) => {
            items.forEach((key) => {
              this.OpenCC.Converter("cn", "tw").then((convert) => {
                let dateFormat = new Date(
                  key.datetime
                    .replace(/年/g, "-")
                    .replace(/月/g, "-")
                    .replace(/日/g, "")
                );
                this.chooseFortuneItem.push({
                  starDateTitle: `${dateFormat.getFullYear()} / ${
                    dateFormat.getMonth() + 1
                  } / ${dateFormat.getDate()}`,
                  starName: convert(key.name),
                  starImg: img,
                  starAllPerc: key.all,
                  starWorkPerc: key.work,
                  starHealthPerc: key.health,
                  starMoneyPerc: key.money,
                  starLovePerc: key.love,
                  starLuckyColor: convert(key.color),
                  starLuckyNum: key.number,
                  starLover: convert(key.QFriend),
                  starTodayDec: convert(key.summary),
                });
              });
            });
          },
        },
        {
          chooseText: "week",
          chooseFn: (items, img) => {
            let currentDay = new Date().getDay();
            let weekSun =
              new Date().getTime() - 24 * 60 * 60 * 1000 * currentDay;
            let dateFormat = new Date(weekSun);
            items.forEach((key) => {
              this.OpenCC.Converter("cn", "tw").then((convert) => {
                this.chooseFortuneItem.push({
                  starImg: img,
                  starName: convert(key.name),
                  starDateTitle: `${dateFormat.getFullYear()} / ${
                    dateFormat.getMonth() + 1
                  } / ${dateFormat.getDate()} ~ ${
                    dateFormat.getMonth() + 1
                  } / ${dateFormat.getDate() + 6}`,
                  starWeekPerc: key.weekth,
                  starWeekLearnDec: convert(key.job.slice(3, key.job.length)),
                  starWeekWorkDec: convert(key.work.slice(3, key.work.length)),
                  starWeekMoneyDec: convert(
                    key.money.slice(4, key.money.length)
                  ),
                  starWeekLoveDec: convert(key.love.slice(3, key.love.length)),
                });
              });
            });
          },
        },
        {
          chooseText: "month",
          chooseFn: (items, img) => {
            items.forEach((key) => {
              this.OpenCC.Converter("cn", "tw").then((convert) => {
                this.chooseFortuneItem.push({
                  starImg: img,
                  starName: convert(key.name),
                  starDateTitle: `${new Date().getFullYear()} 年 ${
                    new Date().getMonth() + 1
                  } 月`,
                  starMonthAllDec: convert(key.all.slice(4, key.all.length)),
                  starMonthWorkDec: convert(key.work.slice(4, key.work.length)),
                  starMonthHealthDec: convert(
                    key.health.slice(3, key.health.length)
                  ),
                  starMonthMoneyDec: convert(
                    key.money.slice(3, key.money.length)
                  ),
                  starMonthLoveDec: convert(key.love.slice(4, key.love.length)),
                });
              });
            });
          },
        },
        {
          chooseText: "year",
          chooseFn: (items, img) => {
            items.forEach((key) => {
              this.OpenCC.Converter("cn", "tw").then((convert) => {
                this.chooseFortuneItem.push({
                  starImg: img,
                  starName: convert(key.name),
                  starDateTitle: `${new Date().getFullYear()} 年整體運勢`,
                  starLuckyStone: convert(key.luckeyStone),
                  starYearAllPoint: convert(key.mima.info),
                  starYearAllDec: convert(key.mima.text[0]),
                  starYearWorkDec: convert(key.career[0]),
                  starYearHealthDec: convert(key.health[0]),
                  starYearMoneyDec: convert(key.finance[0]),
                  starYearLoveDec: convert(key.love[0]),
                });
              });
            });
          },
        },
      ],
      getArray: [],
      getObject: {},
      insertItem: "",
      OpenCC: require("opencc-js"),
      searchAnimateSwitch: false,
      modalText: "",
      rwdMod: false,
      loadingState: false,
      percentFormat: [],
    };
  },
  components: {
    Modal,
  },
  mounted() {
    this.rwdMod == true
      ? document.querySelector(".auto-col").classList.add("col-10")
      : document.querySelector(".auto-col").classList.add("col-12");
  },
  methods: {
    counter(val) {
      console.log(val);
    },
    percentCollectVal() {
      const percentGroup = document.querySelectorAll(".percent");
      this.percentFormat = [];
      percentGroup.forEach((key, index) => {
        this.percentFormat.push({
          elNum: index,
          elText: key.textContent,
        });
        key.textContent = 0;
      });
    },
    percentCounter() {
      const percentGroup = document.querySelectorAll(".percent");
      const percentPrograssGroup = document.querySelectorAll(
        ".percent-prograss"
      );
      this.percentFormat.forEach((key, index) => {
        if (key.elNum == index) {
          percentGroup[index].classList.add("percent-show");
          let count = 0;
          let timer = setInterval(() => {
            if (count == key.elText) {
              clearInterval(timer);
            } else {
              count++;
              percentPrograssGroup[index].style.width = `${count}%`;
              percentGroup[index].textContent = `${count}%`;
            }
          }, 16);
        }
      });
    },
    emitClose() {
      const modalShow = document.querySelector(".modalC");
      const modalContentShow = document.querySelector(".modalC-body");
      this.ModalController().closeModal(modalShow, modalContentShow);
    },
    ModalController() {
      return {
        showModal: (modalShow, modalContentShow) => {
          modalShow.style.display = "block";
          modalShow.style.transition = "1s ease";
          setTimeout(() => {
            // 設定淡入延遲
            modalShow.classList.add("modalC-toggle");
            modalContentShow.classList.add("modalC-body-toggle");
          }, 100);
        },
        closeModal: (modalShow, modalContentShow) => {
          modalShow.classList.remove("modalC-toggle");
          modalContentShow.classList.remove("modalC-body-toggle");
          setTimeout(() => (modalShow.style.display = ""), 750); // 設定淡出延遲
        },
      };
    },
    clickAnimate(currentVal, num) {
      this.titleValGet = currentVal;
      document
        .querySelectorAll(".type-title")
        .forEach((key) =>
          key.dataset.types == num
            ? key.classList.add("type-title-active")
            : key.classList.remove("type-title-active")
        );
    },
    showItem(items) {
      let imgTemp;
      this.chooseFortuneItem = [];
      this.starImgItem.forEach((key) =>
        key.starName == this.selectVal ? (imgTemp = key.starImg) : null
      );
      this.showFortuneFnArray.forEach((key) =>
        key.chooseText == this.titleValGet ? key.chooseFn(items, imgTemp) : null
      );
    },
    loadingItem() {
      return {
        showLoading: () => {
          this.loadingState = true;
          setTimeout(() => {
            this.fortuneAnimate = true;
            setTimeout(() => {
              document
                .querySelector(".loading-body")
                .classList.add("loading-body-active");
              setTimeout(
                () =>
                  document
                    .querySelector(".loading-throw")
                    .classList.add("loading-throw-active"),
                701
              );
            }, 1001);
          }, 1000);
        },
        closeLoadingAndShow: (res) => {
          this.loadingState = true;
          setTimeout(() => {
            document
              .querySelector(".loading-body")
              .classList.add("loading-body-active");
            setTimeout(
              () =>
                document
                  .querySelector(".loading-throw")
                  .classList.add("loading-throw-active"),
              701
            );
          }, 1010);
          this.getObject = res.data;
          this.getArray.push(this.getObject);
          setTimeout(() => {
            document
              .querySelector(".loading-throw")
              .classList.remove("loading-throw-active");
            setTimeout(
              () =>
                document
                  .querySelector(".loading-body")
                  .classList.remove("loading-body-active"),
              1000
            );
          }, 5300);
          setTimeout(() => (this.fortuneAnimate = false), 7700);
          setTimeout(() => {
            this.loadingState = false;
            this.showItem(this.getArray);
          }, 8700);
          setTimeout(() => {
            this.fortuneAnimate = true;
            this.fortuneTitleAniamte = false;
          }, 8750);
          setTimeout(() => this.percentCollectVal(), 9000);
          setTimeout(() => {
            this.percentCounter();
            this.searchAnimateSwitch = true;
          }, 9750);
        },
      };
    },
    getAPI() {
      const modalShow = document.querySelector(".modalC");
      const modalContentShow = document.querySelector(".modalC-body");
      if (this.titleValGet == "") {
        this.modalText = "請點選欲查詢的運勢類型";
        this.ModalController().showModal(modalShow, modalContentShow);
        return;
      } else if (this.selectVal == null) {
        this.modalText = "請選擇欲查詢的星座";
        this.ModalController().showModal(modalShow, modalContentShow);
        return;
      }
      let cnText = "";
      const unlockUrl = "https://cors-anywhere.herokuapp.com/";
      this.outerAnimate = false;
      this.fortuneTitleAniamte = true;
      setTimeout(() => {
        this.allSelectAnimate = true;
      }, 1001);

      this.loadingItem().showLoading();
      this.starTextArray.forEach((key) =>
        key.zh == this.selectVal ? (cnText = key.cn) : null
      );
      this.axios(
        `${unlockUrl}http://web.juhe.cn:8080/constellation/getAll?consName=${cnText}&type=${this.titleValGet}&key=f064e1b90ec3775ca7b8848fdfac3898`
      )
        .then((res) => {
          this.getObject = {};
          this.getArray = [];
          if (res.status == 200) this.loadingItem().closeLoadingAndShow(res);
        })
        .catch((err) => alert(err));
    },
    backSearch() {
      this.fortuneAnimate = false;
      this.fortuneTitleAniamte = true;
      this.searchAnimateSwitch = false;
      setTimeout(() => {
        this.allSelectAnimate = false;
        this.chooseFortuneItem = [];
      }, 1000);
      setTimeout(() => {
        this.outerAnimate = true;
        this.fortuneTitleAniamte = false;
      }, 1050);
    },
  },
  created() {
    setTimeout(() => {
      this.pageActive = true;
      setTimeout(() => {
        this.outerAnimate = true;
      }, 1000);
    }, 300);
    window.innerWidth <= 414 ? (this.rwdMod = true) : (this.rwdMod = false);
  },
};
</script>