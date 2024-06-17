<template>
  <div class="page-animate">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="message-list-group-outer">
            <div class="message-list-group">
              <span class="title">留言管理</span>
              <div class="message-list">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">名稱</th>
                      <th scope="col">文章</th>
                      <th scope="col">內容</th>
                      <th scope="col">時間</th>
                      <th scope="col">日期</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="show-alert"
                      v-for="(msgs,index) in messageGroup"
                      :key="index"
                      :data-num="index"
                      :data-post="index"
                      @mouseenter="showAlert"
                      @mouseleave="closeAlert"
                      @mousemove="showAlertMessage"
                      @click="postMessage"
                    >
                      <td>{{msgs.msgName}}</td>
                      <td>{{msgs.msgWithTitle}}</td>
                      <td>{{msgs.msgContent}}</td>
                      <td>{{msgs.msgDate.slice(11,18)}}</td>
                      <td>{{msgs.msgDate.slice(0,10)}}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="5">留言總數 {{messageGroup.length}} 則</td>
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
      </div>
    </div>
    <span class="alert-message">可點擊標題查看留言詳細內容</span>
    <div class="modalM">
      <div class="modal-bodyM">
        <div class="modal-headerM">
          <span>提示訊息</span>
        </div>
        <div class="modal-contentM">
          <p>
            可點擊標題查看留言詳細內容
            <br />
            {{modalCount}} 秒後將自動關閉視窗
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
  .message-list-group-outer {
    .message-list-group {
      color: white;
      display: flex;
      font-size: 18px;
      justify-content: center;
      flex-direction: column;
      .title {
        margin: 45px 0 45px 0;
        font-size: 40px;
        text-align: center;
        font-weight: bold;
      }
      .message-list {
        box-shadow: inset 0 0 2px 2px rgba(255, 255, 255, 0.7),
          0 0 2px 1px rgba(0, 0, 0, 0.7);
        border-radius: 10px;
        overflow: hidden;
        .table {
          color: white;
          margin-bottom: 0;
          table-layout: fixed;
          thead {
            tr {
              background-color: rgba(0, 0, 0, 0.7);
              box-shadow: inset 0 -7px 6px 0 rgba(0, 0, 0, 0.7);
              th {
                text-align: center;
                border-top: none;
              }
            }
          }
          tbody {
            tr {
              cursor: pointer;
              user-select: none;
              background-color: rgba(0, 0, 0, 0.7);
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
              background-color: rgba(0, 0, 0, 0.7);
              box-shadow: inset 0 7px 6px 0 rgba(0, 0, 0, 0.7);
              td {
                border-top: 2px solid #dee2e6;
                text-align: right;
              }
            }
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
  .modalM {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: rgba(0, 0, 0, 0.7);
    .modal-bodyM {
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
      .modal-headerM {
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
      .modal-contentM {
        padding: 20px 0 20px 0;
        text-align: center;
        p {
          margin-bottom: 0;
        }
      }
    }
    .modal-body-toggleM {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      transition: 0.5s ease;
    }
  }
  .modal-toggleM {
    opacity: 1;
  }
}
.page-animate-active {
  opacity: 1;
}
</style>
<script>
export default {
  data() {
    return {
      messageGroupTemp: [],
      messageGroup: [],
      modalCount: 3,
      rwdStatus: false,
      messageStatus: null,
    };
  },
  mounted() {
    setTimeout(() => {
      document
        .querySelector(".page-animate")
        .classList.add("page-animate-active");
      if (this.rwdStatus == false) return;
      this.messageStatus = this.$route.params.messageOn;
      this.messageStatus == undefined ? this.showModal() : null;
    }, 500);
  },
  methods: {
    goBackChoose() {
      document
        .querySelector(".page-animate")
        .classList.remove("page-animate-active");
      setTimeout(() => this.$router.push("/dashboard/fnchoose"), 750);
    },
    showModal() {
      const modalShow = document.querySelector(".modalM");
      const modalContentShow = document.querySelector(".modal-bodyM");
      modalShow.style.display = "block";
      modalShow.style.transition = "1s ease";
      setTimeout(() => {
        modalShow.classList.add("modal-toggleM");
        modalContentShow.classList.add("modal-body-toggleM");
      }, 100);
      let counter = setInterval(() => {
        if (this.modalCount == 0) {
          clearInterval(counter);
          this.closeModal(modalShow, modalContentShow);
          setTimeout(() => (this.modalCount = 3), 750);
        } else {
          this.modalCount -= 1;
        }
      }, 1000);
    },
    closeModal(modalShow, modalContentShow) {
      modalShow.classList.remove("modal-toggleM");
      modalContentShow.classList.remove("modal-body-toggleM");
      setTimeout(() => (modalShow.style.display = ""), 750);
    },
    showAlert(e) {
      if (this.rwdStatus == true) return;
      document
        .querySelectorAll(".show-alert")
        .forEach((key) =>
          key.dataset.num == e.target.dataset.num
            ? key.classList.add("show-alert-active")
            : key.classList.remove("show-alert-active")
        );
    },
    closeAlert(e) {
      if (this.rwdStatus == true) return;
      document
        .querySelectorAll(".show-alert")
        .forEach((key) =>
          key.dataset.num == e.target.dataset.num
            ? key.classList.remove("show-alert-active")
            : null
        );
      document
        .querySelector(".alert-message")
        .classList.remove("alert-message-active");
    },
    showAlertMessage(e) {
      if (this.rwdStatus == true) return;
      document
        .querySelector(".alert-message")
        .classList.add("alert-message-active");
      document.querySelector(".alert-message").style.top = `${e.pageY}px`;
      document.querySelector(".alert-message").style.left = `${e.pageX + 20}px`;
    },
    postMessage(e) {
      console.log(e.target.parentNode.dataset.post);
      this.messageGroup.forEach((key, index) =>
        index == e.target.parentNode.dataset.post
          ? this.messageGroupTemp.push(key)
          : null
      );
      setTimeout(() => {
        let messagePost = this.messageGroupTemp;
        document
          .querySelector(".page-animate")
          .classList.remove("page-animate-active");
        setTimeout(
          () => this.$router.push({ name: "message", params: { messagePost } }),
          750
        );
      }, 200);
    },
    getMessage() {
      const unlock = "https://cors-anywhere.herokuapp.com/";
      const url = "https://named-equator-262506.firebaseio.com/msgs.json/";
      this.axios
        .get(`${unlock}${url}`)
        .then(
          (res) =>
            (this.messageGroup = Object.keys(res.data).map(
              (key) => res.data[key]
            ))
        )
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.getMessage();
    window.innerWidth <= 768
      ? (this.rwdStatus = true)
      : (this.rwdStatus = false);
  },
};
</script>