import { styled } from '@linaria/react'

export default styled.div`
    padding: 36px 0 20px 0;

    .list-outer {
        
        .list {
            display: grid;
            grid-template-columns: repeat(auto-fit, 350px);
            gap: 12px;
            justify-content: center;

            .card {
                border-radius: 5px;
                overflow: hidden;
                background-color: rgba(255, 255, 255, .1);
                backdrop-filter: blur(3px);
                display: grid;
                grid-template-columns: 134px auto;
                cursor: pointer;
                user-select: none;

                .left {
                    position: relative;
                    
                    .img-place-holder {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        opacity: 0;
                        z-index: 2;
                        height: 136px;
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
                        overflow: hidden;
                        height: 136px;

                        img {
                            width: 100%;
                            transform: scale(1.03);
                        }
                    }
                }

                .right {
                    padding: 6px 18px;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    div {
                        font-size: 14px;
                        margin-bottom: 12px;

                        &:nth-child(1) {
                            font-size: 18px;
                        }

                        &:is(:nth-child(1), :nth-child(2)) {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                        }

                        &:last-child {
                            margin-bottom: 0;
                        }
                    }
                }
            }
        }
    }
`