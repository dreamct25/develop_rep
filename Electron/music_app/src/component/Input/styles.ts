import { styled } from '@linaria/react';

export default styled.div`

.input-outer {
        position: relative;
        margin-bottom: 18px;

        &.white {

            input {
                color: white;
                border-color: rgba(255,255,255,.5);

                &:not(:placeholder-shown),
                &:focus{
                    border-color: rgba(255,255,255,0);
                }

                &:not(:placeholder-shown) ~ fieldset,
                &:focus ~ fieldset{
                    border-color: rgba(255,255,255,1);
                }
            }
        }

        &.without-mb {
            margin-bottom: unset;
        }

        fieldset {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 1px solid;
            border-color: rgba(30,30,30,.5);
            border-radius: 5px;
            padding: 0 12px 0 8px;
            margin-top: -6px;
            height: 68px;
            z-index: 1;
            transition: .5s ease;
            opacity: 0;

            legend{
                float: unset;
                width: unset;
                font-size: 14px;
                line-height: unset;
                margin-bottom: unset;
                padding: 0 3px;
                opacity: 0;
                text-align: left;

                &.center {

                    text-align: center;
                }
            }
        }

        input {
            position: relative;
            z-index: 3;
            height: 62px;
            width: 100%;
            outline: none;
            border: none;
            background-color: transparent;
            font-size: 16px;
            padding: 0 12px;
            border: 1px solid;
            border-color: rgba(30,30,30,.5);
            border-radius: 5px;
            transition: .5s ease;

            &[type="number"]{

                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
            }

            &:placeholder-shown::placeholder {
                color: transparent;
            }

            &:disabled {
                cursor: not-allowed;
            }

            &:not(:placeholder-shown),
            &:focus {
                border-color: rgba(30,30,30,0);
            }

            &:not(:placeholder-shown) ~ p,
            &:focus ~ p {
                opacity: 1;
                transform: scale(0.85) translate(-5%, 0%);
                left: 0;
                top: -12%;

                &.center {
                    left: 50%;
                    transform: scale(.85) translate(-62.5%, 0);
                }
            }

            &:not(:placeholder-shown) ~ fieldset,
            &:focus ~ fieldset {
                opacity: 1;
                border-color: rgba(30,30,30,1);
            }

            &:not(:placeholder-shown) ~ fieldset,
            &:focus ~ .option-group {

                .option-list-outer{
                    opacity: 1;
                    z-index: 30;
                }
            }

            &.outline {
                border: unset;
                border-bottom: 1px solid;
                border-color: rgba(30,30,30,.3);
                border-radius: unset;
                height: unset;
                padding: 20px 0 5px 0;

                & ~ .line {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    height: 1px;
                    background-color: rgb(30,30,30);
                    width: 0;
                    opacity: 0;
                    margin: auto;
                    transition: .5s ease;
                }
                
                & ~ p {
                    padding: 0;
                    top: 65%;

                    &::before{
                        content: '';
                        margin-right: unset;
                    }

                    &::after{
                        content: '';
                        margin-left: unset;
                    }
                }

                &:not(:placeholder-shown),
                &:focus{
                    
                    & ~ .line {
                        opacity: 1;
                        width: 100%;
                    }
                }

                &:not(:placeholder-shown) ~ p,
                &:focus ~ p{
                    opacity: 1;
                    transform: scale(0.85) translate(-8%, 0);
                    left: 0;
                    top: -22%;
                }
            }

            &.align-left {
                text-align: left;
            }

            &.align-center {
                text-align: center;
            }
        }

        p {
            position: absolute;
            left: 0;
            top: 50%;
            opacity: .7;
            transform: scale(1) translate(0, -50%);
            pointer-events: none;
            margin-bottom: 0;
            font-size: 13px;
            transition: .5s ease;
            z-index: 2;
            font-size: 16px;
            padding: 0 10px 0 6px;
            text-align: center;

            &.center {
                left: 50%;
                transform: scale(1) translate(-50%, -50%);
                padding: 0;
                width: 100%;
            }

            &.success {
                color: rgb(0, 255, 34);
            }

            &.invalid-error {
                color: rgb(255, 0, 0) !important;
            }

            &::before{
                content: '';
                margin-right: 4px;
            }

            &::after{
                content: '';
                margin-left: 4px;
            }
        }

        &.md {

            fieldset {
                height: 53px;
            }

            input {
                height: 47px;

                &:not(:placeholder-shown) ~ p {
                    opacity: 1;
                    transform: scale(0.85) translate(-5%, 0%);
                    left: 0;
                    top: -17%;
                }

                &:focus ~ p {
                    top: -17%;
                }
            }

            p {
                padding: 0 5px 0 7px;
            }

            .option-group {

                .option-list-outer {

                    margin-top: 5px;
                }
            }
        }


        &.sm {

            fieldset {
                height: 41px;
            }

            input {
                height: 35px;

                &:not(:placeholder-shown) ~ p {
                    opacity: 1;
                    transform: scale(0.85) translate(-5%, 0%);
                    left: 0;
                    top: -25%;
                }

                &:focus ~ p {
                    top: -25%;
                }
            }

            p {
                padding: 0 5px 0 7px;
            }

            .option-group {

                .option-list-outer {

                    margin-top: 5px;
                }
            }
        }

        .option-group {

            .option-list-outer {
                position: absolute;
                left: 0;
                right: 0;
                background-color: white;
                opacity: 0;
                z-index: -1;
                border-radius: 5px;
                overflow-y: auto;
                overflow-x: hidden;
                max-height: 120px;
                border: 1px solid rgba(30,30,30,.3);
                margin-top: 10px;
                transition-delay: .2s;

                .list-item{
                    text-align: center;
                    padding: 8px 0;
                    cursor: pointer;
                    user-select: none;
                    transition: .5s ease;
                    color: black;

                    &:hover{
                        color: white;
                        background-color: rgb(60,60,60);
                    }
                    
                    &.active{
                        color: white;
                        background-color: rgb(60,60,60);
                        box-shadow: inset 0 0 3px 0 rgba(255,255,255,.7);
                    }
                }

                &::-webkit-scrollbar {
                    background-color: rgba(255, 255, 255, 0.7);
                    width: 5px;
                }

                &::-webkit-scrollbar-thumb {
                    border-radius: 20px;
                    background-color: rgba(30, 30, 30, 0.7);
                }

                @media screen and (max-width:414px){
                    margin-top: 3px;
                }
            }
        }
    }
`