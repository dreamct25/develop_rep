<template>
  <div class="page-outer">
    <div class="header">
      <div class="row no-gutters">
        <div class="col-md-2">
          <div class="shop-icon">
            <i class="fab fa-pied-piper-hat"></i>
            <br />Fashion
          </div>
        </div>
        <div class="col-md-10">
          <div class="bar-right">
            <div
              v-if="rwdMod == true"
              class="rwd-list"
              @click="
                rwdSideBarState == false
                  ? (rwdSideBarState = true)
                  : (rwdSideBarState = false)
              "
            >
              <span
                class="line"
                :class="{ 'line-trans-first': rwdSideBarState }"
              ></span>
              <span
                class="line"
                :class="{ 'line-trans-middle': rwdSideBarState }"
              ></span>
              <span
                class="line"
                :class="{ 'line-trans-end': rwdSideBarState }"
              ></span>
            </div>
            <div class="login-off" @click="loginOff">登出</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="rwdMod == false" class="content">
      <div class="row no-gutters">
        <div class="col-md-2">
          <div class="aside">
            <ul>
              <li
                v-for="(item, index) in routeItem"
                :key="index"
                @click="goRoute(item.routerNum)"
              >
                <span class="route-text">
                  <i :class="item.routerIcon"></i>{{ item.routerName }}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-10">
          <div class="main">
            <div class="main-icon" v-if="changed == false">
              <i class="fab fa-pied-piper-hat"></i>
            </div>
            <div class="main-changed" v-else>
              <router-view></router-view>
            </div>
            <div class="footer">
              <h6>Copyright by Chen</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="rwdMod == true" class="content-rwd">
      <div class="aside-rwd" :class="{ 'aside-rwd-active': rwdSideBarState }">
        <ul>
          <li
            v-for="(item, index) in routeItem"
            :key="index"
            @click="goRoute(item.routerNum)"
          >
            <span class="route-text">
              <i :class="item.routerIcon"></i>{{ item.routerName }}
            </span>
          </li>
        </ul>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="main-rwd">
            <div class="main-icon" v-if="changed == false">
              <i class="fab fa-pied-piper-hat"></i>
            </div>
            <div class="main-changed" v-else>
              <router-view></router-view>
            </div>
            <div class="footer">
              <h6>Copyright by Chen</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AlertModal :inner="modalText" />
  </div>
</template>
<style lang="scss" scoped>
.page-outer {
  background-image: url("https://unsplash.com/photos/DB1FvoJW0L4/download?force=true&w=1920");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  .header {
    background-color: rgba(0, 0, 0, 0.7);
    .shop-icon {
      color: white;
      font-size: 20px;
      text-align: center;
      box-shadow: inset 1px 1px 3px 2px rgba(255, 255, 255, 0.7);
      padding: 5px 0 5px 0;
    }
    .rwd-list {
      display: block;
      transform: translate(10px, 5px);
      .line {
        display: block;
        height: 2px;
        width: 25px;
        background-color: white;
        margin: 4px;
        transition: 0.5s ease;
      }
      .line-trans-first {
        transform: rotate(29deg);
      }
      .line-trans-middle {
        opacity: 0;
        transform: scale(0.5);
      }
      .line-trans-end {
        transform: rotate(-29deg);
      }
    }
    .bar-right {
      display: flex;
      justify-content: flex-end;
      padding: 19px 19px 20px 0;
      box-shadow: inset -1px 1px 3px 2px rgba(255, 255, 255, 0.7);
      .login-off {
        color: white;
        background-color: rgb(4, 142, 255);
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
        padding: 2px 20px 2px 20px;
        border-radius: 10px;
        font-size: 18px;
        cursor: pointer;
        user-select: none;
      }
    }
    @media screen and(max-width: 768px) {
      .bar-right {
        justify-content: space-between;
      }
    }
  }
  .content {
    min-height: 100vh;
    .aside {
      ul {
        list-style: none;
        padding-left: 0;
        background-color: rgba(0, 0, 0, 0.7);
        box-shadow: inset 1px -1px 3px 2px rgba(255, 255, 255, 0.7);
        min-height: 100vh;
        text-align: center;
        padding: 30px 0 0 0;
        margin: 0;
        li {
          font-size: 20px;
          margin-bottom: 25px;
          color: white;
          .route-text {
            cursor: pointer;
            user-select: none;
            font-weight: bold;
            text-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);
            transition: 0.5s ease;
          }
          .route-active {
            color: #ff00c8 !important;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
          }
        }
      }
    }
    .main {
      background-color: rgba(0, 0, 0, 0.7);
      box-shadow: inset -1px 0 3px 2px rgba(255, 255, 255, 0.7);
      min-height: 100vh;
      .main-icon {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        color: rgba(255, 255, 255, 0.8);
        font-size: 500px;
        min-height: 94vh;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      }
      .main-changed {
        min-height: 94vh;
      }
      .footer {
        text-align: center;
        padding: 14px 0 14px 0;
        box-shadow: inset -1px 0 3px 2px rgba(255, 255, 255, 0.7);
        h6 {
          color: white;
          margin-bottom: 0;
        }
      }
    }
  }
  .content-rwd {
    overflow: hidden;
    position: relative;
    min-height: 85vh;
    background-color: rgba(0, 0, 0, 0.7);
    box-shadow: inset -1px 0 3px 2px rgba(255, 255, 255, 0.7);
    .aside-rwd {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 1;
      opacity: 0;
      transform: translateX(-200px);
      transition: 0.5s ease;
      ul {
        list-style: none;
        padding-left: 0;
        background-color: rgba(0, 0, 0, 0.7);
        box-shadow: inset 0 -1px 10px 1px rgba(255, 255, 255, 0.3);
        min-height: 100vh;
        text-align: center;
        padding: 160px 30px 0 30px;
        li {
          font-size: 20px;
          margin-bottom: 25px;
          color: white;
          .route-text {
            cursor: pointer;
            user-select: none;
            font-weight: bold;
            text-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);
            transition: 0.5s ease;
          }
          .route-active {
            color: #ff00c8 !important;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
          }
        }
      }
    }
    .aside-rwd-active {
      opacity: 1;
      transform: translateX(-5px);
    }
    .main-rwd {
      .main-icon {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        color: rgba(255, 255, 255, 0.8);
        font-size: 200px;
        min-height: 80vh;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      }
      .main-changed {
        min-height: 80vh;
      }
      .footer {
        text-align: center;
        padding: 14px 0 14px 0;
        box-shadow: inset 0 0 3px 2px rgba(255, 255, 255, 0.7);
        h6 {
          color: white;
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
<script>
import AlertModal from "../components/AlertModal";
export default {
  data() {
    return {
      masterAccount: [],
      masterName: "",
      masterId: null,
      targetName: "",
      changed: false,
      rwdSideBarState: false,
      rwdMod: false,
      modalText: "",
      routeItem: [
        {
          routerNum: 0,
          router: "/dashboard/addproduct",
          routerIcon: "fas fa-sort-size-up-alt mx-2",
          routerName: "管理產品",
        },
        {
          routerNum: 1,
          router: "/dashboard/onproduct",
          routerIcon: "far fa-inbox-out mx-2",
          routerName: "上架產品",
        },
        {
          routerNum: 2,
          router: "/dashboard/offproduct",
          routerIcon: "far fa-inbox-in mx-2",
          routerName: "下架產品",
        },
        {
          routerNum: 3,
          router: "/dashboard/coupon",
          routerIcon: "fas fa-ticket-alt mx-2",
          routerName: "優惠券",
        },
        {
          routerNum: 4,
          router: "/dashboard/orderlist",
          routerIcon: "fal fa-clipboard-list mx-2",
          routerName: "訂單總覽",
        },
      ],
    };
  },
  components: {
    AlertModal,
  },
  methods: {
    goRoute(num) {
      this.changed = true;
      this.routeItem.forEach((key) => {
        if (key.routerNum == num) {
          this.$router.push(`${key.router}`, () => {});
          [...document.querySelectorAll(".route-text")][
            key.routerNum
          ].classList.add("route-active");
          setTimeout(() => (this.rwdSideBarState = false), 501);
        } else {
          [...document.querySelectorAll(".route-text")][
            key.routerNum
          ].classList.remove("route-active");
        }
      });
    },
    loginOff() {
      this.$router.push("/dashboard");
      this.targetName = "";
      this.changed = false;
      setTimeout(() => this.showModal(), 50);
    },
    getMasterName() {
      this.axios
        .get("http://127.0.0.1:8088/shop/Account/")
        .then(
          (res) =>
            (this.masterAccount = res.data.filter(
              (key) => Boolean(key.Power) == true
            ))
        )
        .catch((err) => console.log(err));
      this.masterAccount.forEach((key) => {
        this.masterName = key.Name;
        this.masterId = key.id;
      });
    },
    showModal() {
      const modalShow = document.querySelector(".modalC");
      const modalContentShow = document.querySelector(".modalC-body");
      let countNum = 3;
      this.getMasterName();
      this.modalText = `
      本日辛苦您了 ${this.masterName}
      <br>
      畫面將在 ${countNum--} 秒後跳轉回首頁`;
      modalShow.style.display = "block";
      modalShow.style.transition = "1s ease";
      let count = setInterval(() => {
        if (countNum == -1) {
          clearInterval(count);
          this.closeModal(modalShow, modalContentShow);
          setTimeout(() => {
            this.axios
              .post("http://127.0.0.1:8088/shop/Account/login_off", {
                id: this.masterId,
              })
              .then((res) => {
                if (res.status == 200) this.$router.push("/");
              });
          }, 1000);
        } else {
          this.modalText = `
          本日辛苦您了 ${this.masterName}
          <br>
          畫面將在 ${countNum--} 秒後跳轉回首頁`;
        }
      }, 1000);
      setTimeout(() => {
        modalShow.classList.add("modalC-toggle");
        modalContentShow.classList.add("modalC-body-toggle");
      }, 100);
    },
    closeModal(modalShow, modalContentShow) {
      modalShow.classList.remove("modalC-toggle");
      modalContentShow.classList.remove("modalC-body-toggle");
      setTimeout(() => (modalShow.style.display = ""), 750);
    },
  },
  created() {
    this.getMasterName();
    window.innerWidth <= 414 ? (this.rwdMod = true) : (this.rwdMod = false);
  },
};
</script>