import { styled } from '@linaria/react';

export default styled.div<{ posX: number, posY: number }>`

    .context-outer {
        position: fixed;
        top: ${props => `${props.posY}px`};
        left: ${props => `${props.posX}px`};
        opacity: 0;
        z-index: -1;
        backdrop-filter:blur(10px);
        background-color: rgba(30,30,30,.5);
        
        &.toggle {
            opacity: 1;
            z-index: 20;
        }
    }
`