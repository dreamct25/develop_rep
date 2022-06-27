<template>
  <div class="page-outer">
    <div class="row no-gutters" v-if="urlTemp != undefined">
      <div class="col-lg-9">
        <div class="video-show-outer">
          <div
            class="exit-fullscreen"
            :class="{ 'exit-fullscreen-toggle': hasPaused }"
            v-if="hasFullSreen == true && rwdState == true"
            @click="exitFullScreen"
          >
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <div class="video-show" :class="{ 'fullscreen-mode': hasFullSreen }">
            <video
              id="vid-single"
              class="video-js vjs-default-skin"
              playsinline
            ></video>
          </div>
        </div>
        <div class="controller-outer-rwd" v-if="rwdState">
          <div class="times">
            <div class="duration-time">
              {{ durations }}
            </div>
            <div
              class="show-time"
              v-text="showTime"
              :class="{ 'show-time-toggle': showTimeSwitch }"
            ></div>
            <input
              type="range"
              class="prograss"
              min="0"
              v-model="videoDurationVal"
              @input="videoDurationChange"
            />
            <div class="total-time">
              {{ endTime }}
            </div>
          </div>
          <div class="row no-gutters align-items-center">
            <div class="col-5">
              <div class="on-left">
                <div class="skip-outer">
                  <span>10</span>
                  <div
                    class="skip-remove"
                    :class="{ 'skip-remove-toggle': skipRemoveAnimate }"
                    @click="skipFn(false)"
                  >
                    <div class="remove-arrow"></div>
                    <div class="remove-arrow"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-2">
              <div class="centers">
                <div class="play" @click="play">
                  <i class="fal fa-pause-circle" v-if="playSwitch"></i>
                  <i class="fal fa-play-circle" v-else></i>
                </div>
              </div>
            </div>
            <div class="col-5">
              <div class="on-right">
                <div class="skip-outer">
                  <span>10</span>
                  <div
                    class="skip-add"
                    :class="{ 'skip-add-toggle': skipAddAnimate }"
                    @click="skipFn(true)"
                  >
                    <div class="add-arrow"></div>
                    <div class="add-arrow"></div>
                  </div>
                </div>
                <div class="options-outer">
                  <i
                    class="far fa-caret-square-up options-arrow"
                    @click="showOptions"
                  ></i>
                  <div
                    class="options"
                    :class="{ 'options-toggle': optionsSwitch }"
                  >
                    <div
                      class="muted"
                      :class="{ 'muted-toggle': mutedSwitch }"
                      @click="mutedHave"
                    >
                      <i class="fas fa-volume-mute" v-if="mutedSwitch"></i>
                      <i class="fas fa-volume-up" v-else></i>
                    </div>
                    <div class="full-screen" @click="enterFullScreen">
                      <i class="fas fa-expand"></i>
                    </div>
                    <div
                      class="loop-outer"
                      :class="{ 'loop-outer-toggle': loopSwitch }"
                    >
                      <div
                        class="loop-icon"
                        :class="{ 'loop-icon-toggle': loopSwitch }"
                        @click="loopHave"
                      >
                        <div
                          class="loop-arrow"
                          :class="{ 'loop-arrow-toggle': loopSwitch }"
                        ></div>
                        <div
                          class="loop-arrow"
                          :class="{ 'loop-arrow-toggle': loopSwitch }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="controller-outer" v-else>
          <div class="times">
            <div class="duration-time">
              {{ durations }}
            </div>
            <div
              class="show-time"
              v-text="showTime"
              :class="{ 'show-time-toggle': showTimeSwitch }"
            ></div>
            <input
              type="range"
              class="prograss"
              min="0"
              v-model="videoDurationVal"
              @input="videoDurationChange"
              @mousemove="videoDurationShow"
              @mouseenter="showTimeSwitch = true"
              @mouseleave="showTimeSwitch = false"
            />
            <div class="total-time">
              {{ endTime }}
            </div>
          </div>
          <div class="row no-gutters align-items-center">
            <div class="col-5">
              <div class="on-left">
                <div
                  class="muted"
                  :class="{ 'muted-toggle': mutedSwitch }"
                  @click="mutedHave"
                >
                  <i class="fas fa-volume-mute" v-if="mutedSwitch"></i>
                  <i class="fas fa-volume-up" v-else></i>
                </div>
                <div class="full-screen" @click="enterFullScreen">
                  <i class="fas fa-expand"></i>
                </div>
                <div
                  class="loop-outer"
                  :class="{ 'loop-outer-toggle': loopSwitch }"
                >
                  <div
                    class="loop-icon"
                    :class="{ 'loop-icon-toggle': loopSwitch }"
                    @click="loopHave"
                  >
                    <div
                      class="loop-arrow"
                      :class="{ 'loop-arrow-toggle': loopSwitch }"
                    ></div>
                    <div
                      class="loop-arrow"
                      :class="{ 'loop-arrow-toggle': loopSwitch }"
                    ></div>
                  </div>
                </div>
                <div class="skip-outer">
                  <span>10</span>
                  <div
                    class="skip-remove"
                    :class="{ 'skip-remove-toggle': skipRemoveAnimate }"
                    @click="skipFn(false)"
                  >
                    <div class="remove-arrow"></div>
                    <div class="remove-arrow"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-2">
              <div class="centers">
                <div class="play" @click="play">
                  <i class="fal fa-pause-circle" v-if="playSwitch"></i>
                  <i class="fal fa-play-circle" v-else></i>
                </div>
              </div>
            </div>
            <div class="col-5">
              <div class="on-right">
                <div class="skip-outer">
                  <span>10</span>
                  <div
                    class="skip-add"
                    :class="{ 'skip-add-toggle': skipAddAnimate }"
                    @click="skipFn(true)"
                  >
                    <div class="add-arrow"></div>
                    <div class="add-arrow"></div>
                  </div>
                </div>
                <div class="voice-outer">
                  <div
                    class="voice-percent"
                    v-text="voiceText"
                    :class="{ 'voice-percent-toggle': voiceTextSwitch }"
                  ></div>
                  <input
                    type="range"
                    class="voice-prograss"
                    min="0"
                    max="100"
                    value="50"
                    @mouseenter="voiceTextSwitch = true"
                    @mouseleave="voiceTextSwitch = false"
                    @input="voiceChange"
                    v-model="voiceVal"
                  />
                  <div class="icons">
                    <i class="fas fa-volume-mute" v-if="voiceVal == 0"></i>
                    <i
                      class="fas fa-volume-down"
                      v-else-if="voiceVal >= 1 && voiceVal <= 40"
                    ></i>
                    <i
                      class="fas fa-volume"
                      v-else-if="voiceVal >= 40 && voiceVal <= 90"
                    ></i>
                    <i class="fas fa-volume-up" v-else-if="voiceVal >= 90"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div
          class="video-details"
          v-for="(items, index) in videoDetails"
          :key="index"
        >
          <span>{{ items.videoTitle }}</span>
          <span>觀看次數：{{ items.videoViewsTimes }}</span>
          <span>Channel：{{ items.videoChannelTitle }}</span>
          <span v-html="items.videoDesc"></span>
        </div>
      </div>
    </div>
    <ModalAlert :text="message" />
  </div>
</template>
<style lang="scss" scoped>
.page-outer {
  padding: 15px;
  .video-show-outer {
    margin: 10px;
    .exit-fullscreen {
      position: fixed;
      z-index: 21;
      color: white;
      padding: 15px 7px 13px 7px;
      top: 8%;
      right: 0;
      opacity: 0;
      transform: translate(100%, 80%);
      background-color: rgba(0, 0, 0, 0.7);
      box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
      border-radius: 8px 0 0 8px;
      transition: 0.7s ease;
      .line {
        background-color: white;
        width: 20px;
        height: 3px;
      }
      .line:nth-of-type(1) {
        transform: translate(0, 0) rotate(45deg);
      }
      .line:nth-of-type(2) {
        transform: translate(0, -3px) rotate(-45deg);
      }
    }
    .exit-fullscreen-toggle {
      opacity: 1;
      transform: translate(10%, 80%);
    }
    .video-show {
      overflow: hidden;
      transform: translate3d(0, 0, 0);
      border-radius: 20px;
      height: 95vh;
      box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.7);
      position: relative;
      #vid-single {
        width: 100%;
        height: 100%;
      }
      .vjs-big-play-button-reset {
        top: 0;
      }
    }
    @media screen and (max-width: 1024px) {
      .video-show {
        height: 45vh;
      }
    }
    @media screen and (max-width: 414px) {
      .video-show {
        height: 33vh;
      }
    }
    .fullscreen-mode {
      overflow: unset;
      position: fixed;
      top: 0%;
      left: 0;
      right: 0;
      z-index: 20;
      width: 100%;
      height: 100vh;
    }
  }
  .controller-outer-rwd {
    color: white;
    background-color: rgba(0, 0, 0, 0.7);
    box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.7);
    padding: 20px 0 10px 0;
    border-radius: 20px;
    margin: 20px 10px 10px 10px;
    .times {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
      position: relative;
      .show-time {
        position: absolute;
        display: none;
        top: -40px;
        padding: 2px 7px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.7);
      }
      .show-time:before {
        border-color: rgba(255, 255, 255, 0.7) transparent transparent;
        border-style: solid solid solid solid;
        border-width: 10px 7px 0px 7px;
        bottom: -10px;
        content: "";
        height: 0px;
        left: 25px;
        position: absolute;
        width: 0px;
      }
      .show-time:after {
        border-color: black transparent transparent;
        border-style: solid solid solid solid;
        border-width: 10px 6px 0px 6px;
        bottom: -9px;
        content: "";
        height: 0px;
        left: 26px;
        position: absolute;
        width: 0px;
      }
      .show-time-toggle {
        display: block;
      }
      .prograss {
        width: 50%;
        position: relative;
        -webkit-appearance: none;
        border-radius: 5px;
        height: 5px;
        cursor: pointer;
        user-select: none;
        background-image: -webkit-linear-gradient(
          left,
          #f22 0%,
          #f22 0%,
          #fff 0%,
          #fff 100%
        );
        outline: none;
        margin: 0 15px;
      }
      .prograss::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        cursor: pointer;
        user-select: none;
      }
    }
    .centers,
    .on-right,
    .on-left {
      display: flex;
      justify-content: center;
      align-items: center;
      .play {
        font-size: 65px;
        cursor: pointer;
        user-select: none;
      }

      .skip-outer {
        display: flex;
        position: relative;
        span {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .skip-remove,
        .skip-add {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          position: relative;
          width: 40px;
          height: 40px;
          border: 2px solid white;
          border-radius: 50%;
          cursor: pointer;
          user-select: none;
          .remove-arrow,
          .add-arrow {
            top: 0;
            position: absolute;
            background-color: white;
            width: 8px;
            height: 2px;
          }
          .remove-arrow {
            left: 0;
          }
          .remove-arrow:nth-of-type(1) {
            transform: translate(0px, 0px) rotate(100deg);
          }
          .remove-arrow:nth-of-type(2) {
            transform: translate(3px, 5px) rotate(180deg);
          }
          .add-arrow {
            right: 0;
          }
          .add-arrow:nth-of-type(1) {
            transform: translate(0px, 0px) rotate(260deg);
          }
          .add-arrow:nth-of-type(2) {
            transform: translate(-4px, 5px) rotate(180deg);
          }
        }
        .skip-add-toggle {
          animation: circlesAdd 0.7s ease forwards;
        }
        @keyframes circlesAdd {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .skip-remove-toggle {
          animation: circlesRemove 0.7s ease forwards;
        }
        @keyframes circlesRemove {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
      }
      .options-outer {
        position: absolute;
        right: 0%;
        bottom: 8%;
        transform: translateX(-15%);
        .options-arrow {
          font-size: 25px;
          padding: 10px 10px 0 10px;
        }
        .options {
          position: absolute;
          transform: translate(-7px, -170px);
          background-color: rgba(0, 0, 0, 0.8);
          padding: 7px;
          opacity: 0;
          z-index: -1;
          transition: 0.7s ease;
          box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
          border-radius: 25px;
          .muted {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 22px;
            margin-bottom: 5px;
            cursor: pointer;
            user-select: none;
            border: 2px solid white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0);
            transition: 0.7s ease;
            i {
              transition: 0.7s ease;
            }
          }
          .muted-toggle {
            background-color: white;
            box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.7);
            i {
              color: red;
            }
          }
          .full-screen {
            margin-bottom: 5px;
            font-size: 22px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            user-select: none;
            border: 2px solid white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
          }
          .loop-outer {
            border: 2px solid white;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0);
            transition: 0.7s ease;
            .loop-icon {
              position: relative;
              border: 2px solid white;
              width: 24px;
              height: 20px;
              border-radius: 5px;
              cursor: pointer;
              user-select: none;
              transition: 0.7s ease;
              .loop-arrow {
                position: absolute;
                top: 0;
                left: 50%;
                height: 2px;
                width: 8px;
                background-color: white;
                transition: 0.7s ease;
              }
              .loop-arrow:nth-of-type(1) {
                top: 5%;
                transform: translate(-40%, 0) rotate(45deg);
              }
              .loop-arrow:nth-of-type(2) {
                top: -25%;
                transform: translate(-40%, 0) rotate(-45deg);
              }
              .loop-arrow-toggle {
                background-color: red;
              }
            }
            .loop-icon-toggle {
              border: 2px solid red;
            }
          }
          .loop-outer-toggle {
            background-color: white;
            box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.7);
          }
        }
        .options-toggle {
          opacity: 1;
          z-index: 2;
          transform: translate(-7px, -180px);
        }
      }
    }

    .on-left {
      justify-content: space-around;
    }

    .on-right {
      justify-content: space-around;
    }
  }
  @media screen and (max-width: 1024px) {
    .controller-outer-rwd {
      margin: 12px 10px 10px 10px;
    }
  }
  .controller-outer {
    color: white;
    background-color: rgba(0, 0, 0, 0.7);
    box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.7);
    padding: 40px 0 10px 0;
    border-radius: 20px;
    margin: 20px 10px 10px 10px;
    .times {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
      position: relative;
      .show-time {
        position: absolute;
        display: none;
        top: -40px;
        padding: 2px 7px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.7);
      }
      .show-time:before {
        border-color: rgba(255, 255, 255, 0.7) transparent transparent;
        border-style: solid solid solid solid;
        border-width: 10px 7px 0px 7px;
        bottom: -10px;
        content: "";
        height: 0px;
        left: 25px;
        position: absolute;
        width: 0px;
      }
      .show-time:after {
        border-color: black transparent transparent;
        border-style: solid solid solid solid;
        border-width: 10px 6px 0px 6px;
        bottom: -9px;
        content: "";
        height: 0px;
        left: 26px;
        position: absolute;
        width: 0px;
      }
      .show-time-toggle {
        display: block;
      }
      .prograss {
        width: 80%;
        position: relative;
        -webkit-appearance: none;
        border-radius: 5px;
        height: 8px;
        cursor: pointer;
        user-select: none;
        background-image: -webkit-linear-gradient(
          left,
          #f22 0%,
          #f22 0%,
          #fff 0%,
          #fff 100%
        );
        outline: none;
        margin: 0 15px;
      }
      .prograss::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 0px;
        height: 8px;
        background-color: red;
        cursor: pointer;
        user-select: none;
      }
      @media screen and (max-width: 768px) {
        .prograss {
          width: 70%;
        }
      }
    }
    .centers,
    .on-right,
    .on-left {
      display: flex;
      justify-content: center;
      align-items: center;
      .play {
        font-size: 65px;
        cursor: pointer;
        user-select: none;
      }
      .muted {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        cursor: pointer;
        user-select: none;
        border: 2px solid white;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0);
        transition: 0.7s ease;
        i {
          transition: 0.7s ease;
        }
      }
      .muted-toggle {
        background-color: white;
        box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.7);
        i {
          color: red;
        }
      }
      .full-screen {
        font-size: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        user-select: none;
        border: 2px solid white;
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }
      .loop-outer {
        border: 2px solid white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0);
        transition: 0.7s ease;
        .loop-icon {
          position: relative;
          border: 2px solid white;
          width: 24px;
          height: 20px;
          border-radius: 5px;
          cursor: pointer;
          user-select: none;
          transition: 0.7s ease;
          .loop-arrow {
            position: absolute;
            top: 0;
            left: 50%;
            height: 2px;
            width: 8px;
            background-color: white;
            transition: 0.7s ease;
          }
          .loop-arrow:nth-of-type(1) {
            top: 5%;
            transform: translate(-40%, 0) rotate(45deg);
          }
          .loop-arrow:nth-of-type(2) {
            top: -25%;
            transform: translate(-40%, 0) rotate(-45deg);
          }
          .loop-arrow-toggle {
            background-color: red;
          }
        }
        .loop-icon-toggle {
          border: 2px solid red;
        }
      }
      .loop-outer-toggle {
        background-color: white;
        box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.7);
      }
      .skip-outer {
        display: flex;
        position: relative;
        span {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .skip-remove,
        .skip-add {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          position: relative;
          width: 40px;
          height: 40px;
          border: 2px solid white;
          border-radius: 50%;
          cursor: pointer;
          user-select: none;
          .remove-arrow,
          .add-arrow {
            top: 0;
            position: absolute;
            background-color: white;
            width: 8px;
            height: 2px;
          }
          .remove-arrow {
            left: 0;
          }
          .remove-arrow:nth-of-type(1) {
            transform: translate(0px, 0px) rotate(100deg);
          }
          .remove-arrow:nth-of-type(2) {
            transform: translate(3px, 5px) rotate(180deg);
          }
          .add-arrow {
            right: 0;
          }
          .add-arrow:nth-of-type(1) {
            transform: translate(0px, 0px) rotate(260deg);
          }
          .add-arrow:nth-of-type(2) {
            transform: translate(-4px, 5px) rotate(180deg);
          }
        }
        .skip-add-toggle {
          animation: circlesAdd 0.7s ease forwards;
        }
        @keyframes circlesAdd {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .skip-remove-toggle {
          animation: circlesRemove 0.7s ease forwards;
        }
        @keyframes circlesRemove {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
      }
      .voice-outer {
        font-size: 30px;
        display: flex;
        align-items: center;
        position: relative;
        .voice-percent {
          position: absolute;
          display: none;
          top: -40%;
          padding: 2px 7px;
          border-radius: 5px;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.7);
          font-size: 16px;
        }
        .voice-percent-toggle {
          display: block;
        }
        .voice-prograss {
          -webkit-appearance: none;
          border-radius: 2px;
          height: 4px;
          background-image: -webkit-linear-gradient(
            left,
            #f22 0%,
            #f22 0%,
            #fff 0%,
            #fff 100%
          );
          outline: none;
          transition: 0.1s;
        }
        .voice-prograss::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          background: #f22;
          border-radius: 50%;
          cursor: pointer;
          user-select: none;
          transition: 0.1s;
        }
        .icons {
          margin-left: 20px;
        }
      }
    }

    .on-left {
      justify-content: space-around;
    }

    .on-right {
      justify-content: space-around;
    }
  }
  .video-details {
    margin: 10px;
    line-height: 33px;
    padding: 10px 15px;
    height: 98%;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border-radius: 20px;
    box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.7);
    span {
      display: block;
    }
    span:nth-of-type(1) {
      width: 100%;
      font-size: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    span:nth-of-type(2) {
      font-size: 20px;
      margin: 10px auto;
    }
    span:nth-of-type(3) {
      font-size: 18px;
    }
    span:nth-of-type(4) {
      box-shadow: inset 0 2px 0 0 rgba(255, 255, 255, 0.7);
      overflow: hidden;
      overflow-y: scroll;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 24;
      -webkit-box-orient: vertical;
      margin-top: 5px;
      padding: 8px;
    }
    span:nth-of-type(4)::-webkit-scrollbar {
      width: 2px;
      background-color: rgb(100, 100, 100);
    }
    span:nth-of-type(4)::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.7);
    }
  }
}
</style>
<script>
import videoJS from "video.js";
import ModalAlert from "../components/ModalAlert.vue";
import modalPugin from "../customPlugin/js/Modal.js";
import $ from "jquery";
export default {
  data() {
    return {
      urlTemp: "",
      videoDetails: [],
      videoDurationVal: 0,
      durations: "",
      endTime: "",
      percent: "",
      timer: null,
      playSwitch: true,
      mutedSwitch: false,
      loopSwitch: false,
      voiceVal: 50,
      skipAddAnimate: false,
      skipRemoveAnimate: false,
      showTime: "",
      showTimeSwitch: false,
      voiceText: "",
      voiceTextSwitch: false,
      rwdState: false,
      optionsSwitch: false,
      hasFullSreen: false,
      hasPaused: false,
      message: "",
    };
  },
  components: {
    ModalAlert,
  },
  mounted() {
    setTimeout(() => {
      if (this.urlTemp != undefined) {
        this.videoDetails = this.$route.params.videoItem;
        this.playerSetting();
      } else {
        modalPugin.show();
        this.message = "請點選影片連結";
        setTimeout(() => modalPugin.close(), 1200);
        setTimeout(() => this.$router.push("/"), 2000);
      }
    }, 100);
  },
  methods: {
    playerSetting() {
      const vm = this;
      $(".prograss").css("background-image", "");
      let player = videoJS("#vid-single", {
        controls: false,
        volume: this.voiceVal / 100,
        techOrder: ["youtube"],
        sources: [{ type: "video/youtube", src: this.urlTemp }],
        autoplay: true,
        muted: this.mutedSwitch,
        loop: this.loopSwitch,
        controlBar: {
          fullscreenToggle: this.rwdState == true ? false : true,
        },
      });
      if (this.rwdState == false) {
        player.on("fullscreenchange", function () {
          player.isFullscreen() == true
            ? player.controls(true)
            : player.controls(false);
        });
      } else {
        player.on("pause", function () {
          vm.hasPaused = true;
        });
        player.on("play", function () {
          vm.hasPaused = false;
        });
      }
      setTimeout(() => {
        player.pause();
        player.play();
      }, 100);
      this.voiceChange();
      this.prograssTimeSet(player);
    },
    prograssAnimate(val, dur) {
      $(".prograss").css(
        "background-image",
        `-webkit-linear-gradient(left,red 0%,red ${(val / dur) * 100}%,white ${
          (val / dur) * 100
        }%,white 100%)`
      );
    },
    prograssTimeSet(player) {
      const vm = this;
      vm.playSwitch = true;
      player.ready(function () {
        clearInterval(vm.timer);
        vm.timer = setInterval(() => {
          let cur = player.currentTime();
          $(".prograss").attr("max", Math.floor(player.duration() - 2));
          let timeDuration = $(".prograss").attr("max");
          if (Math.floor(player.currentTime()) == timeDuration) {
            clearInterval(vm.timer);
            if (vm.loopSwitch == false) {
              vm.playSwitch = false;
            } else {
              vm.playSwitch = true;
              vm.prograssTimeSet(player);
              vm.durations = vm.videoTimeTrans(0);
            }
          } else {
            vm.durations = vm.videoTimeTrans(cur);
            vm.videoDurationVal = cur;
            vm.prograssAnimate(vm.videoDurationVal, timeDuration);
            vm.endTime = vm.videoTimeTrans(timeDuration - 1);
          }
        }, 1000);
      });
    },
    videoTimeTrans(curTime) {
      if (isNaN(curTime) == true) curTime = 0;
      let hourStr = "";
      let hours = Math.floor(curTime / 3600);
      let min = Math.floor(curTime / 60) - hours * 60;
      let sec = Math.floor(curTime) - min * 60 - hours * 3600;
      hourStr = hours < 10 ? `0${hours}` : hours;
      hourStr = hours == "00" ? "" : `${hours} : `;
      min = min < 10 ? `0${min}` : min;
      sec = sec < 10 ? `0${sec}` : sec;
      return `${hourStr}${min} : ${sec}`;
    },
    play() {
      let player = videoJS("#vid-single");
      this.playSwitch = this.playSwitch == true ? false : true;
      if (this.playSwitch == true) {
        player.play();
        clearInterval(this.timer);
        this.prograssTimeSet(player);
      } else {
        player.pause();
      }
    },
    mutedHave() {
      let player = videoJS("#vid-single");
      this.mutedSwitch = this.mutedSwitch == true ? false : true;
      player.muted(this.mutedSwitch);
      console.log(player);
    },
    loopHave() {
      this.loopSwitch = this.loopSwitch == false ? true : false;
      let player = videoJS("#vid-single");
      player.loop(this.loopSwitch);
    },
    voiceChange() {
      let player = videoJS("#vid-single");
      player.volume(this.voiceVal / 100);
      $(".voice-prograss").css(
        "background-image",
        `-webkit-linear-gradient(left,red 0%,red ${this.voiceVal}%,white ${this.voiceVal}%,white 100%)`
      );
      this.voiceText = `${this.voiceVal}%`;
      $(".voice-percent").css("left", `${this.voiceVal - 10}px`);
    },
    videoDurationChange() {
      let player = videoJS("#vid-single");
      player.currentTime(this.videoDurationVal);
      let timeDuration = player.duration() - 2;
      this.durations = this.videoTimeTrans(this.videoDurationVal);
      this.showTime = this.durations;
      this.prograssAnimate(this.videoDurationVal, timeDuration);
    },
    videoDurationShow(e) {
      if (this.rwdState == true) return;
      let player = videoJS("#vid-single");
      let timeDuration = Math.floor(player.duration() - 2);
      let time =
        ((e.clientX - Math.floor($(".prograss").offset().left)) /
          $(".prograss").width()) *
        timeDuration;
      this.showTime = this.videoTimeTrans(time);
      $(".show-time").css("left", e.clientX - 60 + "px");
    },
    skipFn(haveAdd) {
      let player = videoJS("#vid-single");
      let cur = null;
      if (haveAdd == true) {
        cur = this.videoDurationVal + 10;
        this.skipAddAnimate = true;
      } else {
        cur = this.videoDurationVal - 10;
        this.skipRemoveAnimate = true;
      }

      player.currentTime(cur);
      setTimeout(() => {
        this.skipAddAnimate = false;
        this.skipRemoveAnimate = false;
      }, 1000);
    },
    enterFullScreen() {
      let player = videoJS("#vid-single");
      player.controls(true);
      if (this.rwdState == false) {
        player.isFullscreen(true);
        player.requestFullscreen();
      } else {
        this.hasFullSreen = true;
      }
    },
    exitFullScreen() {
      let player = videoJS("#vid-single");
      player.controls(false);
      this.hasFullSreen = false;
      this.playSwitch = false;
    },
    showOptions() {
      this.optionsSwitch = this.optionsSwitch == false ? true : false;
    },
  },
  destroyed() {
    setTimeout(() => {
      videoJS("#vid-single").dispose();
      clearInterval(this.timer);
    }, 300);
  },
  created() {
    this.rwdState = window.innerWidth <= 1024 ? true : false;
    this.urlTemp = this.$route.params.postUrl;
  },
};
</script>