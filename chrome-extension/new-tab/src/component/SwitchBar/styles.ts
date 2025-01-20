import { styled } from '@linaria/react'

export default styled.div<{ isSlide: boolean }>`
    position: relative;
    height: 20px;
    width: 40px;
    background-color: ${props => props.isSlide ? 'rgba(0,162,255,1)' : 'rgba(0,255,0,0)'};
    box-shadow: 0 0 1px 1px rgba(255,255,255,.5);
    border-radius: 20px;
    cursor: pointer;
    user-select: none;
    transition: .5s ease;
    

    .switch-circle {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        transform: ${props => props.isSlide ? 'translateX(100%)' : 'translate(0)'};
        border-radius: 50%;
        background-color: white;
        width: 20px;
        z-index: 3;
        box-shadow: inset 0 0 0 .5px rgba(30,30,30,.3);
        pointer-events: none;
        transition: .5s ease;
    }
`