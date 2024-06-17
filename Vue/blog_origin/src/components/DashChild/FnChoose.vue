<template>
  <div class="page-animate">
    <div class="container-fluid">
      <span>請選擇管理項目</span>
      <div class="row">
        <div class="col-md-6" :class="{'col-md-12':rwdStatus}">
          <div class="article-block-outer">
            <div
              class="article-block"
              @mouseenter="rotateSBlock(num=0)"
              @mouseleave="rotateEBlock(num=0)"
              @click="goArticle"
            >
              <div class="arrow-left arrow"></div>
              <div class="arrow-right arrow"></div>
              <span class="article-block-title">{{anNameF}}</span>
            </div>
          </div>
        </div>
        <div class="col-md-6" :class="{'col-md-12':rwdStatus}">
          <div class="message-block-outer">
            <div
              class="message-block"
              @mouseenter="rotateSBlock(num=1)"
              @mouseleave="rotateEBlock(num=1)"
              @click="goMessage"
            >
              <div class="arrow-left arrow"></div>
              <div class="arrow-right arrow"></div>
              <span class="message-block-title">{{anNameS}}</span>
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
  .container-fluid {
    span {
      display: block;
      text-align: center;
      color: white;
      font-weight: bold;
      font-size: 45px;
      padding: 40px 0 40px 0;
    }
    .article-block-outer {
      display: flex;
      justify-content: center;
      overflow: hidden;
      .article-block {
        position: relative;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.7);
        width: 380px;
        height: 380px;
        border-radius: 50%;
        margin: 5px;
        box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.7),
          0 0 3px 1px rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        transform: rotate(0deg);
        transition: 1s ease;
        cursor: pointer;
        user-select: none;
        .arrow-left {
          position: absolute;
          top: 44%;
          right: -100%;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 25px 50px 25px 0;
          border-color: transparent rgba(255, 255, 255, 0.7) transparent
            transparent;
          transition: 0.7s ease;
        }
        .arrow-left-active {
          right: 0;
        }
        .arrow-right {
          position: absolute;
          top: 44%;
          left: -100%;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 25px 0 25px 50px;
          border-color: transparent transparent transparent
            rgba(255, 255, 255, 0.7);
          transition: 0.7s ease;
        }
        .arrow-right-active {
          left: 0;
        }
        .article-block-title {
          display: block;
          text-align: center;
          color: white;
          font-size: 30px;
          transition: 0.5s ease;
          margin-bottom: 0;
          opacity: 1;
          transform: scale(1);
        }
        .block-title-hide {
          opacity: 0;
          transform: scale(0.1);
        }
      }
      .block-active {
        transform: rotate(360deg);
      }
    }
    .message-block-outer {
      display: flex;
      justify-content: center;
      overflow: hidden;
      .message-block {
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.7);
        width: 380px;
        height: 380px;
        border-radius: 50%;
        margin: 5px;
        box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.7),
          0 0 3px 1px rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        transform: rotate(0deg);
        transition: 1s ease;
        cursor: pointer;
        user-select: none;
        .arrow-left {
          position: absolute;
          top: 44%;
          right: -100%;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 25px 50px 25px 0;
          border-color: transparent rgba(255, 255, 255, 0.7) transparent
            transparent;
          transition: 0.7s ease;
        }
        .arrow-left-active {
          right: 0;
        }
        .arrow-right {
          position: absolute;
          top: 44%;
          left: -100%;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 25px 0 25px 50px;
          border-color: transparent transparent transparent
            rgba(255, 255, 255, 0.7);
          transition: 0.7s ease;
        }
        .arrow-right-active {
          left: 0;
        }
        .message-block-title {
          display: block;
          text-align: center;
          color: white;
          font-size: 30px;
          margin-bottom: 0;
          transition: 0.5s ease;
          opacity: 1;
          transform: scale(1);
        }
        .block-title-hide {
          opacity: 0;
          transform: scale(0.1);
        }
      }
      .block-active {
        transform: rotate(360deg);
      }
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
      loginStatus: true,
      blockTrans: false,
      rwdStatus: false,
      animateClassItems: [
        {
          anNum: 0,
          anArrowL: 0,
          anArrowR: 1,
          anClassF: "article-block",
          anClassS: "article-block-title",
        },
        {
          anNum: 1,
          anArrowL: 2,
          anArrowR: 3,
          anClassF: "message-block",
          anClassS: "message-block-title",
        },
      ],
      anNameF: "文章管理",
      anNameS: "留言管理",
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
    rotateSBlock(num) {
      this.animateClassItems.forEach((key) => {
        if (key.anNum == num) {
          document
            .querySelector(`.${key.anClassF}`)
            .classList.add("block-active");
          document
            .querySelector(`.${key.anClassS}`)
            .classList.add("block-title-hide");
          setTimeout(() => {
            [...document.querySelectorAll(".arrow")][
              key.anArrowL
            ].classList.add("arrow-left-active");
            [...document.querySelectorAll(".arrow")][
              key.anArrowR
            ].classList.add("arrow-right-active");
          }, 400);
          setTimeout(() => {
            num == 0
              ? (this.anNameF = "管理文章相關內容")
              : (this.anNameS = "查看留言項目");
            document
              .querySelector(`.${key.anClassS}`)
              .classList.remove("block-title-hide");
          }, 500);
        }
      });
    },
    rotateEBlock(num) {
      this.animateClassItems.forEach((key) => {
        if (key.anNum == num) {
          document
            .querySelector(`.${key.anClassF}`)
            .classList.remove("block-active");
          document
            .querySelector(`.${key.anClassS}`)
            .classList.add("block-title-hide");
          setTimeout(() => {
            [...document.querySelectorAll(".arrow")][
              key.anArrowL
            ].classList.remove("arrow-left-active");
            [...document.querySelectorAll(".arrow")][
              key.anArrowR
            ].classList.remove("arrow-right-active");
          }, 400);
          setTimeout(() => {
            num == 0
              ? (this.anNameF = "文章管理")
              : (this.anNameS = "留言管理");
            document
              .querySelector(`.${key.anClassS}`)
              .classList.remove("block-title-hide");
          }, 500);
        }
      });
    },
    goArticle() {
      if (window.innerWidth <= 768) {
        setTimeout(
          () =>
            document
              .querySelector(".page-animate")
              .classList.remove("page-animate-active"),
          1000
        );
        setTimeout(() => this.$router.push("/dashboard/allarticle"), 1750);
      } else {
        document
          .querySelector(".page-animate")
          .classList.remove("page-animate-active");
        setTimeout(() => this.$router.push("/dashboard/allarticle"), 700);
      }
    },
    goMessage() {
      if (window.innerWidth <= 768) {
        setTimeout(
          () =>
            document
              .querySelector(".page-animate")
              .classList.remove("page-animate-active"),
          1000
        );
        setTimeout(() => this.$router.push("/dashboard/messagelist"), 1750);
      } else {
        document
          .querySelector(".page-animate")
          .classList.remove("page-animate-active");
        setTimeout(() => this.$router.push("/dashboard/messagelist"), 700);
      }
    },
  },
  created() {
    window.innerWidth <= 768
      ? (this.rwdStatus = true)
      : (this.rwdStatus = false);
  },
};
</script>