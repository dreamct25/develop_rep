<template>
  <div>
    <div class="all-page-outer">
      <div class="header">
        <div class="row">
          <div class="col-md-9">
            <router-link to="/main/mainpage">
              <h1 class="title">Fashion</h1>
            </router-link>
          </div>
          <div v-if="rwdMod == false" class="col-md-3">
            <div class="login-part">
              <div
                class="row no-gutters justify-content-end align-items-center"
              >
                <div class="col-md-3" v-if="loginStatus == 0">
                  <a href="#" class="d-block text-right" @click.prevent="login"
                    >登入</a
                  >
                </div>
                <div class="col-md-3" v-if="loginStatus == 0">
                  <router-link to="/main/register" class="d-block text-right"
                    >註冊</router-link
                  >
                </div>
                <div class="col-md-3" v-if="loginStatus == 1">
                  <a
                    href="#"
                    class="d-block text-right"
                    @click.prevent="loginOff"
                    >登出</a
                  >
                </div>
                <div class="col-md-3" v-if="loginStatus == 1">
                  <div class="cart-outer">
                    <i
                      class="fas fa-cart-plus cart-icon text-right"
                      @click="switchCart"
                    ></i>
                    <i class="fas fa-share arrow-top"></i>
                    <div class="cart-list">
                      <span class="cart-title">已選購的商品</span>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col" width="1%"></th>
                            <th scope="col">商品名稱</th>
                            <th scope="col" width="20%">尺寸</th>
                            <th scope="col" width="20%">數量</th>
                            <th scope="col" width="20%">價格</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(orderItems, index) in otLocation"
                            :key="index"
                          >
                            <td>
                              <i
                                class="fal fa-trash-alt delete-items"
                                @click="showModal(orderItems.orderID)"
                              ></i>
                            </td>
                            <td>{{ orderItems.orderProductName }}</td>
                            <td>{{ orderItems.orderProductSize }}</td>
                            <td>{{ orderItems.orderCount }}</td>
                            <td>{{ orderItems.orderAllCash }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <router-link
                        to="/checkout"
                        v-if="otLocation.length !== 0"
                      >
                        <span class="go-checkout">結帳</span>
                      </router-link>
                      <span v-else class="cart-message"
                        >- - 您目前無任何選購的商品 - -</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="rwdMod == true" class="nav-rwd-icon" @click="showNavRwdList">
        <span class="line" :class="{ 'line-trans-first': showRwdList }"></span>
        <span class="line" :class="{ 'line-trans-middle': showRwdList }"></span>
        <span class="line" :class="{ 'line-trans-end': showRwdList }"></span>
      </div>
      <div v-if="rwdMod == false" class="navs">
        <ul>
          <li>
            <router-link to="/main/mainpage">首頁</router-link>
          </li>
          <li>
            <router-link to="/main/product">商品</router-link>
          </li>
          <li>關於我們</li>
        </ul>
      </div>
      <div
        v-if="rwdMod == true"
        class="nav-rwd-list"
        :class="{ 'nav-rwd-list-active': showRwdList }"
      >
        <ul>
          <li>
            <router-link to="/main/mainpage">首頁</router-link>
          </li>
          <li>
            <router-link to="/main/product">產品資料</router-link>
          </li>
          <li>關於我們</li>
        </ul>
        <div class="login-part">
          <ul>
            <li>
              <a href="#" v-if="loginStatus == 0" @click.prevent="login"
                >登入</a
              >
            </li>
            <li>
              <router-link to="/main/register" v-if="loginStatus == 0"
                >註冊</router-link
              >
            </li>
            <li>
              <a href="#" v-if="loginStatus == 1" @click.prevent="loginOff"
                >登出</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
      <div class="support-details">
        <div class="row">
          <div class="col-md-4">
            <div class="bottom-navI">
              <span>瀏覽</span>
              <ul>
                <li>首頁</li>
                <li>各類產品</li>
                <li>關於我們</li>
              </ul>
            </div>
          </div>
          <div class="col-md-4">
            <div class="bottom-navII">
              <span>購物問題</span>
              <ul>
                <li>如何購買？</li>
                <li>付款方式？</li>
                <li>如何退貨？</li>
                <li>取貨方式？</li>
              </ul>
            </div>
          </div>
          <div class="col-md-4">
            <span class="pay-icon-title">支援付款方式</span>
            <div class="pay-icon">
              <i class="fab fa-cc-visa fa-3x"></i>
              <i class="fab fa-cc-paypal fa-3x"></i>
              <i class="fab fa-cc-mastercard fa-3x"></i>
              <i class="fab fa-cc-jcb fa-3x"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <h6>copy Copyright Chen</h6>
      </div>
    </div>
    <DeleteModal
      :obj="modalObj"
      v-on:cancle="closeDeleteModal"
      v-on:confirm="deleteOrderList"
    />
    <AlertModal :inner="alertModalText" />
  </div>
</template>
<style lang="scss" scoped>
.all-page-outer {
  font-family: 微軟正黑體;
  position: relative;
  overflow: hidden;
  .header {
    position: fixed;
    top: 2%;
    left: 4%;
    right: 4%;
    z-index: 2;
    color: white;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
    @media screen and(max-width: 414px) {
      .title {
        text-align: center;
      }
    }
    .login-part {
      span {
        display: block;
      }
    }
    .cart-outer {
      position: relative;
      z-index: 3;
      .cart-icon {
        display: block;
        cursor: pointer;
        user-select: none;
      }
      .arrow-top {
        display: none;
        position: absolute;
        top: -15%;
        left: auto;
        right: 0;
        transform: translate(-100%, 20%);
        z-index: 3;
        color: rgba(255, 255, 255, 0.7);
        text-shadow: 0 0 2px rgba(255, 255, 255, 0.7);
        font-size: 20px;
        opacity: 0;
        transition: 0.7s ease;
      }
      .cart-list {
        display: none;
        position: absolute;
        top: 100%;
        left: auto;
        right: 0;
        min-width: 350px;
        padding: 5px 10px 5px 10px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.7);
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
          0 0 2px 1px rgba(0, 0, 0, 0.7);
        z-index: 3;
        opacity: 0;
        transform: translate(2%, 10%);
        transition: 0.7s ease;
        .cart-title {
          text-align: left;
          font-size: 20px;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .table {
          margin-bottom: 0;
          color: white;
          th {
            padding: 5px;
            text-align: center;
          }
          td {
            text-align: center;
            padding: 5px;
            .delete-items {
              color: red;
              cursor: pointer;
              user-select: none;
            }
          }
        }
        .go-checkout {
          display: block;
          text-align: center;
          text-shadow: unset;
          color: white;
          font-size: 20px;
          font-weight: unset;
          border-radius: 15px;
          margin: 10px 0 10px 0;
          box-shadow: inset 0 0 3px 2px rgba(255, 255, 255, 0.7),
            0 0 1px 0 rgba(255, 255, 255, 0.7);
          padding: 2px 0 2px 0;
          transition: 0.5s ease;
        }
        .go-checkout:hover {
          background-color: rgb(0, 162, 255);
        }
        .cart-message {
          display: block;
          text-align: center;
          padding: 10px 0 10px 0;
        }
      }
      .cart-show {
        opacity: 1;
      }
    }
  }
  .nav-rwd-icon {
    position: fixed;
    top: 3%;
    left: 0;
    right: 88%;
    bottom: 93%;
    transform: translate(20%, 0%);
    z-index: 21;
    display: block;
    .line {
      display: block;
      height: 3px;
      width: 25px;
      background-color: white;
      margin: 2px 0 2px 0;
      transition: 0.7s ease;
    }
    .line:nth-of-type(1) {
      transform: translate(10px, 4px);
    }
    .line:nth-of-type(2) {
      transform: translate(10px, 5px);
    }
    .line:nth-of-type(3) {
      transform: translate(10px, 6px);
    }
    .line-trans-first {
      transform: translate(10px, 10px) rotate(135deg) !important;
    }
    .line-trans-middle {
      opacity: 0;
    }
    .line-trans-end {
      transform: translate(10px, 0px) rotate(-135deg) !important;
    }
  }
  .navs {
    position: fixed;
    top: 10%;
    left: 0;
    right: 0;
    z-index: 1;
    color: white;
    text-shadow: 0 2px 1px rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    ul {
      list-style: none;
      display: flex;
      justify-content: space-between;
      padding-left: 0px;
      width: 33%;
      margin-bottom: 0;
      li {
        text-align: center;
      }
    }
  }
  .nav-rwd-list {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 20;
    background: linear-gradient(
      0deg,
      rgba(90, 90, 90, 0.7),
      rgb(60, 60, 60),
      rgb(30, 30, 30)
    );
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.7);
    color: white;
    padding: 80px 115px 0 20px;
    opacity: 0;
    transform: translateX(-220px);
    transition: 0.7s ease;
    ul {
      list-style: none;
      padding-left: 0;
      li {
        margin-bottom: 20px;
      }
    }
    .login-part {
      ul {
        display: flex;
        list-style: none;
      }
      li {
        padding-right: 10px;
      }
    }
  }
  .nav-rwd-list-active {
    opacity: 1;
    transform: translateX(0px);
  }
  .support-details {
    padding: 20px;
    color: white;
    background-color: rgb(100, 100, 100);
    .bottom-navI,
    .bottom-navII {
      text-align: center;
      ul {
        list-style: none;
        padding-left: 0;
        li {
          margin: 3px 0 10px 0;
        }
      }
    }
    .pay-icon-title {
      display: block;
      text-align: center;
      margin-top: 30px;
    }
    .pay-icon {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
  }
  .footer {
    padding: 15px 0 10px 0;
    background-color: rgb(50, 50, 50);
    box-shadow: inset 0 1px 5px 1px rgba(255, 255, 255, 0.7);
    h6 {
      text-align: center;
      color: white;
    }
  }
}
</style>
<script>
import AlertModal from "../components/AlertModal.vue";
import DeleteModal from "../components/DeleteModal.vue";
export default {
  data() {
    return {
      powerHave: false,
      isLoginItem: [],
      isLoginAccount: "",
      loginStatus: 0,
      otLocation: [],
      ptLocation: [],
      clickCount: 0,
      navListCount: 0,
      deleteIndex: null,
      alertModalText: "",
      modalObj: { modalTitle: "", modalContent: "" },
      rwdMod: false,
      showRwdList: false,
    };
  },
  components: {
    DeleteModal,
    AlertModal,
  },
  methods: {
    login() {
      this.$router.push("/main/login");
    },
    loginOff() {
      this.axios
        .post("http://127.0.0.1:8088/shop/account/login_off", {
          id: this.isLoginItem[0].id,
        })
        .then((res) => {
          if (res.status == 200) this.showAlertModal();
        });
    },
    goMainPage() {
      this.$router.push("/main/mainpage", () => {});
    },
    showNavRwdList() {
      this.showRwdList == false
        ? (this.showRwdList = true)
        : (this.showRwdList = false);
    },
    switchCart() {
      const cartList = document.querySelector(".cart-list");
      const cartArrow = document.querySelector(".arrow-top");
      this.clickCount += 1;
      if (this.clickCount == 1) {
        cartList.style.display = "block";
        cartArrow.style.display = "block";
        this.getOrderList();
        setTimeout(() => {
          cartList.classList.add("cart-show");
          cartArrow.classList.add("cart-show");
        }, 100);
      } else {
        this.clickCount = 0;
        cartList.classList.remove("cart-show");
        cartArrow.classList.remove("cart-show");
        setTimeout(() => {
          cartList.style.display = "";
          cartArrow.style.display = "";
          this.getOrderList();
        }, 700);
      }
    },
    showAlertModal() {
      let count = 3;
      const modalShow = document.querySelector(".modalC");
      const modalContentShow = document.querySelector(".modalC-body");
      modalShow.style.display = "block";
      modalShow.style.transition = "1s ease";
      setTimeout(() => {
        modalShow.classList.add("modalC-toggle");
        modalContentShow.classList.add("modalC-body-toggle");
      }, 100);
      this.alertModalText = `登出成功<br>畫面將在 ${count--} 秒後回到首頁`;
      let timer = setInterval(() => {
        if (count == -1) {
          clearInterval(timer);
          this.closeAlertModal(modalShow, modalContentShow);
        } else {
          this.alertModalText = `
          登出成功<br>畫面將在 ${count--} 秒後回到首頁`;
        }
      }, 1000);
    },
    closeAlertModal(modalShow, modalContentShow) {
      modalShow.classList.remove("modalC-toggle");
      modalContentShow.classList.remove("modalC-body-toggle");
      setTimeout(() => {
        this.isLoginItem = [];
        this.loginStatus = 0;
        this.isLoginAccount = "";
        this.alertModalText = "";
        modalShow.style.display = "";
        this.$router.push("/main/mainpage", () => {});
      }, 750);
    },
    showDeleteModal(id) {
      const modalShow = document.querySelector(".modal-delete");
      const modalContentShow = document.querySelector(".modal-delete-body");
      modalShow.style.display = "block";
      modalShow.style.transition = "1s ease";
      setTimeout(() => {
        // 設定淡入延遲
        modalShow.classList.add("modal-delete-toggle");
        modalContentShow.classList.add("modal-delete-body-toggle");
      }, 100);
      this.otLocation.forEach((key) => {
        if (key.orderID == id) {
          this.deleteIndex = id;
          this.modalObj.modalTitle = "刪除商品";
          this.modalObj.modalContent = `確定要刪除 ${key.orderProductName} 嗎？`;
        }
      });
    },
    closeDeleteModal() {
      const modalShow = document.querySelector(".modal-delete");
      const modalContentShow = document.querySelector(".modal-delete-body");
      modalShow.classList.remove("modal-delete-toggle");
      modalContentShow.classList.remove("modal-delete-body-toggle");
      setTimeout(() => {
        modalShow.style.display = "";
        this.deleteIndex = null;
        this.modalObj.modalTitle = "";
        this.modalObj.modalContent = "";
      }, 750);
    },
    deleteItem() {
      this.axios
        .post("http://127.0.0.1:8088/shop/order_list/delete", {
          id: this.deleteIndex,
        })
        .then((res) => {
          if (res.status == 200) {
            this.closeDeleteModal();
            this.getOrderList();
          }
        });
    },
    deleteOrderList() {
      let curDeleteItem = this.otLocation.filter(
        (key) => key.orderID == this.deleteIndex
      );
      this.ptLocation.forEach((pt) => {
        curDeleteItem.forEach((cur) => {
          if (pt.PDID == cur.orderProductID) {
            this.axios
              .post("http://127.0.0.1:8088/shop/product/patch_total_pice", {
                id: cur.orderProductID,
                productPice: pt.PDPice + cur.orderCount,
              })
              .then((res) => {
                if (res.status == 200) {
                  this.deleteItem();
                }
              });
          }
        });
      });
    },
    getOrderList() {
      if (this.isLoginItem.lenght == 0) return;
      this.axios.get("http://127.0.0.1:8088/shop/cart").then((res) => {
        if (res.status == 200) {
          this.otLocation = [];
          res.data.forEach((key) => {
            if (key.Account == this.isLoginAccount) {
              this.otLocation.push({
                orderID: key.ODID,
                orderProductID: key.PDID,
                orderProductName: key.PDName,
                orderProductSize: key.ODPDSize,
                orderCount: key.ODPDCount,
                orderAllCash: key.ODPDCount * key.PDOnSalePrice,
              });
            }
          });
        }
      });
    },
    getProduct() {
      this.axios.get("http://127.0.0.1:8088/shop/product").then((res) => {
        if (res.status == 200) {
          this.ptLocation = res.data;
        }
      });
    },
  },
  created() {
    this.goMainPage();
    this.getOrderList();
    this.getProduct();
    window.innerWidth <= 414 ? (this.rwdMod = true) : (this.rwdMod = false);
  },
};
</script>