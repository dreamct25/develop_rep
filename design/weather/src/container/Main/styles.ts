import { styled } from '@linaria/react'

export default styled.div`
    min-height: 100vh;
    box-shadow: inset 0 0 2000px 2000px rgba(0, 0, 0, 0.3);

    .header {
        color: white;
        display: flex;
        position: sticky;
        z-index: 2;
        top: 0;
        left: 0;
        right: 0;
        font-style: italic;
        text-shadow:  ${({ isMoon }) => isMoon ? '0 1px 4px rgba(0, 0, 0, 0.7)' : '0 1px 4px rgba(255, 255, 255, 0.7)'};
        transition: .7s ease;
        padding: 15px 0;

        @media screen and (max-width:414px) {
           justify-content: center;
        }

        &.header-toggle {
            top: -100%;
        }
    }
    
    .main {
        display: flex;
        justify-content: center;
        flex-direction: column;
        min-height: 80vh;

        .weather-board{
            box-shadow: 0 0 60px 0 rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            backdrop-filter: blur(3px);

            .top{
                color: white;
                
                .in-box{

                    .left{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding-top: 22px;

                        @media screen and (max-width: 414px){
                            border-right: 2px solid rgba(255, 255, 255, 0.5);
                            padding-top: unset;
                            padding: 22px 0 12px 0;
                        }

                        .icon{
                            span{
                                display: block;
                                text-align: center;

                                &:nth-of-type(1){
                                    i{
                                        font-size: 125px;
                                    }
                                }

                                &:nth-of-type(2){
                                    font-size: 20px;
                                    margin-top: 13px;
                                }
                            }
                        }
                    }

                    .middle{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 4px 0 10px 0;
                        margin-top: 20px;

                        div{
                            &:nth-of-type(1){
                                font-size: 65px;
                                font-weight: bold;
                            }

                            &:nth-of-type(2){
                                font-size: 25px;
                                margin: 6px 0 10px 0;
                            }

                            &:nth-of-type(3){
                                font-size: 25px;
                            }
                        }

                        @media screen and (min-width: 576px){
                            position: relative;
                            border-left: 2px solid rgba(255, 255, 255, 0.5);
                            border-right: 2px solid rgba(255, 255, 255, 0.5);

                            &:after{
                                content: '';
                                position: absolute;
                                bottom: -13px;
                                right: 0;
                                width: 10px;
                                height: 10px;
                                background-color: rgb(255, 255, 255);
                                border-radius: 2px;
                                transform: rotate(45deg) translateX(82%);
                            }

                            &:before{
                                content: '';
                                position: absolute;
                                bottom: -25px;
                                left: 0;
                                width: 10px;
                                height: 10px;
                                background-color: rgb(255, 255, 255);
                                border-radius: 2px;
                                transform: rotate(45deg) translateX(-92%);
                            }
                        }

                        @media screen and (max-width:414px){
                            padding: 4px 0 15px 0;
                        }
                    }

                    .right-group{
                        display: grid;
                        overflow: hidden;
                        grid-template-columns: 100% 100%;
                        overflow: hidden;
                        height: 162px;
                        margin-top: 18px;

                        @media screen and (max-width:414px){
                            height: 195px;
                            margin-top: unset;
                        }

                        .left-list-outer{
                            position: relative;
                            width: 100%;
                            height: 100%;
                            margin-left: -5px;
                            overflow: hidden;

                            .left-list{
                                position: absolute;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                overflow-y: auto;
                                transform: translateX(0);
                                transition: .5s ease;

                                &::-webkit-scrollbar {
                                    width: 5px;
                                }

                                &::-webkit-scrollbar-thumb {
                                    border-radius: 20px;
                                    background-color: rgba(255, 255, 255, 0.7);
                                }

                                transform: translateX(0);
                                
                                div{
                                    font-size: 22px;
                                    font-weight: bold;
                                    position: relative;
                                    border-radius: 5px;
                                    overflow: hidden;
                                    line-height: 1.5;
                                    cursor: pointer;
                                    user-select: none;
                                    margin: 13px 13px 13px 18px;
                                    text-align: center;
                                    transition: .5s ease;

                                    &:first-child{
                                        margin: 0 13px 13px 18px;
                                    }

                                    &:last-child{
                                        margin: 13px 13px 0 18px;
                                    }

                                    &::after{
                                        content: '';
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        right: 0;
                                        bottom: 0;
                                        width: 0;
                                        background-color: rgba(255, 255, 255, 0.7);
                                        z-index: -1;
                                        transition: .5s ease;
                                    }

                                    &:hover{
                                        color: rgba(0, 0, 0, 0.7);
                                        
                                        &::after{
                                            width: 100%;
                                        }
                                    }
                                }

                                &.hide-list{
                                    transform: translateX(-100%);
                                }
                            }
                        }

                        .city-list-outer{
                            display: flex;
                            position: relative;
                            width: 100%;
                            height: 100%;
                            transform: translateX(0);
                            transition: .5s ease;

                            .back-list-btn{
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                padding: 0 10px;
                                cursor: pointer;
                                user-select: none;

                                i{
                                    pointer-events: none;
                                }
                            }

                            .city-list{
                                position: absolute;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                overflow-y: auto;
                                margin: 0 5px 0 32px;

                                &::-webkit-scrollbar {
                                    width: 5px;
                                }

                                &::-webkit-scrollbar-thumb {
                                    border-radius: 20px;
                                    background-color: rgba(255, 255, 255, 0.7);
                                }

                                div{
                                    font-size: 22px;
                                    font-weight: bold;
                                    position: relative;
                                    border-radius: 5px;
                                    overflow: hidden;
                                    line-height: 1.5;
                                    cursor: pointer;
                                    user-select: none;
                                    margin: 13px 13px 13px 0;
                                    text-align: center;
                                    transition: .5s ease;

                                    &::after{
                                        content: '';
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        right: 0;
                                        bottom: 0;
                                        width: 0;
                                        background-color: rgba(255, 255, 255, 0.7);
                                        z-index: -1;
                                        transition: .5s ease;
                                    }

                                    &:hover,
                                    &.active{
                                        color: rgba(0, 0, 0, 0.7);
                                        
                                        &::after{
                                            width: 100%;
                                        }
                                    }
                                }
                            }

                            &.show-list{
                                transform: translateX(-100%);
                            }
                        }
                    }
                }
            }
            
            .bottom{
                color: white;
                padding-bottom: 10px;

                .others-layout{
                    border-top: 2px solid rgba(255, 255, 255, 0.5);
                    padding: 18px 12px 0 12px;
                    margin: 12px 20px 0 20px;

                    @media screen and (max-width:414px){
                        margin: 12px 10px 0 10px;
                        padding: 4px 12px 0 12px;
                    }

                    .left{
                        line-height: 36px;
                        font-size: 18px;
                    }

                    .right{
                        .weather-desc-title{
                            font-size: 18px;
                            margin-bottom: 10px;

                            @media screen and (max-width:414px){
                                margin-bottom: unset;
                                margin: 10px 0;
                            }
                        }
                        .desc{
                            display: flex;
                            align-items: center;
                            line-height: 30px;
                            text-align: justify;

                            i{
                                margin-right: 15px;
                                font-size: 50px;
                            }
                        }
                    }

                    
                }

                .single-town-info-layout{
                    border-top: 2px solid rgba(255, 255, 255, 0.5);
                    margin: 12px 6px 9px 20px;

                    @media screen and (max-width:414px){
                        margin: 12px 10px 0 10px;
                    }

                    .title{
                        display: flex;
                        justify-content: space-between;
                        margin: 10px 0;
                        padding: 0 6px;

                        span{
                            &:nth-of-type(1){
                                font-size: 45px;
                                font-weight: bold;
                            }

                            &:nth-of-type(2){
                                align-self: flex-end;
                                font-size: 18px;
                            }
                        }
                    }

                    .data-list{
                        overflow-x: hidden;
                        overflow-y: auto;
                        max-height: 500px;

                        &::-webkit-scrollbar {
                            width: 5px;
                        }

                        &::-webkit-scrollbar-thumb {
                            border-radius: 20px;
                            background-color: rgba(255, 255, 255, 0.7);
                        }

                        .date-outer{
                            display: flex;
                            justify-content: flex-end;
                            position: sticky;
                            top: 0;
                            z-index: 2;
                            
                            .date{
                                width: 110px;
                                text-align: center;
                                padding: 8px 0;
                                margin: 5px 6px 0 0;
                                border-radius: 5px;
                                background-color: rgba(30,30,30);
                                box-shadow: inset 0 0 16px 0px rgba(255,255,255,.3);
                            }
                        }

                        .data-row-outer{
                            display: flex;
                            flex-direction: column;
                            gap: 15px;
                            margin: 10px 6px 0 0;

                            &:nth-of-type(2){
                                margin: 10px 6px 10px 0;
                            }

                            .data-row{
                                display: grid;
                                grid-template-columns: 20% 20% 20% 20% 20%;
                                align-items: center;
                                font-size: 18px;
                                background-color: rgba(30,30,30,.1);
                                border-radius: 5px;
                                padding: 12px 0;
                                box-shadow: inset 0 0 16px 0px rgba(255,255,255,.3);

                                @media screen and (min-width:415px){
                                    div{
                                        text-align: center;

                                        &:nth-of-type(2){
                                            display: flex;
                                            flex-direction: column;

                                            i{
                                                font-size: 45px;
                                                margin-bottom: 12px;
                                            }
                                        }
                                    }
                                }

                                @media screen and (max-width:768px){
                                    grid-template-columns: 30% 20% 20% 10% 20%;
                                }

                                @media screen and (max-width:414px){
                                    display: block;
                                    grid-template-columns: unset;

                                    .time{
                                        text-align: center;
                                        margin: 5px 0;
                                    }
                                }

                                .bottom{
                                    display: grid;
                                    grid-template-columns: 25% 25% 25% 25%;
                                    align-items: center;
                                    padding-bottom: 0;

                                    div{
                                        text-align: center;

                                        &:nth-of-type(1){
                                            display: flex;
                                            flex-direction: column;

                                            i{
                                                font-size: 45px;
                                                margin-bottom: 12px;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .week-info-layout{
                    border-top: 2px solid rgba(255, 255, 255, 0.5);
                    margin: 12px 20px 0 20px;
                    padding: 20px 0 7px 0;

                    @media screen and (max-width:414px){
                        margin: 12px 10px 0 10px;
                        padding: 12px 0 0 0;
                    }
                    
                    .board{
                        overflow: hidden;
                        border-radius: 5px;
                        box-shadow: inset 0 0 16px 0px rgba(255,255,255,.3);

                        @media screen and (min-width:768px){
                            .board-header{
                                display: grid;
                                grid-template-columns: 6.2% 13.4% 13.4% 13.4% 13.4% 13.4% 13.4% 13.4%;
                                
                                div{
                                    text-align: center;
                                    padding: 20px ;
                                    box-shadow: inset 0 0 1.5px .5px rgba(255,255,255,.3);
                                }
                            }

                            .board-body{
                                display: grid;
                                grid-template-columns: 6.2% 13.4% 13.4% 13.4% 13.4% 13.4% 13.4% 13.4%;

                                div{
                                    padding: 20px 12px 25px 12px;
                                    box-shadow: inset 0 0 1.5px .5px rgba(255,255,255,.3);

                                    span{
                                        text-align: center;
                                        display: block;
                                        margin-bottom: 10px;

                                        &:nth-of-type(1){
                                            display: flex;
                                            flex-direction: column;

                                            i{
                                                font-size: 50px;
                                                margin-bottom: 12px;
                                            }
                                        }

                                        &:nth-of-type(3){
                                            margin-bottom: unset;
                                        }
                                    }

                                    &.box-i{
                                        background-color: rgba(30,30,30,.5)
                                    }

                                    &.box-ii{
                                        background-color: rgba(30,30,30,.2)
                                    }

                                    &:nth-of-type(1),
                                    &:nth-of-type(9){
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: center;
                                        align-items: center;
                                    }
                                }
                            }
                        }

                        @media screen and (max-width:768px){
                            .board-header{
                                display: grid;
                                grid-template-columns: 20% 40% 40%;
                                
                                div{
                                    text-align: center;
                                    padding: 20px ;
                                    box-shadow: inset 0 0 1.5px .5px rgba(255,255,255,.3);
                                }
                            }
                            
                            .board-body{
                                display: grid;
                                grid-template-columns: 20% 40% 40%;

                                .child-group{

                                    div{
                                        padding: 20px 12px 25px 12px;
                                        box-shadow: inset 0 0 1.5px .5px rgba(255,255,255,.3);
                                    }

                                    &:nth-of-type(1){
                                        div{
                                            text-align: center;
                                            display: flex;
                                            flex-direction: column;
                                            justify-content: center;
                                            height: 182.17px;
                                        }
                                    }
                                    
                                    &:nth-of-type(2),
                                    &:nth-of-type(3){
                                        div{
                                            span{
                                                text-align: center;
                                                display: block;
                                                margin-bottom: 10px;

                                                &:nth-of-type(1){
                                                    display: flex;
                                                    flex-direction: column;

                                                    i{
                                                        font-size: 50px;
                                                        margin-bottom: 12px;
                                                    }
                                                }

                                                &:nth-of-type(3){
                                                    margin-bottom: unset;
                                                }
                                            }

                                            &.box-i{
                                                background-color: rgba(30,30,30,.5)
                                            }

                                            &.box-ii{
                                                background-color: rgba(30,30,30,.2)
                                            }

                                            &:nth-of-type(1),
                                            &:nth-of-type(9){
                                                display: flex;
                                                flex-direction: column;
                                                justify-content: center;
                                                align-items: center;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .footer {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 20px;
        font-style: italic;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
        padding: 20px 0 20px 0;
        i {
            margin: 0 5px 0 5px;
        }
    }

    .go-top {
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 5;
        padding: 8px 10px;
        border-radius: 50%;
        opacity: 0;
        transform: translate(-10px, -10px) rotate(-180deg);
        backdrop-filter: blur(10px);
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
        transition: .7s ease;

        i {
            pointer-events: none;
            color: white;
        }

        &.go-top-toggle {
            opacity: 1;
            transform: translate(-10px, -10px) rotate(0deg);
        }
    }

    .mode {
        position: fixed;
        top: 20px;
        right: 0;
        z-index: 3;
        padding: 8px 10px;
        border-radius: 50%;
        transform: translate(-11px, -11px);
        backdrop-filter: blur(10px);
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
        cursor: pointer;
        user-select: none;
        transition: .7s ease;

        i {
            pointer-events: none;
            color: white;
        }

        &.mode-toggle {
            i {
                color: rgb(255,255,0);
            }
        }
    }

    .loading-outer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: -1;
        opacity: 0;
        backdrop-filter: blur(10px);
        transition: .7s ease;

        /* @media screen and (max-width:414px) {
            top: 40%;
        } */

        .loading-text {
            font-size: 20px;
            color: rgba(255, 255, 255, 0.6);
        }

        .circle-I {
            position: absolute;
            width: 180px;
            height: 180px;
            transform: rotate(-45deg);
            border: 5px solid transparent;
            border-top: 5px solid rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            animation: circleI 1.5s linear infinite;

            @keyframes circleI {
                0% {
                    transform: rotate(-45deg);
                }
                100% {
                    transform: rotate(315deg);
                }
            }
        }

        .circle-II {
            position: absolute;
            width: 180px;
            height: 180px;
            transform: rotate(-45deg);
            border: 5px solid transparent;
            border-bottom: 5px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: circleII 1.5s linear infinite;

            @keyframes circleII {
                0% {
                    transform: rotate(-45deg);
                }
                100% {
                    transform: rotate(-405deg);
                }
            }
        }

        &.loading-outer-toggle {
            z-index: 10;
            opacity: 1;
        }
    }

    &:after{
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        transition: .5s ease;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        background-image: ${({ isMoon }) => isMoon ? 'url("https://unsplash.com/photos/Maf7wdHCmvo/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjY5MjEwMDA1&force=true")' : 'url("https://unsplash.com/photos/FBLGvhgVYQM/download?force=true&w=1920")'};
    }
`