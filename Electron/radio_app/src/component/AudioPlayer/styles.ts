import styled from "styled-components";
import { cssSetPropertys } from './types'

const { Container }: cssSetPropertys = {
    Container: styled.div`
        margin: 105px 0;
        position: relative;
        video{
            display: none;
        }
        .vjs-v7{
            display: none;
        }
        .vjs-modal-dialog{
            display: none;
        }
        .voice-slider{
            position: absolute;
            top:50%;
            left: 50%;
            transform: translate(-50%,-50%);
            .voice-text{
                position: absolute;
                top:70%;
                left: 50%;
                transform: translate(-50%,-50%);
                font-size: 20px;
            }
        }
        .music-progress-outer{
            position: relative;
            height:10px;
            .music-progress{
                position: absolute;
                top: 0;
                left: 50%;
                bottom: 0;
                transform:translate(-50%,-30px) rotate(0.5turn);
                display:flex;
                justify-content: center;
                span{
                    margin:0 2px;
                    width:6px;
                    height: 20px;
                    background-color: white;
                    border-radius: 0 0 3px 3px;
                    transition: .7s ease;
                    &.stop{
                        height: 2px;
                    }
                    &.active-1{
                        animation: lineAnimate 1.1s ease-in-out infinite;
                    }
                    &.active-2{
                        animation: lineAnimate 1.3s ease-in-out infinite;
                    }
                    &.active-3{
                        animation: lineAnimate 1.5s ease-in-out infinite;
                    }
                    &.active-4{
                        animation: lineAnimate 1.7s ease-in-out infinite;
                    }
                    &.active-5{
                        animation: lineAnimate 1.9s ease-in-out infinite;
                    }
                    &.active-6{
                        animation: lineAnimate 2s ease-in-out infinite;
                    }
                    &.active-7{
                        animation: lineAnimate 1.8s ease-in-out infinite;
                    }
                    &.active-8{
                        animation: lineAnimate 1.6s ease-in-out infinite;
                    }
                    &.active-9{
                        animation: lineAnimate 1.4s ease-in-out infinite;
                    }
                    &.active-10{
                        animation: lineAnimate 1.2s ease-in-out infinite;
                    }
                    @keyframes lineAnimate {
                        0%{
                            height: 0px;
                        }
                        50%{
                            height: 20px;
                        }
                        100%{
                            height: 0px;
                        }
                    }
                }
            }
        }
        .set-bar {
            position: absolute;
            top:50%;
            left: 50%;
            transform: translate(-50%,-40%);
            display: flex;
            justify-content: center;
            z-index: 1;
            .prev-btn,
            .play-btn,
            .next-btn{
                display: flex;
                flex-direction: column;
                justify-content: center;
                color: white;
                font-size: 20px;
                cursor: pointer;
                user-select: none;
                margin: 0 4px;
            }
            .prev-btn{
                padding:0 10px 0 6px;
            }
            .play-btn{
                .play{
                    padding:0px 8px 0px 11px;
                }
                .pause{
                    padding:0px 9.5px 0px 9.5px;
                }
                
            }
            .next-btn{
                padding:0 7px 0 9px;
            }
        }
    `
}

export default Container