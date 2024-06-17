<template>
  <div>
    <div class="page-animate">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="text-input-outer">
              <span class="title">{{titleText}}</span>
              <div class="row">
                <div class="col-md-12">
                  <div class="text-title-group">
                    <label for="text-title">文章標題</label>
                    <input
                      id="text-title"
                      type="text"
                      v-model="textTitle"
                      placeholder="-- 請輸入文章標題 --"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="text-nav">
                    <div class="text-img-group">
                      <label for="text-img">上傳影像 :</label>
                      <select id="text-img" v-model="textImgValue">
                        <option :value="false">否</option>
                        <option :value="true">是</option>
                      </select>
                    </div>
                    <div class="text-type-group">
                      <label for="text-type-option">文章分類 :</label>
                      <select id="text-type-option" v-model="textType">
                        <option :value="null">請選擇分類</option>
                        <option
                          v-for="(type,index) in textTypeItem"
                          :key="index"
                          :value="type.typeNum"
                        >{{type.typeName}}</option>
                      </select>
                    </div>
                    <div class="text-date-group">
                      <span>日期 :</span>
                      <select v-model="year">
                        <option disabled :value="null">請選擇年</option>
                        <option
                          v-for="(numY,index) in 6"
                          :key="index"
                          :value="`202${index}`"
                        >{{`202${index}`}} 年</option>
                      </select>
                      <select v-model="month">
                        <option disabled :value="null">請選擇月</option>
                        <option v-for="(numM,index) in 12" :key="index" :value="numM">{{numM}} 月</option>
                      </select>
                      <select v-model="dates">
                        <option disabled :value="null">請選擇日</option>
                        <option v-for="(numD,index) in 31" :key="index" :value="numD">{{numD}} 日</option>
                      </select>
                    </div>
                  </div>
                  <span
                    class="show-date"
                  >{{year==null?'--':year}} / {{month==null?'--': ''}}{{10>month&&month!==null?'0':''}}{{month}} / {{dates==null?'--':''}}{{10>dates&&dates!=null?'0':''}}{{dates}}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div
                    class="text-content-img-group"
                    :class="{'text-content-img-group-active':textImgValue}"
                  >
                    <div
                      class="img-upload-toggle"
                      :class="{'img-upload-toggle-active':textImgValue}"
                    >
                      <div class="img-upload-group">
                        <input
                          type="url"
                          v-model="onlineUrl"
                          @change="uploadImg"
                          placeholder="-- 請輸入欲上傳的圖片網址 --"
                        />
                      </div>
                      <div class="img-view">
                        <img
                          :class="{'img-show':uploadStatus && textImgValue}"
                          :src="onlineUrl"
                          alt
                        />
                        <span>
                          <i class="fal fa-angle-double-right"></i> 此處將出現預覽圖片畫面
                          <i class="fal fa-angle-double-left"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="text-content-group">
                    <label for="text-content">文章內容</label>
                    <textarea
                      id="text-content"
                      cols="400"
                      rows="15"
                      placeholder="-- 請輸入文章內容 --"
                      v-model="descripTextContent"
                    ></textarea>
                    <span>當前字數 : {{descripTextContent.length}}</span>
                  </div>
                </div>
              </div>
              <div class="text-modify-btn-group-outer">
                <div class="text-modify-btn-group">
                  <span class="back" @click="goBack">返回</span>
                  <span
                    class="delete"
                    v-if="addStatus == false"
                    @click="deleteArticle(deletes=true,modify=false)"
                  >刪除</span>
                  <span
                    class="modify"
                    v-if="addStatus == false"
                    @click="modifyArticle(deletes=false,modify=true)"
                  >修改</span>
                  <span class="add" v-else @click="addArticle">新增</span>
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
          <p v-if="modalContentSwitchStatus == false">
            {{modalContentText}}
            <br />
            {{modalCount}} 秒後將跳轉回全文章列表
          </p>
          <p v-else>是否{{dOrMSTextF}} {{dOrMSTextS}} 文章？</p>
        </div>
        <div class="modal-footerC" v-if="modalContentSwitchStatus == true">
          <div class="cancel" @click="cancleMessage">否</div>
          <div class="confirm" @click="confirmMessage">是</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-animate {
  opacity: 0;
  transition: 0.7s ease;
  .text-input-outer {
    .title {
      display: block;
      text-align: center;
      font-weight: bold;
      font-size: 40px;
      padding: 20px 0 20px 0;
      color: white;
    }
    label {
      display: block;
      margin: 5px;
      color: white;
      font-weight: bold;
      text-shadow: 0 0 1px rgba(0, 0, 0, 0.7);
    }
    input[type="text"]::placeholder {
      text-align: center;
    }
    input[type="text"],
    textarea {
      display: block;
      width: 100%;
      border-radius: 20px;
      outline: none;
      border: none;
      box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.7),
        0 0 2px 0px rgba(0, 0, 0, 0.7);
      text-align: justify;
      transition: 0.7s ease;
    }
    input[type="text"]:focus,
    textarea:focus,
    select:focus {
      box-shadow: inset 0 0 2px 1px rgba(0, 60, 255, 0.7),
        0 0 2px 0px rgba(0, 0, 0, 0.7) !important;
    }
    .text-nav {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .text-img-group {
        display: flex;
        margin: 5px 0 5px 0;
        label {
          display: block;
          margin: 2px 3px 2px 3px;
        }
        select {
          -webkit-appearance: none;
          background-color: rgb(255, 255, 255);
          display: block;
          margin: 0 2px 0 2px;
          border-radius: 20px;
          border: none;
          outline: none;
          padding: 3px 15px 3px 15px;
          box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.7),
            0 0 2px 0px rgba(0, 0, 0, 0.7);
          transition: 0.7s ease;
        }
      }
      @media screen and (max-width: 414px) {
        .text-img-group {
          justify-content: flex-end;
          margin: 10px 0 5px 0;
        }
      }
      .text-type-group {
        display: flex;
        margin: 5px 0 5px 0;
        label {
          display: block;
          margin: 2px 3px 2px 3px;
        }
        select {
          -webkit-appearance: none;
          background-color: rgb(255, 255, 255);
          display: block;
          margin: 0 2px 0 2px;
          border-radius: 20px;
          border: none;
          outline: none;
          padding: 3px 5px 3px 5px;
          box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.7),
            0 0 2px 0px rgba(0, 0, 0, 0.7);
          transition: 0.7s ease;
        }
      }
      @media screen and (max-width: 414px) {
        .text-type-group {
          justify-content: flex-end;
          margin: 10px 0 5px 0;
        }
      }
      .text-date-group {
        display: flex;
        justify-content: flex-end;
        margin: 10px 0 10px 0;
        span {
          display: block;
          margin: 2px 5px 2px 5px;
          color: white;
          font-weight: bold;
          text-shadow: 0 0 1px rgba(0, 0, 0, 0.7);
        }
        select {
          -webkit-appearance: none;
          background-color: rgb(255, 255, 255);
          display: block;
          margin: 0 2px 0 2px;
          border-radius: 20px;
          border: none;
          outline: none;
          padding: 3px 5px 3px 5px;
          box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.7),
            0 0 2px 0px rgba(0, 0, 0, 0.7);
          transition: 0.7s ease;
        }
      }
    }
    @media screen and (max-width: 414px) {
      .text-nav {
        display: block;
      }
    }
    .show-date {
      display: block;
      text-align: right;
      color: white;
      font-weight: bold;
      text-shadow: 0 0 1px rgba(0, 0, 0, 0.7);
    }
    .text-content-img-group {
      overflow: hidden;
      margin: 0 0 0 0;
      transition: 1s ease;
      .img-upload-toggle {
        transition: 1s ease;
        margin-top: -100vh;
        .img-upload-group {
          input[type="url"] {
            display: block;
            width: 100%;
            border-radius: 20px;
            outline: none;
            border: none;
            box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.7),
              0 0 2px 0px rgba(0, 0, 0, 0.7);
            text-align: center;
            transition: 0.7s ease;
          }
          input[type="url"]:focus {
            box-shadow: inset 0 0 2px 1px rgba(0, 60, 255, 0.7),
              0 0 2px 0px rgba(0, 0, 0, 0.7) !important;
          }
        }
        .img-view {
          margin: 10px 3px 3px 3px;
          box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
            0 0 3px 1px rgba(0, 0, 0, 0.7);
          border-radius: 15px;
          min-height: 350px;
          overflow: hidden;
          position: relative;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          img {
            opacity: 0;
            transition: 0.7s ease;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
          }
          .img-show {
            opacity: 1;
          }
          span {
            display: block;
            color: white;
            text-shadow: 0 2px 1px rgba(0, 0, 0, 0.7);
            font-size: 20px;
          }
        }
      }
      .img-upload-toggle-active {
        margin-top: 0;
      }
    }
    .text-content-img-group-active {
      margin: 10px 0 10px 0;
    }
    .text-content-group {
      label {
        display: block;
      }
      span {
        display: block;
        text-align: right;
        color: white;
        font-weight: bold;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
        margin: 6px 0 6px 0;
        letter-spacing: 1.2px;
      }
      textarea::placeholder {
        text-align: center;
        padding: 26% 0 0 0;
      }
      @media screen and (max-width: 768px) {
        textarea::placeholder {
          padding: 45% 0 0 0;
        }
      }
    }
    .text-modify-btn-group-outer {
      display: flex;
      justify-content: center;
      margin-top: 30px;
      .text-modify-btn-group {
        display: flex;
        span {
          display: block;
          padding: 3px 20px 3px 20px;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          border-radius: 20px;
          margin: 0 10px 0 10px;
          cursor: pointer;
          user-select: none;
        }
      }
    }
  }
}
.page-animate-active {
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
    overflow: hidden;
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
      padding: 10px 15px 10px 15px;
      border-bottom: 1px solid black;
      span {
        display: block;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .modal-contentC {
      padding: 25px 0 25px 0;
      text-align: center;
      p {
        margin-bottom: 0;
      }
    }
    .close {
      display: block;
      cursor: pointer;
    }
    .modal-footerC {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid black;
    }
    .cancel,
    .confirm {
      padding: 8px 0 8px 0;
      text-align: center;
      cursor: pointer;
      user-select: none;
      transition: 1s ease;
      width: 50%;
    }
    .cancel {
      border-right: 1px solid rgba(0, 0, 0, 0.7);
    }
    .confirm {
      border-left: 1px solid rgba(0, 0, 0, 0.7);
    }
    .cancel:hover {
      color: white;
      background: rgb(0, 81, 255);
      transition: 0.5s ease;
    }
    .confirm:hover {
      color: white;
      background: rgb(255, 0, 0);
      transition: 0.5s ease;
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
      titleText: "",
      onlineUrl: "",
      uploadStatus: false,
      textImgValue: false,
      textNum: 0,
      year: null,
      month: null,
      dates: null,
      textTitle: "",
      descripTextContent: "",
      textTypeItem: [
        {
          typeNum: 1,
          typeName: "攝影",
          typeEnName: "potography",
        },
        {
          typeNum: 2,
          typeName: "心理學",
          typeEnName: "psychology",
        },
        {
          typeNum: 3,
          typeName: "程式語言",
          typeEnName: "code",
        },
      ],
      textType: null,
      typeGet: null,
      typeNameGet: "",
      idGet: null,
      keyGet: null,
      keyGroup: [],
      showGetArticle: [],
      addStatus: false,
      textTypeTemp: "",
      orderNum: [],
      addNumId: null,
      currentTypeGroup: [],
      currentTypeItem: [],
      currentArticleItem: [],
      getPostIndex: null,
      modalContentSwitchStatus: false,
      modalContentText: "",
      modalCount: 3,
      ans: false,
      dOrMStatus: false,
      dOrMSTextF: "",
      dOrMSTextS: "",
      messageAlertBegin: false,
    };
  },
  mounted() {
    setTimeout(
      () =>
        document
          .querySelector(".page-animate")
          .classList.add("page-animate-active"),
      800
    );
  },
  methods: {
    addArticlePartForModal() {
      let timmer = setInterval(() => {
        if (this.modalCount == 0) {
          clearInterval(timmer);
          this.closeModal();
          setTimeout(() => (this.modalCount = 3), 750);
        } else {
          this.modalCount -= 1;
        }
      }, 1000);
    },
    cancleMessage() {
      this.closeModal();
      setTimeout(() => {
        this.ans = false;
        this.dOrMStatus == true
          ? this.deleteArticlePart()
          : this.modifyArticlePart();
      }, 1250);
    },
    confirmMessage() {
      this.closeModal();
      setTimeout(() => {
        this.ans = true;
        this.dOrMStatus == true
          ? this.deleteArticlePart()
          : this.modifyArticlePart();
      }, 1250);
    },
    showModal(deletes, modify) {
      const modalShow = document.querySelector(".modalC");
      const modalContentShow = document.querySelector(".modal-bodyC");
      modalShow.style.display = "block";
      modalShow.style.transition = "1s ease";
      setTimeout(() => {
        modalShow.classList.add("modal-toggleC");
        modalContentShow.classList.add("modal-body-toggleC");
      }, 100);
      if (deletes == true) {
        this.modalContentSwitchStatus = true;
        this.dOrMStatus = true;
        this.dOrMSTextF = "要刪除";
        this.dOrMSTextS = this.textTitle;
      }
      if (modify == true) {
        this.modalContentSwitchStatus = true;
        this.dOrMStatus = false;
        this.dOrMSTextF = "要修改";
        this.dOrMSTextS = this.textTitle;
      }
      this.addStatus == true ? this.addArticlePartForModal() : null;
    },
    closeModal() {
      const modalShow = document.querySelector(".modalC");
      const modalContentShow = document.querySelector(".modal-bodyC");
      modalShow.classList.remove("modal-toggleC");
      modalContentShow.classList.remove("modal-body-toggleC");
      setTimeout(() => (modalShow.style.display = ""), 750);
    },
    uploadImg() {
      this.onlineUrl == ""
        ? (this.uploadStatus = false)
        : setTimeout(() => (this.uploadStatus = true), 200);
    },
    goBack() {
      let add = false;
      let begin = this.messageAlertBegin;
      document
        .querySelector(".page-animate")
        .classList.remove("page-animate-active");
      setTimeout(
        () => this.$router.push({ name: "allarticle", params: { add, begin } }),
        750
      );
    },
    showArticle() {
      this.showGetArticle.forEach((key) => {
        this.year = key.date.slice(0, 4);
        this.month = key.monthNum;
        this.dates = key.dateNum;
        this.textType = this.typeGet;
        this.textTitle = key.descripTitle;
        this.descripTextContent = key.descripContent;
        this.onlineUrl = key.imgUrl;
      });
      this.textTypeItem.forEach((key) =>
        key.typeNum == this.typeGet ? (this.typeNameGet = key.typeEnName) : null
      );
      if (this.onlineUrl == "") {
        this.textImgValue = false;
        this.uploadStatus = false;
      } else {
        this.textImgValue = true;
        this.uploadStatus = true;
      }
    },
    getArticlePart() {
      this.idGet = this.$route.params.id;
      this.typeGet = this.$route.params.type;
      this.getPostIndex = this.$route.params.currentIndexPost;
      this.$route.params.add == true
        ? (this.addStatus = true)
        : (this.addStatus = false);
      this.addStatus == true
        ? (this.titleText = "新增文章")
        : (this.titleText = "更動文章");
    },
    getArticle() {
      this.getArticlePart();
      this.textTypeItem.forEach((key) => {
        if (key.typeNum == this.typeGet) {
          const unlock = "https://cors-anywhere.herokuapp.com/";
          const url = `https://project-50101.firebaseio.com/${key.typeEnName}.json/`;
          this.axios
            .get(`${unlock}${url}`)
            .then((res) => {
              this.currentTypeGroup.push(res.data);
              this.currentTypeGroup.forEach(
                (key) => (this.keyGroup = Object.keys(key))
              );
              this.currentArticleItem = Object.keys(res.data).map(
                (key) => res.data[key]
              );
              this.currentArticleItem.forEach((key) => {
                if (key.id == this.idGet) {
                  this.keyGet = this.keyGroup[this.getPostIndex];
                  this.showGetArticle.push(key);
                }
              });
              this.showArticle();
            })
            .catch((err) => console.log(err));
        }
      });
    },
    addArticle() {
      this.textTypeItem.forEach((key) => {
        if (key.typeNum == this.textType) {
          const unlock = "https://cors-anywhere.herokuapp.com/";
          const url = `https://project-50101.firebaseio.com/${key.typeEnName}.json/`;
          this.textTypeTemp = key.typeEnName;
          this.axios
            .get(`${unlock}${url}`)
            .then((res) => {
              this.currentTypeItem = Object.keys(res.data).map(
                (key) => res.data[key]
              );
              this.currentTypeItem.forEach((key) => this.orderNum.push(key.id));
              if (this.orderNum == []) {
                this.addNumId = 0;
              } else {
                this.addNumId = Math.max(...this.orderNum);
                this.addNumId += 1;
              }
              setTimeout(() => {
                const unlock = "https://cors-anywhere.herokuapp.com/";
                const url = `https://project-50101.firebaseio.com/${this.textTypeTemp}/.json/`;
                this.axios
                  .post(`${unlock}${url}`, {
                    id: this.addNumId,
                    date: `${this.year}/${this.month < 10 ? "0" : ""}${
                      this.month
                    }/${this.dates < 10 ? "0" : ""}${this.dates}`,
                    descripContent: this.descripTextContent,
                    descripTitle: this.textTitle,
                    monthNum: this.month,
                    dateNum: this.dates,
                    year: this.year,
                    imgUrl: this.onlineUrl,
                  })
                  .then((res) => {
                    setTimeout(() => {
                      this.addNumId = null;
                      this.orderNum = [];
                    }, 300);
                    if (res.status == 200) {
                      let begin = this.messageAlertBegin;
                      this.modalContentText = "文章新增成功";
                      this.showModal();
                      setTimeout(() => {
                        document
                          .querySelector(".page-animate")
                          .classList.remove("page-animate-active");
                        setTimeout(
                          () =>
                            this.$router.push({
                              name: "allarticle",
                              params: { begin },
                            }),
                          750
                        );
                      }, 4850);
                    }
                  })
                  .catch((err) => console.log(err));
              }, 300);
            })
            .catch((err) => console.log(err));
        }
      });
    },
    deleteArticlePart() {
      const unlock = "https://cors-anywhere.herokuapp.com/";
      const url = `https://project-50101.firebaseio.com/${this.typeNameGet}/${this.keyGet}/.json/`;
      if (this.ans == true) {
        this.axios
          .put(`${unlock}${url}`, {
            id: "",
            date: "",
            descripContent: "",
            descripTitle: "",
            monthNum: "",
            year: "",
            imgUrl: "",
          })
          .then((res) => {
            if (res.status == 200) {
              this.modalContentSwitchStatus = false;
              this.modalContentText = "刪除成功";
              this.showModal();
              let timmer = setInterval(() => {
                if (this.modalCount == 0) {
                  clearInterval(timmer);
                  this.closeModal();
                  setTimeout(() => {
                    let begin = this.messageAlertBegin;
                    this.modalCount = 3;
                    document
                      .querySelector(".page-animate")
                      .classList.remove("page-animate-active");
                    setTimeout(
                      () =>
                        this.$router.push({
                          name: "allarticle",
                          params: { begin },
                        }),
                      750
                    );
                  }, 750);
                } else {
                  this.modalCount -= 1;
                }
              }, 1000);
            }
          })
          .catch((err) => console.log(err));
      } else {
        this.modalContentSwitchStatus = false;
        this.modalContentText = "無更動文章";
        this.showModal();
        let timmer = setInterval(() => {
          if (this.modalCount == 0) {
            clearInterval(timmer);
            this.closeModal();
            setTimeout(() => {
              let begin = this.messageAlertBegin;
              this.modalCount = 3;
              document
                .querySelector(".page-animate")
                .classList.remove("page-animate-active");
              setTimeout(
                () =>
                  this.$router.push({ name: "allarticle", params: { begin } }),
                750
              );
            }, 750);
          } else {
            this.modalCount -= 1;
          }
        }, 1000);
      }
    },
    deleteArticle(deletes, modify) {
      this.showModal(deletes, modify);
    },
    modifyArticlePart() {
      const unlock = "https://cors-anywhere.herokuapp.com/";
      const url = `https://project-50101.firebaseio.com/${this.typeNameGet}/${this.keyGet}/.json/`;
      this.addNumId = this.idGet;
      if (this.ans == true) {
        this.axios
          .put(`${unlock}${url}`, {
            id: this.addNumId,
            date: `${this.year}/${this.month > 10 ? "0" : ""}${this.month}/${
              this.dates > 10 ? "0" : ""
            }${this.dates}`,
            descripContent: this.descripTextContent,
            descripTitle: this.textTitle,
            dateNum: this.dates,
            monthNum: this.month,
            year: this.year,
            imgUrl: this.onlineUrl,
          })
          .then((res) => {
            if (res.status == 200) {
              this.modalContentSwitchStatus = false;
              this.modalContentText = "修改成功";
              this.showModal();
              let timmer = setInterval(() => {
                if (this.modalCount == 0) {
                  clearInterval(timmer);
                  this.closeModal();
                  setTimeout(() => {
                    let begin = this.messageAlertBegin;
                    this.modalCount = 3;
                    document
                      .querySelector(".page-animate")
                      .classList.remove("page-animate-active");
                    setTimeout(
                      () =>
                        this.$router.push({
                          name: "allarticle",
                          params: { begin },
                        }),
                      750
                    );
                  }, 750);
                } else {
                  this.modalCount -= 1;
                }
              }, 1000);
            }
          })
          .catch((err) => console.log(err));
      } else {
        this.modalContentSwitchStatus = false;
        this.modalContentText = "無更動文章";
        this.showModal();
        let timmer = setInterval(() => {
          if (this.modalCount == 0) {
            clearInterval(timmer);
            this.closeModal();
            setTimeout(() => {
              let begin = this.messageAlertBegin;
              this.modalCount = 3;
              document
                .querySelector(".page-animate")
                .classList.remove("page-animate-active");
              setTimeout(
                () =>
                  this.$router.push({ name: "allarticle", params: { begin } }),
                750
              );
            }, 750);
          } else {
            this.modalCount -= 1;
          }
        }, 1000);
      }
    },
    modifyArticle(deletes, modify) {
      this.showModal(deletes, modify);
    },
  },
  created() {
    this.getArticle();
  },
};
</script>