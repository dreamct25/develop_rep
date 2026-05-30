import styled from 'styled-components'
const cssAll = {
    Show:styled.div`
        .app-card-outer{
            position: relative;
            display: flex;
            background-color: rgb(30,30,30);
            overflow:hidden;
            border-radius: 15px;
            margin: 15px 0;
            box-shadow:0 0 3px 0 rgba(0,0,0,.7);
            .app-icon{
                position: relative;
                z-index: 2;
                img{
                    border-radius:15px;
                    box-shadow: 0 0 5px 1px rgba(0,0,0,.7);
                }
            }
            .app-explain{
                width: 100%;
                padding: 13px 22px;
                color: white;
                transition:.7s ease;
                span{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
            }
            .app-explain-text-toggle{
                color:rgb(30,30,30);
            }
            .app-go-details-frame{
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(255,255,255,.7);
                transform: translateX(-100%);
                transition: .7s ease;
                border-radius: 0 15px 15px 0;
                color: black;
                font-size: 22px;
                font-style:italic;
                padding-left: 90px;
                cursor: pointer;
                user-select: none;
            }
            .app-go-details-frame-toggle{
                transform: translateX(0%);
            }
        }
    `
}

export default cssAll
