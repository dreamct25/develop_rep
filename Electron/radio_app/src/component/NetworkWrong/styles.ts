import styled, { StyledComponent } from "styled-components";

const { Container }: { Container: StyledComponent<"div", any> } = {
    Container: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgb(30,30,30);
        min-height: 100vh;
        .message{
            text-align: center;
        }
        .reload-btn{
            border-radius: 5px;
            padding: 3px 12px;
            background-color: rgb(8,232,222);
            color: white;
            margin-top: 10px;
            cursor: pointer;
            user-select:none;
        }
    `
}

export { Container }