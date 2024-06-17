<template>
  <div class="content-outer">
    <div class="row justify-content-center">
      <div class="col-md-9">
        <div class="date-content-outer">
          <div v-if="articleList.length == 0" class="date-content-none">
            <span>
              目前暫無文章
              <br />請選擇其他年份或月份
            </span>
          </div>
          <div class="date-content" v-else v-for="(texts,index) in articleList " :key="index">
            <div class="date-content-header">
              <span class="content-title">{{texts.descripTitle}}</span>
              <span
                class="content-date"
              >{{texts.year}} / {{10 > texts.monthNum?'0':''}}{{texts.monthNum}} / {{10 > texts.dateNum?'0':''}}{{texts.dateNum}}</span>
            </div>
            <div class="date-content-body">
              <p>{{texts.descripContent}}</p>
            </div>
            <div class="date-content-footer">
              <div class="row justify-content-end">
                <div class="col-md-3">
                  <span @click="goArticle(texts.id)">查看更多</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content-outer {
  opacity: 0;
  transition: 1s ease;
  .date-content-outer {
    .date-content-none {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      span {
        color: rgb(0, 68, 255);
        display: block;
        text-align: center;
        font-size: 18px;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
        font-weight: bold;
        letter-spacing: 3px;
      }
    }
    .date-content {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      color: white;
      min-height: 50vh;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 10px;
      box-shadow: inset 0 0 4px 1px rgb(230, 230, 230),
        0 0 2px 1px rgba(0, 0, 0, 0.7);
      margin: 20px 0 20px 0;
      padding: 10px 20px 10px 20px;
      .date-content-header {
        display: flex;
        justify-content: space-between;
        .content-title {
          display: block;
          font-size: 25px;
          font-weight: bold;
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
        }
        .content-date {
          display: block;
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
        }
      }
      .date-content-body {
        p {
          padding: 4px 5px 0 5px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
        }
      }
      .date-content-footer {
        span {
          display: block;
          text-align: center;
          font-weight: bold;
          margin: 5px 2px 5px 2px;
          cursor: pointer;
          user-select: none;
          background-color: rgba(0, 0, 0, 0.7);
          border-radius: 5px;
          padding: 5px 10px 5px 10px;
          box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
            0 0 2px 1px rgba(0, 0, 0, 0.7);
        }
      }
    }
  }
}
.content-outer-active {
  opacity: 1;
}
</style>
<script>
export default {
  data() {
    return {
      articleList: [],
      articleItems: [],
    };
  },
  mounted() {
    setTimeout(
      () =>
        document
          .querySelector(".content-outer")
          .classList.add("content-outer-active"),
      500
    );
  },
  methods: {
    goArticle(num) {
      let chooseItems = this.articleList;
      let nums = num;
      this.$router
        .push({ name: "article", params: { chooseItems, nums } })
        .catch((err) => {
          err;
        });
    },
  },
  created() {
    this.$route.params.selects != undefined
      ? (this.articleList = this.$route.params.selects)
      : (this.articleList = this.$route.params.beforeChoose);
  },
};
</script>