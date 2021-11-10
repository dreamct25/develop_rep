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
            box-shadow:0 0 2px 1px rgba(0,0,0,.3);
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
    `,
}

export default cssSet