<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="img-swiper-frame">
          <div class="img-swiper-outer">
            <div class="img-show img-1">
              <span class="banner-text">本季最新穎各項服飾、飾品、包包</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="all-product-group">
      <h2>本季新品</h2>
      <div class="new-product-group">
        <div class="row" v-if="ptNewData.length == 0">
          <div class="col-md-12">
            <span class="no-new-product-title">本季尚無新品</span>
          </div>
        </div>
        <div class="row no-gutters" v-else>
          <div class="col-md-3" v-for="(news, index) in ptNewData" :key="index">
            <div class="new-product-card">
              <img :src="news.PDImgUrlI" alt />
              <span class="new-product-title">{{ news.PDName }}</span>
              <span class="new-product-explain">{{ news.PDDesc }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="product-group">
        <div class="product-list-group">
          <div class="row justify-content-center">
            <h3>{{ ptCurrentTyep }}</h3>
          </div>
          <div class="row no-gutters">
            <div
              class="col-md-3"
              v-for="(productItem, index) in productTypeData"
              :key="index"
            >
              <div class="product-list">
                <span>{{ productItem.typeName }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="product-items">
          <div class="row no-gutters">
            <div
              v-for="(items, index) in ptCurrentData"
              :key="index"
              class="col-md-3"
            >
              <div class="items-card" @mouseenter="postCardPos(index)">
                <img :src="items.PDImgUrlI" alt />
                <span
                  class="go-product"
                  :data-content="index"
                  @click="showModal(items.PDID)"
                  >查看商品內容</span
                >
                <span class="items-title" :data-title="index">{{
                  items.PDName
                }}</span>
                <span class="items-explain" :data-explain="index">{{
                  items.PDDesc
                }}</span>
              </div>
            </div>
          </div>
          <div class="row justify-content-center" v-if="goBackBtn == true">
            <div class="col-md-2">
              <span class="go-back-items" @click="goBackToItemsList"
                >選擇其他品項</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-product">
      <div class="modal-product-body">
        <div
          class="modal-content-group"
          v-for="(item, index) in ptCurrentTarget"
          :key="index"
        >
          <div class="modal-product-header">
            <span>{{ item.PDName }}</span>
            <i
              class="fas fa-times close-icon"
              @click="closeModal((status = false))"
            ></i>
          </div>
          <div class="modal-product-content">
            <i
              class="far fa-chevron-left fa-2x arrow-left"
              v-if="currentTargetImgCount != 1"
              @click="goPrev"
            ></i>
            <i
              class="far fa-chevron-right fa-2x arrow-right"
              v-if="currentTargetImgCount != 1"
              @click="goNext"
            ></i>
            <div class="item-img-group">
              <div
                class="item-img1 imgs item-img-show"
                v-if="currentTargetImgCount >= 1"
              >
                <img :src="item.PDImgUrlI" alt />
                <div class="img-descrip img-descrip-show">
                  {{ item.PDImgDescI }}
                </div>
              </div>
              <div class="item-img2 imgs" v-if="currentTargetImgCount >= 2">
                <img :src="item.PDImgUrlII" alt />
                <div class="img-descrip">{{ item.PDImgDescII }}</div>
              </div>
              <div class="item-img3 imgs" v-if="currentTargetImgCount >= 3">
                <img :src="item.PDImgUrlIII" alt />
                <div class="img-descrip">{{ item.PDImgDescIII }}</div>
              </div>
            </div>
            <div class="choose-count-group">
              <span class="d-block my-2">剩餘數量:{{ orderProductPice }}</span>
              <label for="item-count">購買數量</label>
              <select id="item-count" v-model="orderCount">
                <option disabled :value="null">--請選擇數量--</option>
                <option :value="num" v-for="(num, index) in 10" :key="index">
                  {{ num }}
                </option>
              </select>
            </div>
            <div class="row justify-content-center">
              <div class="col-md-8">
                <div class="row no-gutters">
                  <div class="col-3">
                    <span
                      class="size-btn"
                      @click="sizeActive((size = 'XL'), (num = 0))"
                      >XL</span
                    >
                  </div>
                  <div class="col-3">
                    <span
                      class="size-btn"
                      @click="sizeActive((size = 'L'), (num = 1))"
                      >L</span
                    >
                  </div>
                  <div class="col-3">
                    <span
                      class="size-btn"
                      @click="sizeActive((size = 'M'), (num = 2))"
                      >M</span
                    >
                  </div>
                  <div class="col-3">
                    <span
                      class="size-btn"
                      @click="sizeActive((size = 'S'), (num = 3))"
                      >S</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <span class="price">價格 $ {{ item.PDOnSalePrice }}</span>
          </div>
          <div class="confirm" @click="closeModal((status = true), item.PDID)">
            加入購物車
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.img-swiper-frame {
  width: 100%;
  min-height: 400px;
  .img-swiper-outer {
    overflow: hidden;
    .img-show {
      opacity: 0;
      transition: 1s ease;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      align-items: center;
      .banner-text {
        color: white;
        font-size: 30px;
        background-color: rgba(0, 0, 0, 0.5);
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
          0 0 2px 1px rgba(0, 0, 0, 0.7);
        border-radius: 10px;
        margin-bottom: 50px;
        padding: 10px 20px 10px 20px;
      }
    }
    .img-1 {
      background-image: url("https://unsplash.com/photos/GCAnKZM21_c/download?force=true&w=1920");
      background-repeat: no-repeat;
      background-position: center center;
      min-height: 400px;
      animation: getBig1 16s linear forwards;
      opacity: 1;
    }
    .img-2 {
      background-image: url("https://unsplash.com/photos/i2jbuqO0YfM/download?force=true&w=1920");
      background-repeat: no-repeat;
      background-position: center center;
      animation: getBig2 16s linear forwards;
      min-height: 400px;
      opacity: 1;
    }
    .img-3 {
      background-image: url("https://unsplash.com/photos/-SDgOlirIaY/download?force=true&w=1920");
      background-repeat: no-repeat;
      background-position: center center;
      animation: getBig3 16s linear forwards;
      min-height: 400px;
      opacity: 1;
    }
    @keyframes getBig1 {
      0%,
      100% {
        background-size: 100%;
      }
      50% {
        background-size: 130%;
      }
    }
    @keyframes getBig2 {
      0%,
      100% {
        background-size: 100%;
      }
      50% {
        background-size: 130%;
      }
    }
    @keyframes getBig3 {
      0%,
      100% {
        background-size: 100%;
      }
      50% {
        background-size: 130%;
      }
    }
    @media screen and(max-width: 414px) {
      .img-1,
      .img-2,
      .img-3 {
        animation: none;
        background-size: cover;
      }
    }
  }
}
.all-product-group {
  background-color: rgb(30, 30, 30);
  color: white;
  h2 {
    padding: 50px 0 15px 0;
    text-align: center;
  }
  .new-product-group {
    overflow-x: scroll;
    overflow: hidden;
    .no-new-product-title {
      display: block;
      text-align: center;
      font-size: 20px;
    }
    .row {
      flex-wrap: nowrap;
      margin-bottom: 30px;
      .new-product-card {
        overflow: hidden;
        height: 300px;
        border-radius: 10px;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.7);
        margin: 0 25px 0 25px;
        img {
          width: 100%;
          height: 80%;
          border-bottom: 1px solid rgba(0, 0, 0, 0.5);
        }
        .new-product-title {
          display: block;
          text-align: center;
          margin-top: 5px;
        }
        .new-product-explain {
          display: block;
          text-align: center;
        }
      }
    }
  }
  .product-group {
    padding: 20px;
    .product-list-group {
      h3 {
        width: 30%;
        margin: 50px 0 30px 0;
        padding: 5px 0 5px 0;
        text-align: center;
        background-color: rgb(255, 0, 128);
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
          0 0 4px 0 rgba(255, 0, 0, 0.7);
        color: white;
        font-weight: bold;
        text-shadow: 0 1px 1px rgb(255, 0, 157);
        border-radius: 20px;
      }
      .col-md-3 {
        opacity: 1;
        transform: scale(1);
        transition: 1s ease;
        .product-list {
          background-color: rgb(255, 0, 128);
          box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
            0 0 4px 0 rgba(255, 0, 0, 0.7);
          color: white;
          font-weight: bold;
          font-size: 20px;
          text-shadow: 0 1px 1px rgb(255, 0, 157);
          margin: 5px;
          border-radius: 15px;
          span {
            display: block;
            text-align: center;
          }
          cursor: pointer;
          user-select: none;
        }
      }
      .hide-active {
        opacity: 0;
        transform: scale(0.1);
      }
    }
    .product-items {
      overflow: hidden;
      .col-md-3 {
        opacity: 0;
        transition: 1s ease;
        transform: translateY(50px);
        .items-card {
          height: 400px;
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.7);
          text-align: center;
          margin: 20px;
          img {
            width: 100%;
            height: 100%;
          }
          .go-product {
            display: block;
            opacity: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            padding: 5px 0 5px 0;
            width: 60%;
            transform: translate(-48%, -15%) scale(0.7);
            color: rgba(255, 255, 255, 0.7);
            background-color: rgba(0, 162, 255, 0.7);
            border-radius: 10px;
            box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
              0 0 2px 0 rgba(255, 255, 255, 0.7);
            transition: 1s ease;
            cursor: pointer;
            user-select: none;
          }
          .go-product-show {
            opacity: 1;
            transform: translate(-48%, -50%) scale(1);
          }
          .items-title {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            transform: translate(0, -100%);
            opacity: 0;
            transition: 1s ease;
            color: rgb(255, 255, 255);
            box-shadow: inset 0 0 60px 10px rgba(0, 0, 0, 0.7),
              0 0 0 0 rgba(0, 0, 0, 0.7);
          }
          .items-title-show {
            opacity: 1;
            transform: translate(0, 50%);
            box-shadow: inset 0 0 60px 10px rgba(0, 0, 0, 0.7),
              0 0px 38px 30px rgba(0, 0, 0, 0.7);
          }
          .items-explain {
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            color: rgb(255, 255, 255);
            opacity: 0;
            transition: 1s ease;
            transform: translate(0, 100%);
            box-shadow: inset 0 0 60px 10px rgba(0, 0, 0, 0.7),
              0 0 0 0 rgba(0, 0, 0, 0.7);
          }
          .items-explain-show {
            opacity: 1;
            transform: translate(0, -50%);
            box-shadow: inset 0 0 60px 10px rgba(0, 0, 0, 0.7),
              0 0px 38px 30px rgba(0, 0, 0, 0.7);
          }
        }
      }
      .items-fade-in {
        opacity: 1;
        transform: translateY(0px);
      }
      .go-back-items {
        display: block;
        text-align: center;
        padding: 5px 0 5px 0;
        background-color: rgb(0, 162, 255);
        border-radius: 10px;
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
          0 0 2px 0 rgba(255, 255, 255, 0.7);
        color: white;
        opacity: 0;
        transform: translateY(-20px);
        transition: 1s ease;
        margin: 10px 0 25px 0;
        cursor: pointer;
        user-select: none;
      }
      .go-back-items-active {
        opacity: 1;
        transform: translateY(0px);
      }
    }
  }
}

.modal-product {
  display: none;
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
  .modal-product-body {
    color: white;
    position: absolute;
    overflow: hidden;
    top: 50%;
    left: 50%;
    right: 50%;
    border: 1px solid black;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
    background: white;
    border-radius: 10px;
    min-width: 400px;
    opacity: 0;
    transform: translate(-50%, -55%);
    transition: 0.5s ease;
    background-color: rgba(0, 0, 0, 0.7);
    box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.7);
    .modal-product-header {
      display: flex;
      justify-content: space-between;
      padding: 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.7);
      span {
        font-size: 20px;
        font-weight: bold;
      }
    }
    .modal-product-content {
      position: relative;
      text-align: center;
      .arrow-left {
        position: absolute;
        top: 25%;
        left: 0;
        transform: translateX(20px);
        z-index: 1;
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
        cursor: pointer;
        user-select: none;
      }
      @media screen and (max-width: 414px) {
        .arrow-left {
          top: 20%;
        }
      }
      .arrow-right {
        position: absolute;
        top: 25%;
        right: 0;
        transform: translateX(-20px);
        z-index: 1;
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
        cursor: pointer;
        user-select: none;
      }
      @media screen and (max-width: 414px) {
        .arrow-right {
          top: 20%;
        }
      }
      img {
        width: 100%;
        height: 275px;
      }
      .item-img-group {
        overflow: hidden;
        border-bottom: 1px solid rgba(255, 255, 255, 0.7);
        .item-img1 {
          position: relative;
          overflow: hidden;
          opacity: 0;
          transition: 1s ease;
        }
        .item-img2,
        .item-img3 {
          position: absolute;
          overflow: hidden;
          opacity: 0;
          top: 0;
          transition: 1s ease;
        }
        .item-img-show {
          opacity: 1;
        }
        .img-descrip {
          position: absolute;
          bottom: 0;
          left: 50%;
          opacity: 0;
          transform: translate(-50%, 85%) scale(0.1);
          transition: 1s ease;
          color: white;
          background-color: rgba(0, 0, 0, 0.5);
          padding: 5px 10px 5px 10px;
          border-radius: 15px;
        }
        .img-descrip-show {
          transform: translate(-50%, -70%) scale(1);
          opacity: 1;
        }
      }
      .choose-count-group {
        padding: 10px 0 10px 0;
        label {
          margin-bottom: 10px;
          display: block;
        }
        select {
          outline: none;
          border-radius: 15px;
        }
      }
      .size-btn {
        display: block;
        color: white;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.7);
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.5),
          0 0 2px 0 rgba(255, 255, 255, 0.7);
        margin: 5px;
        padding: 3px 0 2px 0;
        cursor: pointer;
        user-select: none;
        transition: 0.5s ease;
      }
      @media screen and (max-width: 414px) {
        .size-btn {
          margin: 5px 10px 5px 10px;
        }
      }
      .size-btn-active {
        background-color: rgb(0, 162, 255);
        box-shadow: inset 0 0 1px 1px rgba(255, 255, 255, 0.5),
          0 0 4px 0 rgba(255, 255, 255, 0.7);
      }
      .price {
        display: block;
        margin: 5px;
        color: red;
        font-size: 25px;
        font-weight: bold;
        font-style: italic;
        padding-bottom: 10px;
      }
    }
    .close-icon {
      color: white;
      display: block;
      cursor: pointer;
      font-size: 20px;
      line-height: 1.5em;
      margin: 0 5px 0 5px;
    }
    .confirm {
      border-top: 1px solid rgba(255, 255, 255, 0.7);
      padding: 10px 0px 10px 5px;
      color: white;
      cursor: pointer;
      transition: 0.5s ease;
      text-align: center;
    }
    .confirm:hover {
      background-color: rgb(0, 162, 255);
      box-shadow: inset 0 0 4px 2px rgba(255, 255, 255, 0.7);
    }
  }

  .modal-product-body-toggle {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
.modal-product-toggle {
  opacity: 1;
}
</style>
<script>
export default {
  data() {
    return {
      count: 1,
      productNameCount: 0,
      productListCount: 0,
      productNumTemp: 0,
      cardCurrentNum: 0,
      ptLocation: [],
      ptCurrentData: [],
      ptCurrentTarget: [],
      ptNewData: [],
      ptCurrentTyep: "全部商品種類",
      goBackBtn: false,
      itemCount: 0,
      currentTargetImgCount: 0,
      hasImgArray: [],
      sizeValue: null,
      countInput: 0,
      orderCount: null,
      orderCountCheck: false,
      sizeValueCheck: false,
      orderListFinalCheck: [],
      listPass: false,
      orderProductName: "",
      orderProductImg: "",
      orderProductPice: 0,
      orderCash: 0,
      productTypeData: [
        {
          typeNum: 1,
          typeName: "套裝",
        },
        {
          typeNum: 2,
          typeName: "褲子",
        },
        {
          typeNum: 3,
          typeName: "裙裝",
        },
        {
          typeNum: 4,
          typeName: "內搭衣",
        },
        {
          typeNum: 5,
          typeName: "高跟鞋",
        },
        {
          typeNum: 6,
          typeName: "平底鞋",
        },
        {
          typeNum: 7,
          typeName: "皮鞋",
        },
        {
          typeNum: 8,
          typeName: "靴子",
        },
        {
          typeNum: 9,
          typeName: "項鍊",
        },
        {
          typeNum: 10,
          typeName: "戒指",
        },
        {
          typeNum: 11,
          typeName: "時尚錶",
        },
        {
          typeNum: 12,
          typeName: "包包",
        },
      ],
    };
  },
  mounted() {
    this.activeSwiper();
    this.productListFn();
    setTimeout(
      () =>
        (this.ptNewData = this.ptLocation.filter(
          (key) => Boolean(key.PDIsNew) == true
        )),
      300
    );
  },
  methods: {
    postCardPos(index) {
      document.querySelectorAll(".items-card").forEach((key) => {
        this.cardCurrentNum = index;
        key.addEventListener("mouseenter", this.showCardDetails);
        key.addEventListener("mouseleave", this.hideCardDetails);
      });
    },
    activeSwiper() {
      const swiperSpeed = 3000;
      const img = document.querySelector(".img-show");
      setInterval(
        () => {
          if (this.count == 3) {
            this.count = 1;
            img.classList.add(`img-${this.count}`);
            img.classList.remove("img-2");
            img.classList.remove("img-3");
          } else {
            this.count += 1;
            img.classList.add(`img-${this.count}`);
          }
        },
        window.innerWidth == 414 ? swiperSpeed : 16000
      );
    },
    productListFn() {
      document
        .querySelectorAll(".product-list-group .col-md-3")
        .forEach((key) =>
          key.setAttribute("data-plist", (this.productListCount += 1))
        );
      document.querySelectorAll(".product-list span").forEach((key) => {
        key.setAttribute("data-pname", (this.productNameCount += 1));
        key.addEventListener("click", this.productListNumPost);
      });
    },
    productListNumPost(e) {
      this.productNumTemp = Number(e.target.dataset.pname);
      document
        .querySelectorAll(".product-list-group .col-md-3")
        .forEach((key) => {
          key.classList.add("hide-active");
          setTimeout(() => (key.style.display = "none"), 1001);
          if (Number(key.dataset.plist) == this.productNumTemp) {
            this.ptCurrentData = this.ptLocation.filter(
              (key) => key.PDTypeNum == this.productNumTemp
            );
            this.ptCurrentTyep = key.textContent;
            this.goBackBtn = true;
            setTimeout(() => {
              this.productItemsShow();
              this.postCardPos();
            }, 500);
          }
        });
    },
    productItemsShow() {
      document.querySelectorAll(".product-items .col-md-3").forEach((key) => {
        key.style.display = "";
        setTimeout(() => key.classList.add("items-fade-in"), 100);
      });
      document
        .querySelector(".go-back-items")
        .classList.add("go-back-items-active");
    },
    showCardDetails() {
      [...document.querySelectorAll(".items-title")][
        this.cardCurrentNum
      ].classList.add("items-title-show");
      [...document.querySelectorAll(".items-explain")][
        this.cardCurrentNum
      ].classList.add("items-explain-show");
      [...document.querySelectorAll(".go-product")][
        this.cardCurrentNum
      ].classList.add("go-product-show");
    },
    hideCardDetails() {
      [...document.querySelectorAll(".items-title")][
        this.cardCurrentNum
      ].classList.remove("items-title-show");
      [...document.querySelectorAll(".items-explain")][
        this.cardCurrentNum
      ].classList.remove("items-explain-show");
      [...document.querySelectorAll(".go-product")][
        this.cardCurrentNum
      ].classList.remove("go-product-show");
    },
    goBackToItemsList() {
      document
        .querySelectorAll(".product-list-group .col-md-3")
        .forEach((key) => {
          key.style.display = "";
          setTimeout(() => key.classList.remove("hide-active"), 100);
        });
      document.querySelectorAll(".product-items .col-md-3").forEach((key) => {
        key.classList.remove("items-fade-in");
        document
          .querySelector(".go-back-items")
          .classList.remove("go-back-items-active");
        this.ptCurrentTyep = "全部商品種類";
        setTimeout(() => {
          this.goBackBtn = false;
          key.style.display = "none";
        }, 1001);
      });
      this.ptNewData = [];
    },
    changeItemDescripDetails() {
      document
        .querySelectorAll(".imgs")
        .forEach((key) =>
          Number(key.dataset.num) == this.itemCount
            ? key.classList.add("item-img-show")
            : key.classList.remove("item-img-show")
        );
      document
        .querySelectorAll(".img-descrip")
        .forEach((key) =>
          Number(key.dataset.descrip) == this.itemCount
            ? setTimeout(() => key.classList.add("img-descrip-show"), 1000)
            : key.classList.remove("img-descrip-show")
        );
    },
    goPrev() {
      this.itemCount == 0
        ? (this.itemCount = this.currentTargetImgCount - 1)
        : this.itemCount--;
      this.changeItemDescripDetails();
    },
    goNext() {
      this.itemCount == this.currentTargetImgCount - 1
        ? (this.itemCount = 0)
        : this.itemCount++;
      this.changeItemDescripDetails();
    },
    orderListCheck() {
      let falseCount = 0;
      this.sizeValue == null
        ? (this.sizeValueCheck = false)
        : (this.sizeValueCheck = true);
      this.orderCount == null
        ? (this.orderCountCheck = false)
        : (this.orderCountCheck = true);
      this.orderListFinalCheck.push(this.sizeValueCheck, this.orderCountCheck);
      this.orderListFinalCheck.forEach((key) =>
        key == false ? (falseCount += 1) : null
      );
      falseCount == 0 ? (this.listPass = true) : (this.listPass = false);
    },
    setItemCode() {
      let imgOrder = -1;
      let imgDescripOrder = -1;
      let sizeDataNum = -1;
      document
        .querySelectorAll(".size-btn")
        .forEach((key) => key.setAttribute("data-num", (sizeDataNum += 1)));
      document
        .querySelectorAll(".imgs")
        .forEach((key) => key.setAttribute("data-num", (imgOrder += 1)));
      document
        .querySelectorAll(".img-descrip")
        .forEach((key) =>
          key.setAttribute("data-descrip", (imgDescripOrder += 1))
        );
    },
    showModal(index) {
      const modalShow = document.querySelector(".modal-product");
      const modalContentShow = document.querySelector(".modal-product-body");
      setTimeout(() => this.setItemCode(), 500);
      this.ptCurrentTarget = this.ptLocation.filter((key) => key.PDID == index);
      this.ptCurrentTarget.forEach((key) => {
        this.orderProductName = key.PDName;
        this.orderProductImg = key.PDImgUrlI;
        this.orderProductPice = key.PDPice;
        this.orderCash = key.PDOnSalePrice;
        this.hasImgArray.push(key.PDImgUrlI);
        this.hasImgArray.push(key.PDImgUrlII);
        this.hasImgArray.push(key.PDImgUrlIII);
      });
      this.hasImgArray.forEach((key) =>
        key != null ? this.currentTargetImgCount++ : null
      );
      modalShow.style.display = "block";
      modalShow.style.transition = "1s ease";
      setTimeout(() => {
        modalShow.classList.add("modal-product-toggle");
        modalContentShow.classList.add("modal-product-body-toggle");
      }, 100);
    },
    closeModalPart(modalShow, modalContentShow) {
      modalShow.classList.remove("modal-product-toggle");
      modalContentShow.classList.remove("modal-product-body-toggle");
      setTimeout(() => (modalShow.style.display = ""), 750);
    },
    closeModal(status, index) {
      const modalShow = document.querySelector(".modal-product");
      const modalContentShow = document.querySelector(".modal-product-body");
      if (status == false) {
        this.orderCount = null;
        this.sizeValue = null;
        setTimeout(() => {
          this.currentTargetImgCount = 0;
          this.hasImgArray = [];
        }, 850);
        document
          .querySelectorAll(".size-btn")
          .forEach((key) => key.classList.remove("size-btn-active"));
        this.closeModalPart(modalShow, modalContentShow);
      } else {
        this.checkOrderPart(index, modalShow, modalContentShow);
      }
    },
    patchProductTotalPice(index, modalShow, modalContentShow) {
      this.ptLocation.forEach((key) => {
        if (key.PDID == index) {
          this.axios
            .post("http://127.0.0.1:8088/shop/product/patch_total_pice", {
              id: index,
              productPice: key.PDPice - this.orderCount,
            })
            .then((res) => {
              if (res.status == 200) {
                this.orderCount = null;
                this.orderListFinalCheck = [];
                this.closeModalPart(modalShow, modalContentShow);
                this.getProduct();
                this.$parent.getOrderList();
              }
            })
            .catch((err) => console.log(err));
        }
      });
    },
    checkOrderPart(index, modalShow, modalContentShow) {
      this.orderListCheck();
      if (this.listPass == false) {
        this.orderListFinalCheck = [];
        return;
      } else {
        if (this.$parent.isLoginItem.length == 0) {
          alert("請先登入");
          this.$router.push("/main/login");
          return;
        }
        this.axios
          .post("http://127.0.0.1:8088/shop/order_list/create", {
            orderAccount: this.$parent.isLoginItem[0].Account,
            orderProductID: index,
            orderCount: this.orderCount,
            orderProductSize: this.sizeValue,
          })
          .then((res) => {
            if (res.status == 200) {
              this.patchProductTotalPice(index, modalShow, modalContentShow);
            }
          })
          .catch((err) => console.log(err));
      }
    },
    sizeActive(size, num) {
      this.sizeValue = size;
      document
        .querySelectorAll(".size-btn")
        .forEach((key) =>
          Number(key.dataset.num) == num
            ? key.classList.add("size-btn-active")
            : key.classList.remove("size-btn-active")
        );
    },
    getProduct() {
      this.axios
        .get("http://127.0.0.1:8088/shop/product/")
        .then((res) => (this.ptLocation = res.data))
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.getProduct();
  },
};
</script>