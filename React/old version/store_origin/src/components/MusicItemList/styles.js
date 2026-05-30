import styled from 'styled-components'
const cssAll = {
    Show:styled.div`
        .items-card{
            display: flex;
            background-color:rgba(255,255,255,.7);
            height:170px;
            border-radius:15px 0 15px 0;
            overflow:hidden;
            box-shadow:0 0 3px 0 rgba(0,0,0,.7);
            margin:15px 0;
            cursor: pointer;
            user-select:none;
            .img-outer{
                border-radius:15px 0 15px 0;
                box-shadow:0 0 8px 1px rgba(0,0,0,.7);
                .img{
                    border-radius: 15px 0 15px 0;
                    background-size: cover;
                    background-position: center center;
                    background-repeat: no-repeat;
                    width: 170px;
                    height: 170px;
                }
            }
            .explain{
                padding:4px 10px 4px 10px;
                line-height:1.7em;
                span{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
            }
        }
    `
}

export default cssAll