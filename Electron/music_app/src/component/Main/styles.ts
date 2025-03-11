import { styled } from '@linaria/react';

export default styled.div<{ 
    bgPath: string,
    bgBlurPec: number,
    bgMaskPec: number,
    isFullscreen: boolean,
    themColorRgba: string,
    getSettingStatus: boolean
}>`
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-image: ${props => `url(${props.bgPath || '/asset/img/main-bg.jpg'})` };
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    user-select: none;
    margin: ${props => props.isFullscreen ? '0' : '5px'};
    border-radius: ${props => props.isFullscreen ? '0' : '5.5px'};
    overflow: hidden;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.7);
    transition: .5s ease;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        backdrop-filter: ${props => `blur(${props.bgBlurPec}px)`};
        background-color: ${props => `rgba(30,30,30,${props.bgMaskPec})`};
        z-index: -1;
    }
    
    .top-bar{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 33px;
        background-color: rgb(60,60,60);
        z-index: 20;
        padding: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: ${props => props.isFullscreen ? '0' : '5px 5px 0 5px'};
        border-radius: ${props => props.isFullscreen ? '0' : '5.5px 5.5px 0 0'};

        .top-bar-title{
            display: flex;
            align-items: center;
            font-size: 15px;
            img{
                height:20px;
            }
            span{
                padding-left: 5px;
            }
        }
        
        .top-bar-controller{
            display: flex;

            .abount-text{
                margin:0 8px;
                font-size: 14px;
                cursor: pointer;
                user-select: none;
            }

            .min{
                background-color: rgb(255,214,10);
                height:13px;
                width:13px;
                border-radius: 50%;
                font-size: 7px;
                color:rgba(0,0,0,.5);

                .min-icon{
                    transform: translate(3px,3px);
                    opacity: 0;
                    transition: .5s ease;
                }
            }

            .full{
                background-color: rgb(50,215,75);
                height:13px;
                width:13px;
                margin: 0 5px;
                border-radius: 50%;
                font-size: 9px;
                color:rgba(0,0,0,.5);

                .full-icon{
                    transform: translate(2px,2px);
                    opacity: 0;
                    transition: .5s ease;
                }
            }

            .close{
                background-color: rgb(255,69,58);
                height:13px;
                width:13px;
                border-radius: 50%;
                font-size: 11px;
                color:rgba(0,0,0,.5);

                .close-icon{
                    transform: translate(1px,1px);
                    opacity: 0;
                    transition: .5s ease;
                }
            }

            &:hover{
                .min-icon,
                .full-icon,
                .close-icon{
                    opacity: 1;
                }
            }
        }
    }

    .main-layout {
        height: 100%;
        display: grid;
        grid-template-rows: 1fr 0fr;
        opacity: 1;
        transform: scale(1);
        transition: .5s ease;
        
        .bottom {
            background-color: ${props => props.themColorRgba};
            margin: 0 6px -112px 6px;
            border-radius: 5px;
            box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);
            transition: .5s ease;

            .player-layout {
                padding: 12px;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 12px;

                .left {
                    display: grid;
                    grid-template-columns: 0fr 1fr;
                    gap: 12px;
                    align-items: center;

                    div {

                        &:first-of-type {
                            background-repeat: no-repeat;
                            background-position: center center;
                            background-size: cover;
                            width: 74px;
                            border-radius: 5px;
                            height: 100%;
                        }

                        &:last-of-type {

                            span {
                                display: block;

                                &:first-of-type {
                                    font-weight: bold;
                                    font-size: 16px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 1;
                                    -webkit-box-orient: vertical;
                                }

                                &:last-of-type {
                                    font-weight: bold;
                                    font-size: 12px;
                                    margin-top: 8px;
                                }
                            }
                        }
                    }
                }

                .medium {

                    .top {
                        display: grid;
                        grid-template-columns: 0fr 0fr 0fr;
                        justify-content: center;

                        .prev-song-btn {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                            user-select: none;
                            opacity: 1;
                            transition: .5s ease;

                            &.disabled {
                                cursor: not-allowed;
                                opacity: .5;
                            }

                            svg {
                                font-size: 37px;
                            }
                        }

                        .play-btn {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                            user-select: none;
                            padding: 0 12px;
                            
                            svg {
                                font-size: 58px;
                            }
                        }

                        .next-song-btn {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                            user-select: none;
                            opacity: 1;
                            transition: .5s ease;

                            &.disabled {
                                cursor: not-allowed;
                                opacity: .5;
                            }

                            svg {
                                font-size: 37px;
                            }
                        }
                    }

                    .bottoms {
                        display: grid;
                        grid-template-columns: auto 1fr auto;
                        gap: 12px;
                        align-items: center;
                    }
                }

                .right {
                    display: grid;
                    grid-template-columns: 1fr 0fr;
                    gap: 26px;
                    padding-left: 12px;

                    .control-left {
                        
                        .voice-control {
                            display: flex;
                            align-items: center;
                            height: 100%;
                            width: 144px;
                            margin-left: auto;

                            svg {
                                font-size: 24px;
                                margin-right: 4px;
                            }
                        }
                    }

                    .control-right {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 5px;

                        .icon {
                            display: flex;
                            justify-content: center;
                            flex-direction: column;
                            align-items: center;
                            padding: 0px 9px;
                            box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);
                            border-radius: 5px;
                            cursor: pointer;
                            user-select: none;
                            opacity: 1;
                            transition: .5s ease;

                            &.active {
                               background-color: rgba(255,255,255,.8);
                               box-shadow: inset 0 0 2px 0 rgba(30, 30, 30, .5);

                               svg {
                                color: rgba(30, 30, 30, .8);
                               }
                            }

                            &.disabled {
                                cursor: not-allowed;
                                user-select: none;
                                opacity: .5;
                            }
                        }
                    }

                   
                }
            }
        }

        &.toggle {
            
            .bottom {
                margin: 0 6px 6px 6px;
            }
        }

        &.toggle-view-video {
            opacity: 0;
            transform: scale(.9);
        }
    }

    .modal-outer-frame {

        .scroll-content {
            text-align: left;
            margin: 0 8px 0 12px;
            overflow-x: hidden;
            overflow-y: auto;
            height: 300px;
            padding-right: 10px;
            margin-bottom: 8px;

            &::-webkit-scrollbar {
                width: 5px;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 20px;
                background-color: rgba(255, 255, 255, 0.7);
            }
            
            strong {
                display: block;
                font-weight: bold;
                font-size: 22px;
                text-align: center;
                margin-bottom: 12px;
            }

            .inside-content {

                .top {
                    text-align: justify;
                }

                .bottom {
                    margin-top: 12px;

                    .item {
                        display: grid;
                        grid-template-columns: 0fr 1fr;
                        margin-bottom: 12px;

                        &:last-child {
                            margin-bottom: 0;
                        }

                        div {

                            &:first-child {
                                margin-right: 12px;
                            }

                            &:last-child {
                                text-align: justify;
                            }
                        }
                    }
                }
            }
        }

        .copy-right {
            position: relative;
            margin: 0 12px;
            padding-top: 8px;

            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                background-color: rgba(255, 255, 255, .5);
                height: .5px;
            }

        }
    }

    

    .video-modal {
        position: relative;
        height: 100%;
        
        .black-mask {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            background-color: rgba(30, 30, 30, .7);
            transition: .5s ease;

            &.hidden {
                background-color: rgba(30, 30, 30, 0);
                cursor: none;
            }
        }

        .song-info {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2;
            display: grid;
            grid-template-columns: 0fr 1fr;
            gap: 12px;
            align-items: center;
            height: 100px;
            opacity: 1;
            margin: 25px;
            transform: scale(1);
            transform-origin: left bottom;
            transition: .5s ease;

            &.small {
                transform: scale(.8);
                opacity: 0;
            }

            .img {
                background-repeat: no-repeat;
                background-position: center center;
                background-size: cover;
                width: 100px;
                border-radius: 5px;
                height: 100%;
            }

            .info {

                span {
                    display: block;

                    &:first-of-type {
                        font-weight: bold;
                        font-size: 25px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }

                    &:last-of-type {
                        font-weight: bold;
                        font-size: 16px;
                        margin-top: 8px;
                    }
                }
            }
        }

        .close-video-modal-btn {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 2;
            margin: 12px;
            padding: 5px 5px 3.5px 5px;
            border-radius: 5px;
            box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);
            cursor: pointer;
            user-select: none;
            opacity: 1;
            transform: translateY(0);
            transition: .5s ease;

            &.hidden {
                opacity: 0;
                transform: translateY(-76px);
            }

            svg {
                font-size: 20px;
            }
        }

        .play-btn {
            position: absolute;
            right: 0;
            bottom: 18px;
            z-index: 2;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            user-select: none;
            padding: 0 12px;
            opacity: 1;
            transition: .5s ease;
            transform: translateY(0);

            &.hidden {
                opacity: 0;
                transform: translateY(76px);
            }
            
            svg {
                font-size: 58px;
            }
        }

        .prev-btn {
            position: absolute;
            top: 45%;
            left: 0;
            z-index: 2;
            cursor: pointer;
            user-select: none;
            padding: 0 12px;
            opacity: 1;
            transition: .5s ease;
            transform: translateY(0);

            &.hidden {
                opacity: 0;
                transform: translateX(-76px);
            }
            
            svg {
                font-size: 58px;
            }
        }

        .next-btn {
            position: absolute;
            top: 45%;
            right: 0;
            z-index: 2;
            cursor: pointer;
            user-select: none;
            padding: 0 12px;
            opacity: 1;
            transition: .5s ease;
            transform: translateY(0);

            &.hidden {
                opacity: 0;
                transform: translateX(76px);
            }
            
            svg {
                font-size: 58px;
            }
        }
    }

    .setting-list-outer-frame {
        position: fixed;
        top: 33px;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        z-index: -1;
        margin: ${props => props.isFullscreen ? '0' : '5px'};
        overflow: hidden;
        transition: .5s ease;
        background: linear-gradient(-90deg,rgba(0,0,0,1),rgba(0,0,0,0));

        &.toggle {
            opacity: 1;
            z-index: 20;

            .setting-list-outer {
                transform: translateX(0px);
            }
        }

        .setting-list-outer {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 300px;
            transform: translateX(312px);
            margin: 7px 7px 7px 0;
            padding: 12px;
            display: grid;
            grid-template-rows: 0fr 1fr;
            transition: .5s ease;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                backdrop-filter: blur(10px);
                border-radius: 5px;
                box-shadow: inset 0 0 2px 0 rgba(255,255,255,.7);
                z-index: -1;
            }

            .top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 12px;
                border-bottom: .5px solid rgba(255, 255, 255, .7);

                .title {
                    font-weight: bold;
                    font-size: 28px;
                }

                .close-btn {
                
                    padding: 5px 5px 3.5px 5px;
                    border-radius: 5px;
                    box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);
                    cursor: pointer;
                    user-select: none;

                    svg {
                        font-size: 20px;
                    }
                }
            }

            .bottom {
                position: relative;
                
                .list-outer {
                    overflow-y: auto;
                    overflow-x: hidden;
                    position: absolute;
                    top: 12px;
                    left: 0;
                    right: 0;
                    bottom: 0;

                    &::-webkit-scrollbar {
                        width: 12px;
                    }

                    &::-webkit-scrollbar-thumb {
                        border-radius: 20px;
                        background-color: rgba(255, 255, 255, 0.7);
                        border: 2px solid transparent;
                        background-clip: padding-box;
                    }

                    .list-row {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        align-items: center;
                        margin-bottom: 12px;

                        &.with-slide {
                            margin-bottom: 17px;

                            .right-option {
                                padding: 0 8px;
                            }
                        }

                        .left-title {
                            font-weight: bold;
                            font-size: 18px;
                        }

                        .right-option {

                            &.with-picker {
                                position: relative;
                            }

                            .change-language-list{
                                position: relative;
                                text-align:center;
                                color: white;
                                border-radius: 5px;
                                cursor: pointer;
                                user-select: none;

                                .change-language-switch{
                                    padding: 8px 6px;
                                    border-radius: 5px;
                                    box-shadow: inset 0 0 2px 0 rgba(255,255,255,.5);
                                    font-size: 15px;
                                }

                                .language-list-item-outer{
                                    position: absolute;
                                    top: 34px;
                                    left: 0;
                                    right: 0;
                                    overflow: hidden;
                                    max-height: 0;
                                    border-radius: 5px;
                                    z-index: 10;
                                    transition: .5s ease;

                                    &::before {
                                        content: '';
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        right: 0;
                                        bottom: 0;
                                        z-index: -1;
                                        backdrop-filter: blur(10px);
                                        box-shadow: inset 0 0 2px 0 rgba(255,255,255,.5);
                                    }

                                    .language-list-item{
                                        padding:5px 0;
                                        font-size: 15px;
                                        transition:.5s ease;
                                        padding: 8px 0;

                                        &.active{
                                            color:black;
                                            background-color: rgba(255,255,255,.7);
                                        }

                                        &:hover{
                                            color:black;
                                            background-color: rgba(255,255,255,.7);
                                        }
                                    }

                                    &.toggle{
                                        max-height: 100vh;
                                    }
                                }
                            }

                            .change-bg-btn{
                                cursor: pointer;
                                opacity: 1;
                                position: relative;
                                color: white;
                                text-align: center;
                                padding: 7px 10px;
                                border-radius: 5px;
                                background-color: rgba(255,255,255,0);
                                box-shadow: inset 0 0 2px 0 rgba(255,255,255,.7);
                                // overflow: hidden;
                                // text-overflow: ellipsis;
                                // display: -webkit-box;
                                // -webkit-line-clamp: 1;
                                // -webkit-box-orient: vertical;
                                transition: .5s ease;
                                font-size: 15px;
            
                                input{
                                    appearance: none;
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    right: 0;
                                    bottom: 0;
                                    opacity: 0;
                                    width: 100%;
                                    cursor: pointer;
                                    user-select:none;
            
                                    &::-webkit-file-upload-button {
                                        display: none;
                                    }
                                }
                            }

                            .color-picker-btn {
                                display: flex;
                                justify-content: center;
                                cursor: pointer;
                                padding: 7px 5px 7px 10px;
                                border-radius: 5px;
                                background-color: rgba(255,255,255,0);
                                box-shadow: inset 0 0 2px 0 rgba(255,255,255,.7);
                                color: white;
                                text-align: center;
                                transition: .5s ease;

                                .color-box {
                                    width: 17px;
                                    height: 17px;
                                    margin-right: 4px;
                                    border-radius: 5px;
                                    box-shadow: 0 0 0 .5px rgba(255,255,255,.7);
                                }
                            }

                            .picker-outer {
                                position: absolute;
                                bottom: -2px;
                                right: 0;
                                transform: translateX(33px) scale(.6);
                                opacity: 0;
                                z-index: -1;
                                transition: .5s ease;

                                &.toggle {
                                    opacity: 1;
                                    z-index: 4;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`