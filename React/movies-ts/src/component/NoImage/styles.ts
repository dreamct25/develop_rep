import { styled } from '@linaria/react'

export default styled.div<{ fontSize: number }>`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-size: ${props => `${props.fontSize}px`};
    font-style: italic;
    background-color: rgba(100, 100, 100, .7);
    width: 100%;
    height: 100%;
    color: white;
    border-radius: 5px;
`