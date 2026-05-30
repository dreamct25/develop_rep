import styled from 'styled-components'
const cssAll = {
    SearchBarOuter:styled.div`
        margin:10px 0;
        .search-bar{
            overflow:hidden;
            border-radius:20px;
            background-color:rgba(0,0,0,.7);
            box-shadow: 0 0 3px 0 rgba(255,255,255,.7);
            display:flex;
            justify-content:center;
            align-items: center;
            padding: 3px 0;
            transform: translateY(35vh);
            transition: .7s ease;
            input{
                width: 85%;
                height:100%;
                font-size:18px;
                color:white;
                text-align:center;
                background-color:transparent;
                border:none;
                outline:none;
            }
            @media screen and (max-width:414px){
                input{
                    width: 50%;
                }
            }
            select{
                height:100%;
                outline:none;
                border:none;
                background-color:transparent;
                color:white;
                margin: 0 5px;
            }
            .search-btn{
                text-align:center;
                color:white;
                height:100%;
                cursor: pointer;
                user-select:none;
                width: 12%;
            }
        }
        .search-bar-toggle{
            transform: translateY(0vh);
        }
        @media screen and (max-width:414px){
            .search-bar{
                padding:3px 15px;
            }
        }
    `,
    ShowItemOuter:styled.div`
        min-height: 80vh;
    `
}

export default cssAll