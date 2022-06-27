import styled from 'styled-components'
import { cssSetPropertys } from './types'

const cssSet: cssSetPropertys = {
    Show: styled.div`
        .loading-outer{
            position: fixed;
            top:0;
            left:0;
            right:0;
            bottom:0;
            opacity:0;
            z-index:-1;
            background-color:rgba(0,0,0,.7);
            backdrop-filter:blur(10px);
            transition:.7s ease;
            .loading{
                svg{
                    position: absolute;
                    top:50%;
                    left:50%;
                    transform:translate(-50%,-50%) rotate(0deg);
                    width:200px;
                    height:200px;
                    animation: loadingAnimate 1s linear infinite;
                }

                @keyframes loadingAnimate {
                    0%{
                        transform:translate(-50%,-50%) rotate(0deg);
                    }
                    100%{
                        transform:translate(-50%,-50%) rotate(360deg);
                    }
                }

                .loading-text{
                    position: absolute;
                    top:50%;
                    left:50%;
                    color:white;
                    transform:translate(-50%,-50%);
                }
                    
            }
        }

        .loading-outer-active {
            z-index:30;
            opacity:1;
        }
    `,
}

export default cssSet