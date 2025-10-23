import styled from "styled-components";

export default styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .login-layout{
        margin-top: 125px;
        background-color: rgba(30,30,30,.5);
        border-radius: 5px;
        box-shadow: inset 0 0 16px 0 rgba(255,255,255,.5);
        padding: 13px 18px;
        width: 100%;
        max-width: 400px;

        .header{
            color: white;
            text-align: left;
            margin-bottom: 10px;
            font-size: 20px;
            font-weight: bold;
        }

        .input-group{
            display: flex;
            flex-direction: column;
            margin: 10px 0;
            
            div{
                &:nth-of-type(1){
                    margin-bottom: 9px;
                }
                &:nth-of-type(2){
                    margin-top: 9px;
                }
            }
        }

        .login-btn{
            margin-top: 15px;
            padding: 8px 0;
            text-align: center;
            background-color: white;
            box-shadow: inset 0 0 3px 0 rgba(30,30,30,.5);
            border-radius: 5px;
            cursor: pointer;
            user-select: none;
        }
    }
`