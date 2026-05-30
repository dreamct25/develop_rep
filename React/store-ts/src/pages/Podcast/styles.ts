import { styled } from '@linaria/react'

export default styled.div`
    padding: 36px 0 20px 0;

    .list-outer {
        
        .list {
            display: grid;
            grid-template-columns: repeat(auto-fit, 235px);
            gap: 12px;
            justify-content: center;
            padding-bottom: 12px;

            @media screen and (max-width: 512px) {
                grid-template-columns: repeat(auto-fit, 250px);
            }

            .card {
                border-radius: 5px;
                overflow: hidden;
                background-color: rgba(255, 255, 255, .1);
                backdrop-filter: blur(3px);
                cursor: pointer;
                user-select: none;

                .top {
                    position: relative;
                    
                    .img-place-holder {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 2px;
                        opacity: 0;
                        z-index: 2;
                        height: 235px;
                        pointer-events: none;
                        backdrop-filter: blur(6px);
                        background-color: rgba(30, 30, 30, .7);
                        transition: opacity .2s ease;

                        &.toggle {
                            opacity: 1;
                        }

                        svg {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 60%;

                            /* 整個 SVG 的旋轉動畫，提供基礎的旋轉速度 */
                            .spinner {
                                animation: rotate 2s linear infinite;
                                transform-origin: center center;
                                width: 100%;
                                height: 100%;
                            }

                            /* 圓弧的動畫：包含筆觸伸縮（dash）以及顏色切換（colors） */
                            .path {
                                stroke-dasharray: 1, 200;
                                stroke-dashoffset: 0;
                                stroke: rgba(255, 255, 255, .7);
                                animation: dash 1.5s ease-in-out infinite, colors 5.6s ease-in-out infinite;
                                stroke-linecap: round;
                                stroke-width: 3px;
                                fill: none;
                                stroke-miterlimit: 10px;
                            }

                            /* 基礎旋轉動畫 */
                            @keyframes rotate {

                                100% {
                                    transform: rotate(360deg);
                                }
                            }

                            /* 弧線長度伸縮動畫：模擬 MUI 經典的「追逐」與「收縮」效果 */
                            @keyframes dash {

                                0% {
                                    stroke-dasharray: 1, 200;
                                    stroke-dashoffset: 0;
                                }

                                50% {
                                    stroke-dasharray: 89, 200;
                                    stroke-dashoffset: -35px;
                                }

                                100% {
                                    stroke-dasharray: 89, 200;
                                    stroke-dashoffset: -124px;
                                }
                            }
                        }
                    }

                    .img-outer {
                        height: 235px;

                        img {
                            width: 100%;
                        }
                    }
                }

                .bottom {
                    padding: 6px;
                    color: white;

                    div, span {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        margin-bottom: 8px;

                        &:nth-child(2) {
                            font-size: 14px;
                            text-align: right;
                        }

                        &:nth-child(3) {
                            font-size: 14px;
                            text-align: right;
                        }

                        &:last-child {
                            margin-bottom: 0;
                        }
                    }

                    span {
                        font-size: 18px;
                    }
                }
            }
        }
    }
`