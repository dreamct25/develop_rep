import { styled } from '@linaria/react';

const MoreLoadingMsg = styled.div<{ isFloatLoadingText: boolean }>`
    padding: 7px 0 8px 2px;
    text-align: center;
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    bottom: ${props => props.isFloatLoadingText ? '-8%' : '7%'};
    z-index: 5;
    width: 122px;
    margin: 0 auto;
    opacity: 0;
    pointer-events: none;
    border-radius: 20px;
    background-color: rgba(30, 30, 30, .3);
    box-shadow: inset 0 0 2px rgba(255, 255, 255, .5);
    backdrop-filter: blur(6px);
    transition: opacity .3s ease, bottom .3s ease;

    &.active {
        opacity: 1;
        bottom: ${props => props.isFloatLoadingText ? '2%' : '9%'};
    }
`

const ScanLine = styled.div`
    height: 2px;
    grid-column: 1 / -1;
`

export { MoreLoadingMsg, ScanLine }
