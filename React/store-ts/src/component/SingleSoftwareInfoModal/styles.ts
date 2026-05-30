import { styled } from '@linaria/react'

export default styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(30, 30, 30, .7);
    opacity: 0;
    backdrop-filter: blur(6px);
    pointer-events: none;
    z-index: 5;
    transition: opacity .5s ease;

    &.toggle {
        opacity: 1;
        pointer-events: all;
    }

    .single-software-info-modal-outer {
        position: absolute;
        top: 5%;
        right: 0;
        left: 0;
        bottom: 5%;
        border-radius: 12px;
        max-width: 500px;
        width: 95%;
        margin: 0 auto;
        overflow: hidden;
        box-shadow: inset 0 0 2px .5px rgba(255, 255, 255, .5);

        .single-app-item {
            padding: 10px 0;
            overflow-y: auto;
            overflow-x: hidden;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            color: white;

            &::-webkit-scrollbar {
                width: 3px;
                height: 0px;
                border-radius: 20px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba(255, 255, 255, 0.7);
                border-radius: 20px;
            }

            .single-app-item-title {
                display: grid;
                grid-template-columns: 1fr auto;
                gap: 12px;
                padding: 0px 3px 0 40px;

                .item-title {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    div {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        
                        &:first-child {
                            font-size: 30px;
                            margin-bottom: 12px;
                        }
                    }
                }

                .img-outer {
                    transform: scale(.8);

                    img {
                        border-radius:15px;
                    }

                    .bottom-groups {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 6px;
                        margin-top: 12px;

                        .rating {
                            background-color: rgba(100,100,100,.3);
                            text-align:center;
                            padding: 5px;
                            border-radius: 8px;
                        }

                        .price {
                            background-color: rgba(100,100,100,.3);
                            text-align:center;
                            padding: 5px;
                            border-radius: 8px;
                        }
                    }
                }
            }

            .singel-app-item-content {

                .carousel-outer{
                    margin: 0 12px;

                    .img-outer {

                        &.no-image {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            text-align: center;
                            box-shadow: inset 0 0 2px rgba(255, 255, 255, .7);
                            border-radius: 5px;
                            background-color: rgba(30, 30, 30, .5);
                            height: 300px;
                            font-size: 25px;
                            letter-spacing: 5px;
                        }
                        
                        img {
                            width: 100%;
                            border-radius: 8px;
                        }
                    }
                }

                .single-app-item-explain {
                    padding: 5px 20px;

                    @media screen and (max-width:414px) {
                        padding: 5px 15px;
                    }

                    span {
                        display: block;
                    }

                    .explain-groups {
                        text-align: right;
                        font-size: 16px;
                        margin: 12px 0 20px 0;

                        div {

                            &:first-child {
                                margin-bottom: 8px;
                            }
                        }
                    }

                    .descript-outer {
                        margin-top: 12px;

                        .descript-title {

                            span {
                                font-size: 20px;
                                text-align:left;
                                padding: 0;
                            }
                        }

                        .descript-text-outer {
                            margin: 10px 0 12px 0;

                            .descript-text {
                                line-height: 25px;

                                span {
                                    font-size: 16px;
                                    text-align: justify;
                                    white-space: pre-line;
                                }
                            }
                        }
                    }
   
                    .update-outer {

                        .update-title {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            cursor: pointer;
                            user-select: none;

                            span {
                                font-size: 20px;
                                text-align:left;
                                padding: 0;
                            }

                            .arrow {
                                transform: rotate(0deg);
                                transition:.5s ease;

                                &.arrow-toggle {
                                    transform: rotate(180deg);
                                }
                            }
                        }
                        
                        .update-text-outer {
                            overflow: hidden;
                            height: 0;
                            transition: .5s ease;
                            margin: 10px 0 12px 0;

                            .update-text {
                                font-size: 16px;
                                line-height: 25px;

                                span {

                                    &:nth-of-type(1) {
                                        text-align: left;
                                    }

                                    &:nth-of-type(2) {
                                        text-align: justify;
                                        white-space: pre-line;
                                    }

                                    &:nth-of-type(3) {
                                        text-align: right;
                                    }
                                }
                            }
                        }
                    }

                    .support-outer {

                        .support-text-title {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            cursor: pointer;
                            user-select: none;

                            span {
                                font-size: 20px;
                                text-align:left;
                                padding: 0;
                            }
                            
                            .arrow {
                                transform: rotate(0deg);
                                transition:.5s ease;

                                &.arrow-toggle {
                                    transform: rotate(180deg);
                                }
                            }
                        }

                        .support-text-outer {
                            overflow: hidden;
                            height: 0;
                            transition: .5s ease;
                            margin: 10px 0 0 0;

                            .support-device-row {
                                margin-bottom: 12px;

                                &:first-child {

                                    .device-name {
                                        margin: 12px 0 6px 0;
                                    }
                                }

                                &:last-child {
                                    margin-bottom: 0;
                                }

                                .device-name {
                                    font-weight: bold;
                                    font-size: 18px;
                                    margin: 18px 0 6px 0;
                                }

                                .devices {
                                    font-size: 14px;
                                    line-height: 25px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .load-text {
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        height: 100%;
    }
`