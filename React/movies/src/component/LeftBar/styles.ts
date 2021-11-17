import styled from 'styled-components'
import { cssSetPropertys } from './types'

const cssSet: cssSetPropertys = {
    Show: styled.div`
        .left-list-outer{
            position:fixed;
            top:0;
            left:0;
            bottom:0;
            z-index:10;
            opacity:1;
            transform:translateX(0);
            transition:.7s ease;
            background-color:rgba(0,0,0,.3);
            backdrop-filter:blur(10px);
            .left-list{
                display:flex;
                justify-content:center;
                flex-direction:column;
                min-height:100vh;
                .list-item{
                    cursor: pointer;
                    user-select:none;
                    text-align:center;
                    color:white;
                    padding:0 50px;
                    margin:20px 0;
                    transform:scale(1);
                    transition:.7s ease;
                    text-shadow:0 1px 1px rgba(255,255,255,0);
                }
                .list-item-active{
                    text-shadow:0 1px 1px rgba(255,255,255,.7);
                    transform:scale(1.2);
                }
            }
        }

        .outer-active{
            opacity:0;
            transform:translateX(-400px);
        }

        @media screen and (max-width: 415px) {
            .left-list-outer{
                top:unset;
                right:0;
                opacity:1;
                transform:translateY(0px);
                z-index: 11;
                .left-list{
                    min-height:10vh;
                    flex-direction:unset;
                    align-items:center;
                    .list-item{
                        padding:0 30px;
                    }
                }
            }
            .outer-active{
                opacity:0;
                transform:translateY(400px);
            }
        }
    `,
}

export default cssSet