<template lang="pug">
.player-outer
    .video-show-outer
        .exit-fullscreen(
            :class="{ 'exit-fullscreen-toggle': hasPaused }"
            v-if="hasFullSreen == true && rwdState == true"
            @click="exitFullScreen"
        )
            .line
            .line
        .video-show(:class="{ 'fullscreen-mode': hasFullSreen }")
            video(id="vid-single",class="video-js vjs-default-skin",playsinline)
            .voice-percent(:class="{ 'voice-percent-toggle': voiceTextSwitch }")
                .icons
                    icon(v-if="voiceVal <= 1",icon="fa-solid fa-volume-mute")
                    icon(v-else,icon="fa-solid fa-volume-up",:style="{ 'color':`rgba(255,${(100 - voiceVal) * 2.55},${(100 - voiceVal) * 2.55})` }")
                | {{ voiceText }}
    .controller-outer-rwd(v-if="rwdState")
        .times
            .duration-time {{ durations }}
            .show-time(:class="{ 'show-time-toggle': showTimeSwitch }") {{ showTime }}
            input(
                type="range",
                class="prograss",
                min="0",
                :value="videoDurationVal",
                @input="videoDurationChange"
            )
            .total-time {{ endTime }}
        .row.no-gutters.align-items-center
            div(:class="{ 'col-5': !fromCollect,'col-2':fromCollect }")
                .on-left
                    .skip-outer
                        span 10
                        .skip-remove(
                            :class="{ 'skip-remove-toggle': skipRemoveAnimate }"
                            @click="skipFn(-10)"
                        )
                            .remove-arrow
                            .remove-arrow
            div(:class="{ 'col-2': !fromCollect,'col-7':fromCollect }")
                .centers
                    .prev(
                        v-if="fromCollect",
                        :class="{ 'disabled-prev': disabledPrev }",
                        @click="switchVideo(-1, false)"
                    )
                        icon(icon="fa-solid fa-step-backward")
                    .play(@click="play")
                        icon(v-if="playSwitch",icon="fa-solid fa-pause-circle")
                        icon(v-else,icon="fa-solid fa-play-circle")
                    .next(
                        v-if="fromCollect",
                        :class="{ 'disabled-next': disabledNext }",
                        @click="switchVideo(1, false)"
                    )
                        icon(icon="fa-solid fa-step-forward")
            div(:class="{ 'col-5': !fromCollect,'col-3':fromCollect }")
                .on-right(:class="{ 'in-all':fromCollect }")
                    .skip-outer
                        span 10
                        .skip-add(
                            :class="{ 'skip-add-toggle': skipAddAnimate }"
                            @click="skipFn(10)"
                        )
                            .add-arrow
                            .add-arrow
                    .group
                        .lists-group(@click="listAnimate = !listAnimate",v-if="fromCollect")
                            each className in ['line','line','line']
                                div(class=className)
                            .lists(:class="{ 'lists-show': listAnimate }")
                                .lists-text-outer
                                    .lists-text
                                        span(
                                            :class="{ 'current-play': item.videoCurrentPlay }",
                                            v-for="(item, index) in videoAllListTemp",
                                            :key="index",
                                            @click="switchVideo(index, true)",
                                        ) {{ index + 1 }} . {{ item.videoTitle }}
                        .options-outer
                            .icon-outer
                                icon(
                                    icon="fa-solid fa-caret-square-up options-arrow"
                                    @click="optionsSwitch = !optionsSwitch"
                                )
                            .options(:class="{ 'options-toggle': optionsSwitch }")
                                .show-video-info(
                                    :class="{ 'show-video-info-toggle': showVideoInfoSwitch }",
                                    @click="showVideoInfoSwitch = !showVideoInfoSwitch"
                                )
                                    icon(icon="fa-solid fa-info")
                                .muted(
                                    :class="{ 'muted-toggle': mutedSwitch }"
                                    @click="mutedHave"
                                )
                                    icon(v-if="mutedSwitch",icon="fa-solid fa-volume-mute")
                                    icon(v-else,icon="fa-solid fa-volume-up")
                                .full-screen(@click="enterFullScreen")
                                    icon(icon="fa-solid fa-expand")
                                .loop-outer(:class="{ 'loop-outer-toggle': loopSwitch }")
                                    .loop-icon(
                                        :class="{ 'loop-icon-toggle': loopSwitch }"
                                        @click="loopHave"
                                    )
                                        .loop-arrow(:class="{ 'loop-arrow-toggle': loopSwitch }")
                                        .loop-arrow(:class="{ 'loop-arrow-toggle': loopSwitch }")
    .controller-outer(v-else)
        .times
            .duration-time {{ durations }}
            .show-time(:class="{ 'show-time-toggle': showTimeSwitch }") {{ showTime }}
            input(
                type="range",
                class="prograss",
                min="0",
                :value="videoDurationVal",
                @input="videoDurationChange"
                @mousemove="videoDurationShow",
                @mouseenter="showTimeSwitch = true",
                @mouseleave="showTimeSwitch = false"
            )
            .total-time {{ endTime }}
        .row.no-gutters.align-items-center
            div(:class="{ 'col-5': !fromCollect,'col-4':fromCollect }")
                .on-left
                    .show-video-info(
                        :class="{ 'show-video-info-toggle': showVideoInfoSwitch }",
                        @click="showVideoInfoSwitch = !showVideoInfoSwitch"
                    )
                        icon(icon="fa-solid fa-info")
                    .muted(
                        :class="{ 'muted-toggle': mutedSwitch }"
                        @click="mutedHave"
                    )
                        icon(v-if="mutedSwitch",icon="fa-solid fa-volume-mute")
                        icon(v-else,icon="fa-solid fa-volume-up")
                    .full-screen(@click="enterFullScreen")
                        icon(icon="fa-solid fa-expand")
                    .loop-outer(:class="{ 'loop-outer-toggle': loopSwitch }")
                        .loop-icon(
                            :class="{ 'loop-icon-toggle': loopSwitch }"
                            @click="loopHave"
                        )
                            .loop-arrow(:class="{ 'loop-arrow-toggle': loopSwitch }")
                            .loop-arrow(:class="{ 'loop-arrow-toggle': loopSwitch }")
                    .skip-outer
                        span 10
                        .skip-remove(
                            :class="{ 'skip-remove-toggle': skipRemoveAnimate }"
                            @click="skipFn(-10)"
                        )
                            .remove-arrow
                            .remove-arrow
            div(:class="{ 'col-2': !fromCollect,'col-3':fromCollect }")
                .centers
                    .prev(
                        v-if="fromCollect",
                        :class="{ 'disabled-prev': disabledPrev }",
                        @click="switchVideo(-1, false)"
                    )
                        icon(icon="fa-solid fa-step-backward")
                    .play(@click="play")
                        icon(v-if="playSwitch",icon="fa-solid fa-pause-circle")
                        icon(v-else,icon="fa-solid fa-play-circle")
                    .next(
                        v-if="fromCollect",
                        :class="{ 'disabled-next': disabledNext }",
                        @click="switchVideo(1, false)"
                    )
                        icon(icon="fa-solid fa-step-forward")
            .col-5
                .on-right(:class="{ 'in-all':fromCollect }")
                    .skip-outer
                        span 10
                        .skip-add(
                            :class="{ 'skip-add-toggle': skipAddAnimate }"
                            @click="skipFn(10)"
                        )
                            .add-arrow
                            .add-arrow
                    .voice-outer
                        input(
                            type="range",
                            class="voice-prograss",
                            min="0",
                            max="100",
                            v-model="voiceVal"
                            @mousedown="voiceTextSwitch = true",
                            @mouseup="voiceTextSwitch = false",
                        )
                        .icons
                            icon(v-if="voiceVal <= 1",icon="fa-solid fa-volume-mute")
                            icon(v-else,icon="fa-solid fa-volume-up",:style="{ 'color':`rgba(255,${(100 - voiceVal) * 2.55},${(100 - voiceVal) * 2.55})` }")
                    .lists-group(v-if="fromCollect",@click="listAnimate = !listAnimate")
                        each className in ['line','line','line']
                            div(class=className)
                        .lists(:class="{ 'lists-show': listAnimate }")
                            .lists-text-outer
                                .lists-text
                                    span(
                                        :class="{ 'current-play': item.videoCurrentPlay }",
                                        v-for="(item, index) in videoAllListTemp",
                                        :key="index",
                                        @click="switchVideo(index, true)",
                                    ) {{ index + 1 }} . {{ item.videoTitle }}
    Loading(:loadingStatus="loadingStatus")
</template>
<style lang="scss" scoped>
    .player-outer{
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

                    &:nth-of-type(1) {
                        transform: translate(0, 0) rotate(45deg);
                    }

                    &:nth-of-type(2) {
                        transform: translate(0, -3px) rotate(-45deg);
                    }
                }

                &.exit-fullscreen-toggle {
                    opacity: 1;
                    transform: translate(10%, 80%);
                }
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

                    .vjs-big-play-button-reset {
                        top: 0;
                    }
                }

                .voice-percent {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    display: flex;
                    gap: 6px;
                    padding: 2px 7px;
                    border-radius: 5px;
                    background-color: rgba(0, 0, 0, 0.7);
                    color: white;
                    box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
                    font-size: 16px;
                    opacity: 0;
                    z-index: -2;
                    transition: .5s ease;

                    &.voice-percent-toggle {
                        opacity: 1;
                        z-index: 2;
                    }
                }

                @media screen and (max-width: 1024px) {
                    height: 45vh;
                }

                @media screen and (max-width: 414px) {
                    height: 59vh;
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
            padding: 14px 0 3px 0px;
            border-radius: 20px;
            margin: 20px 10px 10px 10px;

            .times {
                display: flex;
                justify-content: center;
                align-items: center;
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

                    &:before {
                        border-color: rgba(255, 255, 255, 0.7) transparent transparent;
                        border-style: solid solid solid solid;
                        border-width: 10px 7px 0px 7px;
                        bottom: -10px;
                        content: "";
                        height: 0px;
                        left: 21px;
                        position: absolute;
                        width: 0px;
                    }

                    &:after {
                        border-color: black transparent transparent;
                        border-style: solid solid solid solid;
                        border-width: 10px 6px 0px 6px;
                        bottom: -9px;
                        content: "";
                        height: 0px;
                        left: 22px;
                        position: absolute;
                        width: 0px;
                    }

                    &.show-time-toggle {
                        display: block;
                    }
                }
                
                .prograss {
                    width: 50%;
                    position: relative;
                    -webkit-appearance: none;
                    border-radius: 5px;
                    height: 5px;
                    cursor: pointer;
                    user-select: none;
                    background-image: -webkit-linear-gradient(left,#f22 0%,#f22 0%,#fff 0%,#fff 100%);
                    outline: none;
                    margin: 0 15px;

                    &::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        width: 15px;
                        height: 15px;
                        border-radius: 50%;
                        background-color: red;
                        cursor: pointer;
                        user-select: none;
                    }
                }
            }

            .centers,
            .on-right,
            .on-left {
                display: flex;
                justify-content: center;
                align-items: center;

                .prev,
                .next {
                    margin: 0 20px;
                    font-size: 40px;
                    cursor: pointer;
                    user-select: none;
                    transition: 0.7s ease;

                    &.disabled-prev,
                    &.disabled-next {
                        cursor: not-allowed;
                        color: rgb(100, 100, 100);
                    }
                }

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
                        transform: translate(-59%, -52%);
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

                            &:nth-of-type(1) {
                                transform: translate(0px, 0px) rotate(100deg);
                            }

                            &:nth-of-type(2) {
                                transform: translate(3px, 5px) rotate(180deg);
                            }
                        }

                        .add-arrow {
                            right: 0;

                            &:nth-of-type(1) {
                                transform: translate(0px, 0px) rotate(260deg);
                            }

                            &:nth-of-type(2) {
                                transform: translate(-4px, 5px) rotate(180deg);
                            }
                        }

                        &.skip-add-toggle {
                            animation: circlesAdd 0.7s ease forwards;

                            @keyframes circlesAdd {
                                0% {
                                    transform: rotate(0deg);
                                }
                                100% {
                                    transform: rotate(360deg);
                                }
                            }
                        }

                        &.skip-remove-toggle {
                            animation: circlesRemove 0.7s ease forwards;

                            @keyframes circlesRemove {
                                0% {
                                    transform: rotate(0deg);
                                }
                                100% {
                                    transform: rotate(-360deg);
                                }
                            }
                        }
                    }
                }

                .group {

                    .lists-group {
                        position: relative;
                        cursor: pointer;
                        user-select: none;

                        .line {
                            height: 2px;
                            width: 20px;
                            margin: 3px auto;
                            background-color: white;
                        }

                        .lists {
                            position: absolute;
                            font-size: 16px;
                            bottom: 70%;
                            left: 0;
                            right: 0;
                            background-color: rgba(45, 45, 45, 0);
                            border-radius: 20px;
                            width: 310px;
                            transform: translate(-265px, -20px);
                            opacity: 0;
                            z-index: -2;
                            border: 1px solid white;
                            transition: 0.7s ease;

                            .lists-text-outer {
                                overflow: hidden;
                                border-radius: 18px;

                                .lists-text {
                                    overflow-y: scroll;
                                    border-radius: 18px;
                                    height: 255px;
                                    line-height: 50px;

                                    span {
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        display: -webkit-box;
                                        -webkit-line-clamp: 1;
                                        -webkit-box-orient: vertical;
                                        padding: 7px 20px 7px 20px;
                                        transition: 0.7s ease;

                                        &:hover {
                                            background-color: white;
                                            color: black;
                                        }

                                        &.current-play {
                                            background-color: white;
                                            color: black;
                                        }
                                    }

                                    &::-webkit-scrollbar {
                                        width: 5px;
                                        background-color: rgb(0, 0, 0);
                                        cursor: none;
                                        user-select: none;
                                    }

                                    &::-webkit-scrollbar-thumb {
                                        background-color: rgb(255, 255, 255);
                                    }
                                }
                            }

                            &::before {
                                border-color: rgb(255, 255, 255) rgb(255, 255, 255) transparent
                                transparent;
                                border-style: solid solid solid solid;
                                border-width: 6px 14px 14px 6px;
                                bottom: -20px;
                                content: "";
                                height: 0px;
                                left: 262px;
                                position: absolute;
                                width: 0px;
                            }

                            &::after {
                                border-color: rgb(45, 45, 45) rgb(45, 45, 45) transparent transparent;
                                border-style: solid solid solid solid;
                                border-width: 5px 13px 13px 4px;
                                bottom: -17px;
                                content: "";
                                height: 0px;
                                left: 264px;
                                position: absolute;
                                width: 0px;
                            }

                            &.lists-show {
                                opacity: 1;
                                background-color: rgba(45, 45, 45, 1);
                                transform: translate(-265px, -30px);
                                z-index: 1;
                            }
                        }
                    }

                    .options-outer {
                        position: absolute;
                        bottom: 17%;
                        right: 0;
                        transform: translateX(-15px);

                        .options-arrow {
                            font-size: 25px;
                            padding: 10px 10px 0 10px;
                        }

                        .icon-outer {
                            width: 26px;
                            height: 26px;
                            display: flex;
                            justify-content: center;
                            flex-direction: column;
                            align-items: center;
                            border-radius: 50%;
                            overflow: hidden;
                            
                            svg {
                                width: 30px;
                                height: 30px;
                            }
                        }
                        
                        .options {
                            position: absolute;
                            transform: translate(-7px, -218px);
                            background-color: rgba(0, 0, 0, 0.8);
                            padding: 7px;
                            opacity: 0;
                            z-index: -1;
                            transition: 0.7s ease;
                            box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
                            border-radius: 25px;

                            .show-video-info {
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

                                svg {
                                    transition: 0.7s ease;
                                }

                                &.show-video-info-toggle {
                                    background-color: white;
                                    box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.7);
                                    svg {
                                        color: red;
                                    }
                                }
                            }

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

                                svg {
                                    transition: 0.7s ease;
                                }

                                &.muted-toggle {
                                    background-color: white;
                                    box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.7);

                                    svg {
                                        color: red;
                                    }
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

                                        &:nth-of-type(1) {
                                            top: 5%;
                                            transform: translate(-40%, 0) rotate(45deg);
                                        }

                                        &:nth-of-type(2) {
                                            top: -25%;
                                            transform: translate(-40%, 0) rotate(-45deg);
                                        }

                                        &.loop-arrow-toggle {
                                            background-color: red;
                                        }
                                    }
                                
                                    &.loop-icon-toggle {
                                        border: 2px solid red;
                                    }
                                }

                                &.loop-outer-toggle {
                                    background-color: white;
                                    box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.7);
                                }
                            }

                            &.options-toggle {
                                opacity: 1;
                                z-index: 2;
                                transform: translate(-13px, -218px);
                            }
                        }
                    }
                }

                &.in-all {
                    gap: 8px;

                    .group {

                        .options-outer {
                            position: unset;
                            bottom: unset;
                            right: unset;
                            transform: unset;
                        }

                        .lists-group {
                            margin-bottom: 7px;
                        }
                    }
                }
            }

            .on-left {
                justify-content: space-around;
            }

            @media screen and (max-width: 1024px) {
                margin: 12px 10px 10px 10px;
            }
        }
        
        .controller-outer {
            color: white;
            background-color: rgba(0, 0, 0, 0.7);
            box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.7);
            padding: 24px 0 10px 0;
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

                    &:before {
                        border-color: rgba(255, 255, 255, 0.7) transparent transparent;
                        border-style: solid solid solid solid;
                        border-width: 10px 7px 0px 7px;
                        bottom: -10px;
                        content: "";
                        height: 0px;
                        left: 21px;
                        position: absolute;
                        width: 0px;
                    }

                    &:after {
                        border-color: black transparent transparent;
                        border-style: solid solid solid solid;
                        border-width: 10px 6px 0px 6px;
                        bottom: -9px;
                        content: "";
                        height: 0px;
                        left: 22px;
                        position: absolute;
                        width: 0px;
                    }

                    &.show-time-toggle {
                        display: block;
                    }
                }

                .prograss {
                    width: 80%;
                    position: relative;
                    -webkit-appearance: none;
                    border-radius: 5px;
                    height: 8px;
                    cursor: pointer;
                    user-select: none;
                    background-image: -webkit-linear-gradient(left,#f22 0%,#f22 0%,#fff 0%,#fff 100%);
                    outline: none;
                    margin: 0 15px;

                    &::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        width: 0px;
                        height: 8px;
                        background-color: red;
                        cursor: pointer;
                        user-select: none;
                    }

                    @media screen and (max-width: 768px) {
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

                .prev,
                .next {
                    margin: 0 20px;
                    font-size: 40px;
                    cursor: pointer;
                    user-select: none;
                    transition: 0.7s ease;

                    &.disabled-prev,
                    &.disabled-next {
                        cursor: not-allowed;
                        color: rgb(100, 100, 100);
                    }
                }

                .play {
                    font-size: 65px;
                    cursor: pointer;
                    user-select: none;
                }

                .show-video-info {
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

                    svg {
                        transition: 0.7s ease;
                    }

                    &.show-video-info-toggle {
                        background-color: white;
                        box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.7);
                        svg {
                            color: red;
                        }
                    }
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

                    svg {
                        transition: 0.7s ease;
                    }

                    &.muted-toggle {
                        background-color: white;
                        box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.7);
                        svg {
                            color: red;
                        }
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

                            &:nth-of-type(1) {
                                top: 5%;
                                transform: translate(-40%, 0) rotate(45deg);
                            }

                            &:nth-of-type(2) {
                                top: -25%;
                                transform: translate(-40%, 0) rotate(-45deg);
                            }

                            &.loop-arrow-toggle {
                                background-color: red;
                            }
                        }

                        &.loop-icon-toggle {
                            border: 2px solid red;
                        }
                    }

                    &.loop-outer-toggle {
                        background-color: white;
                        box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.7);
                    }
                }
                
                .skip-outer {
                    display: flex;
                    position: relative;

                    span {
                        display: block;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-59%, -52%);
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

                            &:nth-of-type(1) {
                                transform: translate(0px, 0px) rotate(100deg);
                            }

                            &:nth-of-type(2) {
                                transform: translate(3px, 5px) rotate(180deg);
                            }
                        }

                        .add-arrow {
                            right: 0;

                            &:nth-of-type(1) {
                                transform: translate(0px, 0px) rotate(260deg);
                            }

                            &:nth-of-type(2) {
                                transform: translate(-4px, 5px) rotate(180deg);
                            }
                        }

                        &.skip-add-toggle {
                            animation: circlesAdd 0.7s ease forwards;

                            @keyframes circlesAdd {
                                0% {
                                    transform: rotate(0deg);
                                }
                                100% {
                                    transform: rotate(360deg);
                                }
                            }
                        }
                        
                        &.skip-remove-toggle {
                            animation: circlesRemove 0.7s ease forwards;

                            @keyframes circlesRemove {
                                0% {
                                    transform: rotate(0deg);
                                }
                                100% {
                                    transform: rotate(-360deg);
                                }
                            }
                        }

                    }
                }
                
                .voice-outer {
                    font-size: 30px;
                    display: flex;
                    align-items: center;
                    position: relative;
                        
                    .voice-prograss {
                        appearance: none;
                        border-radius: 2px;
                        width: 100%;
                        height: 4px;
                        background-image: linear-gradient(left,#f22 0%,#f22 0%, #fff 0%,#fff 100%);
                        outline: none;
                        transition: 0.1s;

                        &::-webkit-slider-thumb {
                            appearance: none;
                            width: 12px;
                            height: 12px;
                            background: #f22;
                            border-radius: 50%;
                            cursor: pointer;
                            user-select: none;
                            transition: 0.1s;
                        }
                    }

                    .icons {
                        margin-left: 10px;
                    }
                }

                .lists-group {
                    position: relative;
                    cursor: pointer;
                    user-select: none;
                    margin-right: 16px;

                    .line {
                        height: 2px;
                        width: 25px;
                        margin: 3px auto;
                        background-color: white;
                    }

                    .lists {
                        position: absolute;
                        font-size: 16px;
                        bottom: 70%;
                        left: 0;
                        right: 0;
                        background-color: rgba(45, 45, 45, 0);
                        border-radius: 20px;
                        width: 300px;
                        transform: translate(-263px, -20px);
                        opacity: 0;
                        z-index: -2;
                        border: 1px solid white;
                        transition: 0.7s ease;

                        .lists-text-outer {
                            overflow: hidden;
                            border-radius: 18px;

                            .lists-text {
                                overflow-y: scroll;
                                border-radius: 18px;
                                height: 255px;

                                span {
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 1;
                                    -webkit-box-orient: vertical;
                                    padding: 0 20px;
                                    line-height: 50px;
                                    transition: 0.7s ease;

                                    &:hover {
                                        background-color: white;
                                        color: black;
                                    }

                                    &.current-play {
                                        background-color: white;
                                        color: black;
                                    }
                                }

                                &::-webkit-scrollbar {
                                    width: 5px;
                                    background-color: rgb(0, 0, 0);
                                    cursor: none;
                                    user-select: none;
                                }

                                &::-webkit-scrollbar-thumb {
                                    background-color: rgb(255, 255, 255);
                                }
                            }
                        }

                        &::before {
                            border-color: rgb(255, 255, 255) rgb(255, 255, 255) transparent
                                transparent;
                            border-style: solid solid solid solid;
                            border-width: 6px 14px 14px 6px;
                            bottom: -20px;
                            content: "";
                            height: 0px;
                            left: 253px;
                            position: absolute;
                            width: 0px;
                        }

                        &::after {
                            border-color: rgb(45, 45, 45) rgb(45, 45, 45) transparent transparent;
                            border-style: solid solid solid solid;
                            border-width: 5px 13px 13px 4px;
                            bottom: -17px;
                            content: "";
                            height: 0px;
                            left: 255px;
                            position: absolute;
                            width: 0px;
                        }

                        &.lists-show {
                            opacity: 1;
                            background-color: rgba(45, 45, 45, 1);
                            transform: translate(-263px, -30px);
                            z-index: 1;
                        }
                    }
                }
            }

            .on-left {
                justify-content: space-around;
            }

            .on-right {
                display: grid;
                grid-template-columns: 40px 72%;
                gap: 26px;
                
                &.in-all {
                    grid-template-columns: 40px auto 50px;
                    gap: 16px;
                    justify-content: unset;
                    margin-left: 15px;
                }
            }
        }
    }
</style>
<script lang="ts">
import { defineComponent,Ref,ref,watch,onUnmounted,onMounted,inject,toRefs } from 'vue'
import { ProviderType } from '../App.vue'
import videoJS,{ VideoJsPlayer } from 'video.js'
import Loading from './Loading.vue'

interface videoAllListType {
    videoImgUrl?: string,
    videoID: string,
    videoUrl: string,
    videoTitle: string,
    videoChannelTitle: string,
    videoViewsTimes: string,
    videoDesc: string,
    videoCurrentPlay: boolean,
}

interface stateType {
    player?: Ref<VideoJsPlayer>,
    videoUrl: Ref<string>,
    currentPlayPosterID: Ref<string>,
    videoDurationVal: Ref<number>,
    durations: Ref<string>,
    endTime: Ref<string>,
    percent: Ref<string>,
    timer: Ref<any>,
    playSwitch: Ref<boolean>,
    mutedSwitch: Ref<boolean>,
    loopSwitch: Ref<boolean>,
    voiceVal: Ref<string>,
    skipAddAnimate: Ref<boolean>,
    skipRemoveAnimate: Ref<boolean>,
    showTime: Ref<string>,
    showTimeSwitch: Ref<boolean>,
    voiceText: Ref<string>,
    voiceTextSwitch: Ref<boolean>,
    optionsSwitch: Ref<boolean>,
    hasFullSreen: Ref<boolean>,
    hasPaused: Ref<boolean>,
    rwdState: Ref<boolean>,
    loadingStatus: Ref<boolean>,
    videoCount: Ref<number>,
    disabledPrev: Ref<boolean>,
    disabledNext: Ref<boolean>,
    listAnimate: Ref<boolean>,
    videoAllListTemp: Ref<videoAllListType[]>,
    videoSingleObj: Ref<videoAllListType | undefined>,
    showVideoInfoSwitch: Ref<boolean>
}

interface methodType {
    playerSetting():void
    switchVideo(num:number,fromList:boolean):void
    prograssAnimate(val:number, dur:number):void
    prograssTimeSet(player:VideoJsPlayer):void
    videoTimeTrans(curTime:number):string
    play():void
    mutedHave():void
    loopHave():void
    videoDurationChange({ target }:{ target:HTMLInputElement }):void
    videoDurationShow(event:MouseEvent):void
    skipFn(num:number):void
    enterFullScreen():void
    exitFullScreen():void
    getCollectVideo(isInit:boolean):void
    keyCodeSetting(event:KeyboardEvent):void
}

export default defineComponent({
    components:{
        Loading
    },
    expose:['showVideoInfoSwitch'],
    props:['videoUrl','fromCollect','getShowVideoInfoSwitch','getVideoSingleObj'],
    setup(props:{
        videoUrl?:string,
        fromCollect:boolean,
        getShowVideoInfoSwitch(status:boolean):void
        getVideoSingleObj(obj:videoAllListType):void
    },{ emit }){
        const { $ } = inject<ProviderType>('NewProvider')
        const state:stateType = {
            player: ref(undefined),
            videoUrl: ref(''),
            currentPlayPosterID: ref(''),
            videoDurationVal: ref(0),
            durations: ref(""),
            endTime: ref(""),
            percent: ref(""),
            timer: ref(null),
            playSwitch: ref(true),
            mutedSwitch: ref(false),
            loopSwitch: ref(false),
            voiceVal: ref('0'),
            skipAddAnimate: ref(false),
            skipRemoveAnimate: ref(false),
            showTime: ref(""),
            showTimeSwitch: ref(false),
            voiceText: ref(""),
            voiceTextSwitch: ref(false),
            optionsSwitch: ref(false),
            hasFullSreen: ref(false),
            hasPaused: ref(false),
            rwdState: ref(false),
            loadingStatus: ref(false),
            videoCount: ref(0),
            disabledPrev: ref(false),
            disabledNext: ref(false),
            listAnimate: ref(false),
            videoAllListTemp: ref([]),
            videoSingleObj: ref(undefined),
            showVideoInfoSwitch: ref(false)
        }

        const method:methodType = {
            playerSetting:() => {
                $(".prograss").styles('set',"background-image", "");

                const player = videoJS("#vid-single", {
                    controls: false,
                    defaultVolume: 0.5,
                    techOrder: ["youtube"],
                    sources: [{ type: "video/youtube", src: state.videoUrl.value }],
                    autoplay: true,
                    muted: state.mutedSwitch.value,
                    loop: state.loopSwitch.value,
                    controlBar: {
                        fullscreenToggle: state.rwdState.value ? false : true,
                    },
                    retryOnError:false
                });

                if(!state.rwdState.value){
                    player.on("fullscreenchange", () => player.controls(player.isFullscreen()));
                } else {
                    player.on("pause",() => {
                        state.hasPaused.value = true;
                    });
                    player.on("play",() => {
                        state.hasPaused.value = false;
                    });
                }

                state.player.value = player

                setTimeout(() => {
                    player.pause()
                    player.play()
                }, 200)
                
                method.prograssTimeSet(player)
            },
            switchVideo: (num, fromList) => {
                state.videoCount.value = fromList ? num : state.videoCount.value + num;
                if (state.videoCount.value <= -1) {
                    state.videoCount.value = 0;
                    state.disabledPrev.value = true;
                    return;
                } else if (state.videoCount.value > state.videoAllListTemp.value.length - 1) {
                    state.videoCount.value = state.videoAllListTemp.value.length - 1;
                    state.disabledNext.value = true;
                    return;
                }

                method.getCollectVideo(false);

                state.player.value.src({ type: "video/youtube", src: state.videoUrl.value })
                state.player.value.poster(`https://img.youtube.com/vi/${state.currentPlayPosterID.value}/maxresdefault.jpg`)

                setTimeout(() => {
                    state.player.value.pause()
                    state.player.value.play()
                }, 200)
                
                method.prograssTimeSet(state.player.value)
            },
            prograssAnimate:(val, dur) => {
                $(".prograss").styles('set',"background-image",
                    `-webkit-linear-gradient(left,red 0%,red ${(val / dur) * 100}%,white ${
                    (val / dur) * 100
                    }%,white 100%)`
                );
            },
            prograssTimeSet: player => {
                state.playSwitch.value = true;
                state.loadingStatus.value = true
                state.voiceVal.value = '50'

                player.ready(() => {
                    state.loadingStatus.value = false
                    clearInterval(state.timer.value);

                    state.timer.value = setInterval(() => {
                        const cur = player.currentTime();

                        $(".prograss").attr("max", Math.floor(player.duration() - 2));

                        const timeDuration = parseInt($(".prograss").attr("max") as string);

                        if (Math.floor(player.currentTime()) === timeDuration) {
                            clearInterval(state.timer.value);

                            if (!state.loopSwitch.value) {
                                state.playSwitch.value = false;

                                if(props.fromCollect){
                                    method.switchVideo(1,false)
                                    state.durations.value = method.videoTimeTrans(0);
                                }
                            } else {
                                state.playSwitch.value = true;
                                props.fromCollect ? method.switchVideo(0,false) : method.prograssTimeSet(player);
                                state.durations.value = method.videoTimeTrans(0);
                            }
                        } else {
                            state.durations.value = method.videoTimeTrans(cur * 1000);
                            state.videoDurationVal.value = cur;
                            method.prograssAnimate(cur,timeDuration)
                            state.endTime.value = method.videoTimeTrans((timeDuration - 1) * 1000);
                        }
                    }, 1000);
                });
            },
            videoTimeTrans: curTime => {
                if (isNaN(curTime)) curTime = 0;
                const addZero = (num:number) => num < 10 ? `0${num}` : `${num}`
                const remainDay = curTime / (24 * 60 * 60 * 1000)
                const remainDayFix = Math.floor(remainDay)
                const remainHour = (remainDay - remainDayFix) * 24
                const remainHourFix = Math.floor(remainHour)
                const remainMinute = (remainHour - remainHourFix) * 60
                const remainMinuteFix = Math.floor((remainHour - remainHourFix) * 60)
                const remainSecFix = Math.floor((remainMinute-remainMinuteFix) * 60)

                return {
                    [remainHourFix.toString()]:`${addZero(remainHourFix)} : ${addZero(remainMinuteFix)} : ${addZero(remainSecFix)}`,
                    '0':`${addZero(remainMinuteFix)} : ${addZero(remainSecFix)}`
                }[remainHourFix.toString()]
            },
            play:() => {
                state.playSwitch.value = !state.playSwitch.value

                if (state.playSwitch.value) {
                    state.player.value.play();
                    clearInterval(state.timer.value);
                    method.prograssTimeSet(state.player.value);
                } else {
                    state.player.value.pause();
                }
            },
            mutedHave:() => {
                state.mutedSwitch.value = !state.mutedSwitch.value
                state.player.value.muted(state.mutedSwitch.value);
            },
            loopHave:() => {
                state.loopSwitch.value = !state.loopSwitch.value
                state.player.value.loop(state.loopSwitch.value);
            },
            videoDurationChange: ({ target }) => {
                const { value } = target
                state.player.value.currentTime(parseInt(value));
                const timeDuration = state.player.value.duration() - 2;
                state.durations.value = method.videoTimeTrans(parseInt(value) * 1000);
                state.showTime.value = state.durations.value;
                method.prograssAnimate(parseInt(value), timeDuration);
            },
            videoDurationShow: ({ clientX }) => {
                if (state.rwdState.value) return;
                const timeDuration = Math.floor(state.player.value.duration() - 2);
                const { left,width } = $(".prograss").getDomPos()
                const time = ((clientX - Math.floor(left)) / width) * timeDuration;
                state.showTime.value = method.videoTimeTrans(time * 1000);

                $(".show-time").styles('set',"left", clientX - 54 + "px");
            },
            skipFn: num => {
                state[num === 10 ? 'skipAddAnimate' : 'skipRemoveAnimate'].value = true

                state.player.value.currentTime(state.videoDurationVal.value + num);

                setTimeout(() => {
                    state.skipAddAnimate.value = false;
                    state.skipRemoveAnimate.value = false;
                }, 1000);
            },
            enterFullScreen: () => {
                state.player.value.controls(true);
                if (!state.rwdState.value) {
                    state.player.value.isFullscreen(true);
                    state.player.value.requestFullscreen();
                } else {
                    state.hasFullSreen.value = true;
                }
            },
            exitFullScreen: () => {
                state.player.value.controls(false);
                state.hasFullSreen.value = false;
                state.playSwitch.value = false;
            },
            getCollectVideo: isInit => {
                state.videoSingleObj.value = undefined;
                state.videoAllListTemp.value = [];
                state.videoAllListTemp.value = $.localData('get','item');
                
                if (state.videoAllListTemp.value.length === 1){
                    state.disabledPrev.value = true;
                    state.disabledNext.value = true;
                } else if (state.videoCount.value === state.videoAllListTemp.value.length - 1) {
                    state.videoCount.value = state.videoAllListTemp.value.length - 1;
                    state.disabledNext.value = true;
                } else if (state.videoCount.value === 0) {
                    state.disabledPrev.value = true;
                } else {
                    state.disabledPrev.value = false;
                    state.disabledNext.value = false;
                }

                state.videoSingleObj.value = state.videoAllListTemp.value[state.videoCount.value]

                state.videoAllListTemp.value[state.videoCount.value].videoCurrentPlay = true

                state.videoSingleObj.value.videoCurrentPlay = true

                state.videoUrl.value = state.videoSingleObj.value.videoUrl

                state.currentPlayPosterID.value = state.videoSingleObj.value.videoID

                isInit && method.playerSetting()
            },
            keyCodeSetting: event => {
                event.preventDefault()
                const matchKeyDone = {
                    [event.keyCode.toString()]:undefined,
                    '32': () => event.type === 'keydown' && method.play(),
                    '37': () => event.type === 'keydown' && method.skipFn(-10),
                    '38': () => {
                        if(event.type === 'keydown' && parseInt(state.voiceVal.value) >= 0 && parseInt(state.voiceVal.value) <= 99){
                            state.voiceVal.value = (parseInt(state.voiceVal.value) + 1).toString()
                            const addVoiceVal = parseInt(state.voiceVal.value)

                            state.player.value.volume(addVoiceVal / 100);

                            $(".voice-prograss").styles('set',
                                "background-image",
                                `-webkit-linear-gradient(left,red 0%,red ${addVoiceVal}%,white ${addVoiceVal}%,white 100%)`
                            );
                            state.voiceText.value = `${addVoiceVal}%`;
                            state.voiceTextSwitch.value = true
                        } else {
                            setTimeout(() => state.voiceTextSwitch.value = false,490)
                        }
                    },
                    '39': () => event.type === 'keydown' && method.skipFn(10),
                    '40': () => {
                        if(event.type === 'keydown' && parseInt(state.voiceVal.value) >= 1 && parseInt(state.voiceVal.value) <= 100){
                            state.voiceVal.value = (parseInt(state.voiceVal.value) - 1).toString()
                            const addVoiceVal = parseInt(state.voiceVal.value)

                            state.player.value.volume(addVoiceVal / 100);

                            $(".voice-prograss").styles('set',
                                "background-image",
                                `-webkit-linear-gradient(left,red 0%,red ${addVoiceVal}%,white ${addVoiceVal}%,white 100%)`
                            );
                            state.voiceText.value = `${addVoiceVal}%`;

                            state.voiceTextSwitch.value = true
                        } else {
                            setTimeout(() => state.voiceTextSwitch.value = false,490)
                        }
                    }
                }[event.keyCode.toString()]

                matchKeyDone && matchKeyDone()
            }
        }

        watch(state.voiceVal,val => {
            if(state.rwdState.value) return
            state.player.value.volume(parseInt(val) / 100);
            $(".voice-prograss").styles('set',
                "background-image",
                `-webkit-linear-gradient(left,red 0%,red ${val}%,white ${val}%,white 100%)`
            );
            state.voiceText.value = `${val}%`;
        })

        watch(state.showVideoInfoSwitch,status => emit('getShowVideoInfoSwitch',status))

        watch(state.videoSingleObj,obj => emit('getVideoSingleObj',obj),{ deep: true })

        onMounted(() => {
            state.rwdState.value = window.innerWidth <= 1024

            if(props.videoUrl){
                setTimeout(() => method.playerSetting(),100)
                state.videoUrl.value = props.videoUrl
            } else {
                method.getCollectVideo(true)
            }

            $(window).listener('keydown',method.keyCodeSetting)
            $(window).listener('keyup',method.keyCodeSetting)
        })

        onUnmounted(() => {
            setTimeout(() => {
                videoJS("#vid-single").dispose();
                clearInterval(state.timer.value);
            },300)

            $(window).removeListener('keydown',method.keyCodeSetting)
            $(window).removeListener('keyup',method.keyCodeSetting)
        })

        return { ...toRefs(props),...state,...method }
    }
})
</script>