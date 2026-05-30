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

    .single-music-info-modal-outer {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 12px;
        padding: 15px;
        max-width: 600px;
        width: 85%;
        box-shadow: inset 0 0 2px .5px rgba(255,255,255,.5);

        .single-outer{

            .top {
                position: relative;
                display: grid;
                grid-template-columns: 188px 1fr;
                gap: 22px;
                margin-bottom: 12px;

                @media screen and (max-width: 490px) {
                    grid-template-rows: auto 1fr;
                    grid-template-columns: unset;
                    gap: 8px;
                }

                .img-outer {

                    img {
                        border-radius:15px;
                        width: 100%;
                        opacity: .8;
                    }
                }

                .right-detailse-outer {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    @media screen and (max-width: 490px) {
                       padding: 0 12px;
                    }

                    .right-detailse {
                        display: grid;
                        grid-template-rows: auto auto auto auto auto;

                        div {
                            color: white;
                            margin-bottom: 12px;

                            &:last-child {
                                margin-bottom: 0;
                            }
                            
                            &:nth-of-type(1) {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                                font-size:35px;

                                @media screen and (max-width: 490px){
                                    font-size:25px;
                                }
                            }
                            
                            &:nth-of-type(2) {

                                font-size:20px;

                                @media screen and (max-width: 490px){
                                    font-size:16px;
                                }
                            }

                            &:nth-of-type(3) {
                                
                                font-size:20px;

                                @media screen and (max-width: 490px){
                                    font-size:16px;
                                }
                            }

                            &:nth-of-type(4) {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                                font-size:25px;

                                @media screen and (max-width: 490px){
                                    font-size: 20px;
                                }
                            }
                        }
                    }
                }

                .try-text {
                    color: white;
                    position: absolute;
                    right: 0;
                    padding: 6px 8px;
                    border-radius: 6px;
                    box-shadow: inset 0 0 2px .5px rgba(255, 255, 255, .5);
                    transform: translate(7px, -7px);
                    font-size: 14px;

                    @media screen and (max-width: 490px) {
                        backdrop-filter: blur(6px);
                        background-color: rgba(30, 30, 30, .5);
                    }
                }
            }

            .bottom {

                .audio-outer {
                    display: grid;
                    grid-template-columns: 1fr auto;
                    gap: 6px;

                    .custom-progress {
                        display: grid;
                        grid-template-columns: 1fr auto;
                        gap: 12px;
                        align-items: center;
                        border-radius: 20px;
                        box-shadow: inset 0 0 2px .5px rgba(255,255,255,.5);
                        padding: 5px 15px 5px 15px;

                        input {
                            
                            &[type="range"]{
                                appearance: none;
                                width: 100%;
                                margin: 0 auto;
                                border-radius: 2px;
                                box-sizing: border-box;
                                height: 4px;
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
                        }
                        
                        .duration-time {
                            color: white;
                        }
                    }

                    .play {
                        box-shadow: inset 0 0 2px .5px rgba(255,255,255,.5);
                        border-radius: 50%;
                        padding: 6px 7px 4px 9px;
                        color: white;
                        cursor: pointer;
                        user-select:none;

                        svg {
                            width: 20px;
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