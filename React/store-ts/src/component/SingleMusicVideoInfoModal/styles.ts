import { styled } from '@linaria/react'

export default styled.div<{ playDurationProgressVal: number, voiceProgressBackGroudVal: number }>`

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(30, 30, 30, .7);
    backdrop-filter: blur(6px);
    opacity: 0;
    z-index: 5;
    pointer-events: none;
    transition: opacity .5s ease;

    &.toggle {
        opacity: 1;
        pointer-events: all;
    }

    .single-music-video-info-modal-outer {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 12px;
        max-width: 900px;
        width: 95%;
        overflow: hidden;

        .single-content {
            color: white;
            position: relative;

            .no-video {
                text-align: center;
                letter-spacing: 2px;
                font-size: 20px;
                font-weight: bold;
            }

            .video-title-outer {
                opacity: 1;
                z-index: 2;
                position:absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 86%;
                pointer-events: none;
                background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
                transition: .5s ease;

                .video-title {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    transform:translate(25px,15px);
                    font-size: 28px;
                    width: 95%;
                }

                &.video-title-outer-toggle {
                    opacity: 0;
                    top: -30%;
                }
            }
            
            .video-black-frame {
                z-index: 1;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                opacity: 1;
                background-color: rgba(0,0,0,.7);
                pointer-events: none;
                transition: .5s ease;

                &.video-black-frame-toggle {
                    opacity: 0;
                    z-index: -1;
                }
            }
            
            .video-btn {
                z-index: 2;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%) scale(1);
                font-size: 35px;
                opacity: 1;
                pointer-events: none;
                transition:.5s ease;

                &.video-btn-toggle {
                    opacity: 0;
                    transform: translate(-50%,-50%) scale(2);
                }
            }

            video {
                width:100%;
                height: 100%;
                cursor: pointer;
                user-select: none;
            }

            .custom-progress {
                opacity: 1;
                display: grid;
                grid-template-columns: 1fr auto auto;
                gap: 12px;
                align-items: center;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
                padding: 8px 15px;
                transition: .5s ease;

                &.custom-progress-toggle {
                    opacity: 0;
                    bottom: -30%;
                }

                @media screen and (max-width:768px) {
                    padding: 8px 8px 8px 15px;
                }

                .duration-range-outer {

                    input {

                        &[type="range"]{
                            appearance: none;
                            border-radius: 2px;
                            height: 4px;
                            width: 97%;
                            box-sizing: border-box;
                            outline: none;
                            background-image: -webkit-linear-gradient(
                                    left,
                                    rgb(255, 51, 51) 0%,
                                    rgb(255, 51, 51) ${props => `${props.playDurationProgressVal}%`},
                                    rgba(255, 255, 255, .3) ${props => `${props.playDurationProgressVal}%`},
                                    rgba(255, 255, 255, .3) 100%
                                );
                            background-color: transparent;

                            &::-webkit-slider-thumb {
                                -webkit-appearance: none;
                                border-radius: 50%;
                                height: 10px;
                                width: 10px;
                                background-color: red;
                                cursor: pointer;
                            }
                        }
                    }
                }

                .voice-btn {
                    font-size:18px;
                    cursor: pointer;
                    user-select:none;

                    .voice-range-outer {
                        opacity: 0;
                        background-color: rgba(0,0,0,.3);
                        backdrop-filter: blur(6px);
                        position: absolute;
                        z-index: -1;
                        right: 0;
                        transform: rotate(-90deg) translate(50px, 134px);
                        transform-origin: bottom left;
                        transition:.5s ease;
                        padding: 0px 8px 9px 8px;
                        border-radius: 18px;
                        pointer-events: none;

                        &.voice-range-outer-toggle {
                            opacity: 1;
                            z-index: 2;
                            transform: rotate(-90deg) translate(60px, 134px);
                            pointer-events: all;
                        }

                        input {

                            &[type="range"]{
                                appearance: none;
                                border-radius: 2px;
                                height: 4px;
                                width: 97%;
                                box-sizing: border-box;
                                background-image: -webkit-linear-gradient(
                                    left,
                                    rgb(255, 51, 51) 0%,
                                    rgb(255, 51, 51) ${props => `${props.voiceProgressBackGroudVal}%`},
                                    rgba(255, 255, 255, .3) ${props => `${props.voiceProgressBackGroudVal}%`},
                                    rgba(255, 255, 255, .3) 100%
                                );
                                background-color: transparent;

                                &::-webkit-slider-thumb {
                                    -webkit-appearance: none;
                                    border-radius: 50%;
                                    height: 10px;
                                    width: 10px;
                                    background-color: red;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }

                .duration-time {
                    text-align: center;
                }
            }

            .text-show {
                position: absolute;
                top:80%;
                left:50%;
                opacity: 0;
                transform:translate(-50%,-50%) scale(.5);
                transition: .5s ease;
                box-shadow:inset 0 0 5px 12px rgba(0,0,0,.7);
                padding: 5px 7px 6px 6px;
                border-radius: 5px;

                &.text-show-toggle {
                    opacity: 1;
                    transform:translate(-50%,-50%) scale(.85);
                }
            }
        }
    }

    .load-text {
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        height: 100%;
    }
`