import styled from "styled-components";

export default styled.div`
    position: relative;

    fieldset{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid;
        border-color: rgba(255,255,255,.5);
        border-radius: 5px;
        padding: 0 12px 0 8px;
        margin-top: -12px;
        height: 70px;
        z-index: 1;
        transition: .5s ease;
        opacity: 0;

        legend{
            float: unset;
            width: unset;
            font-size: 16px;
            line-height: unset;
            margin-bottom: unset;
            padding: 0 3px;
            opacity: 0;
        }
    }

    input{
        position: relative;
        z-index: 3;
        width: 100%;
        outline: none;
        border: none;
        background-color: transparent;
        font-size: 18px;
        height: 58px;
        padding: 0 12px;
        color: white;
        border: 1px solid;
        border-color: rgba(255,255,255,.5);
        border-radius: 5px;
        transition: .5s ease;

        &:placeholder-shown::placeholder {
            color: transparent;
        }

        &:focus{
            border-color: rgba(255,255,255,0);
        }

        &:focus ~ p{
            opacity: 1;
            transform: scale(0.85);
            left: 0;
            top: -22%;
        }

        &:focus ~ fieldset{
            opacity: 1;
        }

        &.lock{
            &:not(:placeholder-shown){
                border-color: rgba(255,255,255,0);
            }

            &:not(:placeholder-shown) ~ p {
                opacity: 1;
                transform: scale(0.85);
                left: 0;
                top: -22%;
            }

            &:not(:placeholder-shown) ~ fieldset{
                opacity: 1;
            }
        }
        
    }

    p {
        position: absolute;
        left: 50%;
        top: 50%;
        color: white;
        opacity: .7;
        transform: scale(1) translate(-50%, -50%);
        pointer-events: none;
        margin-bottom: 0;
        font-size: 13px;
        transition: .5s ease;
        z-index: 2;
        font-size: 18px;
        padding: 0 10px 0 6px;

        &::before{
            content: '';
            margin-right: 4px;
        }

        &::after{
            content: '';
            margin-left: 4px;
        }
    }
`