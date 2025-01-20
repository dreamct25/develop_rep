import { styled } from '@linaria/react'

export default styled.div<{ posX: number, posY: number }>`
    .tooltip {
        position: absolute;
        padding: 5px 0;
        width: 40px;
        height: 20px;
        color: white;
        background: rgba(30,30,30,.5);
        left: ${props => props.posX ? `${props.posX}px` : '0'};
        top: ${props => props.posY ? `${props.posY}px` : '0'};
        border-radius: 5px;
        text-align: center;
        opacity: 0;
        z-index: -1;
            
        &:before {
            content: "";
            position: absolute;
            border-top: 8px solid rgba(30, 30, 30, .5);
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
        }
    }
   
`