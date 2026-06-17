import { styled } from '@linaria/react'

export default styled.div<{ profilePath: string }>`

    .cast-modal{
        color:white;
        position: fixed;
        top: 20px;
        left: 0;
        right: 0;
        bottom: 20px;
        overflow-x:hidden;
        overflow-y:scroll;
        opacity:0;
        z-index: 20;
        pointer-events: none;
        border-radius: 12px;
        background-color:rgba(0,0,0,.3);
        backdrop-filter:blur(10px);
        box-shadow:inset 0 0 2px 0 rgba(255,255,255,.7);
        max-width: 500px;
        width: 95%;
        margin: 0 auto;
        transform: translate(0, 5%);
        transition:.7s ease;

        &::-webkit-scrollbar {
            width: 0px;
            height:0;
            background-color: transparent;
        }
        
        &.cast-modal-toggle{
            opacity:1;
            z-index: 20;
            pointer-events: all;
            transform: translate(0, 0);
        }

        .close{
            position:absolute;
            top:0;
            right:0;
            transform:translate(-25px,20px);
            width: 35px;
            height: 35px;
            border-radius: 50%;
            color: white;
            font-size: 22px;
            opacity: 0.5;
            cursor: pointer;
            user-select: none;
            transition: .7s ease;
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255 , .5);

            i {
                margin: 7px 0 0 10px;
            }
    
            &:hover{
                opacity:1;
            }
        }

        .cast-modal-body{
        
            .cast-profile{

                .cast-details-outer{
                    display: grid;
                    grid-template-columns: auto 1fr;
                    gap: 12px;
        
                    .img-outer{
                        margin: 12px;
                        position: relative;
                        width: 150px;
                        height: 216px;
                        border-radius: 5px;
                        overflow: hidden;
            
                        .img{
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background-image: ${props => `url('${props.profilePath}')`};
                            background-repeat: no-repeat;
                            background-size: cover;
                        }
                    }
            
                    .cast-details{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        padding: 12px 12px 12px 0;

                        .top {
                            margin-bottom: 24px;

                            span {
                                display:block;
                                margin-bottom: 6px;

                                &:nth-of-type(1){
                                    font-size:25px;
                                    font-weight:bold;

                                    @media screen and (max-width: 480px) {
                                        font-size: 22px;
                                    }
                                }
                
                                &:nth-of-type(2){
                                    margin-top: 6px;
                                    font-size: 18px;
                                    font-weight:bold;
                                    margin-bottom: 0;

                                    @media screen and (max-width: 480px) {
                                        font-size: 16px;
                                    }
                                }
                            }
                        }

                        .bottom {

                            span {
                                display: block;
                                margin-bottom: 10px;

                                &:last-child {
                                    margin-bottom: 0;
                                }

                                i {
                                    margin-right: 6px;
                                }
                            }
                        }
                    }
                }
        
                .cast-famous-video-outer{
                    padding: 0 12px;
                    position: relative;
                    height: 271px;
        
                    .cast-famous-video-title{
                        font-size: 25px;
                        margin-bottom: 8px;
                    }
        
                    .cast-famous-video-list {
                        display: flex;
                        justify-content: safe center;
                        overflow-x: auto;
                        overflow-y: hidden;
                        padding-top: 8px;
                        position: absolute;
                        top: 30px;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: 0 12px;

                        &::-webkit-scrollbar {
                            width: 0;
                            height: 4px;
                            background-color: transparent;
                        }
            
                        &::-webkit-scrollbar-thumb {
                            background-color: rgba(255, 255, 255, 0.7);
                            border-radius:20px;
                        }
        
                        .cast-famous-video-list-item{
                            min-width: 152px;
                            position: relative;
                            margin:0 5px;
                            cursor: pointer;
                            user-select:none;
                            overflow: hidden;
                            border-radius: 5px;

                            &:first-child{
                                margin:0 5px 0 0;
                            }
            
                            &:last-child{
                                margin:0 0 0 5px;
                            }
        
                            img{
                                width:100%;
                                height:100%;
                            }
        
                            .famous-title{
                                position: absolute;
                                right:0;
                                left:0;
                                bottom: 0;
        
                                .title-group{
                                    background:linear-gradient(0deg,rgba(0,0,0,1),rgba(0,0,0,.8),rgba(0,0,0,.6),rgba(0,0,0,.4),rgba(0,0,0,.2),rgba(0,0,0,0));
                                    padding:1px 5px 6px 5px;
        
                                    span{
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        display: -webkit-box;
                                        -webkit-line-clamp: 1;
                                        -webkit-box-orient: vertical;
                                        text-align: center;

                                        &:nth-of-type(1){
                                            font-size:14px;
                                        }
            
                                        &:nth-of-type(2){
                                            margin-top: 3px;
                                            font-size:10px;
                                        }
                                    }
                                }
                            }
                        }
        
                        .no-cast-famous-video{
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            text-align: center;
                        }
                    }
                }    
        
                .cast-movie-list-outer{
                    margin-top: 15px;
        
                    .title{
                        font-size:25px;
                        padding:0 12px;
                    }
        
                    .cast-movie-list-title{
                        margin:8px 0 15px 0;
                        display:grid;
                        grid-template-columns: 45% 15% 20% 20%;
                        padding:0 12px;
                        font-size:18px;

                        span {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                        }
        
                        span:nth-of-type(3),
                        span:nth-of-type(4){
                            text-align:center;
                        }
                    }
        
                    .cast-movie-list{
                        height:415px;
                        overflow-x: hidden;
                        overflow-y: auto;

                        &::-webkit-scrollbar {
                            width: 5px;
                            height:0;
                            background-color: transparent;
                        }
            
                        &::-webkit-scrollbar-thumb {
                            background-color: rgba(255, 255, 255, 0.7);
                            border-radius:20px;
                        }
        
                        .list-item{
                            position:relative;
                            display:grid;
                            grid-template-columns: 45% 15% 20% 20%;
                            align-items:center;
                            padding:20px 12px;
                            transition: color .7s ease;

                            &::after {
                                content: '';
                                position: absolute;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                z-index: -1;
                                pointer-events: none;
                                margin: 6px 12px;
                                border-radius: 5px;
                                transition: background-color .7s ease;
                            }

                            &:hover{
                                color:black;

                                &::after {
                                    background-color:rgba(255,255,255,.5);
                                }
                            }
        
                            .title{
                                margin-top:unset;
                                display:flex;
                                flex-direction:column;
                                cursor: pointer;
                                user-select:none;
                                margin-bottom: unset;
        
                                span{
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 1;
                                    -webkit-box-orient: vertical;
                                
                                    &:nth-of-type(1){
                                        font-size:18px;
                                    }
            
                                    &:nth-of-type(2){
                                        margin-top: 6px;
                                        font-size:15px;
                                    }
                                }
                            }
        
                            .movie-post{
                                cursor: pointer;
                                user-select:none;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                            }

                            div {

                                &:nth-of-type(3){
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 1;
                                    -webkit-box-orient: vertical;
                                    text-align: center;
                                }
            
                                &:nth-of-type(4){
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 1;
                                    -webkit-box-orient: vertical;
                                    text-align: center;
                                    text-align:center;
                                }
                            }
                        }
                    }
                }               
            }
        }
    }
    
    .post-img-outer{
        position:fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transform: scale(0.5);
        opacity:0;
        z-index: 25;
        pointer-events: none;
        margin: 75px auto;
        max-width: 350px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition:.7s ease;

        &.post-img-outer-toggle{
            opacity:1;
            pointer-events: all;
            transform: scale(1);
        }

        .img-outer {
            position: relative;
            box-shadow: 0 0 5px 2px rgba(0,0,0,.7);
            overflow: hidden;
            border-radius: 5px;

            img{
                width: 100%;
                height: 100%;
            }
        
            .close-img{
                position: absolute;
                top: 0;
                right: 0;
                transform: translate(-15px, 15px);
                width: 35px;
                height: 35px;
                border-radius: 50%;
                color: white;
                font-size: 22px;
                opacity: 1;
                cursor: pointer;
                user-select: none;
                box-shadow: inset 0 0 0 1px rgba(255, 255, 255 , .5);
                backdrop-filter: blur(6px);

                i {
                    margin: 7px 0 0 10px;
                }
            }
        }
    }
`