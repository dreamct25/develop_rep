import styled from 'styled-components'

export default styled.div`

    .header{
        text-align: center;
        position: relative;
        padding: 28px 20px;
        color: #fff;
        font-style: italic;
        text-shadow: 0 2px 3px rgba(0,0,0,.7);

        h1{
            cursor: pointer;
            user-select: none;
        }

        span{
            display: block;
            font-size: 14px;
            margin-top: 8px;
        }

        &:after{
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1px;
            background-color: rgba(255,255,255,.5);
            box-shadow: 0 0 1px 0 rgba(0,0,0,.7);
        }
    }

    .main{
        overflow: hidden;
        border-radius: 0 0 5px 5px;
        margin-top: 1px;
        min-height: 80vh;

        .right-bar{
            overflow-y: auto;
            overflow-x: hidden;
            height: 85vh;
            margin-right: 2px;
            padding: 0 30px;

            &::-webkit-scrollbar {
                width: 5px;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 20px;
                background-color: rgba(255, 255, 255, 0.7);
            }

            .top{
                .about-layout{
                    color: white;

                    .title{
                        position: relative;
                        text-align: center;
                        font-size: 20px;
                        margin-top: 30px;

                        &:before{
                            content: '';
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            width: 28%;
                            height: 1px;
                            background-color: rgba(255,255,255,.5);
                            box-shadow: 0 0 1px 0 rgba(0,0,0,.7);
                            margin-top: 15px;
                        }

                        &:after{
                            content: '';
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            right: 0;
                            width: 28%;
                            height: 1px;
                            background-color: rgba(255,255,255,.5);
                            box-shadow: 0 0 1px 0 rgba(0,0,0,.7);
                            margin-top: 15px;
                        }
                    }

                    .img-outer{
                        display: flex;
                        justify-content: center;
                        margin: 30px 0;

                        img{
                            width: 240px;
                            height: 240px;
                            border-radius: 50%;
                            box-shadow: 0 0 5px 0 rgba(30,30,30,.7);
                        }
                    }

                    .under{
                        text-align: center;
                        font-size: 20px;
                        font-weight: bold;
                        margin: 10px 0;
                    }

                    .desc{
                        text-align: justify;
                        line-height: 33px;
                    }
                }
            }

            .bottom{
                color: white;

                .top-article-list{
                    .title{
                        position: relative;
                        text-align: center;
                        font-size: 20px;
                        margin-top: 30px;

                        &:before{
                            content: '';
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            width: 25%;
                            height: 1px;
                            background-color: rgba(255,255,255,.5);
                            box-shadow: 0 0 1px 0 rgba(0,0,0,.7);
                            margin-top: 15px;
                        }

                        &:after{
                            content: '';
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            right: 0;
                            width: 25%;
                            height: 1px;
                            background-color: rgba(255,255,255,.5);
                            box-shadow: 0 0 1px 0 rgba(0,0,0,.7);
                            margin-top: 15px;
                        }
                    }

                    .article-title{
                        cursor: pointer;
                        user-select: none;
                        margin: 10px 0;
                        text-align: center;
                    }
                }

                .to-board-btn{
                    cursor: pointer;
                    user-select: none;
                    text-align: center;
                    font-size: 20px;
                    margin: 30px 0;
                }
            }
        }
    }

    .footer{
        position: relative;
        text-align: center;
        padding: 12px 0;

        &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background-color: rgba(255,255,255,.5);
            box-shadow: 0 0 1px 0 rgba(0,0,0,.7);
        }

        h6{
            color: white;
            margin-bottom: 0;
        }
    }

    .rwd-nav-btn{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 6;
        margin: 7px 0 0 6px;

        .line-group{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 5px 0px 1px 0;
            border-radius: 50%;
            transition: .5s ease;

            .line{
                background-color: white;
                height: 3px;
                border-radius: 20px;
                width: 25px;
                transition: .5s ease;

                &:nth-of-type(2){
                    margin: 5px 0;
                }
            }

            &.active{
                background-color: rgb(255,51,51);
                box-shadow: inset 0 0 4px 0.5px rgba(255,255,255,.7);

                .line{
                    &:nth-of-type(1){
                        width: 16px;
                        transform: translate(-0.5px,6px) rotate(135deg);
                    }

                    &:nth-of-type(2){
                        transform: scale(0)
                    }

                    &:nth-of-type(3){
                        width: 16px;
                        transform: translate(-0.5px,-10px) rotate(-135deg);
                    }
                }
            }
        }
    }

    .rwd-nav-list{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 250px;
        transform: translateX(-265px);
        transition: .5s ease;
        background-color: rgba(30,30,30,.5);
        backdrop-filter: blur(10px);
        margin: 15px;
        padding: 0 15px;
        border-radius: 10px;
        box-shadow: inset 0 0 16px 0 rgba(255, 255, 255, 0.7);
        z-index: 5;

        &.active{
            transform: translateX(0);
        }

        .top{
            .about-layout{
                color: white;

                .title{
                    position: relative;
                    text-align: center;
                    font-size: 20px;
                    margin-top: 15px;

                    &:before{
                        content: '';
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        width: 30%;
                        height: 1px;
                        background-color: rgba(255,255,255,.5);
                        box-shadow: 0 0 1px 0 rgba(0,0,0,.7);
                        margin-top: 15px;
                    }

                    &:after{
                        content: '';
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        right: 0;
                        width: 30%;
                        height: 1px;
                        background-color: rgba(255,255,255,.5);
                        box-shadow: 0 0 1px 0 rgba(0,0,0,.7);
                        margin-top: 15px;
                    }
                }

                .img-outer{
                    display: flex;
                    justify-content: center;
                    margin: 18px 0;

                    img{
                        width: 140px;
                        height: 140px;
                        border-radius: 50%;
                        box-shadow: 0 0 5px 0 rgba(30,30,30,.7);
                    }
                }

                .under{
                    text-align: center;
                    font-size: 20px;
                    font-weight: bold;
                    margin: 10px 0;
                }

                .desc{
                    text-align: justify;
                    line-height: 33px;
                }
            }
        }

        .bottom{
            color: white;

            .top-article-list{
                .title{
                    position: relative;
                    text-align: center;
                    font-size: 20px;
                    margin-top: 30px;

                    &:before{
                        content: '';
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        width: 25%;
                        height: 1px;
                        background-color: rgba(255,255,255,.5);
                        box-shadow: 0 0 1px 0 rgba(0,0,0,.7);
                        margin-top: 15px;
                    }

                    &:after{
                        content: '';
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        right: 0;
                        width: 25%;
                        height: 1px;
                        background-color: rgba(255,255,255,.5);
                        box-shadow: 0 0 1px 0 rgba(0,0,0,.7);
                        margin-top: 15px;
                    }
                }

                .article-title{
                    cursor: pointer;
                    user-select: none;
                    margin: 10px 0;
                    text-align: center;
                }
            }

            .to-board-btn{
                cursor: pointer;
                user-select: none;
                text-align: center;
                font-size: 20px;
                margin: 30px 0;
            }
        }
    }
`