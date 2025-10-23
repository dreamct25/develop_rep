import { styled } from '@linaria/react'

export default styled.div<{ themColor?:string }>`
    .custom-toast {
        box-shadow: inset 0 0 3px 1px rgba(30,30,30,.7), 0 1px 0 0 rgba(30,30,30,.7);
        background-color: ${props => props?.themColor ? props.themColor : 'transparent'};
        backdrop-filter: blur(10px);
    }
`