import styled from 'styled-components'
import { cssSetPropertys } from './types'

const cssSet: cssSetPropertys = {
    Show: styled.div`
        .render-center-outer{
            overflow:hidden;
            background-color:rgb(30,30,30);
            .render-center-banner{
                position: relative;
                min-height:100vh;
                background-position:top center;
                background-size:cover;
                background-repeat:no-repeat;
                opacity:1;
                transform:scale(1);
                transition:.7s ease;
                .title{
                    display:grid;
                    grid-template-columns:80% 20%;
                    align-items:center;
                    margin-bottom:10px;
                    span{
                        display:block;
                        color:white;
                        text-shadow:1px 1px 2px rgba(0,0,0,.7);
                    }
                    .preview-title{
                        font-size:40px;
                        font-weight:bold;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                    }
                    .preview-video{
                        cursor: pointer;
                        user-select:none;
                        color:white;
                        font-size:30px;
                        text-align:right;
                        .play-icon{
                            margin-left:5px;
                        }
                    }
                }
                
                .render-center-banner-body{
                    position: absolute;
                    bottom:0%;
                    left:0;
                    transform:translate(220px,-15px);
                    overflow:hidden;
                    width:700px;
                    span{
                        color:white;
                        text-shadow:1px 1px 2px rgba(0,0,0,.7);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        font-size:20px;
                        -webkit-line-clamp: 3;
                    }
                }
            }

            .render-center-banner-toggle{
                opacity:0;
                transform:scale(1.3);
            }
        }
    `,
}

export default cssSet