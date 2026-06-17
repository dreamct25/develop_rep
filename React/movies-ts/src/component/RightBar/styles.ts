import { styled } from '@linaria/react'

export default styled.div`

    .right-list-outer{
        position: fixed;
        top:0;
        right:0;
        bottom:0;
        z-index:10;
        opacity:1;
        transform:translateX(0px);
        background-color:rgba(0,0,0,.3);
        backdrop-filter:blur(10px);
        transition:.7s ease;

        @media screen and (max-width: 970px) {
            opacity: 0;
            transform: translateX(400px);
        }

        @media screen and (max-width: 415px) {
            display: none;
        }

        &.outer-active{
            opacity: 0;
            transform: translateX(400px);
        }

        .right-list{
            height:100vh;
            padding: 0 18px;
            overflow-y:scroll;

            &::-webkit-scrollbar {
                width: 6px;
                height: 0;
                box-shadow: inset 0 0 5px 0 rgba(255, 255, 255, 0.7);
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba(255, 255, 255, .5);
                border-radius: 20px;
            }

            .poster-card{
                width:250px;
                padding: 0 0 20px 0;
                user-select:none;
                cursor: pointer;

                &:first-child{
                    padding: 18px 0 20px 0;
                }

                .poster-img{
                    position: relative;
                    height: 375px;

                    img{
                        border-radius: 5px;
                        width:100%;
                        height:100%;
                    }

                    .rate{
                        display:flex;
                        align-items:center;
                        color:white;
                        position: absolute;
                        top:0;
                        left:0;
                        backdrop-filter: blur(6px);
                        margin: 5px 0 0 5px;
                        background-color:rgba(0,0,0,.3);
                        padding: 2px 5px 3px 5px;
                        border-radius:5px;

                        .stars{
                            font-size: 12px;
                            margin: 1px 0 0 6px;
                            color:yellow;
                        }
                    }

                    .release-date{
                        color:white;
                        position: absolute;
                        bottom:0;
                        right:0;
                        backdrop-filter: blur(6px);
                        margin: 0 5px 5px 0;
                        background-color:rgba(0,0,0,.3);
                        padding: 5px;
                        border-radius:5px;
                        font-size: 14px;
                    }
                }

                .poster-card-body{
                    color:white;
                    padding:10px 5px;

                    .title-group{

                        span{
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;

                            &:nth-of-type(1){
                                font-size:18px;
                                font-weight:bold;
                            }
                            
                            &:nth-of-type(2){
                                margin-top: 6px;
                                font-size:13px;
                            }
                        }
                    }
                }
            }

            .more-info{
                cursor: pointer;
                user-select: none;
                padding: 12px 0px;
                text-align: center;
                color: white;
                box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);
                border-radius: 12px;
                margin-bottom: 20px;
            }
        }
    }
`