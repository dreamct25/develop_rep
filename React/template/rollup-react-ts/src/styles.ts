import { styled } from '@linaria/react'

const styles = styled.div`
    color:red;

    .count-text{
        transition: .5s ease;

        &.active{
            color: blue;
        }
    }
`

export default styles