import { styled } from '@linaria/react'

export default styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    height: 100%;

    .layout {
        display: flex;
        align-items: center;
        font-size: 20px;
        
        i {
            color: rgb(255, 51, 51);
            margin-top: 4px;
        }

        div {
            margin-left: 8px;
        }
    }
`