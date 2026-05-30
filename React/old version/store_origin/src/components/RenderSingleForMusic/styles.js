import styled from 'styled-components'
const cssAll = {
    Show:styled.div`
        .single-outer{
            padding: 25px 15px;
            .img-outer{
                img{
                    border-radius:15px;
                    margin:2px 0 0 5px;
                    box-shadow:5px 5px 15px rgba(255,255,255,.7);
                    transition: .7s ease;
                }
                @media screen and (max-width:414px){
                    img{
                        margin: 0;
                    }
                }
            }
            @media screen and (max-width:414px){
                .img-outer{
                    display: flex;
                    justify-content: center;
                    margin-top:30px;
                }
            }
            .right-detailse-outer{
                display:flex;
                justify-content: center;
                flex-direction:column;
                min-height:95%;
                overflow:hidden;
                .right-detailse{
                    span{
                        display:block;
                        width:100%;
                        margin:18px 0 0 70px;
                    }
                    span:nth-of-type(1){
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        font-size:35px;
                    }
                    @media screen and (max-width:414px){
                        span:nth-of-type(1){
                            font-size:25px;
                            margin: 18px 0 0 10px;
                        }
                    }
                    span:nth-of-type(2){
                        font-size:20px;
                    }
                    span:nth-of-type(3){
                        font-size:20px;
                    }
                    span:nth-of-type(4){
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        font-size:25px;
                    }
                    .show-input{
                        display:block;
                        font-size: 22px;
                        cursor: pointer;
                        user-select:none;
                        background-color:rgb(255, 74, 174);
                        text-align: center;
                        border-radius: 20px;
                        width: 35%;
                        .arrow{
                            transform:rotate(0deg);
                            margin-left:10px;
                            transition:.7s ease;
                        }
                        .arrow-toggle{
                            transform: rotate(-180deg);
                        }
                    }
                    @media screen and (max-width:414px){
                        .show-input{
                            width: auto;
                            margin: 15px auto;
                            padding: 7px 0;
                        }
                    }
                }
            }
            @media screen and (max-width:414px){
                .right-detailse-outer{
                    padding: 0 15px;
                }
            }
            .audio-outer{
                display:flex;
                align-items: center;
                height: 100%;
                margin:-25px 0 -25px 0;
                padding: 0 1px;
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
                        padding: 5px 30px 5px 15px;
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
                        width:92%;
                        margin: 0 auto;
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
                    @media screen and (max-width:414px){
                        input[type="range"]{
                            width: 75%;
                        }
                    }
                    input[type="range"]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        border-radius: 50%;
                        height: 10px;
                        width: 10px;
                        background-color: red;
                        cursor: pointer;
                    }
                    .duration-time{
                        display:block;
                        margin: 0 auto;
                    }
                }
            }
            @media screen and (max-width:414px){
                .audio-outer{
                    padding: 0 15px;
                }
            }
            .audio-outer-toggle{
                margin:27px 0 3px 0;
                opacity: 1;
            }
            @media screen and (max-width:414px){
                .audio-outer-toggle{
                   margin: 5px 0 20px 0;
                }
            }
        }
        @media screen and (max-width:414px){
            .single-outer{
                height: 712px;
                overflow-y: scroll;
                overflow-x: hidden;
            }
            .single-outer::-webkit-scrollbar {
                width: 0;
            }
        }
    `,
    HiddenOuterFrame:styled.div`
        overflow:hidden;
    `
}

export default cssAll