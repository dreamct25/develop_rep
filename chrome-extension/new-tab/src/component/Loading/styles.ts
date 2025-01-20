import { styled } from '@linaria/react'

export default styled.div<{ toggle: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(30,30,30,.7);
    backdrop-filter: blur(20px);
    opacity: ${props => props.toggle ? 1 : 0};
    z-index: ${props => props.toggle ? 10 : -1};
    transition: .5s ease;

    .loading-text {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 20px;
        font-weight: bold;
        transform: translate(-50%,-50%);
        letter-spacing: 5px;
        color: white;
    }
`