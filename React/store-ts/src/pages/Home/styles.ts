import { styled } from '@linaria/react'

export default styled.div<{ 
    progressCount: number, 
    toggleLoadingStatus: boolean
}>`

    .header {
        position: fixed;
        top: 0;
        padding: 6px 12px 16px 12px;
        z-index: 2;
        transition: top .5s ease;

        &.toggle {
            top: -65px;
        }

        .logo {
            cursor: pointer;
            user-select: none;
            color: white;
            font-size: 40px;
            display: inline;
            letter-spacing: 2px;
            font-style: italic;
        }
    }

    .main {

        .page {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            &.hidden {
                display: none;
            }

            .search-preview-outer {
                height: 100%;

                .preview-item-outer {
                    height: 100%;
                    overflow-y: auto;
                    scroll-snap-type: y mandatory;

                    /* iOS Safari 滑順 */
                    -webkit-overflow-scrolling: touch;
                    padding: 0 20px;

                    &::-webkit-scrollbar {
                        width: 0;
                    }

                    .preview-item {
                        display: flex;
                        flex-direction: column;
                        scroll-snap-align: center;
                        margin: 36px auto 0 auto;
                        padding: 6px 12px 11px 12px;
                        max-width: 960px;
                        backdrop-filter: blur(10px);
                        box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .3);
                        border-radius: 5px;
                        overflow: hidden;

                        &:first-child {
                            margin: 70px auto 0 auto;
                        }

                        &:last-child {
                            margin: 36px auto 110px auto;
                        }

                        &.hidden {
                            display: none;
                        }

                        .title-group {
                            display: flex;
                            justify-content: space-between;
                            margin: 5px 5px 9px 2px;

                            .title {
                                font-size: 40px;
                                padding: 0 0 8px 4px;
                                color: white;
                            }

                            .more-btn {
                                color: white;
                                align-self: end;
                                cursor: pointer;
                                user-select: none;
                            }
                        }

                        .item-list {

                            &.music {

                                .item-outer {
                                    width: 100%;
                                    max-width: 210px;
                                    aspect-ratio: 9 / 16;

                                    .item {

                                        div {

                                            &:nth-child(2) {
                                                position: absolute;
                                                top: 88%;
                                                bottom: 0;
                                                right: 0;
                                                left: 0;
                                                z-index: 2;
                                                pointer-events: none;
                                                background: linear-gradient(180deg, rgba(30, 30, 30, 0), rgba(30, 30, 30, 1));
                                                color: white;
                                                padding: 0 12px;
                                                display: flex;
                                                flex-direction: column;
                                                justify-content: center;

                                                span {
                                                    text-align: center;
                                                    overflow: hidden;
                                                    text-overflow: ellipsis;
                                                    display: -webkit-box;
                                                    -webkit-line-clamp: 1;
                                                    -webkit-box-orient: vertical;
                                                    white-space: nowrap;
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            &.music-video {
                                
                                .item-outer {
                                    width: 100%;
                                    max-width: calc(100% - 103px);
                                    aspect-ratio: 16 / 9;

                                    .item {

                                        .video-outer {
                                            position: absolute;
                                            top: 0;
                                            left: 0;
                                            right: 0;
                                            bottom: 0;

                                            &.toggle {

                                                &::after {
                                                    opacity: 1;
                                                }
                                            }

                                            &::after {
                                                content: '';
                                                position: absolute;
                                                top: 0;
                                                left: 0;
                                                right: 0;
                                                bottom: 0;
                                                background-color: rgba(30, 30, 30, .7);
                                                opacity: 0;
                                                z-index: 1;
                                                pointer-events: none;
                                            }
                                        
                                            .muted-btn {
                                                position: absolute;
                                                top: 0;
                                                right: 0;
                                                z-index: 3;
                                                margin: 5px;
                                                color: white;
                                                background-color: rgba(30, 30, 30, .7);
                                                padding: 6px 7px;
                                                border-radius: 50%;
                                                box-shadow: inset 0 0 2px rgba(255, 255, 255, .5);
                                                cursor: pointer;
                                                user-select: none;

                                                svg {
                                                    transform: translateY(1px) scale(.7);
                                                    pointer-events: none;
                                                }
                                            }

                                            video {
                                                position: absolute;
                                                top: 0;
                                                left: 0;
                                                right: 0;
                                                bottom: 0;
                                                z-index: 2;
                                                width: 100%;
                                                height: 100%;
                                                opacity: 0;
                                                pointer-events: none;
                                                transition: opacity .5s ease;
                                                transform: scale(1.01);

                                                &.toggle {
                                                    opacity: 1;
                                                    pointer-events: all;
                                                }
                                            }
                                        }

                                        div {

                                            &:nth-child(3) {
                                                position: absolute;
                                                top: 90%;
                                                bottom: 0;
                                                right: 0;
                                                left: 0;
                                                z-index: 2;
                                                pointer-events: none;
                                                background: linear-gradient(180deg, rgba(30, 30, 30, 0), rgba(30, 30, 30, 1));
                                                color: white;
                                                padding: 0 12px;
                                                display: flex;
                                                flex-direction: column;
                                                justify-content: center;

                                                @media screen and (max-width: 768px) {
                                                    top: 88%;
                                                }

                                                @media screen and (max-width: 576px) {
                                                    top: 84%;
                                                }

                                                @media screen and (max-width: 470px) {
                                                    top: 79%;
                                                }

                                                @media screen and (max-width: 414px) {
                                                    top: 72%;
                                                }

                                                span {
                                                    text-align: center;
                                                    overflow: hidden;
                                                    text-overflow: ellipsis;
                                                    display: -webkit-box;
                                                    -webkit-line-clamp: 1;
                                                    -webkit-box-orient: vertical;
                                                    white-space: nowrap;
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            &.podcast {
                                
                                .item-outer {
                                    width: 100%;
                                    max-width: 280px;
                                    aspect-ratio: 1 / 1;

                                    .item {
                                        
                                        div {

                                            &:nth-child(2) {
                                                position: absolute;
                                                top: 0;
                                                right: 0;
                                                z-index: 2;
                                                background-color: rgba(30, 30, 30, .7);
                                                color: white;
                                                padding: 5px 8px 6px 12px;
                                                border-radius: 0 0 0 5px;
                                                font-size: 14px;
                                            }

                                            &:nth-child(3) {
                                                position: absolute;
                                                top: 88%;
                                                bottom: 0;
                                                right: 0;
                                                left: 0;
                                                z-index: 2;
                                                pointer-events: none;
                                                background: linear-gradient(180deg, rgba(30, 30, 30, 0), rgba(30, 30, 30, 1));
                                                color: white;
                                                padding: 0 12px;
                                                display: flex;
                                                flex-direction: column;
                                                justify-content: center;

                                                span {
                                                    text-align: center;
                                                    overflow: hidden;
                                                    text-overflow: ellipsis;
                                                    display: -webkit-box;
                                                    -webkit-line-clamp: 1;
                                                    -webkit-box-orient: vertical;
                                                    white-space: nowrap;
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            &.ebook {
                                
                                .item-outer {
                                    width: 100%;
                                    max-width: 280px;
                                    height: 440px;

                                    .item {
                                        
                                        div {

                                            &:nth-child(2) {
                                                position: absolute;
                                                top: 0;
                                                right: 0;
                                                z-index: 2;
                                                background-color: rgba(30, 30, 30, .7);
                                                color: white;
                                                padding: 5px 8px 6px 12px;
                                                border-radius: 0 0 0 5px;
                                                font-size: 14px;
                                                width: 45%;

                                                span {
                                                    overflow: hidden;
                                                    text-overflow: ellipsis;
                                                    display: -webkit-box;
                                                    -webkit-line-clamp: 1;
                                                    -webkit-box-orient: vertical;
                                                    white-space: nowrap;
                                                }
                                            }

                                            &:nth-child(3) {
                                                position: absolute;
                                                top: 91%;
                                                bottom: 0;
                                                right: 0;
                                                left: 0;
                                                z-index: 2;
                                                pointer-events: none;
                                                background: linear-gradient(180deg, rgba(30, 30, 30, 0), rgba(30, 30, 30, 1));
                                                color: white;
                                                padding: 0 12px;
                                                display: flex;
                                                flex-direction: column;
                                                justify-content: center;

                                                span {
                                                    text-align: center;
                                                    overflow: hidden;
                                                    text-overflow: ellipsis;
                                                    display: -webkit-box;
                                                    -webkit-line-clamp: 1;
                                                    -webkit-box-orient: vertical;
                                                    white-space: nowrap;
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            &.software {
                                
                                .item-outer {
                                    width: 100%;
                                    max-width: 207px;
                                    aspect-ratio: 1 / 1;

                                    .item {

                                        div {
                                            
                                            &:nth-child(2) {
                                                position: absolute;
                                                top: 84%;
                                                bottom: 0;
                                                right: 0;
                                                left: 0;
                                                z-index: 2;
                                                pointer-events: none;
                                                background: linear-gradient(180deg, rgba(30, 30, 30, 0), rgba(30, 30, 30, 1));
                                                color: white;
                                                padding: 0 12px;
                                                text-align: center;
                                                display: flex;
                                                flex-direction: column;
                                                justify-content: center;

                                                span {
                                                    text-align: center;
                                                    overflow: hidden;
                                                    text-overflow: ellipsis;
                                                    display: -webkit-box;
                                                    -webkit-line-clamp: 1;
                                                    -webkit-box-orient: vertical;
                                                    white-space: nowrap;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            
                            .item-outer {
                                cursor: pointer;
                                user-select: none;
                                margin-right: 12px;

                                &:last-child {
                                    margin-right: unset;
                                }
                                
                                .item {
                                    position: relative;
                                    overflow: hidden;
                                    border-radius: 5px;
                                    height: 100%;

                                    .img {
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        right: 0;
                                        bottom: 0;
                                        background-image: var(--bg);
                                        background-repeat: no-repeat;
                                        background-size: cover;
                                        background-position: center center;

                                        .img-place-holder {
                                            position: absolute;
                                            top: 0;
                                            left: 0;
                                            right: 0;
                                            bottom: 0;
                                            opacity: 0;
                                            z-index: 2;
                                            pointer-events: none;
                                            transition: opacity .2s ease;

                                            &::after {
                                                content: '';
                                                position: absolute;
                                                top: 0;
                                                left: 0;
                                                right: 0;
                                                bottom: 0;
                                                backdrop-filter: blur(6px);
                                                border-radius: 5px;
                                                background-color: rgba(30, 30, 30, .7);
                                            }

                                            &.toggle {
                                                opacity: 1;
                                            }

                                            svg {
                                                position: absolute;
                                                top: 50%;
                                                left: 50%;
                                                transform: translate(-50%, -50%);
                                                width: 50%;

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
                                    }
                                }
                            }
                        }
                    }

                    .no-data {
                        color: white;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        text-align: center;
                        height: 100%;
                    }
                }
            }
        }

        .input-frame {
            position: fixed;
            left: 50%;
            transform: translate(-50%, 0);
            bottom: 34px;
            z-index: 3;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 0 1px 0 rgba(255, 255, 255, .7);
            backdrop-filter: blur(10px);
            transition: bottom .5s ease;

            &.toggle {
                bottom: 46.5%;
            }

            input {
                appearance: none;
                box-sizing: border-box;
                border: unset;
                background-color: rgba(30,30,30,.3);
                font-size: 20px;
                padding: 5px 12px 7px 12px;
                color: rgba(255, 255, 255, 1);
                outline: none;
                text-align: center;
                transition: .5s ease;

                &::placeholder {
                    font-size: 15px;
                    color: rgba(255, 255, 255, .7);
                }

                &:disabled {
                    color: rgba(255, 255, 255, .5);
                    pointer-events: none;
                    cursor: not-allowed;
                }
            }

            .progress {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0,255,240,.8);
                opacity: ${props => props.toggleLoadingStatus ? .5 : 0};
                width: ${props => `${props.progressCount}%`};
                transition: .5s ease;
            }
        }
    }

    .footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
        margin: 8px;
        font-size: 12px;
        color: white;
        transition: bottom .5s ease;

        &.toggle {
            bottom: -30px;
        }

        &.outside {
            background-color: rgba(30, 30, 30, .5);
            backdrop-filter: blur(6px);
            padding: 9px 0 8px 0;
            width: 210px;
            margin: 0 auto;
            border-radius: 5px 5px 0 0;
        }

        &.inside {
            margin-bottom: 12px;
        }
    }
`