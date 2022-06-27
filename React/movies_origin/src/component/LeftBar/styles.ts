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
            min-width:200px;
            overflow:hidden;
            .header{
                position: absolute;
                top:3%;
                left:50%;
                transform:translate(-50%,0);
                color:white;
                font-size:35px;
                font-style:italic;
                cursor: pointer;
            }
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
                    padding:0 60px;
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
            .footer{
                color:white;
                position: absolute;
                bottom:2%;
                left:0;
                right:0;
                text-align:center;
                font-size:13px;
                font-style:italic;
                .icon{
                    margin-right:3px;
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
                margin: 10px;
                border-radius: 20px;
                box-shadow:0 0 3px 1px rgba(0,0,0,.3);
                .left-list{
                    min-height:10vh;
                    flex-direction:unset;
                    align-items:center;
                    .list-item{
                        padding:0 30px 12px 30px;
                    }
                }
                .footer{
                    bottom:10%;
                }
            }
            .outer-active{
                opacity:0;
                transform:translateY(100%);
            }
        }
    `,
}

export default cssSet