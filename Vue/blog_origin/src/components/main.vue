<template>
  <div>
    <div class="area">
      <div class="banner">
        <div class="header">
          <h1 @click="goMain">Chen</h1>
          <span>熱愛攝影與心理學的前端菜菜</span>
        </div>
        <div class="little-text">
          <div class="arrow-left"></div>
          <span>Enjoy Our Height Life</span>
        </div>
        <div class="rwd-nav" v-if="windowOuter == true">
          <div class="rwd-nav-icon" @click="showRwdNav">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="top-outer">
          <div class="arrow-down"></div>
        </div>
        <div class="container-fluid">
          <div class="row" :class="{ 'justify-content-center': windowOuter }">
            <div
              class="col-md-8"
              v-if="chooseStatus == false"
              :class="{ 'col-md-12': sideNavStatus == false }"
            >
              <div class="descrip-outer">
                <div class="top-group">
                  <div
                    class="type-I"
                    @mouseenter="showDetails((num = 0))"
                    @mouseleave="hideDetails((num = 0))"
                    @click="showNav"
                  >
                    <span class="type-title" v-if="windowOuter == false">
                      目前僅限台灣各地
                      <br />點擊顯示右側選單查看
                    </span>
                    <span class="type-title" v-else>
                      目前僅限台灣各地
                      <br />頁面將自動顯示選單
                    </span>
                    <div class="black-frame">
                      <span class="black-frame-title">攝影</span>
                    </div>
                  </div>
                </div>
                <div class="bottom-group">
                  <div
                    class="type-II"
                    @mouseenter="showDetails((num = 1))"
                    @mouseleave="hideDetails((num = 1))"
                    @click="showNav"
                  >
                    <span class="type-title" v-if="windowOuter == false">
                      心理學研究
                      <br />點擊顯示右側選單查看
                    </span>
                    <span class="type-title" v-else>
                      心理學研究
                      <br />頁面將自動顯示選單
                    </span>
                    <div class="black-frame">
                      <span class="black-frame-title">心理學</span>
                    </div>
                  </div>
                  <div
                    class="type-III"
                    @mouseenter="showDetails((num = 2))"
                    @mouseleave="hideDetails((num = 2))"
                    @click="showNav"
                  >
                    <span class="type-title" v-if="windowOuter == false">
                      以前端與框架為主呦
                      <br />點擊顯示右側選單查看
                    </span>
                    <span class="type-title" v-else>
                      以前端與框架為主呦
                      <br />頁面將自動顯示選單
                    </span>
                    <div class="black-frame">
                      <span class="black-frame-title">程式語言</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="col-md-8">
              <router-view />
            </div>
            <div class="col-md-4" v-if="sideNavStatus == true">
              <div class="row justify-content-center">
                <div class="col-md-10">
                  <div class="side-nav-outer">
                    <div class="side-nav">
                      <div class="article-type-outer">
                        <label for="types">文章種類</label>
                        <select
                          id="types"
                          v-model="optionTypeDefault"
                          @change="
                            selectContent(
                              (selectT = true),
                              (selectY = false),
                              (selectM = false)
                            )
                          "
                        >
                          <option :value="null" disabled>請選擇種類</option>
                          <option
                            v-for="(type, index) in typeItems"
                            :key="index"
                            :value="type.typeNum"
                          >
                            {{ type.typeName }}
                          </option>
                        </select>
                      </div>
                      <div class="date-group-outer">
                        <span>文章日期</span>
                        <div class="date-group">
                          <select
                            v-model="optionYearDefault"
                            @change="
                              selectContent(
                                (seletT = true),
                                (selectY = true),
                                (selectM = false)
                              )
                            "
                          >
                            <option :value="null" disabled>請選擇年份</option>
                            <option
                              v-for="(year, index) in 6"
                              :value="`202${index}`"
                              :key="index"
                            >
                              {{ `202${index}` }} 年
                            </option>
                          </select>
                          <select
                            v-model="optionMonthDefault"
                            @change="
                              selectContent(
                                (selectT = true),
                                (selectY = true),
                                (selectM = true)
                              )
                            "
                          >
                            <option :value="null" disabled>請選擇月份</option>
                            <option
                              v-for="(month, index) in 12"
                              :value="month"
                              :key="index"
                            >
                              {{ month }} 月
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="all-article-type-group-outer">
                        <div class="all-article-type-group">
                          <ul v-if="getData == true">
                            <li>攝影 ( {{ potographyCollect.length }} )</li>
                            <li>心理學 ( {{ psychologyCollect.length }} )</li>
                            <li>程式語言 ( {{ codeCollect.length }} )</li>
                            <li @click="goDashBoard">文章管理</li>
                          </ul>
                        </div>
                      </div>
                      <div class="near-articles-outer">
                        <div class="near-articles">
                          <div class="near-articles-header">
                            <span>最新文章</span>
                          </div>
                          <div class="near-articles-body">
                            <div
                              class="near-content-group"
                              v-for="(near, index) in nearArticlesLimite"
                              :key="index"
                              @click="goArticle((order = index))"
                            >
                              <span class="near-articles-title">{{
                                near.descripTitle
                              }}</span>
                              <span class="near-articles-date"
                                >{{ near.year }} /
                                {{ 10 > near.monthNum ? "0" : ""
                                }}{{ near.monthNum }} /
                                {{ 10 > near.dateNum ? "0" : ""
                                }}{{ near.dateNum }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-outer">
          <div class="arrow-top"></div>
        </div>
      </div>
      <div class="self-descrip">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-3">
              <div class="self-img">
                <img
                  src="https://drive.google.com/uc?export=view&id=1B3t1sGrCXUosm5ZLxD63pXi1E2UlXn1x"
                  alt
                />
              </div>
            </div>
            <div class="col-md-5">
              <div class="self-about">
                <p>
                  平常喜歡攝影到處晃，喜歡在咖啡廳寫程式，也喜歡研究就心理學，喜歡無拘無束的生活，想透過這個網站分享這個充滿愛的世界，讓人們透過照片知道世界還是有美麗的人事物。
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="self-icon-group-outer">
                <div class="self-icon-group">
                  <div class="fb">
                    <a
                      href="https://www.facebook.com/people/%E9%BB%98%E8%AA%9E/100000226998924"
                    >
                      <i class="fab fa-facebook-square"></i>
                    </a>
                  </div>
                  <div class="ig">
                    <i class="fab fa-instagram"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <h5><i class="fal fa-copyright mx-1"></i>Copyright Chen</h5>
      </div>
    </div>
    <div class="rwd-navbar-outer-frame">
      <div class="rwd-navbar-outer">
        <div class="rwd-navbar">
          <div class="rwd-navbar-header">
            <div class="close-icon-group">
              <div class="close-icon" @click="closeRwdNav">
                <span class="cross-line"></span>
                <span class="cross-line"></span>
              </div>
            </div>
            <span>文章列表</span>
          </div>
          <div class="rwd-navbar-body">
            <div class="side-nav-rwd">
              <div class="article-type-outer">
                <label for="types">文章種類</label>
                <select
                  id="types"
                  v-model="optionTypeDefault"
                  @change="
                    selectContent(
                      (selectT = true),
                      (selectY = false),
                      (selectM = false)
                    )
                  "
                >
                  <option :value="null" disabled>請選擇種類</option>
                  <option
                    v-for="(type, index) in typeItems"
                    :key="index"
                    :value="type.typeNum"
                  >
                    {{ type.typeName }}
                  </option>
                </select>
              </div>
              <div class="date-group-outer">
                <span>文章日期</span>
                <div class="date-group">
                  <select
                    v-model="optionYearDefault"
                    @change="
                      selectContent(
                        (seletT = true),
                        (selectY = true),
                        (selectM = false)
                      )
                    "
                  >
                    <option :value="null" disabled>請選擇年份</option>
                    <option
                      v-for="(year, index) in 6"
                      :value="`202${index}`"
                      :key="index"
                    >
                      {{ `202${index}` }} 年
                    </option>
                  </select>
                  <select
                    v-model="optionMonthDefault"
                    @change="
                      selectContent(
                        (selectT = true),
                        (selectY = true),
                        (selectM = true)
                      )
                    "
                  >
                    <option :value="null" disabled>請選擇月份</option>
                    <option
                      v-for="(month, index) in 12"
                      :value="month"
                      :key="index"
                    >
                      {{ month }} 月
                    </option>
                  </select>
                </div>
              </div>
              <div class="all-article-type-group-outer">
                <div class="all-article-type-group">
                  <ul v-if="getData == true">
                    <li>攝影 ( {{ potographyCollect.length }} )</li>
                    <li>心理學 ( {{ psychologyCollect.length }} )</li>
                    <li>程式語言 ( {{ codeCollect.length }} )</li>
                    <li @click="goDashBoard">文章管理</li>
                  </ul>
                </div>
              </div>
              <div class="near-articles-outer">
                <div class="near-articles">
                  <div class="near-articles-header">
                    <span>最新文章</span>
                  </div>
                  <div class="near-articles-body">
                    <div
                      class="near-content-group"
                      v-for="(near, index) in nearArticlesLimite"
                      :key="index"
                      @click="goArticle((order = index))"
                    >
                      <span class="near-articles-title">{{
                        near.descripTitle
                      }}</span>
                      <span class="near-articles-date"
                        >{{ near.year }} / {{ 10 > near.monthNum ? "0" : ""
                        }}{{ near.monthNum }} / {{ 10 > near.dateNum ? "0" : ""
                        }}{{ near.dateNum }}</span
                      >
                    </div>
                  </div>
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
.area {
  font-family: 微軟正黑體;
  transition: 0.7s ease;
  .banner {
    background-image: url("https://unsplash.com/photos/-WW8jBak7bo/download?force=true&w=1920");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    min-height: 400px;
    position: relative;
    .header {
      padding: 10px 0 0 20px;
      h1 {
        color: white;
        font-style: italic;
        text-shadow: 0 2px 3px rgba(0, 0, 0, 0.7);
      }
      span {
        color: white;
        display: block;
        font-style: italic;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
        letter-spacing: 8px;
        font-size: 18px;
        font-weight: bold;
      }
    }
    @media screen and(max-width: 414px) {
      .header {
        position: fixed;
        z-index: 2;
      }
    }
    .little-text {
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(0, -70%);
      .arrow-left {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 0;
        transform: translate(-100%, 0);
        border-style: solid;
        border-width: 17px 20px 17px 0;
        border-color: transparent rgba(0, 0, 0, 0.8) transparent transparent;
      }
      span {
        color: white;
        display: block;
        font-style: italic;
        font-weight: bold;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
        background-color: rgba(0, 0, 0, 0.8);
        padding: 5px 10px 5px 10px;
      }
    }
    .rwd-nav {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(-40%, 20%);
      z-index: 2;
      .rwd-nav-icon {
        .line {
          display: block;
          width: 30px;
          height: 3px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.7);
          margin: 6px 0 6px 0;
          transition: 0.7s ease;
        }
        .line:nth-of-type(1) {
          transform: translateY(0) rotate(0deg);
        }
        .line:nth-of-type(2) {
          opacity: 1;
          transform: scale(1);
        }
        .line:nth-of-type(3) {
          transform: translateY(0) rotate(0deg);
        }
        .line-ft-active {
          transform: translateY(9px) rotate(135deg) !important;
        }
        .line-sd-active {
          opacity: 0 !important;
          transform: scale(0.1) !important;
        }
        .line-td-active {
          transform: translateY(-9px) rotate(-135deg) !important;
        }
      }
    }
    @media screen and(max-width: 414px) {
      .rwd-nav {
        position: fixed;
        z-index: 4;
      }
    }
  }
  .main {
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.8),
      rgba(235, 235, 235, 0.8),
      rgba(215, 215, 215, 0.8),
      rgba(195, 195, 195, 0.8)
    );
    .top-outer {
      background-color: rgb(230, 230, 230);
      padding: 5px;
      position: relative;
      box-shadow: 0 5px 15px 5px rgba(0, 0, 0, 0.7);
      .arrow-down {
        position: absolute;
        bottom: 0;
        right: 0;
        transform: translate(-100%, 95%);
        z-index: 2;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 20px 15px 0 15px;
        border-color: rgb(230, 230, 230) transparent transparent transparent;
      }
    }
    .col-md-8,
    .col-md-12 {
      transition: 0.7s ease;
    }
    .descrip-outer {
      margin: 10px 0 10px 0;
      .top-group {
        display: flex;
        .type-I {
          position: relative;
          background-image: url("https://unsplash.com/photos/mj2NwYH3wBA/download?force=true&w=1920");
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          min-height: 350px;
          width: 100%;
          margin: 5px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.7);
          .type-title {
            position: absolute;
            bottom: -50%;
            left: 50%;
            transform: translate(-50%, 50%);
            display: block;
            color: white;
            font-size: 18px;
            text-shadow: 0 2px 3px rgba(0, 0, 0, 0.7);
            transition: 0.7s ease;
            text-align: center;
          }
          .type-I-title-active {
            bottom: 50%;
          }
          .black-frame {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.7);
            box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.7);
            border-radius: 10px;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 1;
            transition: 0.7s ease;
            .black-frame-title {
              display: block;
              text-align: center;
              font-size: 25px;
              color: white;
              text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
              opacity: 1;
              transition: 0.4s ease;
            }
            .black-frame-title-hide {
              opacity: 0;
            }
          }
          .black-frame-I-hide {
            opacity: 0;
            bottom: 100%;
          }
        }
        @media screen and (max-width: 768px) {
          .type-I {
            width: 98%;
            margin: 6px;
          }
        }
      }
      .bottom-group {
        display: flex;
        .type-II {
          position: relative;
          background-image: url("https://unsplash.com/photos/QRawWgV6gmo/download?force=true&w=1920");
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          min-height: 350px;
          width: 100%;
          margin: 5px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.7);
          transition: 0.7s ease;
          .type-title {
            position: absolute;
            top: 50%;
            right: -50%;
            transform: translate(50%, -50%);
            display: block;
            color: white;
            text-shadow: 0 2px 3px rgba(0, 0, 0, 0.7);
            text-align: center;
            font-size: 18px;
            transition: 0.7s ease;
          }
          .type-II-title-active {
            right: 50%;
          }
          .black-frame {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.7);
            box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.7);
            border-radius: 10px;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 1;
            transition: 0.7s ease;
            .black-frame-title {
              display: block;
              text-align: center;
              font-size: 25px;
              color: white;
              text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
              opacity: 1;
              transition: 0.4s ease;
            }
            .black-frame-title-hide {
              opacity: 0;
            }
          }
          .black-frame-II-hide {
            opacity: 0;
            right: 100%;
          }
        }
        @media screen and (max-width: 768px) {
          .type-II {
            width: 98%;
          }
        }
        .type-III {
          position: relative;
          background-image: url("https://unsplash.com/photos/4hbJ-eymZ1o/download?force=true&w=1920");
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          min-height: 350px;
          width: 100%;
          margin: 5px;
          border-radius: 10px;
          box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.7);
          overflow: hidden;
          .type-title {
            position: absolute;
            top: 50%;
            left: -50%;
            transform: translate(-50%, -50%);
            display: block;
            color: white;
            text-shadow: 0 2px 3px rgba(0, 0, 0, 0.7);
            text-align: center;
            transition: 0.7s ease;
            font-size: 18px;
          }
          .type-III-title-active {
            left: 50%;
          }
          .black-frame {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.7);
            box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.7);
            border-radius: 10px;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 1;
            transition: 0.7s ease;
            .black-frame-title {
              display: block;
              text-align: center;
              font-size: 25px;
              color: white;
              text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
              opacity: 1;
              transition: 0.4s ease;
            }
            .black-frame-title-hide {
              opacity: 0;
            }
          }
          .black-frame-III-hide {
            opacity: 0;
            left: 100%;
          }
        }
        @media screen and (max-width: 768px) {
          .type-III {
            width: 98%;
          }
        }
      }
      @media screen and (max-width: 768px) {
        .bottom-group {
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .side-nav-outer {
      overflow: hidden;
      padding: 5px;
      .side-nav {
        margin-top: -1000px;
        transition: 0.7s ease;
        .article-type-outer {
          margin-top: 20px;
          label {
            color: black;
            display: block;
            text-align: center;
            margin: 10px 0 10px 0;
            font-weight: bold;
          }
          select {
            color: white;
            margin: 0 2px 0 2px;
            padding: 3px;
            width: 100%;
            font-size: 15px;
            outline: none;
            border: none;
            border-radius: 5px;
            box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
              0 0 2px 1px rgba(0, 0, 0, 0.7);
            background-color: rgba(0, 0, 0, 0.7);
          }
        }
        .date-group-outer {
          margin-top: 20px;
          span {
            color: black;
            display: block;
            text-align: center;
            margin: 10px 0 10px 0;
            font-weight: bold;
          }
          .date-group {
            display: flex;
            select {
              color: white;
              margin: 0 2px 0 2px;
              padding: 3px;
              width: 100%;
              font-size: 15px;
              outline: none;
              border: none;
              border-radius: 5px;
              box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
                0 0 2px 1px rgba(0, 0, 0, 0.7);
              background-color: rgba(0, 0, 0, 0.7);
            }
          }
        }
        .all-article-type-group-outer {
          color: black;
          display: flex;
          justify-content: center;
          margin-top: 20px;
          .all-article-type-group {
            ul {
              list-style: none;
              padding: 5px;
              li {
                margin: 3px 0 3px 0;
                cursor: pointer;
                user-select: none;
              }
            }
          }
          @media screen and(max-width: 414px) {
            .all-article-type-group {
              ul {
                text-align: center;
              }
            }
          }
        }
        .near-articles-outer {
          .near-articles {
            .near-articles-header {
              span {
                display: block;
                text-align: center;
                font-weight: bold;
              }
            }
            .near-articles-body {
              line-height: 1.8em;
              padding: 10px 0 10px 0;
              .near-content-group {
                display: flex;
                justify-content: space-between;
                background-color: rgba(255, 255, 255, 0.7);
                color: black;
                font-weight: bold;
                font-size: 14px;
                padding: 0 5px 0 5px;
                margin: 5px 0 5px 0;
                border-radius: 15px;
                box-shadow: inset 0 0 3px 1px rgba(0, 0, 0, 0.7);
                cursor: pointer;
                user-select: none;
                .near-articles-title {
                  display: block;
                  margin: 0 8px 0 8px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .near-articles-date {
                  display: block;
                  text-align: center;
                  margin: 0 3px 0 3px;
                }
              }
            }
          }
        }
      }
      .side-nav-active {
        margin-top: 0;
      }
    }
    .bottom-outer {
      background-color: rgb(230, 230, 230);
      padding: 5px;
      position: relative;
      box-shadow: 0 5px 15px 5px rgba(0, 0, 0, 0.7);
      transform: rotate(180deg);
      .arrow-top {
        position: absolute;
        bottom: 0;
        right: 0;
        transform: translate(-100%, 95%);
        z-index: 2;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 20px 15px 0 15px;
        border-color: rgb(230, 230, 230) transparent transparent transparent;
      }
    }
  }
  .self-descrip {
    padding: 10px 0 10px 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    .self-img {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      img {
        margin: 20px 0 20px 0;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
          0 0 2px 1px rgba(0, 0, 0, 0.7);
      }
    }
    .self-about {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      line-height: 1.5em;
      height: 100%;
      p {
        margin-bottom: 0;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
      }
    }
    .self-icon-group-outer {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      height: 100%;
      .self-icon-group {
        display: flex;
        font-size: 40px;
        .fb,
        .ig {
          margin: 0 8px 0 8px;
          a {
            color: rgba(255, 255, 255, 0.8);
            text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
            transition: 0.7s ease;
          }
          a:hover {
            color: rgba(0, 0, 0, 0.8);
            text-shadow: 0 0 3px rgba(255, 255, 255, 0.7);
          }
        }
      }
    }
  }
  .footer {
    color: white;
    background-color: rgb(20, 20, 20);
    padding: 10px 0 10px 0;
    text-align: center;
    h5 {
      margin-bottom: 0;
    }
  }
}
.area-block {
  filter: blur(5px);
}
.rwd-navbar-outer-frame {
  display: none;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  opacity: 0;
  transition: 0.7s ease;
  .rwd-navbar-outer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(30, 30, 30);
    box-shadow: -3px 0 10px 2px rgba(0, 0, 0, 0.7);
    color: white;
    transform: translateX(100%);
    transition: 0.7s ease;
    .rwd-navbar-header {
      display: flex;
      align-items: center;
      .close-icon-group {
        .close-icon {
          padding: 10px 20px 10px 20px;
          .cross-line {
            display: block;
            padding: 0;
            width: 20px;
            height: 3px;
            background-color: white;
            box-shadow: 0 0 3px 0px rgba(0, 0, 0, 0.7);
            border-radius: 10px;
            transition: 0.7s ease;
          }
          .cross-line:nth-of-type(1) {
            transform: translateY(3px) rotate(0deg);
          }
          .cross-line:nth-of-type(2) {
            transform: rotate(0deg);
          }
          .cross-line-ft-active {
            transform: translateY(3px) rotate(135deg) !important;
          }
          .cross-line-sd-active {
            transform: rotate(-135deg) !important;
          }
        }
      }
      span {
        display: block;
        padding: 15px 65px 15px 10px;
        margin: 0 auto;
      }
    }
    .rwd-navbar-body {
      .side-nav-rwd {
        padding: 0 20px 0 20px;
        .article-type-outer {
          label {
            color: white;
            display: block;
            text-align: center;
            margin: 10px 0 10px 0;
            font-weight: bold;
          }
          select {
            -webkit-appearance: none;
            color: white;
            margin: 0 2px 0 2px;
            padding: 3px;
            width: 100%;
            font-size: 15px;
            outline: none;
            border: none;
            border-radius: 5px;
            box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
              0 0 2px 1px rgba(0, 0, 0, 0.7);
            background-color: rgba(0, 0, 0, 0.7);
          }
        }
        .date-group-outer {
          margin-top: 20px;
          span {
            color: white;
            display: block;
            text-align: center;
            margin: 10px 0 10px 0;
            font-weight: bold;
          }
          .date-group {
            display: flex;
            select {
              -webkit-appearance: none;
              color: white;
              margin: 0 2px 0 2px;
              padding: 3px;
              width: 100%;
              font-size: 15px;
              outline: none;
              border: none;
              border-radius: 5px;
              box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
                0 0 2px 1px rgba(0, 0, 0, 0.7);
              background-color: rgba(0, 0, 0, 0.7);
            }
          }
        }
        .all-article-type-group-outer {
          color: white;
          display: flex;
          justify-content: center;
          margin-top: 20px;
          .all-article-type-group {
            ul {
              list-style: none;
              padding: 5px;
              li {
                margin: 3px 0 3px 0;
                cursor: pointer;
                user-select: none;
              }
            }
          }
          @media screen and(max-width: 414px) {
            .all-article-type-group {
              ul {
                text-align: center;
              }
            }
          }
        }
        .near-articles-outer {
          .near-articles {
            .near-articles-header {
              span {
                display: block;
                text-align: center;
                font-weight: bold;
              }
            }
            .near-articles-body {
              line-height: 1.8em;
              padding: 10px 0 10px 0;
              .near-content-group {
                display: flex;
                justify-content: space-between;
                background-color: rgba(255, 255, 255, 0.7);
                color: black;
                font-weight: bold;
                font-size: 14px;
                padding: 0 5px 0 5px;
                margin: 5px 0 5px 0;
                border-radius: 15px;
                box-shadow: inset 0 0 3px 1px rgba(0, 0, 0, 0.7);
                cursor: pointer;
                user-select: none;
                .near-articles-title {
                  display: block;
                  margin: 0 8px 0 8px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .near-articles-date {
                  display: block;
                  text-align: center;
                  margin: 0 3px 0 3px;
                }
              }
            }
          }
        }
      }
    }
  }
  .rwd-navbar-outer-active {
    transform: translateX(0.5%);
  }
}
.rwd-navbar-outer-frame-active {
  opacity: 1;
}
</style>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      articles: [],
      articlesTemp: [],
      potographyCollect: [],
      psychologyCollect: [],
      codeCollect: [],
      typeItems: [
        {
          typeNum: 1,
          typeName: "攝影",
        },
        {
          typeNum: 2,
          typeName: "心理學",
        },
        {
          typeNum: 3,
          typeName: "程式語言",
        },
      ],
      optionYearDefault: null,
      optionMonthDefault: null,
      optionTypeDefault: null,
      selectType: [],
      selectPackage: [],
      selectFinal: [],
      pageChange: false,
      conmandDev: false,
      getData: false,
      chooseStatus: false,
      animateItemName: [
        {
          typeNum: 0,
          typeName: "type-I-title-active",
          blackBg: "black-frame-I-hide",
          blackTitle: "black-frame-title-hide",
        },
        {
          typeNum: 1,
          typeName: "type-II-title-active",
          blackBg: "black-frame-II-hide",
          blackTitle: "black-frame-title-hide",
        },
        {
          typeNum: 2,
          typeName: "type-III-title-active",
          blackBg: "black-frame-III-hide",
          blackTitle: "black-frame-title-hide",
        },
      ],
      windowOuter: false,
      sideNavStatus: false,
      imgClickToggle: 0,
      nearArticlesTemp: [],
      nearArticles: [],
      nearArticlesLimite: [],
      monthSliceNum: 5,
    };
  },
  methods: {
    showRwdNav() {
      document.querySelector(".area").classList.add("area-block");
      [...document.querySelectorAll(".line")][0].classList.add(
        "line-ft-active"
      );
      [...document.querySelectorAll(".line")][1].classList.add(
        "line-sd-active"
      );
      [...document.querySelectorAll(".line")][2].classList.add(
        "line-td-active"
      );
      document.querySelector(".rwd-navbar-outer-frame").style.display = "block";
      setTimeout(
        () =>
          document
            .querySelector(".rwd-navbar-outer-frame")
            .classList.add("rwd-navbar-outer-frame-active"),
        100
      );
      setTimeout(() => {
        document
          .querySelector(".rwd-navbar-outer")
          .classList.add("rwd-navbar-outer-active");
      }, 700);
      setTimeout(() => {
        document
          .querySelectorAll(".cross-line")[0]
          .classList.add("cross-line-ft-active");
        document
          .querySelectorAll(".cross-line")[1]
          .classList.add("cross-line-sd-active");
      }, 1400);
    },
    closeRwdNav() {
      [...document.querySelectorAll(".line")][0].classList.remove(
        "line-ft-active"
      );
      [...document.querySelectorAll(".line")][1].classList.remove(
        "line-sd-active"
      );
      [...document.querySelectorAll(".line")][2].classList.remove(
        "line-td-active"
      );
      [...document.querySelectorAll(".cross-line")][0].classList.remove(
        "cross-line-ft-active"
      );
      [...document.querySelectorAll(".cross-line")][1].classList.remove(
        "cross-line-sd-active"
      );
      setTimeout(() => {
        document
          .querySelector(".rwd-navbar-outer")
          .classList.remove("rwd-navbar-outer-active");
        document
          .querySelector(".rwd-navbar-outer-frame")
          .classList.remove("rwd-navbar-outer-frame-active");
        document.querySelector(".area").classList.remove("area-block");
      }, 700);
      setTimeout(
        () =>
          (document.querySelector(".rwd-navbar-outer-frame").style.display =
            ""),
        1401
      );
    },
    showNav() {
      if (window.innerWidth <= 768) {
        setTimeout(() => this.showRwdNav(), 900);
      } else {
        this.imgClickToggle == 0
          ? (this.imgClickToggle += 1)
          : (this.imgClickToggle = 0);
        if (this.imgClickToggle == 0) {
          document
            .querySelector(".side-nav")
            .classList.remove("side-nav-active");
          setTimeout(() => (this.sideNavStatus = false), 700);
        } else {
          this.sideNavStatus = true;
          setTimeout(
            () =>
              document
                .querySelector(".side-nav")
                .classList.add("side-nav-active"),
            500
          );
        }
      }
    },
    showDetails(num) {
      this.animateItemName.forEach((key) => {
        if (key.typeNum == num) {
          [...document.querySelectorAll(".black-frame")][num].classList.add(
            `${key.blackBg}`
          ),
            [...document.querySelectorAll(".black-frame-title")][
              num
            ].classList.add(`${key.blackTitle}`),
            [...document.querySelectorAll(".type-title")][num].classList.add(
              `${key.typeName}`
            );
        }
      });
    },
    hideDetails(num) {
      this.animateItemName.forEach((key) => {
        if (key.typeNum == num) {
          [...document.querySelectorAll(".black-frame")][num].classList.remove(
            `${key.blackBg}`
          ),
            [...document.querySelectorAll(".type-title")][num].classList.remove(
              `${key.typeName}`
            );
          setTimeout(
            () =>
              [...document.querySelectorAll(".black-frame-title")][
                num
              ].classList.remove(`${key.blackTitle}`),
            250
          );
        }
      });
    },
    goMain() {
      setTimeout(() => window.location.reload(), 200);
      this.$router.push("/");
    },
    goDashBoard() {
      this.$router.push("/login");
    },
    goArticle(order) {
      $(document).ready(() => {
        $("html,body").animate(
          {
            scrollTop: document.querySelector(".main").offsetTop,
          },
          3000
        );
      });
      window.innerWidth <= 768 ? this.closeRwdNav() : null;
      let chooseItems = [];
      chooseItems.push(this.nearArticlesLimite[order]);
      this.chooseStatus = true;
      this.$router.push("/loading");
      setTimeout(
        () =>
          this.$router
            .push({ name: "article", params: { chooseItems } })
            .catch((err) => {
              err;
            }),
        3500
      );
    },
    showSideMenu() {
      document
        .querySelector(".side-arrow-icon")
        .classList.toggle("side-arrow-icon-toggle");
      document.querySelector(".side-navs").classList.toggle("side-navs-toggle");
    },
    selectContentPart() {
      this.selectPackage.forEach((key) => {
        switch (key.typeChoose) {
          case 1:
            this.selectType = this.articles[1];
            break;
          case 2:
            this.selectType = this.articles[2];
            break;
          case 3:
            this.selectType = this.articles[0];
            break;
        }
      });
      this.selectFinal = this.selectType.filter(
        (key) =>
          key.year == [...this.selectPackage][0].year &&
          key.monthNum == [...this.selectPackage][0].monthNum
      );
      let selects = this.selectFinal;
      this.chooseStatus = true;
      if (window.innerWidth <= 768) {
        this.closeRwdNav();
        $(document).ready(() => {
          $("html,body").animate(
            {
              scrollTop: document.querySelector(".main").offsetTop,
            },
            3000
          );
        });
        setTimeout(() => this.$router.push("loading"), 1002);
        setTimeout(
          () =>
            this.$router
              .push({ name: "article_list", params: { selects } })
              .catch((err) => {
                err;
              }),
          6502
        );
      } else {
        this.$router.push("loading");
        setTimeout(
          () =>
            this.$router
              .push({ name: "article_list", params: { selects } })
              .catch((err) => {
                err;
              }),
          3500
        );
      }
    },
    selectContent(selectT, selectY, selectM) {
      if (selectT !== true || selectY !== true || selectM !== true) return;
      this.selectPackage = [];
      this.selectPackage.push({
        typeChoose: this.optionTypeDefault,
        year: parseInt(this.optionYearDefault),
        monthNum: this.optionMonthDefault,
      });
      this.selectContentPart();
    },
    newsArticle() {
      const time = new Date();
      let year = time.getFullYear();
      let beforeMonth = time.getMonth() - 2;
      for (let a = 0; a < 3; a++) {
        this.articles[a].forEach((key) =>
          key.descripTitle != "" ? this.nearArticlesTemp.push(key) : null
        );
      }
      this.nearArticlesTemp.forEach((key) =>
        String(key.date.slice(0, 4)) == year && key.monthNum >= beforeMonth
          ? this.nearArticles.push(key)
          : null
      );
      this.nearArticles.forEach((key, index) =>
        index <= 5 ? this.nearArticlesLimite.push(key) : null
      );
    },
    getArticlesPart() {
      this.articles[0].forEach((key) =>
        key.descripTitle != "" ? this.codeCollect.push(key) : null
      );
      this.articles[1].forEach((key) =>
        key.descripTitle != "" ? this.potographyCollect.push(key) : null
      );
      this.articles[2].forEach((key) =>
        key.descripTitle != "" ? this.psychologyCollect.push(key) : null
      );
      this.newsArticle();
    },
    getArticles() {
      const unlock = "https://cors-anywhere.herokuapp.com/";
      const url = "https://project-50101.firebaseio.com/.json/";
      this.axios
        .get(`${unlock}${url}`)
        .then((res) => {
          this.articlesTemp = Object.keys(res.data).map((key) => res.data[key]);
          this.articlesTemp.forEach((key, index) => {
            this.articles.push(
              (key = Object.keys(this.articlesTemp[index]).map(
                (key) => this.articlesTemp[index][key]
              ))
            );
          });
          this.articles == [] ? (this.getData = false) : (this.getData = true);
          this.getArticlesPart();
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    window.innerWidth <= 768
      ? (this.windowOuter = true)
      : (this.windowOuter = false);
    this.getArticles();
  },
};
</script>