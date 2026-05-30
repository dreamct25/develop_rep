import styled from 'styled-components'
const cssAll = {
    Show:styled.div`
        padding: 25px 0;
        .list-outer{
            height: 700px;
            overflow-y: auto;
            overflow-x: hidden;
            position: relative;
            padding-top:94%;
            .imgs-outer{
                display: flex;
                justify-content: center;
                padding: 15px;
                position:fixed;
                top:0;
                left:0;
                right:0;
                bottom:0;
                z-index:-1;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius:20px;
                    box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.7);
                }
            }
            @media screen and (max-width:768px){
                .imgs-outer{
                    bottom:unset;
                }
            }
            .list{
                padding:10px 0 2px 0;
                margin: 15px 15px 0 15px;
                border-top:1px solid white;
                .list-header{
                    font-size: 20px;
                    padding:2px 0 2px 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
                .list-content{
                    display: flex;
                    flex-direction:column;
                    .details{
                        padding:8px 15px 0 15px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 5;
                        -webkit-box-orient: vertical;
                        width: 80%;
                    }
                    .details-toggle{
                        -webkit-line-clamp: unset;
                    }
                    .btns-group{
                        display: flex;
                        justify-content: space-between;
                        align-self:flex-end;
                        .content-toggle-btn{
                            display: block;
                            cursor: pointer;
                            user-select: none;
                            align-self:flex-end;
                            margin: 0 8px;
                            .arrow{
                                padding: 3px;
                                margin-right:5px;
                                transform:rotate(0deg);
                                transition:.7s ease;
                            }
                            .arrow-toggle{
                                transform: rotate(180deg);
                            }
                        }
                        .show-input{
                            display:block;
                            cursor: pointer;
                            user-select:none;
                            background-color:rgb(255, 74, 174);
                            align-self:flex-end;
                            margin: 0 3px;
                            padding:0 10px;
                            border-radius: 20px;
                            .arrow{
                                transform:rotate(0deg);
                                margin-left:5px;
                                transition:.7s ease;
                            }
                            .arrow-toggle{
                                transform: rotate(-180deg);
                            }
                        }
                    }
                    @media screen and (max-width:414px){
                        .btns-group{
                            margin-top: 10px;
                        }
                    }
                }
                @media screen and (max-width:414px){
                    .list-content{
                        display: block;
                        justify-content: unset;
                    }
                }
                .audio-outer{
                    display:flex;
                    align-items: center;
                    height: 100%;
                    padding:0 2px 0 2px;
                    margin:-25px 0;
                    opacity: 0;
                    transition:.7s ease;
                    .play{
                        background-color:rgba(0,0,0,.7);
                        box-shadow:0 0 2px 1px rgba(255,255,255,.7);
                        border-radius: 0 20px 20px 0;
                        padding: 5px 20px 5px 20px;
                        color:white;
                        text-align:center;
                        width:10%;
                        cursor: pointer;
                        user-select:none;
                    }
                    @media screen and (max-width:414px){
                        .play{
                            padding: 5px 30px 5px 16px;
                        }
                    }
                    .custom-progress{
                        display:flex;
                        align-items:center;
                        border-radius:20px 0 0 20px;
                        box-shadow:0 0 2px 1px rgba(255,255,255,.7);
                        background-color:rgba(0,0,0,.7);
                        width:90%;
                        padding:5px 15px 5px 15px;
                        input[type="range"]{
                            -webkit-appearance: none;
                            width:90%;
                            margin-right:5px;
                            border-radius: 2px;
                            height: 4px;
                            background-image: -webkit-linear-gradient(
                                left,
                                #f22 0%,
                                #f22 0%,
                                #fff 0%,
                                #fff 100%
                            );
                            outline: none;
                        }
                        input[type="range"]::-webkit-slider-thumb {
                            -webkit-appearance: none;
                            border-radius: 50%;
                            height: 10px;
                            width: 10px;
                            background-color: red;
                            cursor: pointer;
                        }
                        @media screen and (max-width:414px){
                            input[type="range"]{
                                width: 75%;
                            }
                        }
                        .duration-time{
                            display:block;
                            text-align: center;
                            margin: 0 auto;
                        }
                    }
                }
                .audio-outer-toggle{
                    margin:20px 0 5px 0;
                    opacity: 1;
                }
            }
            .list:nth-of-type(1){
                padding: 2px 0 2px 0;
                border-top:unset;
            }
        }
        .list-outer::-webkit-scrollbar {
            width: 0px;
            background-color: rgb(100, 100, 100);
        }
        .list-outer::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.7);
        }
        @media screen and (max-width:768px){
            .list-outer{
                padding-top:95%;
                padding-bottom:50px;
            }
        }
    `,
    HiddenOuterFrame:styled.div`
        overflow:hidden;`
}

export default cssAll