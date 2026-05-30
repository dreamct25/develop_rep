import styled from 'styled-components'
const cssAll = {
    Show:styled.div`
        z-index: 5;
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        .dialog{
            color:white;
            position: absolute;
            z-index:-1;
            top: 50%;
            left: 50%;
            width:100vh;
            height:auto;
            background-color: rgba(0,0,0,.9);
            box-shadow:0 0 2px 1px rgba(255,255,255,.7);
            border-radius: 15px;
            overflow: hidden;
            transform:translate(-50%,-50%) scale(.01);
            transition:.7s ease;
            opacity:0;
        }
        @media screen and (max-width:414px){
            .dialog{
                top: 50%;
                left: 50%;
                right:0;
                bottom:0;
                width: 55vh;
                height: 95vh;
            }
        }
        .dialog-toggle{
            z-index:2;
            transform:translate(-50%,-50%) scale(1);
            opacity:1;
        }
        @media screen and (max-width:414px){
            .dialog-toggle{
                z-index:2;
                transform:translate(-50%,-51%) scale(1);
                opacity:1;
            }
        }
        .close-btn{
            position:absolute;
            top:-8px;
            left: 100%;
            transform: translate(-42px,25px);
            z-index: 10;
            cursor: pointer;
            user-select:none;
            span{
                display:block;
                background-color:white;
                width:20px;
                height: 3px;
            }
            span:nth-of-type(1){
                transform:rotate(45deg) translate(6px,6px);
            }
            span:nth-of-type(2){
                transform:rotate(-45deg) translate(-4px,4px);
            }
        }
    `
}

export default cssAll