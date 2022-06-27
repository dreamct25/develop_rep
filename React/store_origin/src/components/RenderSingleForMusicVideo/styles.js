import styled from 'styled-components'
const cssAll = {
    Show:styled.div`
        .single-content{
            color: white;
            position: relative;
            .video-title-outer{
                opacity: 1;
                z-index: 2;
                position:absolute;
                top: 0;
                left: 0;
                right: 0;
                box-shadow: inset 0 43px 0 0 rgba(0,0,0,.6),0 10px 45px 40px rgba(0,0,0,.6);
                transition: .7s ease;
                .video-title{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    transform:translate(25px,15px);
                    font-size: 28px;
                    width: 95%;
                }
            }
            .video-title-outer-toggle{
                opacity: 0;
                top: -30%;
            }
            
            .video-black-frame{
                z-index: 1;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                opacity: 1;
                background-color: rgba(0,0,0,.7);
                transition: .7s ease;
            }
            .video-black-frame-toggle{
                opacity: 0;
                z-index: -1;
            }
            .video-btn{
                z-index: 2;
                position: absolute;
                cursor: pointer;
                user-select:none;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%) scale(1);
                font-size: 35px;
                opacity: 1;
                transition:.7s ease;
            }
            .video-btn-toggle{
                opacity: 0;
                transform: translate(-50%,-50%) scale(2);
            }
            video{
                display: flex;
                width:100%;
                height: 100%;
                box-shadow:0 0 2px 1px rgba(255,255,255,.7);
            }
            @media screen and (max-width:768px){
                video{
                    min-height: 95vh;
                }
            }
            .custom-progress{
                opacity: 1;
                display: flex;
                align-items: center;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                box-shadow: inset 0 70px 5px 0 rgba(0,0,0,.7),0 0 18px 18px rgba(0,0,0,.7);
                padding: 0 15px 8px 15px;
                transition: .7s ease;
                input[type="range"]{
                    -webkit-appearance: none;
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
                .duration-range{
                    width: 92%;
                }
                @media screen and (max-width:763px){
                    .duration-range{
                        width: 90%;
                    }
                }
                @media screen and (max-width:414px){
                    .duration-range{
                        width: 82%;
                    }
                }
                .voice-btn{
                    font-size:18px;
                    cursor: pointer;
                    user-select:none;
                    .voice-range-outer{
                        opacity: 0;
                        background-color: rgba(0,0,0,.7);
                        position: absolute;
                        z-index: -1;
                        right: 0;
                        transform: rotate(-90deg) translate(50px, 141px);
                        transform-origin: bottom left;
                        transition:.7s ease;
                        padding: 0 10px 8px 10px;
                        border-radius: 18px;
                    }
                    .voice-range-outer-toggle{
                        opacity: 1;
                        z-index: 2;
                        transform: rotate(-90deg) translate(60px, 141px);
                    }
                }
                .duration-time{
                    width: 7%;
                    text-align: center;
                }
                @media screen and (max-width:763px){
                    .duration-time{
                        width: auto;
                        padding: 0 5px;
                    }
                }
            }
            .custom-progress-toggle{
                opacity: 0;
                bottom: -30%;
            }
            @media screen and (max-width:768px){
                .custom-progress{
                    padding: 0 8px 8px 15px;
                }
            }
            .text-show{
                position: absolute;
                top:80%;
                left:50%;
                opacity: 0;
                transform:translate(-50%,-50%) scale(.5);
                transition: .7s ease;
                box-shadow:inset 0 0 5px 12px rgba(0,0,0,.7);
                padding: 3px 13px;
                border-radius:5px;
            }
            .text-show-toggle{
                opacity: 1;
                transform:translate(-50%,-50%) scale(1);
            }
        }
    `
}

export default cssAll