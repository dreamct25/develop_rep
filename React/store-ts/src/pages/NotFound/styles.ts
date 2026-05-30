import { styled } from '@linaria/react'

export default styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: white;

    .layout {
        display: flex;
        align-items: center;
        font-size: 20px;
        
        svg {
            color: rgb(255, 51, 51);
        }

        div {
            margin-left: 8px;
        }
    }
`