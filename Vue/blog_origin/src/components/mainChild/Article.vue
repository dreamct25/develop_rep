<template>
  <div>
    <div class="page-for-article">
      <div class="current-article-outer" v-for="(item,index) in articleCurrent" :key="index">
        <div class="current-article-header">
          <span class="current-article-title">{{item.descripTitle}}</span>
          <span
            class="current-article-date"
          >{{item.year}} / {{10 > item.monthNum?'0':''}}{{item.monthNum}} / {{10 > item.dateNum?'0':''}}{{item.dateNum}}</span>
        </div>
        <div class="current-article-body">
          <div class="img-outer" v-if="item.imgUrl !== ''">
            <img :src="item.imgUrl" alt />
          </div>
          <div class="font-change-group">
            <span class="font-title" @click="showFontChange">文字切換</span>
            <i class="far fa-chevron-right arrow" :class="{'arrow-active':fontChangeActive}"></i>
            <div class="font-change" :class="{'font-change-active':fontChangeActive}">
              <span class="size" @click="fontTrans(num=0)">小</span>
              <span class="size" @click="fontTrans(num=1)">中</span>
              <span class="size" @click="fontTrans(num=2)">大</span>
            </div>
          </div>
          <p class="current-content">{{item.descripContent}}</p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div class="back" @click="goBack">{{articleNum == undefined?'返回部落格首頁':'回文章列表'}}</div>
        </div>
      </div>
      <div class="message-group">
        <span>留言</span>
        <div class="row align-items-center">
          <div class="col-md-9" :class="{'col-md-12':rwdStatus}">
            <div class="message-area">
              <input type="text" v-model="messageTitle" placeholder="-- 請輸入您的名稱 --" />
              <textarea cols="55" rows="4" v-model="messageText" placeholder="-- 請輸入您想留言的內容 --"></textarea>
            </div>
          </div>
          <div class="col-md-3" :class="{'col-md-12':rwdStatus}">
            <div class="message-send" @click="postMessage">送出</div>
          </div>
        </div>
      </div>
      <div v-if="messageStatus == false" class="show-message-none">目前尚無留言</div>
      <div class="show-message-outer">
        <div class="show-message" v-for="(msgs,index) in messageGet" :key="index">
          <div class="row no-gutters">
            <div class="col-md-2">
              <div class="customer-icon-group">
                <div class="customer-icon">
                  <i class="fas fa-user-alt"></i>
                </div>
                <span class="customer-name">{{msgs.msgName}}</span>
              </div>
            </div>
            <div class="col-md-10">
              <div class="message-details-group">
                <span class="message-date">{{msgs.msgDate}}</span>
                <div class="customer-content">
                  <p>{{msgs.msgContent}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modalC">
      <div class="modal-bodyC">
        <div class="modal-headerC">
          <span>提示訊息</span>
        </div>
        <div class="modal-contentC">
          <p>
            {{messageFulled == false?'留言內容不可為空':'留言成功'}}
            <br />
            {{messageAlertCount}} 秒後將關閉視窗
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-for-article {
  opacity: 0;
  transition: 1s;
  .current-article-outer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    color: black;
    .current-article-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .current-article-title {
        display: block;
        font-size: 30px;
      }
      .current-article-date {
        display: block;
      }
    }
    .current-article-body {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .img-outer {
        width: 100%;
        height: 300px;
        overflow: hidden;
        border-radius: 10px;
        margin: 20px 0px 20px 0px;
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.7);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .font-change-group {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        overflow: hidden;
        padding: 2px 0 2px 0;
        .font-title {
          display: block;
          cursor: pointer;
          user-select: none;
        }
        .arrow {
          padding: 2px 6px 2px 6px;
          transform: rotate(0deg);
          transition: 0.7s ease;
        }
        .arrow-active {
          transform: rotate(-180deg);
        }
        .font-change {
          display: flex;
          margin-right: -92px;
          transition: 0.7s ease;
          .size {
            display: block;
            margin: 0 2px 0 2px;
            color: white;
            background-color: rgba(0, 0, 0, 0.7);
            box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
              0 0 2px 1px rgba(0, 0, 0, 0.7);
            padding: 0 5px 0 5px;
            transition: 0.7s ease;
            border-radius: 5px;
            cursor: pointer;
            user-select: none;
          }
          .size-active {
            color: black;
            background-color: rgba(255, 255, 255, 0.7);
            box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.7),
              0 0 2px 1px rgba(255, 255, 255, 0.7);
          }
        }
        .font-change-active {
          margin-right: 0;
        }
      }
      .current-content {
        text-align: justify;
        margin-bottom: 0;
        padding: 10px 0 10px 0;
        line-height: 1.8em;
        transition: 0.7s ease;
      }
      .sm {
        font-size: 16px;
      }
      .md {
        font-size: 20px;
      }
      .lg {
        font-size: 24px;
      }
    }
  }
  .back {
    display: block;
    text-align: center;
    color: white;
    padding: 5px 10px 5px 10px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 8px;
    box-shadow: inset 0 0 4px 1px rgba(255, 255, 255, 0.7),
      0 0 3px 0 rgba(0, 0, 0, 0.7);
    cursor: pointer;
    user-select: none;
  }
  .message-group {
    margin: 5px 20px 5px 20px;
    span {
      display: block;
      color: rgb(0, 89, 255);
      font-size: 25px;
      margin: 5px 0 5px 0;
      font-weight: bold;
    }
    @media screen and (max-width: 768px) {
      span {
        margin: 30px 0 5px 0;
      }
    }
    .message-area {
      input[type="text"],
      textarea {
        margin: 5px 0 5px 0;
        border-radius: 5px;
        outline: none;
        border: none;
        width: 100%;
        box-shadow: inset 0 0 0 0 rgba(0, 110, 255, 0.7),
          0 0 2px 1px rgba(0, 0, 0, 0.7);
        transition: 0.7s ease;
        text-align: center;
      }
      input[type="text"]:focus,
      textarea:focus {
        box-shadow: inset 0 0 2px 1px rgba(0, 110, 255, 0.7),
          0 0 2px 1px rgba(0, 0, 0, 0.7);
      }
    }
    .message-send {
      display: block;
      text-align: center;
      color: white;
      padding: 5px 10px 5px 10px;
      margin: 8px;
      border-radius: 5px;
      background-color: rgb(0, 81, 255);
      cursor: pointer;
      user-select: none;
    }
  }
}
.show-message-none {
  color: rgb(0, 89, 255);
  text-align: center;
  padding: 5px 0 30px 0;
}
.show-message-outer {
  .show-message {
    border-radius: 5px;
    margin: 20px;
    overflow: hidden;
    .customer-icon-group {
      color: white;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      box-shadow: inset 0 0 4px 0 rgba(255, 255, 255, 0.7);
      .customer-icon {
        font-size: 30px;
      }
    }
    @media screen and (max-width: 414px) {
      .customer-icon-group {
        padding: 10px 0 10px 0;
      }
    }
    .message-details-group {
      color: black;
      padding: 5px 10px 5px 10px;
      box-shadow: inset 0 0 4px 1px rgba(0, 0, 0, 0.7);
      background-color: rgba(255, 255, 255, 0.7);
      .message-date {
        display: block;
        text-align: right;
        padding: 3px;
      }
      .customer-content {
        p {
          text-align: center;
          padding: 3px;
        }
      }
    }
  }
}
.page-for-article-active {
  opacity: 1;
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
      padding: 8px 10px 8px 10px;
      border-bottom: 1px solid black;
      span {
        display: block;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .modal-contentC {
      padding: 25px 15px 25px 15px;
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
</style>
<script>
export default {
  data() {
    return {
      articleNum: null,
      articleChoose: [],
      articleCurrent: [],
      articleCurrentTitle: "",
      messageTitle: "",
      messageText: "",
      messageDate: "",
      messageStatus: false,
      messageGet: [],
      messageGetTemp: [],
      messageFulled: false,
      messageAlertCount: 3,
      rwdStatus: false,
      fontChangeActive: false,
      fontAnimateItem: [
        {
          fontNum: 0,
          fontClass: "sm",
        },
        {
          fontNum: 1,
          fontClass: "md",
        },
        {
          fontNum: 2,
          fontClass: "lg",
        },
      ],
    };
  },
  mounted() {
    this.articleChoose.forEach((key) => {
      if (key.id == this.articleNum) {
        this.articleCurrent.push(key);
        this.articleCurrentTitle = [...this.articleCurrent][0].descripTitle;
      } else if (this.articleNum == undefined) {
        this.articleCurrent.push(key);
        this.articleCurrentTitle = [...this.articleCurrent][0].descripTitle;
      }
    });
    setTimeout(() => {
      document
        .querySelector(".page-for-article")
        .classList.add("page-for-article-active");
      this.getMessage();
    }, 500);
  },
  methods: {
    showFontChange() {
      this.fontChangeActive == false
        ? (this.fontChangeActive = true)
        : (this.fontChangeActive = false);
    },
    fontTrans(num) {
      this.fontAnimateItem.forEach((key) => {
        if (key.fontNum == num) {
          document
            .querySelector(".current-content")
            .classList.add(`${key.fontClass}`);
          [...document.querySelectorAll(".size")][key.fontNum].classList.add(
            "size-active"
          );
          setTimeout(() => (this.fontChangeActive = false), 700);
        } else {
          document
            .querySelector(".current-content")
            .classList.remove(`${key.fontClass}`);
          [...document.querySelectorAll(".size")][key.fontNum].classList.remove(
            "size-active"
          );
        }
      });
    },
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
        if (this.messageAlertCount == 0) {
          setTimeout(() => (this.messageAlertCount = 3), 750);
          clearInterval(counter);
          this.closeModal(modalShow, modalContentShow);
        } else {
          this.messageAlertCount -= 1;
        }
      }, 1000);
    },
    closeModal(modalShow, modalContentShow) {
      modalShow.classList.remove("modal-toggleC");
      modalContentShow.classList.remove("modal-body-toggleC");
      setTimeout(() => (modalShow.style.display = ""), 750);
    },
    goBack() {
      let beforeChoose = this.articleChoose;
      if (this.articleNum == undefined) {
        this.$router.push("/");
        setTimeout(() => window.location.reload(), 100);
      } else {
        this.$router.push({ name: "article_list", params: { beforeChoose } });
      }
    },
    timePart() {
      const dateItem = new Date();
      let year = dateItem.getFullYear();
      let month = `${dateItem.getMonth() + 1 < 10 ? "0" : ""}${
        dateItem.getMonth() + 1
      }`;
      let dates = `${dateItem.getDate() < 10 ? "0" : ""}${dateItem.getDate()}`;
      let hour = `${dateItem.getHours() < 10 ? "0" : ""}${dateItem.getHours()}`;
      let minute = `${
        dateItem.getMinutes() < 10 ? "0" : ""
      }${dateItem.getMinutes()}`;
      this.messageDate = `${year}/${month}/${dates} ${hour} : ${minute}`;
    },
    postMessage() {
      if (
        (this.messageTitle == "" && this.messageText == "") ||
        this.messageTitle == "" ||
        this.messageText == ""
      ) {
        this.messageTitle = "";
        this.messageText = "";
        this.messageFulled = false;
        this.showModal();
        return;
      }
      this.timePart();
      this.axios
        .post("https://named-equator-262506.firebaseio.com/msgs.json/", {
          msgWithTitle: this.articleCurrentTitle,
          msgName: this.messageTitle,
          msgContent: this.messageText,
          msgDate: this.messageDate,
        })
        .then((res) => {
          if (res.status == 200) {
            this.messageFulled = true;
            this.showModal();
            this.messageTitle = "";
            this.messageText = "";
            this.messageDate = "";
            setTimeout(() => {
              this.messageGet = [];
              this.getMessage();
            }, 3000);
          } else {
            this.messageFulled = false;
            this.showModal();
            this.messageTitle = "";
            this.messageText = "";
            this.messageDate = "";
            this.messageGet = [];
            setTimeout(() => {
              this.messageGet = [];
              this.getMessage();
            }, 3000);
          }
        })
        .catch((err) => console.log(err));
    },
    getMessage() {
      this.axios
        .get("https://named-equator-262506.firebaseio.com/msgs.json/")
        .then((res) => {
          this.messageGetTemp = Object.keys(res.data).map(
            (key) => res.data[key]
          );
          this.messageGetTemp.forEach((key) => {
            if (key.msgWithTitle == this.articleCurrentTitle) {
              this.messageStatus = true;
              setTimeout(() => this.messageGet.push(key), 200);
            } else {
              this.messageGet = [];
            }
          });
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.articleChoose = this.$route.params.chooseItems;
    this.articleNum = this.$route.params.nums;
    window.innerWidth <= 768
      ? (this.rwdStatus = true)
      : (this.rwdStatus = false);
  },
};
</script>