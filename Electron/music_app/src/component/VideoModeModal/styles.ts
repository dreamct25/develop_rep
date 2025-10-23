import { styled } from '@linaria/react'

export default styled.div`
   position: absolute;
   top: 33px;
   left: 0;
   right: 0;
   bottom: 0;
   opacity: 0;
   z-index: -1;
   transform: scale(1.1);
   overflow: hidden;
   background-color: rgb(30,30,30);
   transition: .5s ease;

    iframe {
        opacity: 0;
        transition: .5s ease;
        transition-delay: 1s;
    }

    &.toggle {
        opacity: 1;
        z-index: 20;
        transform: scale(1);
        
        iframe {
            opacity: 1;
        }
    }
`