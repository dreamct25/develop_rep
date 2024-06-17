<template>
  <div class="login-bg">
    <h1>後台管理系統</h1>
    <div class="login-outer-frame">
      <div class="container-fluid">
        <div class="login-outer">
          <div class="login">
            <div class="login-header">
              <span>登入</span>
            </div>
            <div class="login-body">
              <div class="account-group">
                <label for="accout">帳號</label>
                <input type="text" id="accout" v-model="accountInput" />
              </div>
              <div class="password-group">
                <label for="password">密碼</label>
                <input type="password" id="password" v-model="passwordInput" />
              </div>
            </div>
            <div class="login-footer" @click="goArticleControlCenter">登入</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <h6>
        <i class="fal fa-copyright"></i> CopyRight Chen
      </h6>
    </div>
    <div class="modalC">
      <div class="modal-bodyC">
        <div class="modal-headerC">
          <span>提示訊息</span>
        </div>
        <div class="modal-contentC">
          <p>
            {{loginStatusText}}
            <br />
            {{modalCount}} 秒後將跳{{loginStatus == true?'轉到管理選項頁面':'轉回首頁'}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login-bg {
  background-image: url("https://unsplash.com/photos/xG8IQMqMITM/download?force=true&w=1920");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  h1 {
    color: white;
    text-align: center;
    margin-bottom: 0;
    padding: 80px 0 10px 0;
  }
  .login-outer-frame {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 70vh;
    .container-fluid {
      .login-outer {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        color: white;
        .login {
          min-width: 400px;
          box-shadow: inset 0 0 3px 2px rgba(255, 255, 255, 0.7),
            0 0 2px 1px rgba(0, 0, 0, 0.7);
          overflow: hidden;
          border-radius: 15px 0 15px 0;
          .login-header {
            background-color: rgba(0, 0, 0, 0.7);
            padding: 3px 0 5px 0;
            border-bottom: 2px solid rgba(255, 255, 255, 0.7);
            span {
              display: block;
              padding: 3px 10px 0 10px;
              font-size: 25px;
            }
          }
          .login-body {
            background-color: rgba(0, 0, 0, 0.7);
            padding: 0 5px 10px 5px;
            .account-group,
            .password-group {
              padding: 15px 10px 15px 10px;
              label {
                display: block;
              }
              input[type="text"],
              input[type="password"] {
                text-align: center;
                border: none;
                outline: none;
                border-radius: 5px;
                width: 100%;
                display: block;
                box-shadow: inset 0 0 0 0 rgba(0, 81, 255, 0.7),
                  0 0 2px 1px rgba(0, 0, 0, 0.7);
                transition: 0.7s ease;
              }
              input[type="text"]:focus,
              input[type="password"]:focus {
                box-shadow: inset 0 0 2px 1px rgba(0, 81, 255, 0.7),
                  0 0 2px 1px rgba(0, 0, 0, 0.7);
              }
            }
          }
          .login-footer {
            border-top: 2px solid rgba(255, 255, 255, 0.7);
            text-align: center;
            background-color: rgba(0, 0, 0, 0.7);
            padding: 10px 0 10px 0;
            cursor: pointer;
            user-select: none;
          }
        }
        @media screen and (max-width: 414px) {
          .login {
            width: 100%;
            min-width: 0;
          }
        }
      }
    }
  }
  .footer {
    h6 {
      text-align: center;
      color: rgb(220, 220, 220);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
      font-weight: bold;
      font-size: 20px;
    }
  }
  .modalC {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: rgba(0, 0, 0, 0.7);
    .modal-bodyC {
      position: absolute;
      top: 50%;
      left: 50%;
      border: 1px solid black;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
      background: white;
      border-radius: 10px;
      margin: 2% auto;
      min-width: 380px;
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.1);
      transition: 0.5s ease;
    }
    .modal-body-toggleC {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      transition: 0.5s ease;
    }
    .modal-headerC {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px 10px 15px;
      border-bottom: 1px solid black;
      span {
        display: block;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .modal-contentC {
      padding: 20px 50px 15px 50px;
      text-align: center;
    }
  }
  .modal-toggleC {
    opacity: 1;
  }
}
</style>
<script>
import md5 from "md5";
export default {
  data() {
    return {
      accountInput: "",
      passwordInput: "",
      accountGroup: [],
      modalCount: 3,
      loginStatus: false,
      loginStatusText: "",
    };
  },
  methods: {
    showModal() {
      const modalShow = document.querySelector(".modalC");
      const modalContentShow = document.querySelector(".modal-bodyC");
      modalShow.style.display = "block";
      modalShow.style.transition = "1s ease";
      setTimeout(() => {
        modalShow.classList.add("modal-toggleC");
        modalContentShow.classList.add("modal-body-toggleC");
      }, 100);
      let timmer = setInterval(() => {
        if (this.modalCount == 0) {
          let login = this.loginStatus;
          clearInterval(timmer);
          this.closeModal(modalShow, modalContentShow);
          setTimeout(() => {
            this.modalCount = 3;
            if (this.loginStatus == true) {
              document.cookie = `loginStatus=${md5("goDash")};path=/`;
              this.$router.push({ name: "dashboard", params: { login } });
            } else {
              this.$router.push("/");
            }
          }, 750);
        } else {
          this.modalCount -= 1;
        }
      }, 1000);
    },
    closeModal(modalShow, modalContentShow) {
      modalShow.classList.remove("modal-toggleC");
      modalContentShow.classList.remove("modal-body-toggleC");
      setTimeout(() => (modalShow.style.display = ""), 750);
    },
    goArticleControlCenterPart() {
      this.accountInput == "" || this.passwordInput == ""
        ? (this.loginStatus = false)
        : (this.loginStatus = true);
      this.accountGroup.forEach((key) =>
        key.account == this.accountInput && key.password == this.passwordInput
          ? (this.loginStatus = true)
          : (this.loginStatus = false)
      );
    },
    goArticleControlCenter() {
      this.goArticleControlCenterPart();
      (this.accountInput == "" && this.loginStatus == false) ||
      (this.passwordInput == "" && this.loginStatus == false)
        ? (this.loginStatusText = "欄位不可為空")
        : null;
      (this.accountInput != "" && this.loginStatus == false) ||
      (this.passwordInput != "" && this.loginStatus == false)
        ? (this.loginStatusText = "帳號或密碼錯誤")
        : null;
      (this.accountInput != "" && this.loginStatus == true) ||
      (this.passwordInput != "" && this.loginStatus == true)
        ? (this.loginStatusText = "登入成功")
        : null;
      this.showModal();
    },
    getAccountInformation() {
      this.axios
        .get("https://acwithps-20xx.firebaseio.com/blog.json")
        .then((res) => this.accountGroup.push(res.data))
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.getAccountInformation();
  },
};
</script>