<template>
  <div>
    <div class="page-animate">
      <span class="title-a">文章管理</span>
      <span class="title-b">總覽</span>
      <span class="add-article" @click="goAddArticle">新增文章</span>
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="poto-group">
              <span>攝影</span>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">文章名稱</th>
                    <th scope="col">文章內容</th>
                    <th scope="col">建立日期</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(photo,index) in potographyCollect"
                    :key="index"
                    class="show-alert"
                    :data-post="index"
                    @mousemove="showAlertTitle"
                    @mouseleave="hideAlertTitle"
                    @click="goControl(photo.id,type=1)"
                  >
                    <td>{{photo.descripTitle}}</td>
                    <td>{{photo.descripContent}}</td>
                    <td>{{photo.year}}/{{10 > photo.monthNum ? '0':''}}{{photo.monthNum}}/{{10 > photo.dateNum ? '0':''}}{{photo.dateNum}}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3">文章總數 {{potographyCollect.length}} 篇</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="psy-group">
              <span>心理學</span>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">文章名稱</th>
                    <th scope="col">文章內容</th>
                    <th scope="col">建立日期</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(psy,index) in psychologyCollect"
                    :key="index"
                    :data-post="index"
                    class="show-alert"
                    @mousemove="showAlertTitle"
                    @mouseleave="hideAlertTitle"
                    @click="goControl(psy.id,type=2)"
                  >
                    <td>{{psy.descripTitle}}</td>
                    <td>{{psy.descripContent}}</td>
                    <td>{{psy.year}}/{{10 > psy.monthNum ? '0':''}}{{psy.monthNum}}/{{10 > psy.dateNum ? '0':''}}{{psy.dateNum}}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3">文章總數 {{psychologyCollect.length}} 篇</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="code-group">
              <span>程式語言</span>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">文章名稱</th>
                    <th scope="col">文章內容</th>
                    <th scope="col">建立日期</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(code,index) in codeCollect"
                    :key="index"
                    :data-post="index"
                    class="show-alert"
                    @mousemove="showAlertTitle"
                    @mouseleave="hideAlertTitle"
                    @click="goControl(code.id,type=3)"
                  >
                    <td>{{code.descripTitle}}</td>
                    <td>{{code.descripContent}}</td>
                    <td>{{code.year}}/{{10 > code.monthNum ? '0':''}}{{code.monthNum}}/{{10 > code.dateNum ? '0':''}}{{code.dateNum}}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3">文章總數 {{codeCollect.length}} 篇</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-3">
            <div class="back" @click="goBackChoose">
              <span>返回管理選項</span>
            </div>
          </div>
        </div>
      </div>
      <span class="alert-message">可點擊標題修改內容</span>
    </div>
    <div class="modalA">
      <div class="modal-bodyA">
        <div class="modal-headerA">
          <span>提示訊息</span>
        </div>
        <div class="modal-contentA">
          <p>
            可點選文章標題內容進行編輯
            <br />
            {{messageContentCount}} 秒後將自動關閉視窗
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-animate {
  opacity: 0;
  transition: 0.7s ease;
  overflow: hidden;
  .title-a {
    display: block;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 40px;
    margin: 10px 0 10px 0;
  }
  .title-b {
    display: block;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 25px;
    margin-bottom: 10px;
  }
  .add-article {
    display: block;
    position: absolute;
    top: 1%;
    right: 0;
    padding: 3px 10px 3px 10px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.7);
    box-shadow: inset 0 0 1px 1px rgba(255, 255, 255, 0.7),
      0 0 2px 1px rgba(0, 0, 0, 0.7);
    transform: translate(-80%, 0);
    opacity: 1;
    transition: 0.7s ease;
    color: white;
    cursor: pointer;
    user-select: none;
  }
  .add-article-hide {
    opacity: 0;
    transform: translate(-80%, -100%);
  }
  @media screen and (max-width: 414px) {
    .add-article {
      top: 8%;
      transform: translate(-12%, 0);
    }
    .add-article-hide {
      opacity: 0;
      transform: translate(-12%, 100%);
    }
  }
  .poto-group,
  .psy-group,
  .code-group {
    color: white;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    margin: 10px 0 10px 0;
    box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
      0 0 3px 1px rgba(0, 0, 0, 0.7);
    span {
      display: block;
      text-align: center;
      font-size: 30px;
      font-weight: bold;
      padding: 10px 0 10px 0;
    }
    .table {
      color: white;
      margin-bottom: 0;
      table-layout: fixed;
      thead {
        tr {
          th {
            text-align: center;
          }
        }
      }
      tbody {
        .show-alert {
          cursor: pointer;
          user-select: none;
          box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.7);
          text-align: center;
          transition: 0.7s ease;
          td {
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .show-alert-active {
          background-color: rgba(255, 255, 255, 0.7);
          box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.7);
          color: black;
        }
      }
      tfoot {
        tr {
          td {
            text-align: right;
          }
        }
      }
    }
  }
  .back {
    margin: 20px 0 20px 0;
    cursor: pointer;
    user-select: none;
    span {
      display: block;
      text-align: center;
      padding: 5px 10px 5px 10px;
      background-color: rgb(0, 81, 255);
      color: white;
      border-radius: 20px;
    }
  }
  .alert-message {
    position: absolute;
    display: none;
    opacity: 0;
    transition: 0.5s ease;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 3px 5px 3px 5px;
    border-radius: 5px;
  }
  .alert-message-active {
    display: block;
    opacity: 1;
  }
}
.page-animate-active {
  opacity: 1;
}
.modalA {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: rgba(0, 0, 0, 0.7);
  .modal-bodyA {
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
    .modal-headerA {
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
    .modal-contentA {
      padding: 20px 0 20px 0;
      text-align: center;
      p {
        margin-bottom: 0;
      }
    }
  }
  .modal-body-toggleA {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    transition: 0.5s ease;
  }
}
.modal-toggleA {
  opacity: 1;
}
</style>
<script>
export default {
  data() {
    return {
      articles: [],
      articlesCollection: [],
      potographyCollectTemp: [],
      potographyCollect: [],
      psychologyCollectTemp: [],
      psychologyCollect: [],
      codeCollectTemp: [],
      codeCollect: [],
      showAlertCountOrigin: -1,
      currentIndex: 0,
      messageContentTextF: "",
      messageContentTextS: "",
      messageContentCount: 3,
      messageAlertBegin: true,
    };
  },
  mounted() {
    setTimeout(() => {
      if (window.innerWidth > 769) return;
      this.messageAlertBegin = this.$route.params.begin;
      this.messageAlertBegin == undefined ? this.showModal() : null;
    }, 500);
    setTimeout(
      () =>
        document
          .querySelector(".page-animate")
          .classList.add("page-animate-active"),
      800
    );
    setTimeout(
      () =>
        document
          .querySelectorAll(".show-alert")
          .forEach((key) =>
            key.setAttribute("data-num", (this.showAlertCountOrigin += 1))
          ),
      2000
    );
  },
  methods: {
    goBackChoose() {
      document
        .querySelector(".page-animate")
        .classList.remove("page-animate-active");
      setTimeout(() => this.$router.push("/dashboard/fnchoose"), 750);
    },
    showModal() {
      const modalShow = document.querySelector(".modalA");
      const modalContentShow = document.querySelector(".modal-bodyA");
      modalShow.style.display = "block";
      modalShow.style.transition = "1s ease";
      setTimeout(() => {
        modalShow.classList.add("modal-toggleA");
        modalContentShow.classList.add("modal-body-toggleA");
      }, 100);
      let counter = setInterval(() => {
        if (this.messageContentCount == 0) {
          clearInterval(counter);
          this.closeModal(modalShow, modalContentShow);
          setTimeout(
            () => (this.messageContentCount = 3),

            750
          );
        } else {
          this.messageContentCount -= 1;
        }
      }, 1000);
    },
    closeModal(modalShow, modalContentShow) {
      modalShow.classList.remove("modal-toggleA");
      modalContentShow.classList.remove("modal-body-toggleA");
      setTimeout(() => (modalShow.style.display = ""), 750);
    },
    showAlertTitle(e) {
      if (window.innerWidth <= 768) return;
      this.currentIndex = e.target.parentNode.dataset.post;
      document.querySelectorAll(".show-alert").forEach((key) => {
        parseInt(key.dataset.num) == parseInt(e.target.parentNode.dataset.num)
          ? key.classList.add("show-alert-active")
          : key.classList.remove("show-alert-active");
      });
      document
        .querySelector(".alert-message")
        .classList.add("alert-message-active");
      document.querySelector(".alert-message").style.top = `${e.pageY}px`;
      document.querySelector(".alert-message").style.left = `${e.pageX + 20}px`;
    },
    hideAlertTitle(e) {
      if (window.innerWidth <= 768) return;
      document
        .querySelectorAll(".show-alert")
        .forEach((key) =>
          parseInt(key.dataset.num) == parseInt(e.target.dataset.num)
            ? key.classList.remove("show-alert-active")
            : null
        );
      document
        .querySelector(".alert-message")
        .classList.remove("alert-message-active");
      document.querySelector(".alert-message").style.top = "";
      document.querySelector(".alert-message").style.left = "";
    },
    goAddArticle() {
      setTimeout(() => {
        const add = true;
        this.$router.push({ name: "controlpage", params: { add } });
      }, 700);
      document.querySelector(".add-article").classList.add("add-article-hide");
    },
    goControl(id, type) {
      let currentIndexPost = this.currentIndex;
      document
        .querySelector(".page-animate")
        .classList.remove("page-animate-active");
      setTimeout(
        () =>
          this.$router.push({
            name: "controlpage",
            params: { id, type, currentIndexPost },
          }),
        750
      );
    },
    getArticle() {
      const unlock = "https://cors-anywhere.herokuapp.com/";
      const potoUrl = "https://project-50101.firebaseio.com/potography.json/";
      const psyUrl = "https://project-50101.firebaseio.com/psychology.json/";
      const codeUrl = "https://project-50101.firebaseio.com/code.json/";
      this.axios
        .get(`${unlock}${potoUrl}`)
        .then((res) => {
          this.potographyCollectTemp = Object.keys(res.data).map(
            (key) => res.data[key]
          );
          this.potographyCollectTemp.forEach((key) =>
            key.descripTitle != "" ? this.potographyCollect.push(key) : null
          );
        })
        .catch((err) => console.log(err));
      this.axios
        .get(`${unlock}${psyUrl}`)
        .then((res) => {
          this.psychologyCollectTemp = Object.keys(res.data).map(
            (key) => res.data[key]
          );
          this.psychologyCollectTemp.forEach((key) =>
            key.descripTitle != "" ? this.psychologyCollect.push(key) : null
          );
        })
        .catch((err) => console.log(err));
      this.axios
        .get(`${unlock}${codeUrl}`)
        .then((res) => {
          this.codeCollectTemp = Object.keys(res.data).map(
            (key) => res.data[key]
          );
          this.codeCollectTemp.forEach((key) =>
            key.descripTitle != "" ? this.codeCollect.push(key) : null
          );
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.getArticle();
  },
};
</script>