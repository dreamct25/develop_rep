import styled from "styled-components";

export default styled.div`
    .header{
        text-align: center;

        h1{
            margin-top: 50px;
            font-weight: bold;
            color: white;
            text-shadow: 0 2px 3px rgba(0,0,0,.7);

            @media screen and (max-width:414px){
                margin-top: 60px;
            }
        }
    }

    .main{
        margin-top: 30px;
    }

    .right-top-group{
        position: fixed;
        top: 0;
        right: 0;
        margin: 5px;
        display: flex;

        .dashboard-switch-btn,
        .logout-btn{
            border-radius: 5px;
            padding: 5px 12px;
            color: white;
            cursor: pointer;
            user-select: none;
            background-color: rgba(30,30,30,.7);
            box-shadow: inset 0 0 3px 0 rgba(255,255,255,.7);
        }

        .dashboard-switch-btn{
            margin-right: 5px;
        }
    }
`