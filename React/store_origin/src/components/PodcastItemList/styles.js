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
            .img-outer{
                img{
                    border-radius:15px 0 15px 0;
                    box-shadow:0 0 8px 1px rgba(0,0,0,.7);
                }
            }
            .explain-outer{
                display: flex;
                justify-content: center;
                flex-direction: column;
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
                    span:nth-of-type(4){
                        cursor: pointer;
                        user-select:none;
                    }
                }
            }
        }
    `
}

export default cssAll