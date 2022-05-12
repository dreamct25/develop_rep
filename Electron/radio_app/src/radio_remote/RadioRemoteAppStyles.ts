import styled from "styled-components";
import { cssSetPropertys } from './types'

const { Container }:cssSetPropertys = {
    Container:styled.div`
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background-color: rgb(30,30,30);
        color: white;
        .header{
            padding: 35px 0 10px 0;
            text-align: center;
            font-weight: bold;
            font-size: 35px;
        }
        .main{
            padding: 10px;
            .current-channle{
                text-align: center;
                font-size: 20px;
                margin: 10px 0;
            }
            .play-controller{
                display: flex;
                justify-content: center;
                font-size: 60px;
                margin: 25px 0 10px 0;
                i{
                    margin: 0 10px;
                    transition: .5s ease;
                }
                .toggle{
                    opacity: .5;
                }
            }
            .voice-controller{
                display: grid;
                grid-template-columns: 55px auto;
                align-items: center;
                .txt{
                    display: block;
                    text-align: center;
                    font-size: 18px;
                }
                .slider-outer{
                    margin-left: 11px;
                    .MuiSlider-root{
                        margin-bottom: 0;
                    }
                    .MuiSlider-track{
                        border: none;
                        height: 20px;
                        background-color: rgb(0,162,255);
                    }
                    .MuiSlider-rail{
                        height: 20px;
                        background-color: rgba(255,255,255,.7);
                    }
                    .MuiSlider-thumb{
                        height: 20px;
                        width: 20px;
                        background-color: white;
                        &:focus,
                        &:hover, 
                        &.Mui-active, 
                        &.Mui-focusVisible{
                            box-shadow: inherit;
                        }
                        &:before{
                            display: none;
                        }
                    }
                    .MuiSlider-markLabel{
                        display: none;
                    }
                    .MuiSlider-valueLabel{
                        padding: 0;
                        width: 40px;
                        height: 25px;
                        border-radius: 3px;
                        background-color: rgb(0,162,255);
                        color: white;
                    }
                }
            }
            .radio-list-group{
                .radio-list-title{
                    font-size: 18px;
                    margin: 10px 0px 10px 0;
                }
                .radio-list-outer{
                    overflow-y: scroll;
                    overflow-x: hidden;
                    height: 56.5vh;
                    &::-webkit-scrollbar {
                        width: 4px;
                        background-color: transparent;
                        border-radius:20px;
                    }
                    &::-webkit-scrollbar-thumb {
                        background-color: rgba(255, 255, 255, 0.7);
                        border-radius:20px;
                    }
                    .radio-list-item{
                        display: flex;
                        position: relative;
                        overflow: hidden;
                        .img{
                            width: 60px;
                            overflow: hidden;
                            box-shadow: inset 0 0 1px 0.5px rgba(0,0,0,.7);
                            background-size: cover;
                            background-repeat: no-repeat;
                            background-position: center center;
                            min-height: 50px;
                            border-radius: 5px;
                            margin: 2px 0 0 0;
                        }
                        .title{
                            margin: 20px 12px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp:1;
                        }
                        .radio-list-item-playing{
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            opacity: 0;
                            z-index: -1;
                            background-color: rgba(0,0,0,.7);
                            border-radius: 5px;
                            margin: 2px 0px 0px 0px;
                            backdrop-filter: blur(2px);
                            transition: .5s ease;
                            .playing-progress{
                                position: absolute;
                                top: 0;
                                left: 50%;
                                bottom: 0;
                                transform:translate(-50%,-15px) rotate(0.5turn);
                                display:flex;
                                justify-content: center;
                                span{
                                    margin:0 2px;
                                    width:6px;
                                    height: 20px;
                                    background-color: white;
                                    border-radius: 0 0 3px 3px;
                                    transition: .7s ease;
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
                            &.toggle{
                                opacity: 1;
                                z-index: 1;
                            }
                        }
                    }
                    .no-data{
                        min-height: 58.5vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }
        .change-language-list{
            text-align:center;
            position: absolute;
            right: 0;
            z-index: 0;
            margin:5px 5px 0 0;
            color: black;
            overflow: hidden;
            border-radius: 5px;
            cursor: pointer;
            user-select: none;
            z-index: 1;
            transition: .5s ease;
            .change-language-switch{
                padding: 5px 6px;
                background-color: white;
                position: relative;
                z-index: 2;
            }
            .language-list-item-outer{
                margin-top:-53px;
                transition:.7s ease;
                border-top:0.1px solid rgba(0,0,0,.7);
                .language-list-item{
                    padding:5px 0;
                    background-color: white;
                    transition:.7s ease;
                    &.active{
                        color:white;
                        background-color: black;
                    }
                    &:hover{
                        color:white;
                        background-color: black;
                    }
                }
                &.toggle{
                    margin-top: 0;
                }
            }
        }
    `
}

export default Container