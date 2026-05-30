import { styled } from '@linaria/react'

export default styled.div<{ toggleLoadingStatus: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    opacity: ${props => props.toggleLoadingStatus ? 1 : 0};
    background-color: rgba(30, 30, 30, .7);
    backdrop-filter: blur(6px);
    pointer-events: ${props => props.toggleLoadingStatus ? 'all' : 'none'};
    transition: opacity .5s ease;

    .loading-outer {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;

        svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 250px;

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
                stroke-width: 1px;
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

        .loading-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-weight: bold;
            letter-spacing: 2px;
        }
    }
`