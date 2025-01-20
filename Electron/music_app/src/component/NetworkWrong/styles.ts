import { styled } from '@linaria/react';

export default styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(30,30,30);
    height: 100%;
    margin-top: 33px;

    .message{
        text-align: center;
    }
    
    .reload-btn{
        border-radius: 5px;
        padding: 6px 12px;
        background-color: rgb(8,232,222);
        color: white;
        margin-top: 20px;
        cursor: pointer;
        user-select:none;
    }
`