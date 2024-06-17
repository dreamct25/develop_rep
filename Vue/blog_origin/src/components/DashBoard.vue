<template>
  <div class="write-bg">
    <div class="header">
      <span
        class="login-off-btn"
        :class="{'login-off-btn-active':loginStatus}"
        @click="showModal"
      >登出</span>
    </div>
    <div class="main">
      <router-view />
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
            登出成功
            <br />
            {{messageContentCount}} 秒後將自動跳轉回部落格
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.write-bg {
  background-image: url("https://unsplash.com/photos/xG8IQMqMITM/download?force=true&w=1920");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  .header {
    overflow: hidden;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    .login-off-btn {
      display: block;
      padding: 3px 10px 3px 10px;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.7);
      box-shadow: inset 0 0 1px 1px rgba(255, 255, 255, 0.7),
        0 0 2px 1px rgba(0, 0, 0, 0.7);
      transform: translate(100%, 0);
      opacity: 1;
      transition: 0.7s ease;
      color: white;
      cursor: pointer;
      user-select: none;
    }
    .login-off-btn-active {
      transform: translate(-5%, 2%);
    }
    @media screen and (max-width: 414px) {
      .login-off-btn-active {
        top: 1%;
        transform: translate(-10%, 10%);
      }
    }
  }
  .footer {
    text-align: center;
    padding: 30px 0 30px 0;
    i,
    h6 {
      font-weight: bold;
      font-style: italic;
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
      .modal-headerC {
        display: flex;
        justify-content: space-between;
        padding: 10px 15px 10px 15px;
        border-bottom: 1px solid black;
        span {
          font-size: 20px;
          font-weight: bold;
          display: block;
        }
      }
      .modal-contentC {
        padding: 20px 0 20px 0;
        text-align: center;
        p {
          margin-bottom: 0;
        }
      }
    }
    .modal-body-toggleC {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      transition: 0.5s ease;
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
      messageContentCount: 3,
      loginStatus: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loginStatus == true
        ? this.$router.push("/dashboard/fnchoose").catch((err) => {
            err;
          })
        : null,
        500;
    });
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
      let counter = setInterval(() => {
        if (this.messageContentCount == 0) {
          clearInterval(counter);
          this.closeModal(modalShow, modalContentShow);
          setTimeout(() => {
            document.cookie = `loginStatus='';expires=Thu, 01 Jan 1970 00:00:00 GMT';path=/;`;
            this.messageContentCount = 3;
            this.$router.push("/");
          }, 750);
        } else {
          this.messageContentCount -= 1;
        }
      }, 1000);
    },
    closeModal(modalShow, modalContentShow) {
      modalShow.classList.remove("modal-toggleC");
      modalContentShow.classList.remove("modal-body-toggleC");
      setTimeout(() => (modalShow.style.display = ""), 750);
    },
  },
  created() {
    document.cookie == `loginStatus=${md5("goDash")}`
      ? (this.loginStatus = true)
      : (this.loginStatus = false);
  },
};
</script>