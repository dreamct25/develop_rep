<template>
  <div id="app">
    <div
      class="header"
      v-if="rwdState == false"
      :class="{ 'header-fixed': headerAnimate }"
    >
      <div class="title">
        <i class="fas fa-film"></i>
        <h1>Videos</h1>
      </div>
      <div class="nav-bar">
        <div
          class="nav-bar-sessionI"
          :class="{ 'nav-bar-hide': navBarAnimate }"
          v-if="navBarSwitch"
        >
          <div @click="searBarAnimate = false">
            <router-link to="/">首頁</router-link>
          </div>
          <div @click="searBarAnimate = true">
            <router-link to="/collect">我的收藏</router-link>
          </div>
          <div class="search-bar-outer">
            <div
              class="search-bar"
              :class="{ 'search-bar-hide': searBarAnimate }"
            >
              <input
                type="text"
                v-model="searchText"
                placeholder="-- 搜尋影片名稱 --"
              />
              <div class="search-btn" @click="transToPartail">搜尋</div>
            </div>
          </div>
        </div>
        <div
          class="nav-bar-sessionII"
          :class="{ 'nav-bar-hide': navBarAnimate }"
          v-else
        >
          <div class="row no-gutters">
            <div class="col-12">
              <div class="back" @click="backPage">返回</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="header-rwd"
      v-if="rwdState == true"
      :class="{ 'header-rwd-fixed': headerAnimate }"
    >
      <div class="row no-gutters">
        <div class="col-4">
          <div class="title">
            <i class="fas fa-film"></i>
            <h1>Videos</h1>
          </div>
        </div>
        <div class="col-8">
          <div
            class="search-bar-outer"
            :class="{ 'search-bar-hide': navBarAnimate }"
            v-if="navBarSwitch"
          >
            <div class="search-bar">
              <input
                type="text"
                v-model="searchText"
                placeholder="-- 搜尋影片名稱 --"
              />
              <div class="search-btn" @click="transToPartail">搜尋</div>
            </div>
          </div>
          <div
            class="nav-bar-sessionII"
            :class="{ 'nav-bar-hide': navBarAnimate }"
            v-else
          >
            <div class="back" @click="backPage">返回</div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-bar-rwd" v-if="rwdState == true">
      <div class="row no-gutters">
        <div class="col-6">
          <div class="routes routes-active" @click="currentLink('home')">
            <div
              class="routes-line"
              :class="{ 'routes-line-active': !routeLineAimate }"
            ></div>
            <router-link to="/"><i class="fas fa-home"></i>首頁</router-link>
          </div>
        </div>
        <div class="col-6">
          <div class="routes" @click="currentLink('collect')">
            <div
              class="routes-line"
              :class="{ 'routes-line-active': routeLineAimate }"
            ></div>
            <router-link to="/collect"
              ><i class="far fa-heart"></i>我的收藏</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <router-view />
    <div class="footer">
      <h6><i class="far fa-copyright"></i> Copyright By Chen</h6>
    </div>
  </div>
</template>
<style lang="scss">
html {
  position: relative;
  box-shadow: inset 0 0 2000px 2000px rgb(0, 0, 0);
  min-height: 100vh;
  body {
    background-color: transparent;
    padding-top: 0;
    transition: 1s ease;
    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
      .header {
        display: flex;
        top: -10%;
        justify-content: space-between;
        padding: 8px 0 0 0;
        box-shadow: inset 0 0 2000px 2000px rgba(0, 0, 0, 0.8),
          0 0 15px 15px rgba(0, 0, 0, 0.8);
        transition: 1s ease;
        .title {
          display: flex;
          align-items: center;
          font-size: 40px;
          i {
            color: white;
            margin: 0 15px;
          }
          h1 {
            color: white;
            margin-bottom: 0;
          }
        }
        .nav-bar {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          overflow: hidden;
          .nav-bar-sessionI {
            display: flex;
            align-items: center;
            transform: translateX(0);
            opacity: 1;
            transition: 0.7s ease;
            a {
              color: white;
              margin: 0 5px;
            }
            a:hover {
              text-decoration: none;
            }
            .router-link-exact-active {
              color: rgb(0, 255, 255);
            }
          }
          .nav-bar-sessionII {
            transform: translateX(0);
            transition: 0.7s ease;
            .back {
              background-color: rgba(0, 0, 0, 0.7);
              box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
              border-radius: 10px;
              padding: 5px 22px 5px 22px;
              margin: 0 15px;
              color: white;
              text-align: center;
              cursor: pointer;
              user-select: none;
            }
          }
          .nav-bar-hide {
            opacity: 0;
            transform: translateX(100%);
          }
        }
      }
      .header-fixed {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
      }
      .header-rwd {
        box-shadow: inset 0 0 2000px 2000px rgba(0, 0, 0, 0.8),
          0 0 15px 15px rgba(0, 0, 0, 0.8);
        z-index: 1;
        top: -10%;
        padding: 10px 0 0 0;
        transition: 1s ease;
        .title {
          font-size: 30px;
          display: flex;
          align-items: center;
          i {
            color: white;
            margin: 0 5px 0 10px;
          }
          h1 {
            font-size: 30px;
            color: white;
            text-align: center;
            margin-bottom: 0;
          }
        }
        .search-bar-outer {
          display: block;
          justify-content: unset;
          transform: translateX(0);
          transition: 0.7s ease;
          .search-bar {
            justify-content: center;
            margin-left: 5px;
            margin-right: 5px;
            input[type="text"] {
              width: 70%;
            }
          }
        }
        .search-bar-hide {
          opacity: 0;
          transform: translateX(100%);
        }
        .nav-bar-sessionII {
          display: flex;
          justify-content: flex-end;
          transform: translateX(0);
          transition: 0.7s ease;
          .back {
            background-color: rgba(0, 0, 0, 0.7);
            box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
            border-radius: 10px;
            padding: 5px 22px 5px 22px;
            margin: 0 15px;
            color: white;
            text-align: center;
            cursor: pointer;
            user-select: none;
          }
        }
        .nav-bar-hide {
          opacity: 0;
          transform: translateX(100%);
        }
      }
      .header-rwd-fixed {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      }
      .nav-bar-rwd {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        color: white;
        box-shadow: inset 0 0 2000px 2000px rgba(0, 0, 0, 0.8),
          0 0 15px 15px rgba(0, 0, 0, 0.8);
        z-index: 1;
        .routes {
          position: relative;
          a {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
            padding: 0 0 8px 0;
            transition: 0.7s ease;
            color: white;

            i {
              font-size: 20px;
              margin: 2px auto;
            }
          }

          a:hover {
            text-decoration: none;
          }
          .router-link-exact-active {
            color: rgb(0, 255, 255);
            text-decoration: none;
          }
          .routes-line {
            position: absolute;
            top: 94%;
            left: 50%;
            right: 0;
            bottom: 0;
            width: 0;
            height: 3px;
            background-color: rgba(0, 255, 255, 0);
            transition: 0.7s ease;
          }
          .routes-line-active {
            background-color: rgba(0, 255, 255, 1);
            left: 0;
            width: 100%;
          }
        }
      }
      .search-bar-outer {
        display: flex;
        justify-content: flex-end;
        overflow: hidden;
        .search-bar {
          display: flex;
          justify-content: flex-end;
          margin-right: 15px;
          margin-left: 10px;
          padding: 2px 0 2px 0;
          transition: 0.7s ease;
          input[type="text"] {
            -webkit-appearance: none;
            color: white;
            width: 72%;
            margin-right: 1px;
            text-align: center;
            border: none;
            outline: none;
            border-radius: 10px 0 0 10px;
            transition: 0.7s ease;
            box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.8);
            background-color: black;
          }
          input[type="text"]:focus {
            box-shadow: inset 0 0 5px 1px rgba(255, 255, 255, 0.8);
          }
          input[type="text"]::placeholder {
            color: white;
          }
          .search-btn {
            padding: 3px 15px 3px 15px;
            background: black;
            color: white;
            border-radius: 0 10px 10px 0;
            box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.8);
            cursor: pointer;
            user-select: none;
          }
          @media screen and (max-width: 1024px) {
            input[type="text"] {
              padding-top: 5px;
            }
            .search-btn {
              padding: 5px 15px 3px 15px;
            }
          }
        }
        .search-bar-hide {
          margin-right: -235px;
        }
      }
      .footer {
        text-align: center;
        color: white;
        padding: 8px 0 30px 0;
        h6 {
          font-size: 18px;
          margin-bottom: 0;
        }
      }
    }
  }
}
html::after {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  content: "";
  background-image: url("https://unsplash.com/photos/4QmSdCP4bhM/download?force=true&w=1920");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  filter: blur(10px);
}
</style>
<script>
export default {
  data() {
    return {
      searchText: "",
      rwdState: false,
      headerAnimate: false,
      scrollTemp: "",
      searBarAnimate: false,
      tokenPost: {
        token: undefined,
        tokenStr: undefined,
        backName: "",
      },
      navBarSwitch: true,
      navBarAnimate: false,
      childrenOrder: 2,
      routeLineAimate: false,
    };
  },
  watch: {
    rwdState(status) {
      if (status == true) {
        document.body.style.paddingBottom = `${
          this.domSelector(".nav-bar-rwd").offsetHeight
        }px`;
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.rwdState == true
        ? window.addEventListener("scroll", this.whenRwdScroll)
        : window.addEventListener("scroll", this.whenScroll);
      window.addEventListener("keypress", (e) => {
        if (e.keyCode == 13) {
          this.transToPartail();
        }
      });
    }, 300);
  },
  methods: {
    domSelector(el) {
      return document.querySelector(el);
    },
    transToPartail() {
      this.$children[this.childrenOrder].getSearch("", this.searchText);
    },
    currentLink(currentText) {
      if (currentText == "collect") {
        this.routeLineAimate = true;
        this.headerAnimate = true;
        document.body.style.paddingTop = "";
        this.domSelector(".header-rwd").style.top = "-10%";
        window.removeEventListener("scroll", this.whenRwdScroll);
        setTimeout(() => {
          this.navBarAnimate = true;
          setTimeout(() => {
            this.navBarAnimate = false;
            this.navBarSwitch = true;
          }, 700);
        }, 1000);
      } else {
        window.addEventListener("scroll", this.whenRwdScroll);
        this.domSelector(".header-rwd").style.top = "";
        this.routeLineAimate = false;
      }
    },
    whenScroll() {
      if (window.scrollY > 100) {
        this.headerAnimate = true;
        document.body.style.paddingTop = `${
          this.domSelector(".header").offsetHeight
        }px`;
      } else {
        this.headerAnimate = false;
        document.body.style.paddingTop = "";
      }
    },
    whenRwdScroll() {
      window.scrollY > this.domSelector(".header-rwd").offsetHeight
        ? (this.headerAnimate = true)
        : (this.headerAnimate = false);
      this.headerAnimate == false
        ? (document.body.style.paddingTop = "")
        : (document.body.style.paddingTop = `${
            this.domSelector(".header-rwd").offsetHeight
          }px`);
    },
    backPage() {
      this.childrenOrder = 0;
      this.navBarAnimate = true;
      setTimeout(() => {
        this.navBarAnimate = false;
        this.navBarSwitch = true;
      }, 700);
      let tokenPost = this.tokenPost;
      this.$router.push({ name: tokenPost.backName, params: { tokenPost } });
    },
  },
  created() {
    window.innerWidth <= 414 ? (this.rwdState = true) : (this.rwdState = false);
    console.log(this);
  },
};
</script>
