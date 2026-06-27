import { styled } from '@linaria/react'

export default styled.div`
    align-self: center;

    .board-outer-frame{
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 600px;
        margin: 0 12px;

        .board-outer{
            position: relative;
            height: 342px;

            .converter-btn{
                color: white;
                position: absolute;
                top: 0;
                right: 0;
                background-color: rgba(30, 30, 30, .5);
                box-shadow: inset 0 0 2px 0 rgba(255,255,255,.7);
                z-index: 2;
                backdrop-filter: blur(6px);
                padding: 7px 10px 9px 10px;
                border-radius: 5px;
                font-size: 13px;
                transform: translate(8px, -8px);
                cursor: pointer;
                user-select: none;
            }

            .board-to-rgb,
            .board-to-hex {
                display: flex;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                opacity: 0;
                z-index: 1;
                pointer-events: none;
                transform: scale(0.95);
                background-color: rgba(30, 30, 30, .4);
                transition: opacity .7s ease, transform .7s ease;
                box-shadow: inset 0 0 2px rgba(255, 255, 255, .5), 0 0 20px 4px rgba(0,0,0,.3);
                border-radius: 5px;
                overflow: hidden;
                backdrop-filter: blur(6px);
                color: white;

                &.active{
                    opacity: 1;
                    transform: scale(1);
                    pointer-events: all;
                }

                .input-groups{
                    display: grid;
                    grid-template-rows: 0fr auto;
                    width: 40%;
                    position: relative;

                    &::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        width: 1px;
                        background-color: rgba(255, 255, 255, .2);
                        height: 99.5%;
                        margin: auto 0;
                    }

                    .top {
                        padding: 15px;
                        position: relative;

                        &::after {
                            content: '';
                            position: absolute;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            height: 1px;
                            background-color: rgba(255, 255, 255, .2);
                            width: 99.5%;
                            margin: 0 auto;
                        }

                        .converter-rgb-title,
                        .converter-hex-title {
                            text-align: center;
                            font-size: 25px;
                        }
                    }

                    .bottom {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        padding: 15px;

                        .R-input-group,
                        .G-input-group,
                        .B-input-group {
                            
                            input {
                                height: 49px;
                            }
                        }

                        .to-R-input-group,
                        .to-G-input-group,
                        .to-B-input-group {
                            
                            input {
                                height: 50px;
                            }
                        }

                        .converter-hex-footer,
                        .converter-rgb-footer{
                            text-align: center;
                            font-size: 22px;
                            margin: 6px 0 1px 0;
                        }

                        .converter-hex-footer{
                            margin: 19px 0 25px 0;
                        }

                        .to-hex-input-group,
                        .hex-input-group,
                        .full-rgb-input-group{
                            display: flex;
                            justify-content: center;
                            margin-top: 15px;

                            input{
                                appearance: none;
                                width: 100%;
                                font-size: 20px;
                                border: none;
                                outline: none;
                                border-radius: 5px;
                                box-shadow: 0 0 2px 0 rgba(0,0,0,.7);
                                padding: 6px 5px 4px 5px;
                                text-align: center;
                                background-color: transparent;
                                color: white;
                                box-sizing: border-box;
                            }
                        }

                        .to-hex-input-group {

                            input {
                                border: 1px solid white;
                            }
                        }

                        .hex-input-group {
                            margin-top: 0;
                        }

                        .full-rgb-input-group {

                            input {
                                border: 1px solid white;
                                padding: 6px 5px 6px 5px;
                            }
                            
                            .copy-btn {
                                top: 1px;
                            }
                        }

                        .to-hex-input-group,
                        .full-rgb-input-group {
                            position: relative;

                            .copy-btn {
                                position: absolute;
                                top: 0;
                                right: 0;
                                transform: translate(-65%,50%);
                                cursor: pointer;
                                user-select: none;

                                svg{
                                    color: white;
                                }

                                .tooltip {
                                    color: white;
                                    font-size: 15px;
                                    position: absolute;
                                    border-radius: 6.4px;
                                    padding: 6px;
                                    text-align: center;
                                    transform: translate(-28px, -52px);
                                    width: 55px;
                                    opacity: 0;
                                    z-index: -1;
                                    transition: .7s ease;
                                    background-color:rgb(80,80,80);

                                    &:after {
                                        content: '';
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        width: 0;
                                        height: 0;
                                        border: 6px solid transparent;
                                        border-top-color: rgb(80,80,80);
                                        transform: translate(29px, 27px);
                                        transition: .7s ease;
                                    }
                                }

                                &:hover {

                                    .tooltip {
                                        opacity: 1;
                                    }
                                }
                            }
                        }

                        .hex-RGB-input-group {
                            display: grid;
                            grid-template-columns: auto auto auto;
                            grid-gap: 12px;
                        }
                    }
                }

                .preview-color{
                    width: 60%;
                    position: relative;

                    .color-box{
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        transition: .5s ease;
                        margin: 1px;
                        border-radius: 0 5px 5px 0;
                    }

                    .color-box-frame{
                        color: white;
                        font-weight: bold;
                        font-size: 18px;
                        text-shadow: 0 1px 5px rgba(0,0,0,.6);
                        display: flex;
                        justify-content: flex-end;
                        flex-direction: column;
                        align-items: center;
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 4%;
                    }
                }
            }
        }

        .operate-desc {
            color: white;
            padding: 12px 15px;
            margin-top: 20px;
            background-color: rgba(30, 30, 30, .4);
            box-shadow: inset 0 0 2px rgba(255, 255, 255, .5), 0 0 20px 4px rgba(0,0,0,.3);
            border-radius: 5px;
            backdrop-filter: blur(6px);

            .title {
                font-size: 25px;
                font-weight: bold;
            }

            .desc {
                margin-top: 12px;
                line-height: 25px;
                text-align: justify;
            }
        }
    }
`