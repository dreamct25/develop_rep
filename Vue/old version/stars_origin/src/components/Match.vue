<template>
  <div class="page-outer" :class="{ 'page-outer-active': pageActive }">
    <div
      class="star-match-title"
      :class="{ 'star-match-title-hide': starMatchTitleAnimate }"
    >
      星座契合度
    </div>
    <div
      class="match-select-group"
      :class="{ 'match-select-group-hide': matchSelectAnimate }"
    >
      <div class="match-you-group">
        <span>{{ yourSexVal }}的星座 </span>
        <select
          class="select"
          v-model="yourStarVal"
          @focus="arrowAnimateY = true"
          @blur="arrowAnimateY = false"
        >
          <option :value="null" selected disabled>-- 請選擇星座 --</option>
          <option
            v-for="(your, index) in starImgItem"
            :key="index"
            :value="your.starName"
          >
            {{ your.starName }}
          </option>
        </select>
        <i
          class="far fa-chevron-up arrow-y"
          :class="{ 'arrow-y-toggle': arrowAnimateY }"
        ></i>
        <select
          class="select-sex"
          v-model="yourSexVal"
          @focus="arrowAnimateYS = true"
          @blur="arrowAnimateYS = false"
        >
          <option value="你">男</option>
          <option value="妳">女</option>
        </select>
        <i
          class="far fa-chevron-up arrow-ys"
          :class="{ 'arrow-ys-toggle': arrowAnimateYS }"
        ></i>
      </div>
      <div class="match-other-group">
        <span>{{ otherSexVal }}的星座 </span>
        <select
          class="select"
          v-model="otherStarVal"
          @focus="arrowAnimateO = true"
          @blur="arrowAnimateO = false"
        >
          <option :value="null" selected disabled>-- 請選擇星座 --</option>
          <option
            v-for="(other, index) in starImgItem"
            :key="index"
            :value="other.starName"
          >
            {{ other.starName }}
          </option>
        </select>
        <i
          class="far fa-chevron-up arrow-o"
          :class="{ 'arrow-o-toggle': arrowAnimateO }"
        ></i>
        <select
          class="select-sex"
          v-model="otherSexVal"
          @focus="arrowAnimateOS = true"
          @blur="arrowAnimateOS = false"
        >
          <option value="他">男</option>
          <option value="她">女</option>
        </select>
        <i
          class="far fa-chevron-up arrow-os"
          :class="{ 'arrow-os-toggle': arrowAnimateOS }"
        ></i>
      </div>
      <div class="post-search-btn" @click="matchStar">查詢</div>
    </div>
    <div
      class="match-description-outer"
      :class="{ 'match-description-outer-active': matchDecAnimate }"
      v-for="(item, index) in filterMatch"
      :key="index"
    >
      <div class="match-description">
        <div class="star-title-group">
          <div class="your-star-group">
            <img :src="matchImgTrans(item.nameI)" />
            <span v-if="rwdMod == false" class="section-title"
              >{{ yourSexVal }}的星座：{{ item.nameI }}</span
            >
            <span v-else class="section-title"
              >{{ yourSexVal }}的星座<br />{{ item.nameI }}</span
            >
          </div>
          <div class="other-star-group">
            <img :src="matchImgTrans(item.nameII)" />
            <span v-if="rwdMod == false" class="section-title"
              >{{ otherSexVal }}的星座：{{ item.nameII }}</span
            >
            <span v-else class="section-title"
              >{{ otherSexVal }}的星座<br />{{ item.nameII }}</span
            >
          </div>
        </div>
        <div class="match-prograss-group">
          <span class="section-title">契合度</span>
          <div class="match-prograss-outer">
            <div class="match-prograss"></div>
            <span class="match-count">{{ count }} %</span>
          </div>
        </div>
        <div class="star-body-group">
          <span class="section-title">契合度評語：{{ item.comment }}</span>
          <div class="match-section-explain">
            <span
              class="section-title"
              :class="{ 'section-title-active': sectionTitleAnimate }"
              @click="showSectionText"
              >契合度解說</span
            >
            <div class="match-section-text">
              <span
                :class="{ 'show-text': showTextAnimate }"
                v-html="
                  item.description
                    .replace(/你/g, yourSexVal)
                    .replace(/他/g, otherSexVal)
                "
              ></span>
            </div>
          </div>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: 1s ease;
  .star-match-title {
    opacity: 1;
    color: white;
    font-size: 35px;
    opacity: 1;
    transform: translateY(15px);
    transition: 0.7s ease;
  }
  .star-match-title-hide {
    opacity: 0;
    transform: translateY(0px);
  }
  .match-select-group {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    opacity: 1;
    transform: translate(0, 35px);
    transition: 1.2s ease;
    .match-you-group,
    .match-other-group {
      span {
        color: white;
        display: block;
        margin: 5px 0 5px 0;
        font-size: 20px;
      }
      margin: 0 10px 0 10px;
      .select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 20px 0 0 20px;
        outline: none;
        border: none;
        border-right: 0.1px solid rgba(0, 0, 0, 0.3);
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.7);
        background-color: white;
        padding: 2px 25px 2px 8px;
      }
      .select-sex {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
        border: none;
        border-left: 0.1px solid rgba(0, 0, 0, 0.3);
        border-radius: 0 20px 20px 0;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.7);
        padding: 2px 25px 2px 3px;
        background-color: white;
      }
      .arrow-y,
      .arrow-ys,
      .arrow-o,
      .arrow-os {
        position: absolute;
        top: 0;
        transform: translate(-21px, 45px) rotate(0deg);
        transition: 0.7s ease;
      }
      .arrow-y-toggle,
      .arrow-ys-toggle,
      .arrow-o-toggle,
      .arrow-os-toggle {
        transform: translate(-21px, 45px) rotate(-180deg);
      }
      @media screen and (max-width: 414px) {
        .arrow-o,
        .arrow-os {
          position: absolute;
          top: 0;
          transform: translate(-21px, 114px) rotate(0deg);
          transition: 0.7s ease;
        }
        .arrow-o-toggle,
        .arrow-os-toggle {
          transform: translate(-21px, 114px) rotate(-180deg);
        }
      }
    }
    .post-search-btn {
      background-color: rgb(0, 119, 255);
      color: white;
      border-radius: 20px;
      padding: 2px 40px 2px 40px;
      cursor: pointer;
      user-select: none;
      box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
    }
    @media screen and (max-width: 414px) {
      .post-search-btn {
        margin-top: 25px;
      }
    }
  }
  .match-select-group-hide {
    opacity: 0;
    transform: translate(-100%, 35px);
  }
  @media screen and (max-width: 414px) {
    .match-select-group {
      flex-direction: column;
      align-items: center;
    }
  }
  .match-description-outer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    opacity: 0;
    transform: translate(100%, -10px);
    transition: 1.2s ease;
    .match-description {
      color: black;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
      span {
        display: block;
        margin: 15px 0 15px 0;
      }
      .section-title {
        text-align: left;
        font-size: 25px;
        color: rgb(255, 145, 249);
        margin: 35px 0 8px 0;
        line-height: normal;
      }
      .star-title-group {
        display: flex;
        justify-content: center;
        .your-star-group,
        .other-star-group {
          margin: 2px 20px 2px 20px;
          img {
            background-color: rgba(255, 255, 255, 0.7);
            width: 95px;
            padding: 8px 10px 7px 10px;
            border-radius: 10px;
            box-shadow: inset 0 0 7px 1px rgba(0, 0, 0, 0.7),
              0 0 10px 1px rgba(255, 255, 255, 0.7);
          }
        }
        .your-star-group {
          opacity: 0;
          transform: translateX(-100%);
          animation: yourAnimate 1s ease 1s forwards;
        }
        @keyframes yourAnimate {
          0% {
            opacity: 0;
            transform: translateX(-100%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .other-star-group {
          opacity: 0;
          transform: translateX(100%);
          animation: otherAnimate 1s ease 1s forwards;
        }
        @keyframes otherAnimate {
          0% {
            opacity: 0;
            transform: translateX(100%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @media screen and (max-width: 414px) {
          .your-star-group {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 10px 0 10px 0;
            .section-title {
              margin: 0 5px 0 5px;
              text-align: center;
            }
          }
          .other-star-group {
            display: flex;
            justify-content: space-around;
            flex-direction: row-reverse;
            align-items: center;
            padding: 10px 0 10px 0;
            .section-title {
              margin: 0 5px 0 5px;
              text-align: center;
            }
          }
        }
        .all-star-group-active {
          transform: translateX(0);
        }
      }
      @media screen and (max-width: 414px) {
        .star-title-group {
          flex-direction: column;
        }
      }
      .match-prograss-group {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        animation: prograssAnimate 1s ease 1.4s forwards;
        opacity: 0;
        transform: translateY(10%);
        margin-top: 25px;
        @keyframes prograssAnimate {
          0% {
            opacity: 0;
            transform: translateY(10%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        span {
          margin: 0 0 15px 0;
        }
        .match-prograss-outer {
          position: relative;
          width: 180px;
          height: 25px;
          overflow: hidden;
          border-radius: 20px;
          background-color: rgba(255, 255, 255, 0.5);
          box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.7),
            0 0 5px 1px rgba(255, 255, 255, 0.7);
          .match-prograss {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 10px 0 10px 0;
            background-color: rgb(0, 119, 255);
            overflow: hidden;
            border-radius: 20px;
            box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.7);
          }
          .match-count {
            display: block;
            position: absolute;
            top: 5%;
            left: 0;
            right: 0;
            margin: 0;
            transition: 0.7s ease;
            opacity: 0;
            color: white;
          }
          .match-count-show {
            opacity: 1;
          }
        }
      }
      .star-body-group {
        opacity: 0;
        transform: translateY(10%);
        animation: star-body 1s ease 1.6s forwards;
        span {
          text-align: center;
        }
        .match-section-explain {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          .section-title {
            width: 50%;
            position: relative;
            z-index: 1;
            text-align: center;
            font-size: 25px;
            color: rgb(255, 145, 249);
            background-color: rgb(0, 0, 0);
            margin: 35px 0 -20px 0;
            padding: 2px;
            border-radius: 20px;
            line-height: normal;
            cursor: pointer;
            user-select: none;
            box-shadow: inset 0 0 20px 2px rgba(255, 255, 255, 0.7),
              0 0 5px 1px rgba(255, 255, 255, 0.7);
            transition: 1s ease;
          }
          .section-title-active {
            color: white;
            background-color: rgb(0, 162, 230);
            box-shadow: inset 0 0 4px 1px rgba(255, 255, 255, 0.7),
              0 0 4px 2px rgba(255, 255, 255, 0.7);
          }
          .match-section-text {
            overflow: hidden;
            /deep/ span {
              text-align: justify;
              background-color: rgba(255, 255, 255, 0.7);
              padding: 25px 15px 25px 15px;
              border-radius: 20px;
              box-shadow: inset 0 0 6px 1px rgba(0, 0, 0, 0.7);
              opacity: 0;
              margin-top: -3000px;
              transition: 1s ease;
            }
            /deep/ .show-text {
              opacity: 1;
              margin-top: 0;
            }
          }
        }
      }
      @keyframes star-body {
        0% {
          opacity: 0;
          transform: translateY(10%);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }
  @media screen and (max-width: 414px) {
    .match-description-outer {
      transform: translate(100%, -135px);
    }
  }
  .match-description-outer-active {
    opacity: 1;
    transform: translate(0, -10px);
  }
  @media screen and (max-width: 414px) {
    .match-description-outer-active {
      transform: translate(0, -135px);
    }
  }
  .back-search {
    opacity: 0;
    transform: translateY(10%) scale(0.1);
    transition: 0.7s ease;
    color: white;
    background-color: rgb(0, 119, 255);
    border-radius: 20px;
    padding: 5px 30px 5px 30px;
    margin: 60px 0 40px 0;
    cursor: pointer;
    user-select: none;
    box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
  }
  .back-search-active {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  @media screen and (max-width: 414px) {
    .back-search {
      margin: 0;
      transform: translateY(-70px) scale(0.1);
    }
    .back-search-active {
      transform: translateY(-60px) scale(1);
    }
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
import matchGroup from "../assets/match.json";
import Modal from "../components/Modal.vue";
export default {
  data() {
    return {
      yourSexVal: "你",
      otherSexVal: "她",
      yourStarVal: null,
      otherStarVal: null,
      matchSelectAnimate: false,
      matchDecAnimate: false,
      matchTextOutput: "",
      matchGroup: matchGroup,
      searchAnimateSwitch: false,
      allStarGroupAnimate: false,
      starMatchTitleAnimate: false,
      sectionTitleAnimate: false,
      arrowAnimateY: false,
      arrowAnimateYS: false,
      arrowAnimateO: false,
      arrowAnimateOS: false,
      pageActive: false,
      filterMatch: [],
      count: 0,
      matchCount: 0,
      showTextAnimate: false,
      rwdMod: false,
      modalText: "",
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
    };
  },
  components: {
    Modal,
  },
  methods: {
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
    showSectionText() {
      if (this.showTextAnimate == false) {
        this.showTextAnimate = true;
        this.sectionTitleAnimate = true;
      } else {
        this.showTextAnimate = false;
        this.sectionTitleAnimate = false;
      }
    },
    matchImgTrans(selectName) {
      let matchStarImgUrl = "";
      this.starImgItem.forEach((key) =>
        key.starName == selectName ? (matchStarImgUrl = key.starImg) : null
      );
      return matchStarImgUrl;
    },
    matchStarPart() {
      this.matchCount = this.filterMatch[0].percent;
      if (this.matchCount !== 0) {
        setTimeout(
          () =>
            document
              .querySelector(".match-count")
              .classList.add("match-count-show"),
          300
        );
        setTimeout(() => {
          let timer = setInterval(() => {
            if (this.count == this.matchCount) {
              clearInterval(timer);
            } else {
              this.count++;
              document.querySelector(
                ".match-prograss"
              ).style.width = `${this.count}%`;
            }
          }, 16);
        }, 1400);
      }
    },
    matchStar() {
      if (this.yourStarVal == null || this.otherStarVal == null) {
        const modalShow = document.querySelector(".modalC");
        const modalContentShow = document.querySelector(".modalC-body");
        this.modalText = `請選擇與${this.yourSexVal}與${this.otherSexVal}的星座`;
        this.ModalController().showModal(modalShow, modalContentShow);
        return;
      }

      this.starMatchTitleAnimate = true;
      this.matchSelectAnimate = true;
      setTimeout(() => (this.matchDecAnimate = true), 1200);
      setTimeout(() => {
        this.filterMatch = matchGroup.filter(
          (key) =>
            key.nameI == this.yourStarVal && key.nameII == this.otherStarVal
        );
        this.matchStarPart();
        this.starMatchTitleAnimate = false;
        this.searchAnimateSwitch = true;
      }, 1201);
    },
    backSearch() {
      this.yourStarVal = null;
      this.yourSexVal = "你";
      this.otherStarVal = null;
      this.otherSexVal = "她";
      this.matchDecAnimate = false;
      this.starMatchTitleAnimate = true;
      this.searchAnimateSwitch = false;
      setTimeout(() => {
        this.count = 0;
        this.matchCount = 0;
        this.starMatchTitleAnimate = false;
        this.matchSelectAnimate = false;
        this.filterMatch = [];
      }, 1190);
    },
  },
  created() {
    setTimeout(() => {
      this.pageActive = true;
    }, 300);
    window.innerWidth <= 414 ? (this.rwdMod = true) : (this.rwdMod = false);
  },
};
</script>