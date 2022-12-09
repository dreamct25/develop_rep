import styled from 'styled-components'

export default styled.div`
    background-color: rgb(30,30,30);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 0 33px;

    .desc{
        font-weight: bold;
        text-align: center;
        font-size: 40px;

        .top{
            display: flex;
            justify-content: center;

            i{
                color: rgb(255,51,51);
                margin-right: 5px;
                font-size: 50px;
                margin: 7px 16px 0 0;
            }
        }
        
        

        /* .right{
            text-align: center;
            font-size: 40px;

            @media screen and (max-width:414px){
                font-size: 30px;
            }
        } */
    }
`