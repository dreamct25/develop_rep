<template>
  <div class="page-outer">
    <div class="container-fluid">
      <div class="row no-gutters">
        <div
          class="col-lg-3 col-md-4"
          v-for="(items, index) in youtubeData"
          :key="index"
        >
          <div class="video-list-outer">
            <div class="video-img-outer">
              <img :src="items.videoImg" />
              <span>{{ items.videoResolution }}</span>
              <span>{{ items.videoDuration }}</span>
            </div>
            <div class="video-text">
              <div class="video-text-header">
                <span class="video-name" @click="goVideo(items.videoID)">{{
                  items.videoTitle
                }}</span>
                <span
                  class="stars"
                  :class="{ 'star-active': items.haveCollect }"
                  @click="
                    setCollect(
                      index,
                      items.videoImg,
                      items.videoID,
                      items.videoTitle,
                      items.videoChannelTitle,
                      items.videoViewsTimes,
                      items.videoDesc
                    )
                  "
                >
                  <i class="fas fa-star"></i>
                </span>
              </div>
              <div class="video-text-body">
                <span>{{ items.videoChannelTitle }}</span>
              </div>
              <div class="video-text-footer">
                <span>{{ items.videoUploadDate }}</span>
                <span>觀看次數：{{ items.videoViewsTimes }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-group" v-for="(page, index) in pagesToken" :key="index">
      <div
        v-if="page.prev != undefined"
        class="prev"
        :class="{ 'btn-active': prevAnimate }"
        @click="getYoutube(page.prev, 'prev')"
      >
        上一頁
      </div>
      <div
        v-if="page.next != undefined"
        class="next"
        :class="{ 'btn-active': nextAnimate }"
        @click="getYoutube(page.next, 'next')"
      >
        下一頁
      </div>
    </div>
    <div class="float-text"></div>
    <div class="collect-alert-text"></div>
  </div>
</template>
<style lang="scss" scoped>
.page-outer {
  padding: 25px 10px;
  .video-list-outer {
    overflow: hidden;
    margin: 10px;
    color: white;
    background-color: rgb(60, 60, 60);
    border-radius: 10px;
    transition: 0.7s ease;
    transform: scale(1);
    box-shadow: 0 0 3px 1px rgba(255, 255, 255, 0.7);
    opacity: 0;
    animation: video-show 1s linear forwards;

    span {
      display: block;
      padding: 0 8px 0 8px;
    }

    .video-img-outer {
      overflow: hidden;
      position: relative;
      img {
        margin: -10% 0;
        width: 100%;
        height: 100%;
        transform: scale(1);
        transition: 20s ease;
      }
      span:nth-of-type(1) {
        padding: 1px 8px 0px 8px;
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        overflow: hidden;
        text-overflow: ellipsis;
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
        transform: translate(-20%, 30%);
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        border-radius: 5px;
      }
      span:nth-of-type(2) {
        position: absolute;
        bottom: 0;
        right: 0;
        transform: translate(1%, 5%);
        padding: 3px 8px 2px 8px;
        border-radius: 5px 0 0 0;
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }

    .video-text {
      padding: 8px;
      line-height: 30px;
      border-top: 1px solid rgba(255, 255, 255, 0.7);
      span {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .video-text-header {
        display: flex;
        justify-content: space-between;
        span:nth-of-type(1) {
          width: unset;
          cursor: pointer;
          user-select: none;
          color: white;
          font-weight: bold;
          transition: 0.7s ease;
        }
        span:nth-of-type(1):hover {
          cursor: pointer;
          user-select: none;
          color: red;
        }
        span:nth-of-type(2) {
          width: unset;
          display: block;
          overflow: unset;
          text-overflow: unset;
          -webkit-line-clamp: unset;
          -webkit-box-orient: unset;
          cursor: pointer;
          user-select: none;
          transition: 0.7s ease;
        }
        .star-active {
          color: yellow;
        }
      }
      .video-text-body {
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
      .video-text-footer {
        display: flex;
        justify-content: space-between;
        span:nth-of-type(1) {
          text-align: left;
        }
        span:nth-of-type(2) {
          text-align: right;
        }
        .text-right {
          text-align: right !important;
        }
      }
    }
  }
  @keyframes video-show {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @media screen and (min-width: 768px) {
    .video-list-outer:hover {
      box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.7);
      transform: scale(1.05);
      .video-img-outer {
        img {
          transform: scale(1.5);
        }
      }
    }
  }

  .btn-group {
    display: flex;
    justify-content: center;
    margin: 15px auto 0 auto;
    .prev,
    .next {
      margin: 0 5px;
      padding: 3px 45px;
      color: white;
      background-color: black;
      border-radius: 5px;
      font-size: 20px;
      cursor: pointer;
      user-select: none;
      transition: 0.5s ease;
      box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
        0 0 0 0 rgba(255, 255, 255, 0.7);
    }
    .btn-active {
      color: black;
      box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.7),
        0 0 3px 0 rgba(255, 255, 255, 0.7);
      background-color: white;
    }
  }
  .float-text {
    border-radius: 10px;
    box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
    padding: 5px 10px 5px 10px;
    background-color: rgba(0, 0, 0, 0.7);
    display: none;
    transition: 0.2s ease;
    color: white;
    position: fixed;
  }
  .float-text-toggle {
    display: block;
  }
  .collect-alert-text {
    border-radius: 10px;
    box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.7);
    padding: 6px 15px 5px 15px;
    background-color: white;
    opacity: 0;
    transition: 0.7s ease;
    color: black;
    position: fixed;
    z-index: -1;
    top: 25%;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 18px;
  }
  .collect-alert-text-toggle {
    opacity: 1;
    z-index: 3;
  }
}
</style>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      searchText: this.$parent.searchText,
      youtubeDataTemp: [],
      youtubeData: [],
      collectTemp: [],
      pagesToken: [],
      prevAnimate: false,
      nextAnimate: false,
      currentToken: {
        token: undefined,
        tokenStr: undefined,
        backName: "",
      },
    };
  },
  methods: {
    videoTimeFormat(timeText) {
      let newTimeText = "";
      let addSecondes = timeText.match("S");
      let timeTextTemp = null;
      let timeTextTempArray = [];
      let newTimeTextTempArray = [];
      if (addSecondes == null) {
        timeTextTemp = [...timeText, "0S"].join("");
        timeTextTemp = timeTextTemp.replace(/PT/g, "");
      } else {
        timeTextTemp = timeText.replace(/PT/g, "");
      }

      timeTextTempArray = timeTextTemp.split(/[A-Z]/g);

      if (timeTextTempArray.length == 2) {
        timeTextTempArray.splice(1, 1);
        newTimeTextTempArray = ["0", "0", ...timeTextTempArray];
      } else if (timeTextTempArray.length == 3) {
        timeTextTempArray.splice(2, 1);
        newTimeTextTempArray = ["0", ...timeTextTempArray];
      } else if (timeTextTempArray.length == 4) {
        timeTextTempArray.splice(3, 1);
        newTimeTextTempArray = [...timeTextTempArray];
      }

      newTimeText = this.timeFomat(...newTimeTextTempArray);

      return newTimeText;
    },
    timeFomat(hours, minutes, seconds) {
      let timeText = `${Number(hours) < 10 && Number(hours) != 0 ? "0" : ""}${
        hours == "0" ? "" : `${hours}：`
      }${Number(minutes) < 10 ? "0" : ""}${
        minutes == "00" ? "0：" : `${minutes}：`
      }${Number(seconds) < 10 ? "0" : ""}${seconds}`;
      return timeText;
    },
    dateTimeFormat(dateText) {
      const date = new Date(dateText);
      let newDateText = `${date.getFullYear()}-${
        date.getMonth() + 1 < 10 ? "0" : ""
      }${date.getMonth() + 1}-${
        date.getDate() < 10 ? "0" : ""
      }${date.getDate()}`;
      return newDateText;
    },
    viewTimesFormat(num) {
      let newNumText =
        Number(num) >= 10000 ? `${num.slice(0, 3)} 萬次` : `${num} 次`;
      return newNumText;
    },
    textFormaet(text) {
      let newText = text.replace(/(?:\r\n|\r|\n)/g, "<br/>");
      return newText;
    },
    goVideo(id) {
      let postUrl = `http://www.youtube.com/watch?v=${id}`;
      let videoItem = this.youtubeData.filter((key) => key.videoID == id);
      this.$parent.tokenPost = this.currentToken;
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
    showFloatText(e) {
      if (e.target.className == "video-name") {
        $(".float-text")
          .addClass("float-text-toggle")
          .css("top", `${e.clientY + 25}px`)
          .css("left", `${e.clientX - 120}px`);
        $(".float-text").text(e.target.textContent);
      } else {
        $(".float-text").removeClass("float-text-toggle");
      }
    },
    getSearch(haveToken, searchText) {
      this.searchText = searchText;
      this.pagesToken = [];
      this.axios
        .get("https://www.googleapis.com/youtube/v3/search", {
          params: {
            part: "id,snippet",
            q: this.searchText,
            pageToken: haveToken.replace(/&pageToken=/, ""),
            maxResults: 12,
            key: "AIzaSyCtLs0Xru5sTXdh2B6WGTGRmN0WK7MUw1Y",
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            this.getSearchItemsDetails(res.data.items);
            this.pagesToken.push({
              prev: res.data.prevPageToken,
              next: res.data.nextPageToken,
            });
          }
        });
      this.$parent.rwdState == true ? this.$parent.currentLink("home") : null;
    },
    setCollect(indexs, img, id, title, channel, viewCount, desc) {
      let pos = null;
      let filterArray = [];
      this.collectTemp.forEach((key, index) => {
        if (key.videoID == id) {
          filterArray.push(key);
          pos = index;
        }
      });

      if (filterArray.length == 0) {
        this.collectTemp.push({
          videoImgUrl: img,
          videoID: id,
          videoUrl: `http://www.youtube.com/watch?v=${id}`,
          videoTitle: title,
          videoChannelTitle: channel,
          videoViewsTimes: viewCount,
          videoDesc: desc,
          videoCurrentPlay: false,
        });
        $.each($(".stars"), (index, key) => {
          if (index == indexs) key.classList.add("star-active");
        });
        $(".collect-alert-text").text("已加入收藏庫");
        $(".collect-alert-text").addClass("collect-alert-text-toggle");
        setTimeout(
          () =>
            $(".collect-alert-text").removeClass("collect-alert-text-toggle"),
          700
        );
      } else {
        $.each($(".stars"), (index, key) => {
          if (index == indexs) key.classList.remove("star-active");
        });
        this.collectTemp.splice(pos, 1);
        $(".collect-alert-text").text("已從收藏庫中移除");
        $(".collect-alert-text").addClass("collect-alert-text-toggle");
        setTimeout(
          () =>
            $(".collect-alert-text").removeClass("collect-alert-text-toggle"),
          700
        );
      }

      localStorage.setItem("item", JSON.stringify(this.collectTemp));
      this.collectTemp = JSON.parse(localStorage.getItem("item")) || [];
    },
    getSearchItemsDetails(arrayItems) {
      this.youtubeDataTemp = [];
      this.youtubeData = [];
      arrayItems.forEach((key) => {
        this.axios
          .get(
            `https://www.googleapis.com/youtube/v3/videos?id=${key.id.videoId}`,
            {
              params: {
                part: "snippet,contentDetails,statistics",
                key: "AIzaSyCtLs0Xru5sTXdh2B6WGTGRmN0WK7MUw1Y",
              },
            }
          )
          .then((res) => {
            if (res.status == 200) {
              res.data.items.forEach((key) => {
                this.youtubeDataTemp.push({
                  videoChannelID: key.snippet.channelId,
                  videoChannelTitle: key.snippet.channelTitle,
                  videoID: key.id,
                  videoResolution: key.contentDetails.definition.toUpperCase(),
                  videoImg: key.snippet.thumbnails.high.url,
                  videoTitle: key.snippet.localized.title,
                  videoDesc: this.textFormaet(
                    key.snippet.localized.description
                  ),
                  videoDuration: this.videoTimeFormat(
                    key.contentDetails.duration
                  ),
                  videoUploadDate: this.dateTimeFormat(key.snippet.publishedAt),
                  videoViewsTimes: this.viewTimesFormat(
                    key.statistics.viewCount
                  ),
                  haveCollect: false,
                });
              });
            }
            this.youtubeData = this.youtubeDataTemp;
            this.collectTemp.forEach((col) => {
              this.youtubeDataTemp.forEach((key, index) => {
                if (key.videoID == col.videoID) {
                  this.youtubeData[index].haveCollect = true;
                }
              });
            });
          });
      });
    },
    tokenOption(token, tokenStr) {
      this.currentToken.token = token;
      this.currentToken.tokenStr = tokenStr;
      this.currentToken.backName = "home";
      this.$parent.tokenPost = this.currentToken;
      if (token == undefined && tokenStr == undefined) tokenStr = "default";
      let tokenCurrentStr = "";
      switch (tokenStr) {
        case "default":
          tokenCurrentStr = "";
          break;
        case "prev":
          tokenCurrentStr = `&pageToken=${token}`;
          this.prevAnimate = true;
          setTimeout(() => (this.prevAnimate = false), 500);
          break;
        case "next":
          tokenCurrentStr = `&pageToken=${token}`;
          this.nextAnimate = true;
          setTimeout(() => (this.nextAnimate = false), 500);
          break;
      }
      return tokenCurrentStr;
    },
    getYoutube(token, tokenStr) {
      $.each($(".stars"), (index, key) => key.classList.remove("star-active"));
      let haveToken = this.tokenOption(token, tokenStr);
      if (this.searchText != "") {
        this.getSearch(haveToken, this.searchText);
        return;
      }
      this.axios
        .get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=12&regionCode=us&videoCategoryId=10${haveToken}&key=AIzaSyCtLs0Xru5sTXdh2B6WGTGRmN0WK7MUw1Y`
        )
        .then((res) => {
          this.youtubeDataTemp = [];
          this.youtubeData = [];
          this.pagesToken = [];
          if (res.status == 200) {
            res.data.items.forEach((key) => {
              this.youtubeDataTemp.push({
                videoChannelID: key.snippet.channelId,
                videoChannelTitle: key.snippet.channelTitle,
                videoID: key.id,
                videoResolution: key.contentDetails.definition.toUpperCase(),
                videoImg: key.snippet.thumbnails.high.url,
                videoTitle: key.snippet.localized.title,
                videoDesc: this.textFormaet(key.snippet.localized.description),
                videoDuration: this.videoTimeFormat(
                  key.contentDetails.duration
                ),
                videoUploadDate: this.dateTimeFormat(key.snippet.publishedAt),
                videoViewsTimes: this.viewTimesFormat(key.statistics.viewCount),
                haveCollect: false,
              });
            });
            this.pagesToken.push({
              prev: res.data.prevPageToken,
              next: res.data.nextPageToken,
            });
          }
          this.youtubeData = this.youtubeDataTemp;
          this.collectTemp.forEach((col) => {
            this.youtubeDataTemp.forEach((key, index) => {
              if (key.videoID == col.videoID) {
                this.youtubeData[index].haveCollect = true;
              }
            });
          });
        });
      $("html, body").animate({ scrollTop: 0 }, 1000);
    },
  },
  created() {
    if (this.$parent.tokenPost.token != undefined) {
      this.currentToken.token = this.$parent.tokenPost.token;
      this.currentToken.tokenStr = this.$parent.tokenPost.tokenStr;
    }
    window.addEventListener("mousemove", this.showFloatText);
    this.collectTemp = JSON.parse(localStorage.getItem("item")) || [];
    this.getYoutube(this.currentToken.token, this.currentToken.tokenStr);
  },
  destroyed() {
    window.removeEventListener("mousemove", this.showFloatText);
  },
};
</script>