<template>
  <div>
    <div class="login-page">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-5">
            <div class="login-outer">
              <div class="login-main">
                <div class="login-header">
                  <span>會員登入</span>
                  <div class="forget-group">
                    <span>忘記帳號</span>
                    <span>忘記密碼</span>
                  </div>
                </div>
                <div class="login-body">
                  <div class="account-group">
                    <label for="account">帳號</label>
                    <input
                      id="account"
                      type="text"
                      v-model="account"
                      placeholder="請輸入帳號"
                      @focus="currentTargetNum = 0"
                      @input="valueCheck(account)"
                    />
                    <p class="notice">請輸入帳號</p>
                  </div>
                  <div class="password-group">
                    <label for="password">密碼</label>
                    <input
                      id="password"
                      type="password"
                      v-model="password"
                      placeholder="請輸入密碼"
                      @focus="currentTargetNum = 1"
                      @input="valueCheck(password)"
                    />
                    <p class="notice">請輸入密碼</p>
                  </div>
                </div>
                <div class="confirm" @click="logIn">登入</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login-page {
  background-image: url("https://unsplash.com/photos/HY1fq4ZtLTE/download?force=true&w=1920");
  background-repeat: no-repeat;
  background-size: cover;
}
.login-outer {
  margin: 50% auto;
  .login-main {
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    .login-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      padding: 10px;
      font-size: 20px;
      .forget-group {
        display: flex;
        span {
          display: block;
          font-size: 10px;
          margin: 0 5px 0 5px;
        }
      }
    }
    .login-body {
      display: flex;
      flex-direction: column;
      padding: 15px 30px 16px 30px;
      .account-group,
      .password-group {
        display: flex;
        flex-direction: column;
        position: relative;
        input[type="text"],
        input[type="password"] {
          border-radius: 15px;
          width: 100%;
          outline: none;
          text-align: center;
          border: none;
          transition: 1s ease;
          box-shadow: inset 0 0 0 0 rgba(0, 132, 255, 0.7),
            0 0 1px 1px rgba(0, 0, 0, 0.7);
          margin-bottom: 30px;
        }
        input[type="text"]:focus,
        input[type="password"]:focus {
          box-shadow: inset 0 0 2px 1px rgba(0, 132, 255, 0.7),
            0 0 1px 1px rgba(0, 0, 0, 0.7);
        }
        p {
          position: absolute;
          left: 50%;
          top: 50%;
          color: rgba(0, 0, 0, 0.3);
          transform: scale(1) translate(-40%, -50%);
          background-color: transparent;
          pointer-events: none;
          padding: 0 5px 0 5px;
          border-radius: 5px;
          margin-bottom: 0;
          transition: 0.7s ease;
        }
        input:placeholder-shown::placeholder {
          color: transparent;
        }
        input:not(:placeholder-shown) ~ p,
        input:focus ~ p {
          color: rgba(0, 0, 0, 1);
          background-color: white;
          transform: scale(0.75) translate(-250px, -34px);
        }
        @media screen and (max-width: 1200px) {
          input:not(:placeholder-shown) ~ p,
          input:focus ~ p {
            transform: scale(0.75) translate(-200px, -34px);
          }
        }
        .success {
          color: rgb(0, 255, 34);
        }
        .wrong {
          color: rgb(255, 0, 0) !important;
        }
      }
    }
    .confirm {
      padding: 5px;
      border-top: 1px solid rgba(0, 0, 0, 0.3);
      text-align: center;
      font-size: 20px;
      transition: 0.5s ease;
      border-radius: 0 0 9px 9px;
      cursor: pointer;
      user-select: none;
    }
    .confirm:hover {
      color: white;
      background-color: rgb(0, 174, 255);
    }
  }
}
</style>
<script>
export default {
  name: "login",
  data() {
    return {
      acLocation: [],
      account: "",
      password: "",
      acMatch: null,
      psMatch: null,
      acChangeText: false,
      psChangeText: false,
      emptycheck: false,
      passTemp: [],
      passCheck: false,
      loginUserName: "",
      currentTargetNum: null,
      checkTextItem: [
        {
          currentTargetNum: 0,
          currentWrongText: "帳號格式錯誤",
          currentNoticeText: "請輸入帳號",
          currentAccountMatch: "無效帳號，請註冊帳號",
          currentRegExp: "^[0-9a-zA-Z]+$",
        },
        {
          currentTargetNum: 1,
          currentWrongText: "密碼格式錯誤",
          currentNoticeText: "請輸入密碼",
          currentRegExp: "^[0-9a-zA-Z]+$",
        },
      ],
    };
  },
  methods: {
    valueCheckWrongText(num, text) {
      [...document.querySelectorAll(".notice")][num].classList.add("wrong");
      [...document.querySelectorAll(".notice")][num].textContent = text;
    },
    valueCheckReturnText(num, text) {
      [...document.querySelectorAll(".notice")][num].classList.remove("wrong");
      [...document.querySelectorAll(".notice")][num].textContent = text;
    },
    valueCheck(val) {
      let boolTemp;
      if (this.currentTargetNum == 0) {
        boolTemp = this.valueCheckCenter(val);
        boolTemp == null || boolTemp == false
          ? (this.acMatch = false)
          : (this.acMatch = true);
      } else {
        boolTemp = this.valueCheckCenter(val);
        boolTemp == null || boolTemp == false
          ? (this.psMatch = false)
          : (this.psMatch = true);
      }
    },
    valueCheckCenter(val) {
      let matchBool;
      this.checkTextItem.forEach((key) => {
        if (this.currentTargetNum == key.currentTargetNum) {
          let regExpTemp = RegExp(`${key.currentRegExp}`).test(val);
          matchBool = regExpTemp;
          console.log(regExpTemp);
          if (regExpTemp == false && val == "") {
            matchBool = true;
            this.valueCheckReturnText(
              key.currentTargetNum,
              key.currentNoticeText
            );
          } else if (regExpTemp == false) {
            this.valueCheckWrongText(
              key.currentTargetNum,
              key.currentWrongText
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
    getAccoutData() {
      this.axios
        .get("http://127.0.0.1:8088/shop/account")
        .then((res) => (this.acLocation = res.data))
        .catch((err) => console.log(err));
    },
    showModalPart() {
      let filterItem = [];
      this.getAccoutData();
      setTimeout(() => {
        filterItem = this.acLocation.filter(
          (key) => key.Account == this.account
        );
        filterItem.forEach((key) => {
          Boolean(key.Power) == true && Boolean(key.LoginState) == true
            ? setTimeout(() => {
                this.$router.push("/dashboard");
              }, 1000)
            : setTimeout(() => {
                filterItem.forEach((key) => {
                  this.$parent.isLoginItem.push(key);
                  this.$parent.loginStatus = key.LoginState;
                  this.$parent.isLoginAccount = key.Account;
                });
                setTimeout(
                  () => this.$router.push("/main/mainPage", () => {}),
                  500
                );
              }, 1000);
        });
      }, 300);
    },
    showModal(text, passItem) {
      const modalShow = document.querySelector(".modalC");
      const modalContentShow = document.querySelector(".modalC-body");
      let countNum = 3;
      let textFtEnd = "";
      let textSdEnd = "";
      passItem.forEach((key) =>
        Boolean(key.Power) == true
          ? (textSdEnd = "到後台管理商品頁")
          : (textSdEnd = "回首頁")
      );
      modalShow.style.display = "block";
      modalShow.style.transition = "1s ease";
      if (passItem.length == 0) {
        textFtEnd = "秒後關閉";
        this.$parent.alertModalText = `${text} ${countNum--} ${textFtEnd}${textSdEnd}`;
      } else {
        textFtEnd = "秒後跳轉";
        this.$parent.alertModalText = `${text} ${countNum--} ${textFtEnd}${textSdEnd}`;
      }
      let count = setInterval(() => {
        if (countNum == -1) {
          clearInterval(count);
          this.closeModal(modalShow, modalContentShow);
          if (passItem.length == 0) return;
          this.axios
            .post("http://127.0.0.1:8088/shop/account/login", {
              id: passItem[0].id,
            })
            .then((res) => {
              if (res.status == 200) this.showModalPart();
            });
        } else {
          this.$parent.alertModalText = `${text} ${countNum--} ${textFtEnd}${textSdEnd}`;
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
      setTimeout(() => {
        this.$parent.alertModalText = "";
        modalShow.style.display = "";
      }, 750); // 設定淡出延遲
    },
    logIn() {
      let acFilter = [];
      let acPsFilter = [];
      let text = "";
      acFilter = this.acLocation.filter((key) => key.Account == this.account);
      if (acFilter.length == 0) {
        text = "無效帳號，請註冊帳號<br>視窗將在";
        this.showModal(text, acFilter);
        return;
      }
      acPsFilter = this.acLocation.filter(
        (key) => key.Account == this.account && key.Password == this.password
      );
      if (acPsFilter.length == 0) {
        text = "帳號或密碼錯誤<br>視窗將在";
        this.showModal(text, acPsFilter);
        return;
      }
      text = `歡迎回來 ${acPsFilter[0].Name}<br>畫面將在`;
      this.$parent.loginStatus = true;
      this.$parent.powerHave = Boolean(acPsFilter[0].Power);
      this.showModal(text, acPsFilter);
    },
  },
  mounted() {
    this.getAccoutData();
  },
};
</script>