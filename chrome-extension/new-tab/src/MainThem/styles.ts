import { styled } from '@linaria/react'

export default styled.div<{ 
    useThemColor: string,
    useClockColor: string,
    useClockFontSize: string,
    useClockFontShadow: string,
    useBackgroundBlackMaskPercente: number
    topSiteShowCount: number
}>`
    .back-layout {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(30,30,30,${props => props.useBackgroundBlackMaskPercente * 0.01});
    }

    .front-layout {
        position: relative;
        z-index: 1;

        .left {
            display: grid;
            grid-template-rows: 1fr 4fr 1fr;
            min-height: 100vh;

            .top {
            }

            .medium {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-top: ${props => props.topSiteShowCount === 0 ? '43px' : '140px'};
                transition: .3s ease;

                .current-time {
                    position: relative;
                    color: ${props => props.useClockColor};
                    font-size: ${props => props.useClockFontSize};
                    text-align: center;
                    text-shadow: ${props => `0 0 ${props.useClockFontShadow} rgba(30,30,30,.5)`};
                    height: 134px;
                    display: flex;
                    justify-content: center;

                    .top {
                        position: absolute;
                        top: 12px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        transition: .5s ease;
                        
                        @media screen and (min-width: 450px) {
                            padding-right: 10px;
                        }

                        span {
                            display: block;
                            margin: 0 15px;
                            transform: translateY(-12px);
                        }

                        .display-amorpm {
                            display: block;
                            align-self: end;
                            font-size: 20px;
                            font-weight: bold;
                        }

                        &:hover {

                            top: 0;

                            & ~ .bottom {
                                bottom: 3px;
                                opacity: 1;
                            }
                        }
                    }

                    .bottom {
                        position: absolute;
                        bottom: 20px;
                        font-size: 17px;
                        opacity: 0;
                        transition: .5s ease;

                        @media screen and (min-width: 450px) {
                            padding-right: 10px;
                        }
                    }
                }

                .search-bar {
                    margin: 16px auto 15px auto;
                    position: relative;

                    .search-icon {
                        color: white;
                        position: absolute;
                        top: 50%;
                        left: 0;
                        z-index: 1;
                        transform: translate(13px, -41%);
                        font-size: 16px;
                    }

                    .search-input {
                        color: white;
                        outline: none;
                        border: none;
                        font-size: 20px;
                        padding: 10px 14px 10px 40px;
                        border-radius: 30px;
                        background-color: ${props => props.useThemColor};
                        backdrop-filter: blur(10px);
                        box-shadow: inset 0 0 2px 0 rgba(255,255,255,.5);
                        transition: .5s ease;
                        width: 380px;

                        @media screen and (max-width: 414px) {
                            width: 275px;
                        }

                        &::placeholder {
                            color: rgba(255,255,255,.5);
                            transform: translateY(2px);
                        }
                    }
                }

                .brows-past-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fit,93px);
                    gap: 15px;
                    justify-content: center;

                    .list-item {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        backdrop-filter: blur(0);
                        background-color: rgba(255,255,255,0);
                        padding: 3px 9px 8px 9px;
                        border-radius: 5px;
                        box-shadow: inset 0 0 2px 0 rgba(255,255,255,0);
                        transition: .5s ease;
                        cursor: pointer;
                        user-select: none;
                        position: relative;

                        .delete-btn {
                            position: absolute;
                            top: 0;
                            right: 0;
                            transform: translate(7px, -7px);
                            opacity: 0;
                            z-index: 2;
                            transition: .5s ease;
                            
                            i {
                                color: rgb(255,51,0);
                            }

                            &:hover {
                                opacity: 1 !important;
                            }
                        }

                        .img-outer {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            padding: 16px 0;
                            height: 36px;
                        }

                        .text-outer {

                            span {
                                text-align: center;
                                color: white;
                                font-size: 14px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                            }
                        }

                        &:hover {
                            background-color: ${props => props.useThemColor};
                            box-shadow: inset 0 0 2px 0 rgba(255,255,255,.3);
                            backdrop-filter: blur(3px);

                            .delete-btn {
                                opacity: .3;
                            }
                        }
                    }
                }
            }

            .bottom {
            }
        }

        .right {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 40px;
            z-index: 5;

            .tool-bar {
                padding: 8px 0;
                transform: translateX(40px);
                height: 100%;
                transition: .5s ease;

                .google-login-btn,
                .setting-btn,
                .calender-btn {
                    cursor: pointer;
                    user-select: none;
                    color: white;
                    font-size: 18px;
                    text-shadow: 0 0 8px rgba(30,30,30,.5);
                    text-align: center;
                    margin-bottom: 10px;
                }

                &.toggle {
                    transform: translateX(0);
                }

                &::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    opacity: 0;
                    z-index: -1;
                    background: linear-gradient(180deg,rgba(30,30,30,1),rgba(30,30,30,.7),rgba(30,30,30,.5),rgba(30,30,30,.3),rgba(30,30,30,0));
                    transition: .5s ease;
                }

                &:hover {

                    &::after {
                        opacity: 1;
                    }
                    
                }
            }
        }

        .control-modal-outer {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            max-width: 420px;
            transform: translateX(430px);
            z-index: 6;
            box-shadow: 0px 0 7px 2px rgba(30,30,30,.5);
            transition: .5s ease;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: -1;
                background-color: ${props => props.useThemColor};
                backdrop-filter: blur(10px);
                transition: .5s ease;
            }

            &.toggle {
                transform: translateX(0);
            }

            .header {
                color: white;
                text-align: left;
                font-size: 20px;
                padding: 12px;
                display: flex;
                justify-content: space-between;
                font-weight: bold;

                .back-btn {
                    color: white;
                    cursor: pointer;
                    user-select: none;
                    font-weight: unset;
                    font-size: 20px;
                }
            }

            .body {
                border-top: 1px solid rgba(255,255,255,.3);
                
                .list {

                    .list-row {
                        display: grid;
                        grid-template-columns: 2fr 1fr;
                        align-items: center;
                        padding: 6px 12px;

                        &:first-child {
                            padding: 6px 12px 3px 12px;
                        }

                        &:last-child {
                            padding: 3px 12px 6px 12px;
                        }

                        .func-name {
                            color: white;
                            font-size: 16px;
                        }

                        .func-action {

                            .change-bg-btn{
                                cursor: pointer;
                                opacity: 1;
                                position: relative;
                                color: white;
                                text-align: center;
                                padding: 7px 10px;
                                border-radius: 8px;
                                background-color: rgba(255,255,255,0);
                                box-shadow: 0 0 0 .5px rgba(255,255,255,.7);
                                // overflow: hidden;
                                // text-overflow: ellipsis;
                                // display: -webkit-box;
                                // -webkit-line-clamp: 1;
                                // -webkit-box-orient: vertical;
                                transition: .5s ease;
                                font-size: 16px;
            
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

                                &:hover {
                                    background-color: ${props => props.useThemColor};
                                }
            
                                // &.disactive{
                                //     cursor: not-allowed;
                                //     user-select: none;
                                //     opacity: .5;
            
                                //     input{
                                //         z-index: -1;
                                //     }
                                // }
                            }

                            .slide-btn-outer {
                                display: flex;
                                justify-content: center;
                                padding: 4px 0;
                            }

                            .color-picker-btn {
                                display: flex;
                                justify-content: center;
                                cursor: pointer;
                                padding: 7px 5px 7px 10px;
                                border-radius: 8px;
                                background-color: rgba(255,255,255,0);
                                box-shadow: 0 0 0 .5px rgba(255,255,255,.7);
                                color: white;
                                text-align: center;
                                transition: .5s ease;

                                &:hover {
                                    background-color: ${props => props.useThemColor};
                                }

                                .color-box {
                                    width: 14%;
                                    margin-left: 4px;
                                    transform: scale(.7);
                                    border-radius: 5px;
                                    box-shadow: 0 0 0 .5px rgba(255,255,255,.7);
                                    transition: .5s ease;
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

                            &.use-picker {
                                position: relative;
                            }

                            &.use-range {

                                .range-input-outer {
                                    position: relative;
                                    padding: 6.5px 0;

                                    &.size {

                                        input {
                                            
                                            &::-webkit-slider-runnable-track {
                                                background: linear-gradient(
                                                    to right,
                                                    rgba(0,162,255,1) 0%,
                                                    rgba(0,162,255,1) ${props => `${((parseInt(props.useClockFontSize)  - 90) / (168 - 90)) * 100}%`},
                                                    #eee ${props => `${((parseInt(props.useClockFontSize)  - 90) / (168 - 90)) * 100}%`},
                                                    #eee
                                                );
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .calender-right-slider {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            background-color: ${props => props.useThemColor};
            width: 100%;
            max-width: 420px;
            z-index: 6;
            backdrop-filter: blur(10px);
            transform: translateX(420px);
            transition: .5s ease;

            &.toggle {
                transform: translateX(0);
            }

            .back-btn {
                position: absolute;
                top: 0;
                left: 0;
                padding: 10px 0 0 10px;
                color: white;
                cursor: pointer;
                user-select: none;
                font-size: 20px;
            }

            .current-date {
                color: white;
            }
        }

        .show-path {
            position: fixed;
            left: 0;
            bottom: 0;
            color: white;
            background-color: rgba(30,30,30,.8);
            padding: 4px 6px 5px 6px;
            opacity: 0;
            z-index: -1;
            transition: .5s ease;
            margin: 3px;
            border-radius: 5px;
            font-size: 11px;

            &.toggle {
                opacity: 1;
                z-index: 3;
            }
        }

        .copy-right {
            font-size: 11px;
            position: fixed;
            right: 0;
            bottom: 0;
            margin: 6px;
            color: white;
            text-shadow: 0 0 2px rgba(30,30,30,.7);
        }
    }
`