import styled from 'styled-components'
const cssAll = {
    Show:styled.div`
        .loading-outer{
            display: flex;
            flex-direction:column;
            justify-content: center;
            align-items: center;
            position: absolute;
            top:53%;
            left: 50%;
            transform:translate(-50%,-50%);
            .loading{
                width: 70px;
                height: 70px;
                border-radius: 50%;
                border-top: 5px solid white;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 5px solid white;
                animation: loadingIcon .7s ease infinite;
                transform: rotate(0deg);
            }
            @keyframes loadingIcon {
                0%{
                    transform: rotate(0deg);
                }
                100%{
                    transform: rotate(360deg);
                }
            }
            .loading-text{
                margin-top: 15px;
                display: block;
                font-size: 18px;
                text-align: center;
            }
        }
        @media screen and (max-width:414px){
            .loading-outer{
                top: 63%;
            }
        }
    `
}

export default cssAll