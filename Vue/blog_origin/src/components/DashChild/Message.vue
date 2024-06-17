<template>
  <div class="page-animate">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <span class="title">留言內容</span>
          <div class="message-details-outer">
            <div class="message-details" v-for="(msgD,index) in messageGetTemp" :key="index">
              <div class="message-header">
                <span class="message-article-title">{{msgD.msgWithTitle}}</span>
                <span class="message-name">{{msgD.msgName}}</span>
              </div>
              <div class="message-content">
                <p>{{msgD.msgContent}}</p>
              </div>
              <div class="message-footer">
                <span class="message-datetime">{{msgD.msgDate}}</span>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-4">
              <div class="back" @click="goBack">
                <span>返回留言列表</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-animate {
  opacity: 0;
  transition: 0.7s ease;
  .title {
    display: block;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    color: white;
    margin: 40px auto;
  }
  .message-details-outer {
    .message-details {
      display: flex;
      justify-content: center;
      flex-direction: column;
      background-color: rgba(0, 0, 0, 0.7);
      padding: 8px;
      text-align: center;
      color: white;
      border-radius: 10px;
      box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
        0 0 2px 0 rgba(0, 0, 0, 0.7);
      .message-header {
        .message-article-title {
          display: block;
          font-size: 32px;
        }
        .message-name {
          display: block;
          font-size: 24px;
          margin: 10px 0 10px 0;
        }
      }
      .message-content {
        p {
          margin: 10px 0 10px 0;
          padding: 8px;
        }
      }
      .message-footer {
        .message-datetime {
          display: block;
          text-align: right;
          padding: 5px 10px 0px 10px;
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
}
.page-animate-active {
  opacity: 1;
}
</style>
<script>
export default {
  data() {
    return {
      messageGetTemp: [],
      messageStatus: false,
    };
  },
  mounted() {
    setTimeout(
      () =>
        document
          .querySelector(".page-animate")
          .classList.add("page-animate-active"),
      500
    );
  },
  methods: {
    goBack() {
      let messageOn = this.messageStatus;
      document
        .querySelector(".page-animate")
        .classList.remove("page-animate-active");
      setTimeout(
        () => this.$router.push({ name: "messagelist", params: { messageOn } }),
        750
      );
    },
  },
  created() {
    this.messageGetTemp = this.$route.params.messagePost;
  },
};
</script>