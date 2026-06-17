import { styled } from '@linaria/react'

export default styled.div`

    .no-video{
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 500px;
        background-color: rgba(255, 255, 255 , .1);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .no-video-title{
            color: black;
            font-style: italic;
            font-size: 50px;
            color: white;
        }

        .no-video-frame{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 1;
            z-index: 1;
            background: linear-gradient(
                0deg,
                rgba(30, 30, 30, 1),
                rgba(30, 30, 30, .7),
                rgba(30, 30, 30, .5),
                rgba(30, 30, 30, .3),
                rgba(30, 30, 30, 0)
            );
        }
    }

    .single-container{
        padding: 23px 25px 0 25px;
        max-width: 960px;
        margin: 0 auto;

        .title{
            display:flex;
            justify-content:space-between;
            margin-bottom:10px;

            .title-group{

                span{
                    display:block;
                    color:white;
                
                    &:nth-of-type(1){
                        font-size: 40px;

                        @media screen and (max-width: 415px) {
                            font-size: 30px;
                        }
                    }

                    &:nth-of-type(2){
                        margin-top: 6px;
                        font-size: 20px;
                    }
                }
            }
        }

        .single-else{
            margin-top: 20px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;

            @media screen and (max-width: 1200px) {
                grid-template-columns: repeat(1, 1fr);
            }

            div {
                
                &:not(&.rate-star, &.stars-group) {
                    display: grid;
                    grid-template-columns: 86px auto;
                    align-items: center;
                    border-radius: 5px;
                    box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .7);
                    border-radius: 5px;
                    overflow: hidden;
                }

                span {
                    
                    &:first-child {
                        position: relative;
                        padding: 8px 0;
                        font-weight:bold;
                        text-align:center;
                        color: white;

                        &::after {
                            content: '';
                            position: absolute;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            width: .5px;
                            height: 95%;
                            margin: auto 0;
                            background-color: rgba(255, 255, 255, .3);
                        }
                    }
                }

                &.release-date{

                    span {

                        &:last-child  {
                            text-align:center;
                            color:white;
                        }
                    }
                }

                &.rate{

                    .rate-star {
                        display: flex;
                        justify-content: center;
                        margin-bottom: 2px;

                        .stars-group{
                                
                            .stars{
                                color:rgb(250,250,0);
                                text-shadow:0 1px 1px rgba(0, 0, 0, 0.7);
                            }
                        }
                    }

                    span {

                        &:last-child  {
                            text-align:center;
                            color:white;
                        }
                    }
                }

                &.video-type {

                    span {

                        &:last-child {
                            text-align:center;
                            color:white;
                        }
                    }
                }
            }
        }

        .single-descript{

            .descript{
                text-align:justify;
                color:white;
                line-height:30px;
            }
        }

        .single-cast-group-outer-fram{
            margin:30px 0;

            .single-cast-group-title{
                color:white;
                font-weight:bold;
                font-size:25px;
                margin-bottom:10px;
            }

            .single-cast-group-outer{
                border-radius: 10px;
                box-shadow: inset 0 0 10px 1px rgba(0,0,0,.7);
                padding: 10px;
                width: 100%;
                overflow-x: auto;
                overflow-y: hidden;

                &::-webkit-scrollbar {
                    display: none;
                }

                .single-cast-group {
                    display: flex;

                    .cast-card-outer{
                        margin: 6px 0;
                        padding: 0 8px;

                        &:last-child{
                            padding:0 20px 0 10px;
                        }

                        .cast-card{
                            color:white;
                            border-radius:5px;
                            box-shadow: 0 0 0 1px rgba(255, 255, 255, .2);
                            cursor: pointer;
                            user-select:none;
                            position: relative;
                            overflow: hidden;

                            .cast-card-img {
                                border-radius:5px 5px 0 0;
                                width: 150px;
                                height: 216px;
                                overflow:hidden;

                                img{
                                    width:100%;
                                    height:100%;
                                }

                                .no-cast-img {
                                    display: flex;
                                    justify-content: center;
                                    flex-direction: column;
                                    align-items: center;
                                    font-size: 25px;
                                    font-style: italic;
                                    background-color: rgb(100,100,100);
                                    width: 100%;
                                    height: 100%;
                                }
                            }

                            .cast-title{
                                display: flex;
                                flex-direction: column;
                                justify-content: flex-end;
                                position: absolute;
                                top: 50%;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                background: linear-gradient(
                                    0deg,
                                    rgba(0, 0, 0, 1),
                                    rgba(0, 0, 0, .7),
                                    rgba(0, 0, 0, .5),
                                    rgba(0, 0, 0, .3),
                                    rgba(0, 0, 0, 0)
                                );
                                padding: 5px 5px 8px 5px;
                                text-align:center;
                                pointer-events: none;

                                span{
                                    -webkit-line-clamp: 1;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;

                                    &:last-child {
                                        margin-top: 6px;
                                        font-size: 14px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .single-review-outer{
            color:white;

            .single-review-title{
                color:white;
                font-weight:bold;
                font-size:25px;
                margin-bottom:10px;
            }

            .single-review-item-outer{
                border-radius:10px;
                box-shadow:inset 0 0 10px 1px rgba(0,0,0,.7);
                padding:15px 6px 10px 6px;

                .single-review-item-title{
                    margin-bottom:10px;
                    padding:0 20px 10px 20px;
                    display:grid;
                    grid-template-columns:40% 44% auto;
                    gap: 12px;
                    border-bottom:0.1px solid rgba(255,255,255,.7);

                    @media screen and (max-width: 768px) {
                        grid-template-columns: 59% 18% auto;
                    }

                    span{
                        display:block;

                        &:nth-of-type(4){
                            text-align:right;
                        }
                    }
                }

                .single-review-item{
                    display:grid;
                    grid-template-columns:40% 44% auto;
                    gap: 12px;
                    padding:0 20px;
                    line-height:35px;

                    @media screen and (max-width: 768px) {
                        grid-template-columns: 59% 18% auto;
                    }

                    span{
                        display:block;

                        i {
                            color: yellow;
                            margin-right: 8px;
                        }

                        &:nth-of-type(4){
                            text-align:right;

                            .time{

                                span{
                                    margin:0 6px;
                                }
                            }
                        }
                    }
                }

                .no-review{
                    text-align: center;
                    margin: 30px 0 20px 0;
                    font-size: 18px;
                }
            }

            @media screen and (max-width:415px){

                .single-review-item-outer{
                    font-size: 15px;

                    .single-review-item-title{
                        grid-template-columns:1fr 1fr 1fr;

                        span{

                            &:nth-of-type(2),
                            &:nth-of-type(3) {
                                text-align:center;
                            }
                        }
                    }

                    .single-review-item{
                        grid-template-columns:1fr 1fr 1fr;
                        gap: 6px;

                        span {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;

                            &:nth-of-type(2),
                            &:nth-of-type(3){
                                text-align:center;
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }
`