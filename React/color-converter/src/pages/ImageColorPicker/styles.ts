import { styled } from '@linaria/react'

export default styled.div`
    align-self: center;
    margin-top: 10px;

    .area-outer{
        display: grid;
        grid-template-columns: 70vw 20vw;
        grid-template-rows: 90vh;
        grid-gap: 10px;
        justify-content: center;

        .left-area{
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .img-outer{
                position: relative;
                overflow: hidden;
                border-radius: 5px;
                background-color: rgba(30, 30 , 30, .4);
                backdrop-filter: blur(6px);
                box-shadow: 
                    inset 0 0 2px 0 rgba(255, 255, 255, .7),
                    3px 3px 13px 3px rgba(0,0,0,.5)
                ;
                opacity: 0;
                transition: .5s ease;

                &.show {
                    opacity: 1;
                }

                .img{
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    border-radius: 5px;
                    user-select: none;
                    transform: scale(2);

                    &.toggle{
                        opacity: 1;
                    }
                }

                .zoom-controller{
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    opacity: 1;
                    border-radius: 5px;
                    box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .7);
                    background-color: rgba(30, 30 , 30, .4);
                    transform: translate(-8px, -8px);
                    backdrop-filter: blur(6px);
                    
                    .plus{
                        display: flex;
                        justify-content: center;
                        padding: 13px 8px 10px 8px;
                        border-bottom: .5px solid rgba(255,255,255, .2);
                        cursor: pointer;
                        user-select: none;

                        .line{
                            width: 15px;
                            height: 3px;
                            background-color: rgb(255, 255, 255);

                            &:nth-of-type(2){
                                transform: translateY(-3px) rotate(90deg);
                            }
                        }
                    }

                    .minus{
                        display: flex;
                        justify-content: center;
                        padding: 13px 8px;
                        cursor: pointer;
                        user-select: none;

                        .line{
                            width: 15px;
                            height: 3px;
                            background-color: rgb(255, 255, 255);
                        }
                    }
                }
            }

            .img-frame{
                color: white;
                font-weight: bold;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                opacity: 1;
                pointer-events: all;
                border-radius: 5px;
                background-color: rgba(30, 30 , 30, .4);
                backdrop-filter: blur(6px);
                box-shadow: 
                    inset 0 0 2px 0 rgba(255, 255, 255, .7),
                    3px 3px 13px 3px rgba(0,0,0,.5)
                ;
                transition: .7s ease;
    
                &.toggle{
                    opacity: 0;
                    pointer-events: none;
                }
            }
        }

        .right-area{
            display: flex;
            flex-direction: column;
            justify-content: center;

            .color-view-outer{
                display: grid;
                grid-template-rows: 300px auto;
                grid-gap: 10px;

                .color-box{
                    position: relative;
                    border-radius: 5px;
                    box-shadow: 
                        inset 0 0 2px 0 rgba(255, 255, 255, .7),
                        3px 3px 13px 3px rgba(0,0,0,.5)
                    ;
                    background-color: rgba(30, 30 , 30, .4);
                    backdrop-filter: blur(6px);
                    transition: .3s ease;

                    .color-box-frame{
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        color: white;
                        font-weight: bold;
                        text-align: center;
                        padding-bottom: 15px;
                        text-shadow: 0 0 3px rgba(0,0,0,.7);
                    }
                }

                .color-box-content{
                    padding: 5px 12px;
                    line-height: 30px;
                    border-radius: 5px;
                    color: white;
                    background-color: rgba(30, 30 , 30, .4);
                    backdrop-filter: blur(6px);
                    box-shadow: 
                        inset 0 0 2px 0 rgba(255, 255, 255, .7),
                        3px 3px 13px 3px rgba(0,0,0,.5)
                    ;
                }
            }
        }
    }

    .canvas{
        display: none;
    }

    .bgview{
        width: 100px;
        height: 100px;
    }
`