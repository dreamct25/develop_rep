import styled from 'styled-components'
import { containerType } from '.'

const container:containerType = styled.div`
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
                overflow: hidden;
                border-radius: 5px;
                box-shadow: 3px 3px 13px 3px rgba(0,0,0,.5);

                .img{
                    width: 100%;
                    height: auto;
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
                    box-shadow: 0 0 2px rgba(30,30,30,.7);
                    background-color: white;
                    transform: translate(-8px, -8px);
                    
                    .plus{
                        display: flex;
                        justify-content: center;
                        padding: 13px 8px 10px 8px;
                        border-bottom: .5px solid rgba(30,30,30,.5);
                        cursor: pointer;
                        user-select: none;

                        .line{
                            width: 15px;
                            height: 3px;
                            background-color: rgba(30,30,30);

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
                            background-color: rgba(30,30,30);
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
                    background-color: rgb(60,60,60);
                    box-shadow: 3px 3px 13px 3px rgba(0,0,0,.5);
                    transition: .7s ease;
        
                    &.toggle{
                        opacity: 0;
                        pointer-events: none;
                    }
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
                    box-shadow: 3px 3px 13px 3px rgba(0,0,0,.5);
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
                    background-color: rgb(60,60,60);
                    box-shadow: 3px 3px 13px 3px rgba(0,0,0,.5);
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

export default container