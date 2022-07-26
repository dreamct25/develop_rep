import styled from 'styled-components'
import { containerType } from '.'

const container:containerType = styled.div`
    align-self: center;
    .board-outer-frame{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 600px;
        .board-outer{
            position: relative;
            height: 342px;
            .converter-btn{
                color: white;
                position: absolute;
                top: 0;
                right: 0;
                background-color: rgb(0, 179, 255);
                box-shadow: inset 0 0 3px 1px rgba(255,255,255,.7);
                z-index: 2;
                padding: 7px 10px 10px 10px;
                border-radius: 5px;
                font-size: 13px;
                transform: translate(8px, -8px);
                cursor: pointer;
                user-select: none;
            }
            .board-to-rgb,
            .board-to-hex{
                display: flex;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                opacity: 0;
                z-index: -1;
                transform: scale(0.95);
                background-color: white;
                transition: .7s ease;
                box-shadow: 0 0 20px 4px rgba(0,0,0,.3);
                border-radius: 5px;
                overflow: hidden;

                &.active{
                    opacity: 1;
                    z-index: 1;
                    transform: scale(1);
                }

                .input-groups{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 40%;
                    padding: 15px 20px;

                    .converter-rgb-title{
                        text-align: center;
                        font-size: 25px;
                        font-weight: bold;
                    }

                    .R-input-group,
                    .G-input-group,
                    .B-input-group,
                    .to-R-input-group,
                    .to-G-input-group,
                    .to-B-input-group{
                        margin: 15px 0;
                        display: flex;
                        align-items: center;
                        position: relative;

                        input{
                            width: 100%;
                            font-size: 20px;
                            border: none;
                            outline: none;
                            border-radius: 5px;
                            box-shadow: 0 0 2px 0 rgba(0,0,0,.7);
                            padding: 6px 5px 4px 5px;
                            text-align: center;

                            &:not(:placeholder-shown) ~ p,
                            &:focus ~ p{
                                color: black;
                                background-color: white;
                                transform: translate(-103px, -9px);
                            }

                            &::-webkit-outer-spin-button,
                            &::-webkit-inner-spin-button {
                                -webkit-appearance: none;
                                margin: 0;
                            }

                            &:placeholder-shown::placeholder{
                                color: transparent; 
                            }
                        }
                        p{
                            position: absolute;
                            left: 50%;
                            top: 0%;
                            color: rgba(0, 0, 0, 0.3);
                            transform: translate(-50%, -25%);
                            background-color: transparent;
                            pointer-events: none;
                            padding: 0 5px 0 5px;
                            margin-bottom: 0;
                            transition: 0.7s ease;
                        }
                    }

                    .converter-hex-footer,
                    .converter-rgb-footer{
                        text-align: center;
                        font-size: 22px;
                        font-weight: bold;
                        margin-top: 10px;
                    }

                    .converter-hex-footer{
                        margin-top: 25px;
                    }

                    .to-hex-input-group,
                    .hex-input-group,
                    .full-rgb-input-group{
                        display: flex;
                        justify-content: center;
                        margin-top: 15px;
                        input{
                            width: 100%;
                            font-size: 20px;
                            border: none;
                            outline: none;
                            border-radius: 5px;
                            box-shadow: 0 0 2px 0 rgba(0,0,0,.7);
                            padding: 6px 5px 4px 5px;
                            text-align: center;
                        }
                    }

                    .full-rgb-input-group{
                        margin-top: unset;
                    }

                    .to-hex-input-group,
                    .full-rgb-input-group{
                        position: relative;
                        .copy-btn{
                            position: absolute;
                            top: 0;
                            right: 0;
                            transform: translate(-65%,50%);
                            cursor: pointer;
                            user-select: none;
                            svg{
                                color: rgb(100,100,100);
                            }

                            .tooltip{
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

                            &:hover{
                                .tooltip{
                                    opacity: 1;
                                }
                            }
                        }
                    }

                    .hex-RGB-input-group{
                        display: grid;
                        grid-template-columns: auto auto auto;
                        grid-gap: 10px;
                        input{
                            padding: 7px 5px 5px 5px;

                            &:not(:placeholder-shown) ~ p,
                            &:focus ~ p{
                                transform: translate(-28px, -9px);
                            }
                        }
                    }
                }
                .preview-color{
                    width: 60%;
                    height: 100%;
                    position: relative;
                    .color-box{
                        width: 100%;
                        height: 100%;
                        transition: .5s ease;
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

        .operate-desc{
            color: white;
            padding: 12px 15px;
            margin-top: 20px;
            background-color: rgb(60,60,60);
            box-shadow: 0 0 20px 4px rgba(0,0,0,.3);
            border-radius: 5px;
            .title{
                font-size: 25px;
                font-weight: bold;
            }
            .desc{
                margin-top: 12px;
                line-height: 25px;
                text-align: justify;
            }
        }
    }
`

export default container