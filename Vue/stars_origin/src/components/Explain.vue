<template>
  <div class="page-outer" :class="{ 'page-outer-active': pageActive }">
    <div
      class="star-explain-self-title"
      :class="{ 'star-explain-self-title-hide': starTitleAnimate }"
    >
      星座簡介
    </div>
    <div
      class="star-select-group"
      :class="{ 'star-select-group-hide': searchBarAnimate }"
    >
      <select
        class="select"
        v-model="selectVal"
        @focus="arrowAnimate = true"
        @blur="arrowAnimate = false"
      >
        <option :value="null" selected disabled>-- 請選擇星座 --</option>
        <option
          v-for="(item, index) in starImgItem"
          :key="index"
          :value="item.starName"
        >
          {{ item.starName }}
        </option>
      </select>
      <i
        class="far fa-chevron-up arrow"
        :class="{ 'arrow-toggle': arrowAnimate }"
      ></i>
      <div class="search-btn" @click="searchStar">查詢</div>
    </div>
    <div
      class="star-explain-details"
      v-for="(item, index) in itemsForSearch"
      :key="index"
    >
      <div class="star-details-outer">
        <div class="star-details-header">
          <img :src="imgTransCenter(item.starNameZh)" />
          <div class="star-details-text">
            <span>{{ item.starNameZh }}</span>
            <span>{{ item.starNameEn }}</span>
            <span>{{ item.starBirth }}</span>
          </div>
        </div>
        <div class="star-details-content">
          <span>{{ item.starType }}</span>
          <span>守護星：{{ item.starGuard }}</span>
          <span>黃道十二宮：{{ item.starPose }}</span>
          <span>宮位代表：{{ item.starPoseRep }}</span>
          <span>宮位解釋：{{ item.starPoseDec }}</span>
          <div class="section-outer">
            <span
              class="section-title"
              data-title="0"
              @click="showSectionExplain"
              >生活</span
            >
            <div class="section-explain">
              <span v-html="item.starLife" data-explain="0"></span>
            </div>
            <span
              class="section-title"
              data-title="1"
              @click="showSectionExplain"
              >交友</span
            >
            <div class="section-explain">
              <span v-html="item.starFriend" data-explain="1"></span>
            </div>
            <span
              class="section-title"
              data-title="2"
              @click="showSectionExplain"
              >愛情</span
            >
            <div class="section-explain">
              <span v-html="item.starLove" data-explain="2"></span>
            </div>
            <span
              class="section-title"
              data-title="3"
              @click="showSectionExplain"
              >婚姻</span
            >
            <div class="section-explain">
              <span v-html="item.starMarry" data-explain="3"></span>
            </div>
            <span
              class="section-title"
              data-title="4"
              @click="showSectionExplain"
              >建議</span
            >
            <div class="section-explain">
              <span v-html="item.starAdvice" data-explain="4"></span>
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
  .star-explain-self-title {
    font-size: 35px;
    color: white;
    opacity: 1;
    transform: translateY(15px);
    transition: 1s ease;
  }
  .star-explain-self-title-hide {
    opacity: 0;
    transform: translateY(0);
  }
  .star-select-group {
    display: flex;
    justify-content: center;
    width: 100%;
    transform: translate(0, 60px);
    opacity: 1;
    transition: 1.2s ease;
    .select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0 5px 0 5px;
      padding: 0 35px 0 20px;
      border-radius: 20px;
      outline: none;
      border: none;
      background-color: white;
      box-shadow: inset 0 0 0 0 rgba(0, 89, 255, 0.7),
        0 0 2px 1px rgba(0, 0, 0, 0.7);
      transition: 0.7s ease;
    }
    .select:focus {
      box-shadow: inset 0 0 2px 1px rgba(0, 89, 255, 0.7) 0 0 2px 1px,
        rgba(0, 0, 0, 0.7);
    }
    .arrow {
      position: absolute;
      top: 0;
      transform: translate(3px, 6px) rotate(0deg);
      transition: 0.7s ease;
    }
    .arrow-toggle {
      transform: translate(3px, 6px) rotate(-180deg);
    }
    .search-btn {
      color: white;
      background-color: rgb(0, 119, 255);
      padding: 3px 40px 3px 40px;
      border-radius: 20px;
      margin: 0 5px 0 5px;
      box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
      cursor: pointer;
      user-select: none;
    }
  }
  .star-select-group-hide {
    opacity: 0;
    transform: translate(-100%, 60px);
  }
  .star-explain-details {
    .star-details-outer {
      opacity: 0;
      transform: translateX(100%);
      transition: 1.2s ease;
      .star-details-header {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          margin: 0 25px 0 25px;
          background-color: rgba(255, 255, 255, 0.7);
          width: 95px;
          padding: 8px 10px 7px 10px;
          border-radius: 10px;
          box-shadow: inset 0 0 7px 1px rgba(0, 0, 0, 0.7),
            0 0 10px 1px rgba(255, 255, 255, 0.7);
        }
        .star-details-text {
          margin: 0 25px 0 25px;
          span {
            color: white;
            display: block;
            line-height: 1.5em;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
          }
          span:nth-of-type(1) {
            font-size: 25px;
          }
          span:nth-of-type(2) {
            font-size: 25px;
            margin-bottom: 8px;
          }
          span:nth-of-type(3) {
            font-size: 20px;
          }
        }
      }
      .star-details-content {
        span {
          color: white;
          display: block;
          line-height: 2.2em;
          font-size: 20px;
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
        }
        span:nth-of-type(5) {
          text-align: justify;
        }
        .section-outer {
          display: flex;
          flex-direction: column;
          justify-content: center;
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

          .section-explain {
            overflow: hidden;
            span {
              color: black;
              background-color: rgba(255, 255, 255, 0.7);
              padding: 25px 15px 5px 15px;
              border-radius: 20px;
              box-shadow: inset 0 0 6px 1px rgba(0, 0, 0, 0.7);
              margin-top: -2000px;
              text-align: justify;
              font-size: 16px;
              opacity: 0;
              transition: 1s ease;
            }
            .show-explain {
              opacity: 1;
              margin-top: 0;
            }
          }
        }
      }
    }
  }
  .star-details-outer-active {
    opacity: 1 !important;
    transform: translateX(0) !important;
  }
  .back-search {
    margin: 60px 0 40px 0;
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
import starExplain from "../assets/star-explain.json";
import Modal from "../components/Modal.vue";
export default {
  data() {
    return {
      searchBarAnimate: false,
      itemsForSearch: [],
      selectVal: null,
      arrowAnimate: false,
      starExplain: starExplain,
      chooseTemp: null,
      pageActive: false,
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
      searchAnimateSwitch: false,
      collspanAnimate: false,
      starTitleAnimate: false,
    };
  },
  components: {
    Modal,
  },
  methods: {
    showSectionExplain(num) {
      document.querySelectorAll(".section-explain span").forEach((key) => {
        key.dataset.explain == num.target.dataset.title
          ? key.classList.add("show-explain")
          : key.classList.remove("show-explain");
      });

      document.querySelectorAll(".section-title").forEach((key) => {
        key.dataset.title == num.target.dataset.title
          ? key.classList.add("section-title-active")
          : key.classList.remove("section-title-active");
      });

      if (this.chooseTemp == num.target.dataset.title) {
        [...document.querySelectorAll(".section-explain span")][
          num.target.dataset.title
        ].classList.remove("show-explain");
        [...document.querySelectorAll(".section-title")][
          num.target.dataset.title
        ].classList.remove("section-title-active");
      } else {
        this.chooseTemp = num.target.dataset.title;
      }
    },
    imgTransCenter(postStarName) {
      let matchImg = "";
      this.starImgItem.forEach((key) =>
        key.starName == postStarName ? (matchImg = key.starImg) : null
      );
      return matchImg;
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
    searchStar() {
      if (this.selectVal == null) {
        this.modalText = "請選擇您的星座後再點擊查詢";
        const modalShow = document.querySelector(".modalC");
        const modalContentShow = document.querySelector(".modalC-body");
        this.ModalController().showModal(modalShow, modalContentShow);
        return;
      }
      this.starTitleAnimate = true;
      this.searchBarAnimate = true;
      setTimeout(() => {
        this.itemsForSearch = [];
        this.itemsForSearch = this.starExplain.filter(
          (key) => key.starNameZh == this.selectVal
        );
      }, 1190);
      setTimeout(() => {
        this.starTitleAnimate = false;
        document
          .querySelector(".star-details-outer")
          .classList.add("star-details-outer-active");
        this.searchAnimateSwitch = true;
      }, 1240);
    },
    backSearch() {
      this.starTitleAnimate = true;
      this.selectVal = null;
      document
        .querySelector(".star-details-outer")
        .classList.remove("star-details-outer-active");
      this.searchAnimateSwitch = false;
      setTimeout(() => {
        this.starTitleAnimate = false;
        this.searchBarAnimate = false;
        this.itemsForSearch = [];
      }, 1190);
    },
  },
  created() {
    setTimeout(() => (this.pageActive = true), 300);
  },
};
</script>