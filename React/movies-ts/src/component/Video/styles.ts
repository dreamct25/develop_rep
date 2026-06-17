import { styled } from '@linaria/react'

export default styled.div<{ 
    progressBarVal: number, 
    volumeBarVal: number 
}>`

    .video-outer{
        position: relative;
        overflow:hidden;

        .video-js-outer {
            height:500px;
            pointer-events: none;

            video-js{
                width:100%;
                height: 100%;

                .vjs-big-play-button {
                    display: none;
                }
            }
        }

        .video-play-btn {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
            opacity: 0;
            color:white;
            font-size: 25px;
            cursor: pointer;
            user-select:none;
            transition: .7s ease;

            &.toggle {
                opacity: 1;
            }
        }

        .video-footer {
            display: grid;
            grid-template-columns: 1fr 25px auto;
            gap: 12px;
            align-items:center;
            position: absolute;
            left:0;
            right:0;
            bottom:0;
            z-index:14;
            padding: 20px 15px 10px 15px;
            opacity:0;
            transform:translateY(100px);
            background: linear-gradient(
                0deg,
                rgba(0, 0, 0, 1),
                rgba(0, 0, 0, 0)
            );
            transition:.7s ease;

            &.hide-volume {
                grid-template-columns: 1fr auto;
            }

            &.video-footer-active {
                opacity:1;
                transform:translateY(0px);
            }

            .video-progress {
                display:flex;
                justify-content:center;

                .progress-custom {
                    width: 100%;
                    position: relative;
                    appearance: none;
                    border-radius: 5px;
                    height: 8px;
                    box-sizing: border-box;
                    cursor: pointer;
                    user-select: none;
                    outline: none;
                    background-color: transparent;
                    background-image: -webkit-linear-gradient(
                        left,
                        rgb(255, 51, 51) 0%,
                        rgb(255, 51, 51) ${props => `${props.progressBarVal}%`},
                        rgba(255, 255, 255, .3) ${props => `${props.progressBarVal}%`},
                        rgba(255, 255, 255, .3) 100%
                    );
                    
                    &::-webkit-slider-thumb {
                        appearance: none;
                        width: 15px;
                        height: 15px;
                        border-radius: 50%;
                        background-color: rgb(255, 51, 51);
                        cursor: pointer;
                        user-select: none;
                    }
                }
            }

            .video-volume-group {
                position: relative;

                .video-volume-btn {
                    text-align:center;
                    font-size:25px;
                    color:white;
                    cursor: pointer;
                    user-select: none;
                }

                .video-volume-slider {
                    position: absolute;
                    bottom:0;
                    opacity:0;
                    transform:translate(-64px,-103px) rotate(-90deg);
                    transition:.7s ease;
                    box-shadow:inset 0 0 2px 0 rgba(255,255,255,.7);
                    background-color:rgba(0,0,0,.7);
                    padding:2px 8px 5px 8px;
                    border-radius:20px;

                    &.video-volume-slider-toggle {
                        opacity:1;
                        transform:translate(-64px,-93px) rotate(-90deg);
                    }

                    .volume {
                        appearance: none;
                        border-radius: 5px;
                        height: 8px;
                        cursor: pointer;
                        user-select: none;
                        box-sizing: border-box;
                        outline: none;
                        text-align:center;
                        background-color: transparent;
                        background-image: -webkit-linear-gradient(
                            left,
                            rgb(255, 51, 51) 0%,
                            rgb(255, 51, 51) ${props => `${props.volumeBarVal}%`},
                            rgba(255, 255, 255, .3) ${props => `${props.volumeBarVal}%`},
                            rgba(255, 255, 255, .3) 100%
                        );
                    
                        &::-webkit-slider-thumb {
                            appearance: none;
                            width: 15px;
                            height: 15px;
                            border-radius: 50%;
                            background-color: rgb(255, 51, 51);
                            cursor: pointer;
                            user-select: none;
                        }
                    }
                }
            }

            .video-time {
                color:white;
            }
        }

        .volume-text {
            position:absolute;
            top:18%;
            left:50%;
            transform:translate(-50%,-50%);
            padding: 6px 8px;
            opacity:0;
            color:white;
            border-radius:5px;
            background-color:rgba(30, 30, 30, .3);
            backdrop-filter: blur(6px);
            box-shadow:inset 0 0 2px 0 rgba(255,255,255,.7);
            transition: opacity .3s ease, top .3s ease;
        
            &.volume-text-toggle {
                top:20%;
                opacity:1;
            }
        }

        .video-outer-frame {
            position: absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            opacity:1;
            z-index:15;
            pointer-events: all;
            background:linear-gradient(
                0deg,
                rgba(30, 30, 30, 1),
                rgba(30, 30, 30, 0)
            );
            cursor: pointer;
            user-select: none;
            transition: opacity .7s ease;
        
            &.video-outer-frame-hide {
                opacity:0;
                pointer-events: none;
            }
        }
    }

`