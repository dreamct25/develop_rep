import { styled } from '@linaria/react'

export default styled.div<{ playDurationProgress: number }>`

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

    .single-podcast-info-modal-outer {
        position: absolute;
        top: 5%;
        left: 0;
        right: 0;
        bottom: 5%;
        border-radius: 12px;
        padding: 15px;
        max-width: 500px;
        width: 85%;
        margin: 0 auto;
        box-shadow: inset 0 0 2px .5px rgba(255,255,255,.5);
        overflow: hidden;

        .podcast-list-outer {
            overflow-y: auto;
            overflow-x: hidden;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            &::-webkit-scrollbar {
                width: 0px;
                background-color: rgb(100, 100, 100);
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba(255, 255, 255, 0.7);
            }
            
            @media screen and (max-width:768px) {
                padding-bottom:50px;
            }

            .imgs-outer {
                display: flex;
                justify-content: center;
                padding: 15px;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius:20px;
                }
            }

            .podcast-list-item {
                padding: 12px 6px 12px 6px;
                margin: 0 15px;
                border-top:1px solid white;
                color: white;

                &:nth-of-type(1) {
                    padding: 2px 0 2px 0;
                    border-top:unset;
                }

                .list-header {
                    font-size: 20px;
                    margin: 2px 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }

                .list-content {
                    display: grid;
                    grid-template-rows: auto auto;

                    .details {
                        margin: 20px 15px 15px 15px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 5;
                        -webkit-box-orient: vertical;
                        white-space: pre-line;

                        a {
                            color: white;
                        }

                        &.details-toggle {
                            -webkit-line-clamp: unset;
                        }
                    }

                    .content-bottom {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 6px;

                        .btns-group {
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;

                            @media screen and (max-width: 414px) {
                                font-size: 14px;
                            }

                            .content-toggle-btn {
                                cursor: pointer;
                                user-select: none;
                                margin: 0 3px;
                                padding: 6px 12px;
                                border-radius: 20px;
                                box-shadow: inset 0 0 2px 0 rgba(255,255,255,.5);
                                text-align: center;
                            }

                            .show-input {
                                cursor: pointer;
                                user-select:none;
                                box-shadow: inset 0 0 2px 0 rgba(255,255,255,.5);
                                margin: 0 3px;  
                                padding: 6px 12px;
                                border-radius: 20px;
                                text-align: center;
                            }
                        }
                    }
                }

                .audio-outer {
                    max-height: 0;
                    padding: 0 2px 0 0;
                    opacity: 0;
                    transition: .5s ease;
                    pointer-events: none;
                    overflow: hidden;

                    &.audio-outer-toggle {
                        pointer-events: all;
                        max-height: 100vh;
                        opacity: 1;
                    }

                    .custom-progress-outer {
                        display: grid;
                        grid-template-columns: 1fr auto;
                        gap: 6px;
                        align-items: center;
                        padding-top: 12px;

                        .custom-progress {
                            position: relative;
                            border-radius: 20px;
                            box-shadow: inset 0 0 2px 1px rgba(255,255,255,.5);
                            padding: 0 12px;
                            height: 100%;
                            overflow: hidden;

                            .progress-mask {
                                position: absolute;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                opacity: 1;
                                background-color: rgba(30, 30, 30, .9);
                                transition: opacity .5s ease;
                                margin: 2px;
                                border-radius: 20px;
                                pointer-events: all;

                                &.hidden {
                                    opacity: 0;
                                    pointer-events: none;
                                }
                            }

                            .progress {
                                display: grid;
                                grid-template-columns: 1fr auto;
                                gap: 12px;
                                align-items:center;
                                height: 100%;

                                input[type="range"] {
                                    appearance: none;
                                    width: 100%;
                                    margin-right:5px;
                                    border-radius: 2px;
                                    height: 4px;
                                    box-sizing: border-box;
                                    outline: none;
                                    background-image: -webkit-linear-gradient(
                                            left,
                                            rgb(255, 51, 51) 0%,
                                            rgb(255, 51, 51) ${props => `${props.playDurationProgress}%`},
                                            rgba(255, 255, 255, .3) ${props => `${props.playDurationProgress}%`},
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

                                .duration-time {
                                    display:block;
                                    text-align: center;
                                    margin: 0 auto;
                                }
                            }
                        }

                        .play {
                            box-shadow: inset 0 0 2px 1px rgba(255,255,255,.5);
                            padding: 5px 6px;
                            color:white;
                            text-align:center;
                            cursor: pointer;
                            user-select:none;
                            border-radius: 50%;

                            svg {
                                transform: translateY(1px);
                            }
                        }
                    }
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