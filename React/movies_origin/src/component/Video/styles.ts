import styled from 'styled-components'
import { cssSetPropertys } from './types'

const cssSet: cssSetPropertys = {
    Show: styled.div`
        .video-outer{
            position: relative;
            overflow:hidden;
            .video-js{
                width:100%;
                height:500px;
                cursor: none;
                user-select:none;
            }
            .inital-play{
                position: absolute;
                top:50%;
                left:50%;
                z-index:16;
                opacity:1;
                transform:translate(-50%,-50%) scale(1);
                color:white;
                text-shadow:0 0 3px rgba(255,255,255,.7);
                cursor: pointer;
                user-select:none;
                transition:.7s ease;
            }
            .inital-play-hide{
                z-index:-1;
                opacity:0;
                transform:translate(-50%,-50%) scale(1.2);
            }
            .video-play{
                color:white;
                cursor: pointer;
                user-select:none;
            }
            .video-footer{
                display:grid;
                grid-template-columns:1% auto auto auto;
                align-items:center;
                position: absolute;
                left:0;
                right:0;
                bottom:0;
                z-index:14;
                padding:30px 0px 10px 15px;
                opacity:0;
                transform:translateY(100px);
                background:linear-gradient(0deg,rgba(30,30,30,1),rgba(30,30,30,.9),rgba(30,30,30,.6),rgba(30,30,30,0));
                transition:.7s ease;
                .video-progress{
                    display:flex;
                    justify-content:center;
                    .progress-custom{
                        width:87vw;
                        position: relative;
                        -webkit-appearance: none;
                        border-radius: 5px;
                        height: 8px;
                        cursor: pointer;
                        user-select: none;
                        background-image: -webkit-linear-gradient(left,#f22 0%,#f22 0%,#fff 0%,#fff 100%);
                        outline: none;
                    }
                    .progress-custom::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        width: 0px;
                        height: 8px;
                        background-color: red;
                        cursor: pointer;
                        user-select: none;
                    }
                }
                .video-volume-group{
                    position: relative;
                    .video-volume-btn{
                        text-align:center;
                        font-size:25px;
                        color:white;
                        cursor: pointer;
                        user-select: none;
                    }
                    .video-volume-slider{
                        position: absolute;
                        bottom:0;
                        opacity:0;
                        transform:translate(-60px,-103px) rotate(-90deg);
                        transition:.7s ease;
                        box-shadow:inset 0 0 2px 0 rgba(255,255,255,.7);
                        background-color:rgba(0,0,0,.7);
                        padding:2px 8px 5px 8px;
                        border-radius:20px;
                        .volume{
                            -webkit-appearance: none;
                            border-radius: 5px;
                            height: 8px;
                            cursor: pointer;
                            user-select: none;
                            background-image: -webkit-linear-gradient(left,#f22 0%,#f22 0%,#fff 0%,#fff 100%);
                            outline: none;
                            text-align:center;
                        }
                        .volume::-webkit-slider-thumb {
                            -webkit-appearance: none;
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            background-color: red;
                            cursor: pointer;
                            user-select: none;
                        }
                    }
                    .video-volume-slider-toggle{
                        opacity:1;
                        transform:translate(-60px,-93px) rotate(-90deg);
                    }
                }
                .video-time{
                    color:white;
                    margin-left:5px;
                }
            }
            .video-footer-active{
                opacity:1;
                transform:translateY(0px);
            }
            .volume-text{
                position:absolute;
                bottom:20%;
                left:50%;
                transform:translate(-50%,-50%);
                padding:5px 15px;
                opacity:0;
                color:white;
                border-radius:5px;
                background-color:rgba(0,0,0,.3);
                box-shadow:inset 0 0 2px 0 rgba(255,255,255,.7);
                transition:.7s ease;
            }
            .volume-text-toggle{
                opacity:1;
            }
            .video-outer-frame{
                position: absolute;
                top:0;
                left:0;
                right:0;
                bottom:0;
                opacity:1;
                z-index:15;
                background:linear-gradient(0deg,rgba(28,28,28,1),rgba(28,28,28,.6),rgba(28,28,28,.3),rgba(28,28,28,0));
                transition:.7s ease;
            }
            .video-outer-frame-hide{
                opacity:0;
                z-index:-1;
            }
        }

    `,
}

export default cssSet