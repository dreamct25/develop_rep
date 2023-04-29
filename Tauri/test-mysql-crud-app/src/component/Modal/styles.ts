import { styled } from '@linaria/react'

export default styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    z-index: -1;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background-color: rgba(30,30,30,.5);
    pointer-events: none;
    transition: .5s ease;
    transform: translate3d(0,0,0);

    .modal{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 95%;
        max-width: 400px;
        border-radius: 5px;
        box-shadow: 0 0 2px 1px rgba(255,255,255,.7);
        overflow: hidden;

        .modal-header{
            color: white;
            font-size: 22px;
            padding: 10px;
            font-weight: bold;
        }

        .modal-body{
            display: flex;
            justify-content: center;
            padding: 0 10px;

            input{
                color: white;
                border: none;
                outline: none;
                width: 100%;
                padding: 5px 10px;
                font-size: 18px;
                background-color: transparent;
                border-radius: 5px;
                border: 1px solid rgba(255,255,255,.7);
            }

            span{
                color: white;
            }
        }

        .modal-footer{
            display: flex;

            div{
                color: white;
                width: 50%;
                padding: 10px 0;
                text-align: center;
                cursor: pointer;
                user-select: none;
            }
        }
    }

    &.active{
        opacity: 1;
        z-index: 2;
        pointer-events: auto;
    }
`