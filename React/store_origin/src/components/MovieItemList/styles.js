import styled from 'styled-components'
const cssAll = {
    Show:styled.div`
    .items-card-outer-frame{
        position: relative;
        height:600px;
        border-radius:15px 0 0 0;
        overflow:hidden;
        box-shadow:0 0 3px 0 rgba(0,0,0,.7);
        margin-top:15px;
        overflow:hidden;
        .items-card-outer{
            filter: brightness(1) blur(0px);
            transition: .7s ease;
            .items-card{
                .img-outer{
                    height: 600px;
                    overflow: hidden;
                    box-shadow:0 0 8px 1px rgba(0,0,0,.7);
                    .img{
                        display: flex;
                        justify-content: space-between;
                        flex-direction: column;
                        background-position: center center;
                        background-size: cover;
                        background-repeat: no-repeat;
                        min-height: 600px;
                        border-radius:15px 0 0 0;  
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
            filter:brightness(.7) blur(10px);
        }
        .items-card-frame{
            position:absolute;
            color:white;
            padding: 15px;
            line-height: 1em;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            transition:.7s ease;
            opacity: 0;
            line-height: 2em;
            transform:scale(2);
            font-style:italic;
            overflow-y:auto;
        }
        .items-card-frame::-webkit-scrollbar {
            width: 2px;
            background-color: rgb(100, 100, 100);
        }
        .items-card-frame::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.7);
        }
        .items-card-frame-toggle{
            opacity: 1;
            transform:scale(1);
        }
        .items-card-fram-title{
            display: block;
        }
        .go-details-btn-outer{
            height: 15%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .go-details-btn{
            cursor: pointer;
            user-select: none;
            background-color: red;
            color: white;
            text-align: center;
            border-radius: 20px;
        }
    }
    .explain-groups{
        background-color: rgba(0, 0, 0, 0.7);
        border-radius:0 0 15px 0;
        box-shadow:0 0 3px 0 rgba(0,0,0,.7);
        .explain-title{
            color:white;
            text-shadow: 1px 2px 1px rgba(0,0,0,.7);
            font-size: 25px;
            padding:5px 15px 0 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }
        .explain{
            padding:4px 15px 10px 15px;
            line-height:1.7em;
            margin-bottom: 15px;
            span{
                color:white;
                text-shadow: 1px 2px 1px rgba(0,0,0,.7);
                font-size: 18px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                text-align: right;
            }
        }
    }
    `
}

export default cssAll