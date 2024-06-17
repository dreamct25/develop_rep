<template>
  <div class="bg">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="register">
            <div class="form-list-outer">
              <div class="form-list-header">會員註冊</div>
              <div class="form-list-body">
                <div class="input-outer">
                  <label for="nank">名稱</label>
                  <input
                    id="nank"
                    type="text"
                    v-model="createName"
                    placeholder="- - 請輸入您的名子或暱稱 - -"
                  />
                  <p>請輸入您的名子或暱稱</p>
                </div>
                <div class="input-outer">
                  <label for="account">帳號</label>
                  <input
                    id="account"
                    type="text"
                    v-model="createAccount"
                    placeholder="- - 請輸入您想設定的帳號 - -"
                    @focus="currentTarget = 0"
                    @input="valueCheck(createAccount)"
                  />
                  <p class="notice">請輸入您想設定的帳號</p>
                </div>
                <div class="input-outer">
                  <label for="password">密碼</label>
                  <input
                    id="password"
                    type="password"
                    v-model="createPassword"
                    placeholder="- - 請輸入您想設定的密碼 - -"
                    @focus="currentTarget = 1"
                    @input="valueCheck(createPassword)"
                  />
                  <p class="notice">請輸入您想設定的密碼</p>
                </div>
                <div class="input-outer">
                  <label for="phone">電話</label>
                  <input
                    id="phone"
                    type="tel"
                    v-model="createPhoneNum"
                    placeholder="- - 請輸入您的電話 - -"
                    @focus="currentTarget = 2"
                    @input="valueCheck(createPhoneNum)"
                  />
                  <p class="notice">請輸入您的電話</p>
                </div>
                <div class="input-outer">
                  <label for="email">信箱</label>
                  <input
                    id="email"
                    type="email"
                    v-model="createEmail"
                    placeholder="- - 請輸入您的電子信箱 - -"
                    @focus="currentTarget = 3"
                    @input="valueCheck(createEmail)"
                  />
                  <p class="notice">請輸入您的電子信箱</p>
                </div>
                <div class="input-outer">
                  <label for="address">地址</label>
                  <input
                    id="address"
                    type="text"
                    v-model="createAddress"
                    placeholder="- - 請輸入您的地址 - -"
                    @focus="currentTarget = 4"
                    @input="valueCheck(createAddress)"
                  />
                  <p class="notice">請輸入您的地址</p>
                </div>
              </div>
              <div class="confirm" @click="sendList">送出</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AlertModal :inner="alertText" />
  </div>
</template>
<style lang="scss" scoped>
.bg {
  background-image: url("https://unsplash.com/photos/5gkYsrH_ebY/download?force=true&w=1920");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: inset 0 0 2000px 2000px rgba(0, 0, 0, 0.3);
}
.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .form-list-outer {
    border-radius: 10px;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.7);
    background-color: rgba(255, 255, 255, 0.7);
    margin: 220px 0 105px 0;
    .form-list-header {
      padding: 10px;
      font-size: 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    }
    .form-list-body {
      padding: 40px 20px 10px 20px;
      .input-outer {
        position: relative;
        display: flex;
        label {
          display: block;
          margin-bottom: 0;
        }
        p {
          position: absolute;
          left: 50%;
          top: 0;
          color: rgba(0, 0, 0, 0.3);
          transform: scale(1) translate(-35%, 15%);
          background-color: transparent;
          pointer-events: none;
          padding: 0 5px 0 5px;
          border-radius: 5px;
          margin-bottom: 0;
          font-size: 15px;
          box-shadow: inset 0 0 3px 0 transparent;
          transition: 0.7s ease;
        }
        input[type="text"],
        input[type="password"],
        input[type="tel"],
        input[type="email"] {
          text-align: center;
          outline: none;
          border-radius: 15px;
          border: none;
          box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.7);
          width: 330px;
          padding-top: 5px;
          margin: 0 0 25px 15px;
        }
        input:placeholder-shown::placeholder {
          color: transparent;
        }
        input:not(:placeholder-shown) ~ p,
        input:focus ~ p {
          color: rgba(0, 0, 0, 1);
          background-color: white;
          box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.7);
          transform: scale(0.75) translate(-200px, -15px);
        }
      }
      @media screen and(max-width: 414px) {
        .input-outer {
          flex-direction: column;
          input {
            margin: 0 0 25px 0 !important;
          }
          input:not(:placeholder-shown) ~ p,
          input:focus ~ p {
            color: rgba(0, 0, 0, 1);
            background-color: white;
            transform: scale(0.75) translate(-200px, -21px);
          }
          p {
            top: 35%;
            transform: scale(1) translate(-50%, 0%);
          }
        }
      }

      .success {
        color: rgb(0, 255, 0);
      }
      .wrong {
        color: rgb(255, 0, 0) !important;
      }
    }
    .confirm {
      border-top: 1px solid rgba(0, 0, 0, 0.3);
      padding: 10px 0 10px 0;
      text-align: center;
      cursor: pointer;
      user-select: none;
      transition: 0.5s ease;
      border-radius: 0 0 10px 10px;
    }
    .confirm:hover {
      color: white;
      background-color: rgb(0, 162, 255);
    }
  }
  @media screen and (max-width: 414px) {
    .form-list-outer {
      margin: 105px 0;
    }
  }
}
</style>
<script>
import AlertModal from "../components/AlertModal.vue";
export default {
  name: "Register",
  data() {
    return {
      acLocation: [],
      createName: "",
      createAccount: "",
      createPassword: "",
      createPhoneNum: "",
      createEmail: "",
      createAddress: "",
      alertText: "",
      countNum: 3,
      currentTarget: null,
      acMatch: false,
      psMatch: false,
      telMatch: false,
      elMatch: false,
      adMatch: false,
      allMatch: [],
      checkTextItem: [
        {
          currentTargetNum: 0,
          currentWrongText: "帳號格式錯誤",
          currentNoticeText: "請輸入您想設定的帳號",
          currentAccountMatch: "帳號重複",
          currentRegExp: "^[0-9a-zA-Z]+$",
        },
        {
          currentTargetNum: 1,
          currentWrongText: "密碼格式錯誤",
          currentNoticeText: "請輸入您想設定的密碼",
          currentRegExp: "^[0-9a-zA-Z]+$",
        },
        {
          currentTargetNum: 2,
          currentWrongText: "電話格式錯誤",
          currentNoticeText: "請輸入您的電話",
          currentRegExp: "^[0-9]*$",
        },
        {
          currentTargetNum: 3,
          currentWrongText: "電子郵件格式錯誤",
          currentNoticeText: "請輸入您的電子信箱",
          currentRegExp: "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$",
        },
        {
          currentTargetNum: 4,
          currentWrongText: "地址格式錯誤",
          currentNoticeText: "請輸入您的地址",
          currentRegExp: "^[A-Za-z0-9\u4e00-\u9fa5]+$",
        },
      ],
    };
  },
  components: {
    AlertModal,
  },
  methods: {
    valueCheck(val) {
      let boolTemp;
      switch (this.currentTarget) {
        case 0:
          boolTemp = this.valueCheckCenter(val);
          boolTemp == null || boolTemp == false
            ? (this.acMatch = false)
            : (this.acMatch = true);
          break;
        case 1:
          boolTemp = this.valueCheckCenter(val);
          boolTemp == null || boolTemp == false
            ? (this.psMatch = false)
            : (this.psMatch = true);
          break;
        case 2:
          boolTemp = this.valueCheckCenter(val);
          boolTemp == null || boolTemp == false
            ? (this.telMatch = false)
            : (this.telMatch = true);
          break;
        case 3:
          boolTemp = this.valueCheckCenter(val);
          boolTemp == null || boolTemp == false
            ? (this.elMatch = false)
            : (this.elMatch = true);
          break;
        case 4:
          boolTemp = this.valueCheckCenter(val);
          boolTemp == null || boolTemp == false
            ? (this.adMatch = false)
            : (this.adMatch = true);
          break;
      }
    },
    valueCheckWrongText(num, text) {
      [...document.querySelectorAll(".notice")][num].classList.add("wrong");
      [...document.querySelectorAll(".notice")][num].textContent = text;
    },
    valueCheckReturnText(num, text) {
      [...document.querySelectorAll(".notice")][num].classList.remove("wrong");
      [...document.querySelectorAll(".notice")][num].textContent = text;
    },
    valueCheckCenter(val) {
      let matchBool;
      this.checkTextItem.forEach((key) => {
        if (key.currentTargetNum == this.currentTarget && val != "") {
          let matchTemp = RegExp(`${key.currentRegExp}`, "g").test(val);
          if (matchTemp == false) {
            matchBool = matchTemp;
            this.valueCheckWrongText(
              key.currentTargetNum,
              key.currentWrongText
            );
          } else if (matchTemp == true && key.currentTargetNum == 0) {
            matchBool = this.valueRepeatCheck(val);
            matchBool == true
              ? this.valueCheckWrongText(
                  key.currentTargetNum,
                  key.currentAccountMatch
                )
              : this.valueCheckReturnText(
                  key.currentTargetNum,
                  key.currentNoticeText
                );
          } else {
            matchBool = null;
            this.valueCheckReturnText(
              key.currentTargetNum,
              key.currentNoticeText
            );
          }
        }
      });
      return matchBool;
    },
    valueRepeatCheck(val) {
      let bool;
      let filterMatch = [];
      filterMatch = this.acLocation.filter((key) => key == val);
      filterMatch.length == 0 ? (bool = false) : (bool = true);
      return bool;
    },
    getAccount() {
      this.axios
        .get("http://localhost:8088/shop/account")
        .then((res) =>
          res.data.forEach((key) => this.acLocation.push(key.Account))
        );
    },
    showModal(showText) {
      const modalShow = document.querySelector(".modalC");
      const modalContentShow = document.querySelector(".modalC-body");
      modalShow.style.display = "block";
      modalShow.style.transition = "1s ease";
      this.alertText = `
      ${showText}
      <br>
      畫面將在 ${this.countNum--} 秒後跳轉回登入頁`;
      let count = setInterval(() => {
        if (this.countNum == -1) {
          this.countNum = 3;
          clearInterval(count);
          this.closeModal(modalShow, modalContentShow);
          // setTimeout(() => this.$router.push("/login"), 1000);
        } else {
          this.alertText = `
          ${showText}
          <br>
          畫面將在 ${this.countNum--} 秒後跳轉回登入頁`;
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
      setTimeout(() => (modalShow.style.display = ""), 750); // 設定淡出延遲
    },
    sendList() {
      let text;
      const dateObject = new Date();
      let dateStr = `${dateObject.getFullYear()}-${
        dateObject.getMonth() + 1 < 10 ? "0" : ""
      }${dateObject.getMonth() + 1}-${
        dateObject.getDate() < 10 ? "0" : ""
      }${dateObject.getDate()}T${
        dateObject.getHours() < 10 ? "0" : ""
      }${dateObject.getHours()}:${
        dateObject.getMinutes() < 10 ? "0" : ""
      }${dateObject.getMinutes()}:${
        dateObject.getSeconds() < 10 ? "0" : ""
      }${dateObject.getSeconds()}.000Z`;
      console.log(dateStr);
      let falseCount = 0;
      this.allMatch.push(
        this.createName == "" ? null : true,
        this.acMatch,
        this.psMatch,
        this.telMatch,
        this.elMatch,
        this.adMatch
      );
      // console.log(this.allMatch);
      this.allMatch.forEach((key) => {
        key == false ? falseCount++ : null;
        falseCount == 0 ? (this.sendCheck = true) : (this.sendCheck = false);
      });
      if (this.sendCheck == false) {
        this.allMatch = [];
        text = "欄位不得為空或格式錯誤，請檢查欄位";
        this.showModal(text);
        return;
      }
      text = "感謝您註冊會員";
      this.axios
        .post("http://localhost:8088/shop/account/register", {
          name: this.createName,
          account: this.createAccount,
          password: this.createPassword,
          tel: this.createPhoneNum,
          email: this.createEmail,
          address: this.createAddress,
          time: dateStr,
        })
        .then((res) => {
          if (res.status == 200) {
            this.allCheck = [];
            (this.createName = ""),
              (this.createAccount = ""),
              (this.createPassword = ""),
              (this.createPhoneNum = ""),
              (this.createEmail = ""),
              (this.createAddress = "");
            console.log(res);
            this.showModal(text);
          }
        });
    },
  },
  created() {
    this.getAccount();
  },
};
</script>