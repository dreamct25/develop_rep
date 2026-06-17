import styled from 'styled-components'
import { cssSetPropertys } from './types'

const cssSet: cssSetPropertys = {
    Show: styled.div`
        .no-video{
            position: relative;
            overflow:hidden;
            width: 100%;
            height: 500px;
            background-color: white;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            .no-video-title{
                color:black;
                font-style:italic;
                font-size:70px;
            }
            .no-video-frame{
                position: absolute;
                top:0;
                left:0;
                right:0;
                bottom:0;
                opacity:1;
                z-index:1;
                background:linear-gradient(0deg,rgba(28,28,28,1),rgba(28,28,28,.6),rgba(28,28,28,.3),rgba(28,28,28,0));
            }
        }

    `,
}

export default cssSet