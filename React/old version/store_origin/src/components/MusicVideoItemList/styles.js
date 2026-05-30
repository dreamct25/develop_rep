import styled from 'styled-components'
const cssAll = {
    Show:styled.div`
    .items-card-outer-frame{
        position: relative;
        height:380px;
        border-radius:15px 0 15px 0;
        overflow:hidden;
        box-shadow:0 0 3px 0 rgba(0,0,0,.7);
        margin:15px 0;
        cursor: pointer;
        user-select:none;
        overflow:hidden;
        .items-card-outer{
            transition: .7s ease;
            .items-card{
                .img-outer{
                    height: 380px;
                    overflow: hidden;
                    box-shadow:0 0 8px 1px rgba(0,0,0,.7);
                    .img{
                        display: flex;
                        justify-content: space-between;
                        flex-direction: column;
                        background-position: center center;
                        background-size: cover;
                        background-repeat: no-repeat;
                        min-height: 380px;
                        border-radius:15px 0 0 0;
                        .explain-title{
                            color:white;
                            font-size: 25px;
                            padding:8px 15px 0 15px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                        }
                        .explain{
                            padding:4px 10px 4px 10px;
                            line-height:1.7em;
                            text-align: right;
                            span{
                                font-size: 18px;
                                color: white;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                            }
                            span:nth-of-type(6){
                                cursor: pointer;
                                user-select:none;
                            }
                        }  
                    }
                }
            }
        }
        .items-card-outer-toggle{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            filter:blur(10px);
        }
        .items-card-frame{
            display: flex;
            justify-content: center;
            flex-direction:column;
            align-items: center;
            font-size: 35px;
            position:absolute;
            color:white;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            transition:.7s ease;
            opacity: 0;
            transform:scale(2);
            font-style:italic;
        }
        .items-card-frame-toggle{
            opacity: 1;
            transform:scale(1);
        }
    }
    `
}

export default cssAll