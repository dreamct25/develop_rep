import { styled } from '@linaria/react'

export default styled.div`

    .search-actor{
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 12px;
        height: calc(100vh - 79px);

        .search-actor-header{
            color:white;

            .search-actor-title{
                text-align: center;
                font-size: 35px;
                font-weight: bold;
                margin-bottom: 25px;
            }

            .search-actor-totals{
                text-align: right;
                margin: 0 12px;
                font-size:18px;
            }
        }

        .search-actor-body-outer {
            position: relative;
            height: 100%;
            margin: 0 12px;
            overflow: hidden;
            border-radius: 5px;

            .search-actor-body{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                overflow-y: auto;
                overflow-x: hidden;

                &::-webkit-scrollbar {
                    width: 8px;
                    height: 0;
                    box-shadow: inset 0 0 5px 0 rgba(255, 255, 255, 0.7);
                    border-radius: 20px;
                }
    
                &::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, .5);
                    border-radius: 20px;
                }

                .actor-list {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;

                    @media screen and (max-width: 1200px) {
                        grid-template-columns: repeat(3, 1fr);
                    }

                    @media screen and (max-width: 991px) {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    @media screen and (max-width: 576px) {
                        grid-template-columns: repeat(1, 1fr);
                    }

                    .poster-card {
                        position: relative;
                        overflow: hidden;
                        border-radius: 5px;
                        color: white;
                        height: 450px;

                        .poster-card-mask {
                            display:flex;
                            flex-direction:column;
                            justify-content:center;
                            align-items:center;
                            font-weight:bold;
                            position:absolute;
                            top:0;
                            right:0;
                            left:0;
                            bottom:0;
                            background:linear-gradient(0deg,rgba(0,0,0,.9),rgba(0,0,0,.7),rgba(0,0,0,.5),rgba(0,0,0,.3),rgba(0,0,0,.1),rgba(0,0,0,0));
                            opacity:0;
                            z-index: 2;
                            cursor: pointer;
                            user-select:none;
                            transition:.7s ease;
                        
                            &:hover{
                                opacity:1;
                            }
                        }

                        .poster-img{
                            height:100%;

                            .img{
                                background-position:top center;
                                background-repeat:no-repeat;
                                background-size:cover;
                                min-height:100%;
                            }
                        }

                        .poster-title{
                            position: absolute;
                            bottom:0;
                            right:0;
                            backdrop-filter:blur(10px);
                            background-color:rgba(0,0,0,.3);
                            margin: 0 5px 5px 0;
                            padding: 5px 6px;
                            border-radius: 5px;
                        }
                    }
                }

                .no-result{
                    color:white;
                    text-align:center;
                }
            }
        }
    }
`