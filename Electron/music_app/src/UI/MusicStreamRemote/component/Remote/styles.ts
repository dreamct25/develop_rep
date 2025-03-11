import { styled } from '@linaria/react';

export default styled.div`

    display: grid;
    grid-template-rows: 0fr 1fr 0fr;
    min-height: 100svh;
    background-color: rgb(50,50,50);
    color: white;

    .header{
        padding: 35px 0 10px 0;
        text-align: center;
        font-weight: bold;
        font-size: 30px;
    }

    .main{
        display: grid;
        grid-template-rows: 44px auto;
        padding: 12px;

        .top {
            display: grid;
            grid-template-columns: 1fr 1fr;
            box-shadow: inset 0 0 2px 0 rgba(255,255,255,.7);
            border-radius: 5px;
            overflow: hidden;

            .search-action {
                cursor: pointer;
                padding: 12px 0;
                font-size: 20px;
                text-align: center;
                transition: .5s ease;

                &.active {
                    color: rgba(30,30,30,1);
                    background-color: rgba(255,255,255,1);
                }
            }

            .playlist-action {
                position: relative;
                cursor: pointer;
                padding: 12px 0;
                font-size: 20px;
                text-align: center;
                transition: .5s ease;

                &.active {
                    color: rgba(30,30,30,1);
                    background-color: rgba(255,255,255,1);
                }

                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    width: .5px;
                    background-color: rgba(255,255,255,.7);
                }
            }
        }

        .bottom {
            position: relative;

            .template-search {
                position: relative;
                height: 100%;
                transition: .5s ease;

                &.when-playing {
                    height: 95%;
                }

                .search-outer {
                    display: grid;
                    grid-template-columns: 0fr 1fr;
                    gap: 3px;
                    align-items: center;
                    padding: 0 6px;
                    box-shadow: inset 0 0 2px 0 rgba(255,255,255,.7);
                    border-radius: 5px;
                    margin-top: 12px;

                    svg {
                        font-size: 25px;
                    }

                    input {
                        font-size: 20px;
                        padding: 8px 6px;
                        background-color: unset;
                        border: none;
                        outline: none;
                        color: white;

                        &:placeholder-shown {
                          transform: translateY(1px);
                        }
                    }
                }

                .list-outer {
                    position: absolute;
                    top: 36px;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    overflow-x: hidden;
                    overflow-y: auto;
                    margin: 14px 0 8px 0;

                    &::-webkit-scrollbar {
                        width: 7px;
                    }

                    &::-webkit-scrollbar-thumb {
                        border-radius: 20px;
                        background-color: rgba(255, 255, 255, 0.7);
                    }

                    .is-searching,
                    .no-data {
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        text-align: center;
                        font-size: 18px;
                        font-weight: bold;
                        height: 100%;
                    }
                    
                    .list-row {
                        display: grid;
                        grid-template-columns: 0fr 1fr 0fr;
                        padding: 6px 6px 5px 6px;
                        transition: .5s ease;
                        border-radius: 5px;
                        margin: 0 6px 3px 0;
                        box-sizing: border-box;
                        cursor: pointer;
                        user-select: none;

                        &.active {
                            background-color: rgba(100,100,100,.5);
                            grid-template-columns: 0fr 1fr 75px 0fr;
                        }

                        &:last-child {
                            margin-bottom: 0;
                        }

                        &:hover {
                            background-color: rgba(100,100,100,.5);
                        }

                        .img-outer {
                            width: 60px;
                            height: 60px;
                            border-radius: 5px;
                            background-repeat: no-repeat;
                            background-position: center center;
                            background-size: cover;
                            pointer-events: none;
                        }

                        .info {
                            display: grid;
                            grid-template-rows: 1fr 1fr;
                            gap: 9px;
                            padding: 8px 12px 2px 12px;
                            pointer-events: none;

                            div {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;

                                &:first-child {
                                    font-size: 20px;
                                }

                                &:last-child {
                                    font-size: 12px;
                                }
                            }
                        }

                        .music-progress-outer{
                            position: relative;
                            height: 100%;
                            pointer-events: none;

                            .music-progress{
                                position: absolute;
                                left: 50%;
                                bottom: -20%;
                                transform:translate(-50%,-30px) rotate(0.5turn);
                                display:flex;
                                justify-content: center;

                                span{
                                    margin:0 2px;
                                    width: 3px;
                                    height: 20px;
                                    background-color: white;
                                    border-radius: 0 0 3px 3px;
                                    transition: .7s ease;

                                    &.stop{
                                        height: 2px;
                                    }

                                    &.active-1{
                                        animation: lineAnimate 1.1s ease-in-out infinite;
                                    }

                                    &.active-2{
                                        animation: lineAnimate 1.3s ease-in-out infinite;
                                    }

                                    &.active-3{
                                        animation: lineAnimate 1.5s ease-in-out infinite;
                                    }

                                    &.active-4{
                                        animation: lineAnimate 1.3s ease-in-out infinite;
                                    }

                                    &.active-5{
                                        animation: lineAnimate 1.2s ease-in-out infinite;
                                    }

                                    @keyframes lineAnimate {
                                        0%{
                                            height: 0px;
                                        }

                                        50%{
                                            height: 20px;
                                        }

                                        100%{
                                            height: 0px;
                                        }
                                    }
                                }
                            }
                        }

                        .is-in-collect {
                            align-self: center;
                            padding: 0 6px;
                            font-size: 18px;
                            color: rgb(255,255,0);
                        }
                    }
                }
            }

            .template-playlist {
                position: relative;
                height: 100%;
                transition: .5s ease;

                &.when-playing {
                    height: 95%;
                }

                .list-outer-frame {

                    .search-collect-outer {
                        overflow: hidden;
                        border-radius: 5px;
                        box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);
                        height: 40px;
                        margin: 6px 6px 0 6px;
                        display: grid;
                        grid-template-columns: 0fr 1fr;
                        gap: 3px;
                        align-items: center;
                        padding: 0 6px;

                        svg {
                            font-size: 25px;
                        }

                        input {
                            font-size: 20px;
                            padding: 6px;
                            background-color: unset;
                            border: none;
                            outline: none;
                            color: white;
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .list-outer {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        overflow-x: hidden;
                        overflow-y: auto;
                        margin: 8px 0;
                        height: 100%;

                        &::-webkit-scrollbar {
                            width: 12px;
                        }

                        &::-webkit-scrollbar-thumb {
                            border-radius: 20px;
                            background-color: rgba(255, 255, 255, 0.7);
                            border: 2px solid transparent;
                            background-clip: padding-box;
                        }

                        .list-item {
                            margin: 0 3px 6px 0;
                            padding: 16px 12px;
                            border-radius: 5px;
                            box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            cursor: pointer;
                            user-select: none;
                            
                            .title {
                                font-size: 20px;
                            }

                            &:last-child {
                                margin-bottom: 0;
                            }
                        }
                    }
                }
                
                .create-list-btn-outer {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100%;

                    .create-list-btn {
                        padding: 6px 12px;
                        border-radius: 5px;
                        box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);
                        cursor: pointer;
                        user-select: none;
                    }
                }
            }

            .template-playlist-song {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: grid;
                grid-template-rows: 1fr 0fr;
                height: 100%;
                transition: .5s ease;

                &.when-playing {
                    height: 95%;
                }

                .list-outer {
                    overflow-x: hidden;
                    overflow-y: auto;
                    margin: 8px 0;

                    &::-webkit-scrollbar {
                        width: 7px;
                    }

                    &::-webkit-scrollbar-thumb {
                        border-radius: 20px;
                        background-color: rgba(255, 255, 255, 0.7);
                    }

                    .is-searching,
                    .no-data {
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        text-align: center;
                        font-size: 18px;
                        font-weight: bold;
                        height: 100%;
                    }
                    
                    .list-row {
                        display: grid;
                        grid-template-columns: 0fr 1fr 0fr;
                        padding: 6px 6px 5px 6px;
                        transition: .5s ease;
                        border-radius: 5px;
                        margin: 0 6px 3px 0;
                        box-sizing: border-box;
                        cursor: pointer;
                        user-select: none;

                        &.active {
                            background-color: rgba(100,100,100,.5);
                            grid-template-columns: 0fr 1fr 75px 0fr;
                        }

                        &:last-child {
                            margin-bottom: 0;
                        }

                        &:hover {
                            background-color: rgba(100,100,100,.5);
                        }

                        .img-outer {
                            width: 60px;
                            height: 60px;
                            border-radius: 5px;
                            background-repeat: no-repeat;
                            background-position: center center;
                            background-size: cover;
                            pointer-events: none;
                        }

                        .info {
                            display: grid;
                            grid-template-rows: 1fr 1fr;
                            gap: 9px;
                            padding: 8px 12px 2px 12px;
                            pointer-events: none;

                            div {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;

                                &:first-child {
                                    font-size: 20px;
                                }

                                &:last-child {
                                    font-size: 12px;
                                }
                            }
                        }

                        .music-progress-outer{
                            position: relative;
                            height: 100%;
                            pointer-events: none;

                            .music-progress{
                                position: absolute;
                                left: 50%;
                                bottom: -20%;
                                transform:translate(-50%,-30px) rotate(0.5turn);
                                display:flex;
                                justify-content: center;

                                span{
                                    margin:0 2px;
                                    width: 3px;
                                    height: 20px;
                                    background-color: white;
                                    border-radius: 0 0 3px 3px;
                                    transition: .7s ease;

                                    &.stop{
                                        height: 2px;
                                    }

                                    &.active-1{
                                        animation: lineAnimate 1.1s ease-in-out infinite;
                                    }

                                    &.active-2{
                                        animation: lineAnimate 1.3s ease-in-out infinite;
                                    }

                                    &.active-3{
                                        animation: lineAnimate 1.5s ease-in-out infinite;
                                    }

                                    &.active-4{
                                        animation: lineAnimate 1.3s ease-in-out infinite;
                                    }

                                    &.active-5{
                                        animation: lineAnimate 1.2s ease-in-out infinite;
                                    }

                                    @keyframes lineAnimate {
                                        0%{
                                            height: 0px;
                                        }

                                        50%{
                                            height: 20px;
                                        }

                                        100%{
                                            height: 0px;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    .no-songs {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center
                    }
                }

                .back {
                    box-shadow: inset 0 0 2px 0 rgba(255,255,255,.7);
                    border-radius: 5px;
                    text-align: center;
                    padding: 12px 0;
                    cursor: pointer;
                    user-select: none;
                }
            }
        }

        .player-control-outer {
            position: fixed;
            top: 87%;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(30,30,30,.5);
            backdrop-filter: blur(10px);
            border-radius: 5px;
            box-shadow: inset 0 0 2px 0 rgba(255,255,255,.5);
            margin: 0 8px 8px 8px;
            transform: translateY(90px);
            transition: .5s ease;
            z-index: -1;

            &.toggle {
                transform: translateY(0);
                z-index: 5;
            }

            &.full-mode {
                top: 12%;
                margin: 0;
                border-radius: 20px 20px 0 0;

                & ~ .player-control-action-frame {
                    z-index: 4;
                    opacity: 1;
                }

                .full {
                    z-index: 5;
                    transform: scale(1);
                    opacity: 1;
                }

                .min {
                    z-index: -1;
                    transform: scale(.8);
                    opacity: 0;
                }
            }

            .full {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: -1;
                display: grid;
                grid-template-rows: 1fr 0fr;
                gap: 12px;
                margin: 24px;
                opacity: 0;
                transform: scale(.8);
                transition: .5s ease;
                
                .song-top {

                    .them-img {
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center center;
                        margin-bottom: 18px;
                        height: 88%;
                        border-radius: 5px;
                    }

                    .song-info {

                        div {

                            &:first-child {
                                font-size: 20px;
                                font-weight: bold;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                            }

                            &:last-child {
                                margin-top: 6px;
                                font-size: 14px;
                                font-weight: bold;
                            }
                        }
                    }
                }

                .song-bottom {

                    .controls {
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;
                        padding: 22px 0 12px 0;

                        .prev-song-btn {
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;
                            cursor: pointer;
                            user-select: none;
                            opacity: 1;
                            transition: .5s ease;

                            &.disabled {
                                cursor: not-allowed;
                                opacity: .5;
                            }
                            
                            svg {
                                font-size: 35px;
                            }
                        }

                        .next-song-btn {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            cursor: pointer;
                            user-select: none;
                            opacity: 1;
                            transition: .5s ease;

                            &.disabled {
                                cursor: not-allowed;
                                opacity: .5;
                            }

                            svg {
                                font-size: 35px;
                            }
                        }

                        .play-btn {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            
                            svg {
                                font-size: 75px;
                            }
                        }
                    }

                    .voice-control-outer {
                        display: flex;
                        margin-bottom: 16px;
                    }

                    .song-functions {
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;

                        .icon {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                            user-select: none;
                            opacity: .5;
                            transition: .5s ease;

                            &.active {
                               opacity: 1;
                            }

                            &.disabled {
                                cursor: not-allowed;
                                user-select: none;
                                opacity: .5;
                            }
                        }

                    }
                }
            }

            .min {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 5;
                display: grid;
                grid-template-columns: 0fr 1fr;
                padding: 0 67px 0 8px;
                gap: 12px;
                align-items: center;
                transform: scale(1);
                opacity: 1;
                transition: .5s ease;

                .them-img {
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center center;
                    width: 60px;
                    height: 60px;
                    border-radius: 5px;
                }

                .song-info {

                    div {

                        &:first-child {
                            font-size: 20px;
                            font-weight: bold;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                        }

                        &:last-child {
                            margin-top: 6px;
                            font-size: 14px;
                            font-weight: bold;
                        }
                    }
                }
            }

            .action-angle {
                position: absolute;
                top: 28px;
                right: 0;
                margin-right: 20px;
                z-index: 7;
                cursor: pointer;
                user-select: none;
                transform: rotate(0);
                transition: .5s ease;

                &.toggle {
                    top: 20px;
                    transform: rotate(-.5turn);
                }

                svg {
                    font-size: 27px;
                    filter: drop-shadow(0 0 2px rgba(30,30,30, .5));
                }
            }
        }

        .player-control-action-frame {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(30,30,30,.5);
            backdrop-filter: blur(10px);
            border-radius: 5px;
            transition: .5s ease;
            opacity: 0;
            z-index: -1;
        }
    }
    
    .footer {
        
        h6 {
            padding: 6px 0 12px 0;
            text-align: center;
        }
    }

    .change-language-list{
        position: absolute;
        right: 0;
        z-index: 0;
        margin:5px 5px 0 0;
        color: black;
        cursor: pointer;
        user-select: none;
        z-index: 1;
        overflow: hidden;
        transition: .5s ease;

        .change-language-switch{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px 6px;
            box-shadow: inset 0 0 2px 0 rgba(255,255,255,.5);
            position: relative;
            border-radius: 5px;
            z-index: 2;
            color: white;

            svg {
                color: white;
            }
        }

        .language-list-item-outer{
            max-height: 0;
            transition: .5s ease;
            backdrop-filter: blur(10px);
            box-shadow: inset 0 0 2px 0 rgba(255,255,255,.5);
            border-radius: 5px;
            margin-top: 4px;
            overflow: hidden;

            .language-list-item{
                padding: 8px 9px;
                transition:.7s ease;
                font-size: 14px;
                color: white;

                &.active{
                    color:white;
                    background-color: black;
                }

                &:hover{
                    background-color: black;
                }
            }

            &.toggle{
                max-height: 100vh;
            }
        }
    }
`