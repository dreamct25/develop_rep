import { styled } from '@linaria/react'

export default styled.div`

    &.error-page-layout {
        display: grid;
        grid-template-rows: 1fr 0fr;
        height: 100vh;
    }

    .rwd-header {
        position: fixed;
        top: 0;
        left: 0;
        margin: 9px 0 0 18px;
        color: white;
        font-size: 35px;
        font-style: italic;
        cursor: pointer;
        z-index: 1;
    }

    .main {
    
        .render-center-outer {
            overflow:hidden;
            background-color:rgb(30,30,30);

            .pc-layout {

                .is-loading-img {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    opacity: 0;
                    display: flex;
                    pointer-events: none;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background-color: rgba(30, 30, 30, .7);
                    backdrop-filter: blur(6px);
                    transition: opacity .5s ease;

                    &.toggle {
                        opacity: 1;
                    }

                    svg {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 200px;

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
                            stroke-width: 2px;
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
            
                .render-center-banner{
                    position: relative;
                    min-height: 100vh;
                    background-image: var(--scale-bg);
                    background-position: top center;
                    background-size: cover;
                    background-repeat: no-repeat;

                    &::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: rgba(30, 30, 30, .5);
                    }
                    
                    .render-center-banner-body{
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        z-index: 2;
                        padding-right: 25px;
                        max-width: var(--dynamic-width);
                        margin: 0 auto;
                        transform: translateX(-43px);

                        .title{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            text-shadow:1px 1px 2px rgba(0,0,0,.7);
                            margin-bottom: 15px;
                
                            .preview-video{
                                cursor: pointer;
                                user-select:none;
                                font-size: 25px;
                                color: white;
                
                                .play-icon{
                                    margin-left:5px;
                                }
                            }

                            .preview-title{

                                div {
                                    color:white;
                                    font-weight: bold;
                                    -webkit-line-clamp: 1;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;

                                    &.name {
                                        font-size: 40px;

                                        @media screen and (max-width: 430px) {
                                            font-size: 30px;
                                        }
                                    }

                                    &.sub-name {
                                        margin-top: 6px;
                                        font-size: 18px;
                                    }
                                }
                            }
                        }
            
                        .desc {
                            margin-bottom: 15px;
                            color:white;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            font-size: 20px;
                            line-height: 30px;
                            -webkit-line-clamp: 3;
                            text-align: justify;
                            text-shadow:1px 1px 2px rgba(0,0,0,.7);
                        }
                    }
                }
            }

            .rwd-layout {

                .scroll-icon {
                    
                    i {
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        opacity: 0;
                        transform: translate(-50%, -50%);
                        pointer-events: none;
                        z-index: 1;
                        font-size: 20px;
                        color: white;
                        animation: slidePointer 5s ease 1s forwards;

                        @keyframes slidePointer {
                            0% {
                                opacity: 0;
                                top: 50%;
                            }

                            16% {
                                opacity: 1;
                                top: 40%;
                            }

                            32% {
                                opacity: 0;
                                top: 40%;
                            }

                            48% {
                                opacity: 0;
                                top: 50%;
                            }

                            64% {
                                opacity: 1;
                                top: 40%;
                            }

                            80% {
                                opacity: 0;
                                top: 40%;
                            }
                        }
                    }

                    .mouse-icon {
                        position: fixed;
                        top: 45%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        pointer-events: none;
                        z-index: 1;
                        opacity: 0;
                        font-size: 20px;
                        box-shadow: 0 0 0 3px rgba(255, 255, 255, .5);
                        border-radius: 20px;
                        width: 20px;
                        height: 40px;
                        animation: showMouse 4s ease forwards;

                        @keyframes showMouse {
                            0% {
                                opacity: 0;
                            }

                            25% {
                                top: 50%;
                                opacity: 1;
                            }

                            50% {
                                top: 50%;
                                opacity: 1;
                            }

                            75% {
                                top: 50%;
                                opacity: 1;
                            }

                            100% {
                                top: 45%;
                                opacity: 0;
                            }
                        }

                        .line {
                            position: absolute;
                            top: 28%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            height: 10px;
                            width: 5px;
                            border-radius: 20px;
                            background-color: rgba(255, 255, 255, .5);
                            animation: slideMouse 2s ease 1s forwards;

                            @keyframes slideMouse {
                                0% {
                                    top: 28%;
                                }

                                16% {
                                    top: 38%;
                                }

                                32% {
                                    top: 38%;
                                }

                                48% {
                                    top: 28%;
                                }

                                64% {
                                    top: 38%;
                                }

                                80% {
                                    top: 38%;
                                }
                            }
                        }
                    }
                }

                .render-center-list {
                    height: 100vh;
                    overflow-y: auto;
                    scroll-snap-type: y mandatory;
                    /* iOS Safari 滑順 */
                    -webkit-overflow-scrolling: touch;

                    &.stop-snap {
                        scroll-snap-type: none;
                    }

                    &::-webkit-scrollbar {
                        display: none;
                    }

                    .render-center-item-outer {
                        position: relative;
                        min-height:100vh;
                        scroll-snap-align: center;
                        overflow: hidden;

                        .render-center-item {
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background-image: var(--scale-bg);
                            background-position: center center;
                            background-size:cover;
                            background-repeat:no-repeat;
                            opacity: 0.2;
                            transition: .5s ease;

                            &.active {
                                opacity: 1;
                            }

                            &::after {
                                content: '';
                                position: absolute;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                background-color: rgba(30, 30, 30, .5);
                            }

                            .render-center-body{
                                position: absolute;
                                left: 0;
                                right: 0;
                                z-index: 2;
                                width: 90%;
                                margin: 0 auto;
                                transform: translateY(var(--content-pos));

                                .top {
                                    opacity: 0;
                                    transform: translateY(-15px);
                                    transition: transform .5s ease .8s, opacity .5s ease .8s;
                                    margin-bottom: 3px;

                                    &.toggle {
                                        opacity: 1;
                                        transform: translateY(0);
                                    }
                    
                                    .title{
                                        margin-bottom: 12px;

                                        .preview-title{
                                            display: grid;
                                            grid-template-columns: 1fr auto;
                                            gap: 12px;
                                            align-items: center;
                                            margin-bottom: 20px;

                                            .left {

                                                div {
                                                    color:white;
                                                    font-weight: bold;
                                                    -webkit-line-clamp: 1;
                                                    overflow: hidden;
                                                    text-overflow: ellipsis;
                                                    display: -webkit-box;
                                                    -webkit-box-orient: vertical;

                                                    &.name {
                                                        font-size: 40px;

                                                        @media screen and (max-width: 430px) {
                                                            font-size: 30px;
                                                        }
                                                    }

                                                    &.sub-name {
                                                        margin-top: 6px;
                                                        font-size: 18px;
                                                    }
                                                }
                                            }

                                            .right {

                                                .rate {
                                                    display:flex;
                                                    justify-content: flex-end;
                                                    align-items:center;
                                                    color: white;
                                                    margin-bottom: 13px;
                                                    font-size: 18px;
                                                    font-weight: bold;

                                                    .stars{
                                                        margin-left: 8px;
                                                        color:yellow;
                                                    }
                                                }

                                                .preview-video{
                                                    cursor: pointer;
                                                    user-select:none;
                                                    font-size: 20px;
                                                    color: white;
                                    
                                                    .play-icon{
                                                        margin-left:5px;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    .release-date {
                                        color: white;
                                        font-weight: bold;
                                        text-align: right;
                                    }
                                }

                                .bottom {
                                    margin-top: 9px;
                                    opacity: 0;
                                    transform: translateY(15px);
                                    transition: transform .5s ease .8s, opacity .5s ease .8s;
                                    
                                    &.toggle {
                                        opacity: 1;
                                        transform: translateY(0);
                                    }

                                    .desc {
                                        color: white;
                                        text-shadow: 1px 1px 2px rgba(0,0,0,.7);
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        line-height: 30px;
                                        -webkit-line-clamp: 3;
                                        text-align: justify;
                                        font-size: 20px;
                                    }
                                }

                                .more-info{
                                    cursor: pointer;
                                    user-select: none;
                                    padding: 12px 0px;
                                    text-align: center;
                                    color: white;
                                    background-color: rgba(30, 30, 30, .2);
                                    box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);
                                    border-radius: 12px;
                                    backdrop-filter: blur(6px);
                                    margin: 7px auto -7px auto;
                                    max-width: 135px;
                                    width: 90%;
                                }
                            }
                        }
                    }
                }
            }
        }

        .search-group-outer {
            position:fixed;
            top: -50%;
            right:0;
            z-index: 12;
            display: flex;
            background-color: rgba(30, 30, 30, .2);
            backdrop-filter: blur(6px);
            border-radius: 20px;
            overflow: hidden;
            transition: top .7s ease;
            margin: 0 53px 0 12px;
            width: 229px;
            box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);

            @media screen and (max-width: 576px) {
                width: auto;
                left: 0;
            }

            &.toggle {
                top: 9px;
            }

            .search-group{
                display: grid;
                grid-template-columns: 1fr auto;
                width: 100%;
                padding: 1px 0;

                input{
                    appearance: none;
                    border: none;
                    outline: none;
                    box-sizing: border-box;
                    background-color: transparent;
                    width: 100%;
                    color: white;
                    padding: 6px 15px;
                    font-size: 18px;
                    text-align: center;
                }
                
                select{
                    border: none;
                    outline: none;
                    appearance: none;
                    background-color: transparent;
                    color: white;
                    border-left: 1px solid rgba(255, 255, 255, .2);
                    padding: 7.5px 10px 7px 10px;
                    text-align: center;

                    option {
                        background-color: rgb(20, 20, 20);
                    }
                }
            }
        }

        .search-btn {
            position: fixed;
            top: 0;
            right: 0;
            z-index: 30;
            width: 35px;
            height: 35px;
            margin: 9px 12px 0 0;
            backdrop-filter: blur(6px);
            background-color: rgba(30, 30, 30, .2);
            box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .7);
            border-radius: 50%;
            cursor: pointer;
            user-select:none;

            i {
                pointer-events: none;
                color: white;
                margin: 8px 0 0 10px;
            }
        }
    }

    .footer{
        color: white;
        text-align: center;
        padding: 15px 0;
        border-radius: 5px 5px 0 0;
        font-size: 14px;
    }
`