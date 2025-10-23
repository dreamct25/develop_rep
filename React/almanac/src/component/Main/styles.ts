import { styled } from '@linaria/react'

export default styled.div<{ isDesktop: boolean }>`

    padding: 30px 30px 0 30px;

    @media screen and (max-width: 414px) {
        padding: 12px 12px 3px 12px;
    }

    .info-outer {
        margin-bottom: 12px;
        border-radius: 5px;
        transition: .5s ease;

        .top {
            color: white;
            padding: 14px 12px;

            .year {
                font-size: 45px;
                text-align: center;
                transition: .5s ease;
            }
        }

        &.toggle {
            border-radius: 0 0 5px 5px;
            background-color: transparent;
            box-shadow: inset 0 0 3px 1px transparent;
            pointer-events: none;

            .top {
                justify-content: space-between;


                .year {
                    position: fixed;
                    top: 0;
                    right: 0;
                    background-color: rgba(153,153,255,.5);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    font-size: 20px;
                    padding: 8px 12px 9px 12px;
                    margin: 5px;
                    border-radius: 5px;
                    box-shadow: inset 0 0 3px 1px rgba(255,255,255,.7);
                }
            }
        }
    }

    .calendar {
        display: grid;
        grid-template-columns: repeat(4,1fr);
        gap: 12px;
        
        @media screen and (max-width: 1520px) {
            grid-template-columns: repeat(3,1fr);
        }

        @media screen and (max-width: 1150px) {
            grid-template-columns: repeat(2,1fr);
        }

        @media screen and (max-width: 775px) {
            grid-template-columns: repeat(1,1fr);
        }

        .month-outer {

            .month {
                border: 1px solid #ccc;
                background-color: #fff;
                border-radius: 5px;
                overflow: hidden;

                .title {
                    background-color: rgb(153,153,255);
                    color: #fff;
                    margin: 0;
                    padding: 10px;
                    text-align: center;
                    font-size: 25px;
                    font-weight: bold;
                    font-style: italic;
                }

                .weekdays,
                .days {
                    display: grid;
                    grid-template-columns: repeat(7,1fr);
                    gap: 6px;
                    padding: 6px;

                    .weekday, .day {
                        text-align: center;
                        padding: 12px 5.5px 11px 5.5px;
                    }
                }

                .weekdays {
                    font-weight: bold;
                    border-bottom: 1px solid #ccc;
                    padding: 0 6px;
                    font-style: italic;
                }

                .day {
                    border: 1px solid #eee;
                    border-radius: 5px;
                    transition: .5s ease;

                    &.other-month {
                        color: #ccc;
                    }

                    &.holiday {
                        background-color: rgb(119,68,255);
                        color: white;
                        cursor: pointer;
                        user-select: none;
                    }

                    &.normal-holiday {
                        background-color: rgb(204,187,255);
                        color: white;
                    }

                    &.highlight {
                        background-color: rgb(255,62,255);
                        box-shadow: inset 0 0 4px 2px rgba(255,255,255,.7);
                    }
                }
            }

            .holiday-desc-outer {

                overflow: hidden;
                width: 360px;

                .row-outer {
                    overflow-x: auto;
                    overflow-y: hidden;
                    display: grid;
                    gap: 12px;
                    scroll-snap-type: ${props => !props.isDesktop ? 'x mandatory' : 'unset'};

                    &::-webkit-scrollbar {
                        height: 0;
                    }

                    .row {
                        background-color:  rgb(119,68,255);
                        padding: 15px 12px;
                        text-align: center;
                        color: white;
                        font-weight: bold;
                        font-size: 18px;
                        border-radius: 5px;
                        margin: 6px 0;
                        scroll-snap-align: center;
                        cursor: pointer;
                        user-select: none;
                    }

                    .no-holiday {
                        background-color: rgb(153,153,255);
                        padding: 15px 12px;
                        text-align: center;
                        color: white;
                        font-weight: bold;
                        font-size: 18px;
                        border-radius: 5px;
                        margin: 6px 0;
                    }
                }
            }
        }
    }

    .footer {

        h6 {
            text-align: center;
            color: white;
            padding: 12px 0 18px 0;
        }
    }

    .back-fill {
        position: fixed;
        top: 0;
        bottom: 0;
        pointer-events: none;

        .icon {
            position: absolute;
            top: 50%;
            cursor: pointer;
            user-select: none;
            font-size: 35px;
            text-shadow: 0;
            pointer-events: all;
            background-color: rgb(153,153,255);
            height: 100px;
            border-radius: 20px;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            opacity: .3;
            box-shadow: inset 0 0 2px 1px rgba(255,255,255,.7);
            transition: .5s ease;

            &:first-child {
                left: 0;
                transform: translate(-50%,-50%);

                @media screen and (max-width: 414px) {
                    transform: translate(-30%,-50%);
                }
            }

            &:last-child {
                right: 0;
                transform: translate(50%,-50%);

                @media screen and (max-width: 414px) {
                    transform: translate(30%,-50%);
                }
            }

            &.d {

                &:hover {
                    opacity: .7;
                }
            }

            &.m {
                
                &:active {
                    opacity: 1;
                }
            }
        }

        .fill-box-outer {

            display: grid;
            grid-template-columns: repeat(4,1fr);
            gap: 12px;
            
            @media screen and (max-width: 1520px) {
                grid-template-columns: repeat(3,1fr);
            }

            @media screen and (max-width: 1150px) {
                grid-template-columns: repeat(2,1fr);
            }

            @media screen and (max-width: 775px) {
                grid-template-columns: repeat(1,1fr);
            }

            .fill-box {
                width: 360px;
            }
        }
        
    }

    .loading-outer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(30,30,30,.5);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: -1;
        opacity: 0;
        transition: .5s ease;
        
        .loading-text {
            color: white;
            position: relative;
            font-size: 48px;
            letter-spacing: 4px;
            
            &::before {
                content: "Loading";
                color: white;
                font-size: 48px;
                font-style: italic;
                letter-spacing: 2px;
                display: inline-block;
                animation: floatText .7s ease-out infinite alternate;

                @keyframes floatText {

                    0% {
                        transform: translateY(-15px);
                        opacity: .5;
                    }

                    100% {
                        transform: translateY(-35px);
                        opacity: 1;
                    }   
                }
            }

            &::after {
                content: "";
                width: 100%;
                height: 10px;
                
                position: absolute;
                left: 0;
                top: 100%;
                filter: blur(4px);
                border-radius: 50%;
                animation: bottomShadow .7s ease-out infinite alternate;

                @keyframes bottomShadow {

                    0% {
                        transform: scale(0.8);
                        background: rgba(0, 0, 0, .5);
                    }

                    100% {
                        transform: scale(1.2);
                        background: rgba(0, 0, 0, .1);
                    }
                }
            }
        }

        &.toggle {
            z-index: 2;
            opacity: 1;
        }
    }
`