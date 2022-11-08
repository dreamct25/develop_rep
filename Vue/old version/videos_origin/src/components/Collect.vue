<template>
  <div class="container-fluid">
    <div class="header-collect">
      <h1>我的收藏影片</h1>
    </div>
    <div class="row board">
      <div class="col-md-10">
        <div class="search-collect-outer">
          <div class="play-all" @click="goAllVideo">全部播放</div>
          <input
            type="text"
            v-model="searchText"
            placeholder="-- 搜尋收藏影片名稱 --"
          />
          <div class="search-btn" @click="searchInCollect">搜尋</div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" v-if="rwdState == false">
      <div class="col-10">
        <div class="collect-grid-outer">
          <div class="collect-grid-header">
            <div></div>
            <div>影片頻道</div>
            <div>影片名稱</div>
            <div>影片連結</div>
            <div>觀看次數</div>
            <div>刪除收藏</div>
          </div>
          <div class="collect-grid-body">
            <div
              class="collect-grid"
              v-for="(item, index) in collectTemp"
              :key="index"
            >
              <span>
                <img :src="item.videoImgUrl" />
              </span>
              <span>{{ item.videoChannelTitle }}</span>
              <span>{{ item.videoTitle }}</span>
              <span @click="goVideo(item.videoUrl, item.videoID)"
                >{{ item.videoUrl }}<span></span
              ></span>
              <span>{{ item.videoViewsTimes }}</span>
              <span @click="deleteCollect(item.videoID)"
                ><i class="fas fa-times cross"></i
              ></span>
            </div>
          </div>
          <div class="collect-grid-footer">
            <div v-if="searchCount != 0">
              已搜尋到 {{ searchCount }} 部收藏影片，
            </div>
            <div>收藏影片總數 {{ collect.length }} 部</div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-outer-rwd" v-else>
      <div class="collect-count-outer">
        <div v-if="searchCount != 0">
          已搜尋到 {{ searchCount }} 部收藏影片，
        </div>
        收藏影片總數 {{ collect.length }} 部
      </div>
      <div
        class="collect-list-outer"
        v-for="(item, index) in collectTemp"
        :key="index"
      >
        <div class="row no-gutters">
          <div class="col-md-12">
            <div class="img-outer">
              <img :src="item.videoImgUrl" />
            </div>
          </div>
          <div class="collect-body">
            <div class="row no-gutters">
              <div class="col-3"><span>影片頻道</span></div>
              <div class="col-9">
                <span>{{ item.videoChannelTitle }}</span>
              </div>
              <div class="col-3"><span>影片名稱</span></div>
              <div class="col-9">
                <span>{{ item.videoTitle }}</span>
              </div>
              <div class="col-3"><span>影片連結</span></div>
              <div class="col-9">
                <span @click="goVideo(item.videoUrl, item.videoID)">{{
                  item.videoUrl
                }}</span>
              </div>
              <div class="col-3"><span>觀看次數</span></div>
              <div class="col-9">
                <span>{{ item.videoViewsTimes }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="collect-footer">
          <span @click="deleteCollect(item.videoID)">刪除收藏</span>
        </div>
      </div>
    </div>
    <Pagination
      v-if="collectTemp.length != 0"
      :pageItem="paginationItem"
      v-on:prev="getCollect"
      v-on:current="getCollect"
      v-on:next="getCollect"
    />
    <Modal
      v-if="ModalOption"
      :text="message"
      v-on:cancle="closeMessage"
      v-on:confirm="confirmMessage"
    />
    <ModalAlert :text="message" v-else />
  </div>
</template>
<style lang="scss" scoped>
.header-collect {
  text-align: center;
  color: white;
  margin: 40px 0 20px 0;
}
.search-collect-outer {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  .play-all {
    background-color: black;
    color: white;
    padding: 3px 15px 0 15px;
    border-radius: 10px;
    box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
    margin: 0 15px;
    cursor: pointer;
    user-select: none;
  }
  input[type="text"] {
    -webkit-appearance: none;
    color: white;
    margin-right: 1px;
    border-radius: 10px 0 0 10px;
    transition: 0.7s ease;
    box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.8);
    background-color: black;
    text-align: center;
    border: none;
    outline: none;
    border-radius: 10px 0 0 10px;
    transition: 0.7s ease;
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
    .play-all {
      padding: 5px 15px 0 15px;
    }
    input[type="text"] {
      padding-top: 5px;
    }
    .search-btn {
      padding: 5px 15px 3px 15px;
    }
  }
}
.collect-grid-outer {
  .collect-grid-header {
    display: grid;
    grid-template-columns: 172px 200px 350px auto 100px 100px;
    grid-template-rows: auto;
    color: white;
    font-size: 18px;
    text-align: center;
    text-shadow: 0 2px 1px rgba(0, 0, 0, 0.7);
    padding: 10px 0 20px 0;
  }
  .collect-grid-body {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-row-gap: 20px;
    .collect-grid {
      display: grid;
      grid-template-columns: 172px 200px 350px auto 100px 100px;
      grid-template-rows: auto;
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 10px;
      text-align: center;
      overflow: hidden;
      box-shadow: 0 0 5px 1px rgba(60, 60, 60, 0.7);
      transform: scale(1);
      transition: 0.7s ease;
      span {
        display: block;
        color: black;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 35px 5px 35px 5px;
      }
      span:nth-of-type(1) {
        position: relative;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
        transition: 0.7s ease;
        img {
          width: 100%;
          position: absolute;
          top: -18%;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }
      span:nth-of-type(4) {
        position: relative;
        cursor: pointer;
        user-select: none;
        transition: 0.7s ease;
        span {
          position: absolute;
          transform: translateX(5.5%);
          top: 70%;
          left: 50%;
          width: 0;
          height: 2px;
          box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
          background-color: rgba(255, 255, 255, 0);
          transition: 0.7s ease;
          border-radius: 20px;
          padding: 0;
        }
      }

      span:nth-of-type(4):hover {
        text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.7);
        span {
          left: 0%;
          box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.7);
          width: 90%;
          background-color: rgba(255, 255, 255, 0.7);
        }
      }
      span:nth-of-type(6) {
        position: relative;
        border-radius: 0 10px 10px 0;
        .cross {
          position: absolute;
          top: 50%;
          left: 50%;
          font-size: 20px;
          transform: translate(-50%, -45%) scale(1);
          transition: 0.35s ease;
          cursor: pointer;
          user-select: none;
        }
      }
      span:nth-of-type(6) {
        .cross:hover {
          transform: translate(-50%, -45%) scale(1.5);
        }
      }
    }
    .collect-grid:hover {
      transform: scale(1.05);
      box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.7);
      span:nth-of-type(1) {
        box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.7);
      }
    }
  }
  .collect-grid-footer {
    color: white;
    text-shadow: 0 2px 1px rgba(0, 0, 0, 0.7);
    padding: 20px 0 10px 0;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    justify-content: flex-end;
  }
}
@media screen and (max-width: 768px) {
  .table-outer-rwd {
    .collect-count-outer {
      display: flex;
      justify-content: flex-end;
      color: white;
      font-size: 18px;
    }
    .collect-list-outer {
      overflow: hidden;
      background-color: rgba(255, 255, 255, 0.8);
      margin: 15px 0 15px 0;
      border-radius: 10px;
      box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.7),
        0 0 7px 2px rgba(255, 255, 255, 0.5);
      .img-outer {
        overflow: hidden;
        img {
          width: 100%;
          margin: -10% auto;
        }
      }
      .collect-body {
        line-height: 30px;
        padding: 4px 10px 4px 10px;
        border-top: 2px solid white;
        border-bottom: 2px solid white;
        .col-3 {
          span {
            display: block;
            text-align: center;
          }
        }
        .col-9 {
          span {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
      }
      .collect-footer {
        span {
          display: block;
          text-align: center;
          background-color: red;
          color: white;
          padding: 10px 0 10px 0;
        }
      }
    }
  }
}
</style>
<script>
import $ from "jquery";
import Modal from "../components/Modal.vue";
import ModalAlert from "../components/ModalAlert.vue";
import modalPugin from "../customPlugin/js/Modal.js";
import Pagination from "../components/Pagination.vue";
export default {
  data() {
    return {
      collect: [],
      collectTemp: [],
      collectPageTemp: [],
      rwdState: false,
      rwdStateOnPad: false,
      searchText: "",
      searchCount: 0,
      message: "",
      hasConfirm: false,
      indexTemp: null,
      filterArray: [],
      ModalOption: false,
      paginationItem: {},
    };
  },
  components: {
    Modal,
    ModalAlert,
    Pagination,
  },
  mounted() {
    setTimeout(() => {
      if (this.rwdStateOnPad == true) {
        $(".board").addClass("justify-content-end");
      } else {
        $(".board").addClass("justify-content-center");
      }
    }, 100);
  },
  methods: {
    closeMessage() {
      this.hasConfirm = false;
      this.itemHasDelete();
    },
    confirmMessage() {
      this.hasConfirm = true;
      this.itemHasDelete();
    },
    paginationPart(pages) {
      this.paginationItem = {};
      this.paginationItem.totalLength = this.collectTemp.length;

      this.paginationItem.partPage = this.rwdState == false ? 10 : 8;
      this.paginationItem.pageTotal = Math.ceil(
        this.paginationItem.totalLength / this.paginationItem.partPage
      );
      pages == undefined ? (pages = 1) : pages;
      this.paginationItem.currentPage = pages;
      this.paginationItem.hasPage = this.paginationItem.currentPage > 1;
      this.paginationItem.hasNext =
        this.paginationItem.currentPage < this.paginationItem.totalLength;
      if (this.paginationItem.currentPage == this.paginationItem.pageTotal)
        this.paginationItem.hasNext = false;
      if (this.paginationItem.currentPage > this.paginationItem.pageTotal)
        this.paginationItem.currentPage = this.paginationItem.pageTotal;

      const minPage =
        this.paginationItem.currentPage * this.paginationItem.partPage -
        this.paginationItem.partPage +
        1;
      const maxPage =
        this.paginationItem.currentPage * this.paginationItem.partPage;

      this.collectPageTemp = this.collectTemp;
      this.collectTemp = [];
      this.collectPageTemp.forEach((key, index) => {
        let num = index + 1;
        if (num >= minPage && num <= maxPage) {
          this.collectTemp.push(key);
        }
      });
    },
    getCollect(pages) {
      this.collect = JSON.parse(localStorage.getItem("item")) || [];
      this.collectTemp = this.collect;
      this.paginationPart(pages);
      let time = this.hasConfirm == true ? 750 : 300;
      setTimeout(() => {
        if (this.collect.length == 0) {
          this.ModalOption = false;
          modalPugin.show();
          this.message = "您未加入任何收藏影片";
          setTimeout(() => modalPugin.close(), 1200);
          setTimeout(() => {
            this.$router.push("/");
            setTimeout(
              () =>
                this.$parent.rwdState == true
                  ? this.$parent.currentLink("home")
                  : null,
              1000
            );
          }, 1950);
        }
      }, time);
    },
    goVideo(url, id) {
      let postUrl = url;
      let videoItem = this.collect.filter((key) => key.videoID == id);
      this.$parent.tokenPost.backName = "collect";
      this.$parent.navBarAnimate = true;
      setTimeout(() => {
        this.$parent.navBarSwitch = false;
        this.$parent.navBarAnimate = false;
      }, 700);
      this.$router.push({
        name: "video",
        params: { postUrl, videoItem },
      });
    },
    goAllVideo() {
      this.$router.push({ name: "video_all", params: { fromCollect: true } });
    },
    searchInCollect() {
      let filterArray = [];
      if (this.searchText == "") {
        this.searchCount = 0;
        this.collectTemp = this.collect;
      } else {
        this.collect.filter((key) => {
          let filterText = key.videoTitle
            .toLowerCase()
            .match(this.searchText.toLowerCase());
          if (filterText != null) {
            filterArray.push(key);
          }
        });
        this.collectTemp = filterArray;
        this.searchCount = filterArray.length;
      }
    },
    deleteCollect(id) {
      this.ModalOption = true;
      setTimeout(() => {
        modalPugin.show();
        this.collect.forEach((key, index) => {
          if (key.videoID == id) {
            this.message = `確定要刪除 ${key.videoTitle} <br>這部影片嗎？`;
            this.indexTemp = index;
            this.filterArray.push(key);
          }
        });
      }, 200);
    },
    itemHasDelete() {
      if (this.hasConfirm == true) {
        if (this.filterArray.length != 0) {
          modalPugin.close();
          setTimeout(() => (this.ModalOption = false), 750);
          setTimeout(() => {
            modalPugin.show();
            this.message = "此部影片已從您的影片收藏庫中刪除";
          }, 950);
          setTimeout(() => {
            modalPugin.close();
          }, 2150);
          setTimeout(() => {
            this.collect.splice(this.indexTemp, 1);
            localStorage.setItem("item", JSON.stringify(this.collect));
            this.getCollect();
            this.filterArray = [];
            this.indexTemp = null;
          }, 2250);
        }
      } else {
        modalPugin.close();
        this.filterArray = [];
        this.indexTemp = null;
        setTimeout(() => (this.ModalOption = false), 750);
        setTimeout(() => {
          modalPugin.show();
          this.message = "無更動影片收藏庫";
        }, 950);
        setTimeout(() => modalPugin.close(), 2150);
      }
    },
  },
  created() {
    window.innerWidth <= 768 ? (this.rwdState = true) : (this.rwdState = false);
    window.innerWidth > 414 && window.innerWidth <= 768
      ? (this.rwdStateOnPad = true)
      : (this.rwdStateOnPad = false);
    this.getCollect();
    window.removeEventListener("scroll", this.$parent.whenRwdScroll);
  },
};
</script>