<template>
  <div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="header">
            <div class="title-group" @click="goHome">
              <i class="fas fa-stars stars-icon"></i>
              <div class="title">占星小站</div>
            </div>
            <div class="rwd-nav-outer" v-if="rwdMod == true">
              <div class="rwd-nav" :class="{ 'rwd-nav-active': rwdModAfter }">
                <ul :class="{ 'rwd-nav-toggle': rwdNavAnimate }">
                  <li
                    v-for="(item, index) in routeArray"
                    :key="index"
                    :data-list="index"
                    @click="goPageRwd(index)"
                  >
                    {{ item.routeText }}
                  </li>
                </ul>
              </div>
              <div
                class="rwd-nav-icon"
                @click="showRwdNav"
                :class="{ 'rwd-nav-icon-active': rwdModAfter }"
              >
                <div
                  class="line-outer"
                  :class="{ 'line-outer-toggle': rwdNavAnimate }"
                >
                  <span
                    class="line"
                    :class="{ 'line-st-toggle': rwdNavAnimate }"
                  ></span>
                  <span
                    class="line"
                    :class="{ 'line-nd-toggle': rwdNavAnimate }"
                  ></span>
                  <span
                    class="line"
                    :class="{ 'line-th-toggle': rwdNavAnimate }"
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="start-title-carousel-outer"
            :class="{
              'start-title-carousel-outer-active': startAnimateSwitch,
            }"
          >
            <div class="start-title-carousel">
              {{ textStartShow }}
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-10">
              <div class="content">
                <router-view />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="footer">
                <i class="fal fa-copyright copy-icon"></i>
                <div class="footer-by">Copyright Chen</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header {
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title-group {
    color: white;
    font-size: 35px;
    display: flex;
    cursor: pointer;
    user-select: none;
    .stars-icon {
      margin: 0 3px 0 3px;
      text-shadow: 0 0 0 rgba(255, 255, 255, 0.7);
      animation: icon-light 5s ease infinite;
    }
    @keyframes icon-light {
      0% {
        text-shadow: 0 0 0 rgba(255, 255, 255, 0.7);
      }
      50% {
        text-shadow: 0 1px 20px rgba(255, 255, 255, 0.7);
      }
      100% {
        text-shadow: 0 0 0 rgba(255, 255, 255, 0.7);
      }
    }
    .title {
      margin: 0 3px 0 3px;
    }
  }
  .rwd-nav-outer {
    position: fixed;
    top: 15%;
    right: 0;
    left: 0;
    transform: translateX(50%);
    width: 250px;
    z-index: 1;
    .rwd-nav {
      position: absolute;
      top: 0;
      right: 0;
      opacity: 0;
      box-shadow: inset 0 0 4px 2px rgba(255, 255, 255, 0.7);
      background-color: rgba(0, 0, 0, 0.7);
      border-radius: 20px;
      transition: 1s ease;
      overflow: hidden;
      transform: translate3d(0, 0, 0);
      ul {
        list-style: none;
        margin-bottom: unset;
        opacity: 0;
        margin-top: -130px;
        margin-left: -151px;
        padding-left: 0;
        transition: 0.7s ease;
        li {
          color: white;
          font-size: 18px;
          padding: 15px 60px;
          cursor: pointer;
          user-select: none;
          transition: 0.7s ease;
        }
        .option-active {
          background-color: rgba(255, 255, 255, 0.3);
          box-shadow: inset 0 0 4px 1px rgba(255, 255, 255, 0.7);
        }
      }
      .rwd-nav-toggle {
        opacity: 1;
        margin-top: 0;
        margin-left: 0;
      }
    }
    .rwd-nav-active {
      opacity: 1;
    }
    .rwd-nav-icon {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 3;
      padding: 20px;
      opacity: 0;
      transform: rotate(0deg);
      box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
        0 0 2px 1px rgba(255, 255, 255, 0.7);
      border-radius: 50%;
      transition: 1s ease;
      cursor: pointer;
      user-select: none;
      .line-outer {
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%) rotate(0deg);
        transition: 0.7s ease;
        .line {
          display: block;
          width: 20px;
          height: 2px;
          transition: 0.7s ease;
          box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
            0 0 2px 1px rgba(255, 255, 255, 0.7);
          border-radius: 20px;
        }
        .line:nth-of-type(1) {
          transform: translate(-8px, -5px) rotate(0deg);
        }
        .line:nth-of-type(2) {
          transform: translate(8px, 0px);
        }
        .line:nth-of-type(3) {
          transform: translate(-8px, 5px) rotate(0deg);
        }
        .line-st-toggle {
          width: 15px;
          transform: translate(-3px, -2px) rotate(-35deg) !important;
        }
        .line-nd-toggle {
          transform: translate(0px, 0px) !important;
        }
        .line-th-toggle {
          width: 15px;
          transform: translate(-3px, 2px) rotate(35deg) !important;
        }
      }
      .line-outer-toggle {
        transform: translate(50%, -50%) rotate(-40deg);
      }
    }
    .rwd-nav-icon-active {
      opacity: 1;
      transform: rotate(360deg);
    }
  }
}
@media screen and (max-width: 414px) {
  .header {
    padding-top: 45px;
    justify-content: center;
  }
}
.start-title-carousel-outer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  opacity: 0;
  filter: blur(10px);
  transition: 1s ease;
  .start-title-carousel {
    color: white;
    font-size: 25px;
  }
  @media screen and (max-width: 414px) {
    .start-title-carousel {
      text-align: justify;
    }
  }
}
@media screen and (max-width: 414px) {
  .start-title-carousel-outer {
    min-height: 75vh;
  }
}
.start-title-carousel-outer-active {
  opacity: 1;
  filter: blur(0px);
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  padding: 0 0 20px 0;
  .copy-icon {
    margin: 0 3px 0 3px;
  }
  .footer-by {
    margin: 0 3px 0 3px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      outerAnimate: false,
      startAnimateSwitch: false,
      rwdNavAnimate: false,
      rwdMod: false,
      rwdModAfter: false,
      textStartShow: "",
      textCount: 0,
      textInArray: [
        {
          textStep: 1,
          textFlash: "是否偶爾會想著",
        },
        {
          textStep: 2,
          textFlash: "關於自己星座的",
        },
        {
          textStep: 3,
          textFlash: "運勢",
        },
        {
          textStep: 4,
          textFlash: "事業",
        },
        {
          textStep: 5,
          textFlash: "財運",
        },
        {
          textStep: 6,
          textFlash: "愛情",
        },
        {
          textStep: 7,
          textFlash: "甚至是與你喜歡的她",
        },
        {
          textStep: 8,
          textFlash: "會有什麼樣的結果",
        },
        {
          textStep: 9,
          textFlash: "或許在這裡會有些解答可以參考",
        },
        {
          textStep: 10,
          textFlash: "可點選稍後出現菜單點選你需要的內容",
        },
      ],
      routeArray: [
        {
          routeNum: 0,
          routeName: "/fortune",
          routeText: "星座運勢",
        },
        {
          routeNum: 1,
          routeName: "/match",
          routeText: "契合度",
        },
        {
          routeNum: 2,
          routeName: "/explain",
          routeText: "星座簡介",
        },
      ],
      count: 0,
      animate: null,
    };
  },
  mounted() {
    setTimeout(() => {
      this.outerAnimate = true;
      this.startAnimate();
      setTimeout(() => {
        document.querySelector(".start-title-carousel-outer").style.display =
          "none";
        this.$router.push("/nav");
      }, 44500);
    }, 500);
  },
  methods: {
    showRwdNav() {
      this.rwdNavAnimate == false
        ? (this.rwdNavAnimate = true)
        : (this.rwdNavAnimate = false);
    },
    goHome() {
      this.$router.push("/nav");
      window.location.reload();
    },
    startAnimate() {
      let timerForText = setInterval(() => {
        this.textCount++;
        this.textInArray.forEach((key) => {
          if (key.textStep == this.textCount) {
            this.textStartShow = key.textFlash;
            this.startAnimateSwitch = true;
            setTimeout(() => (this.startAnimateSwitch = false), 3000);
          }
        });
        if (this.textInArray.length == this.textCount) {
          this.textCount = 0;
          clearInterval(timerForText);
        }
      }, 4000);
    },
    goPageRwd(num) {
      document.querySelectorAll(".rwd-nav ul li").forEach((key) => {
        if (key.dataset.list == num) {
          key.classList.add("option-active");
          this.$router.push([...this.routeArray][num].routeName, () => {});
          setTimeout(() => (this.rwdNavAnimate = false), 700);
        } else {
          key.classList.remove("option-active");
        }
      });
    },
  },
};
</script>