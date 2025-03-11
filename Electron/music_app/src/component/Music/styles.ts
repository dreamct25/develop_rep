import { styled } from '@linaria/react';

export default styled.div<{ themColorRgba: string }>`
    height: 100%;
    display: grid;
    grid-template-rows: 1fr;

    .layout {
        padding-top: 33px;
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 6px;
        margin: 6px;

        .left {
            background-color: ${props => props.themColorRgba};
            border-radius: 5px;
            box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);

            .collect-list {
                position: relative;
                height: 100%;

                .list-outer-frame {
                    position: absolute;
                    top: 0;
                    right: 0;
                    left: 0;
                    bottom: 0;
                    display: grid;
                    grid-template-rows: 0fr 1fr;

                    .current-path-outer {
                        margin: 6px 6px 0 6px;
                        overflow: hidden;
                        position: relative;
                        height: 42px;

                        .play-list-title {
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            text-align: center;
                            transition: .5s ease;
                            transform: translateX(0);

                            &.active {
                                transform: translateX(-100%);
                            }
                        }

                        .add-list-icon {
                            position: absolute;
                            top: 8px;
                            bottom: 8px;
                            right: 0;
                            padding: 0 5px;
                            margin-right: 8px;
                            border-radius: 5px;
                            box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            cursor: pointer;
                            user-select: none;
                        }

                        .find-song-btn {
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            text-align: center;
                            cursor: pointer;
                            user-select: none;
                            border-radius: 5px;
                            box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);
                            transition: .5s ease;
                            transform: translateX(100%);

                            &.active {
                                transform: translateX(0);
                            }
                        }
                    }

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

                            &::placeholder {
                                font-size: 16px;
                            }
                        }
                    }

                    .list-outer {
                        overflow-x: hidden;
                        overflow-y: auto;
                        margin: 6px 3px 6px 6px;
                        transition: .5s ease;

                        .no-filter-result {
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-weight: bold;
                        }

                        &:hover {

                            &::-webkit-scrollbar {
                                width: 12px;
                            }
                        }

                        &::-webkit-scrollbar {
                            width: 0;
                        }

                        &::-webkit-scrollbar-thumb {
                            border-radius: 20px;
                            background-color: rgba(255, 255, 255, 0.7);
                            border: 2px solid transparent;
                            background-clip: padding-box;
                        }

                        .list-item {
                            margin: 0 3px 6px 0;
                            padding: 11px 12px;
                            border-radius: 5px;
                            box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            cursor: pointer;
                            user-select: none;
                        
                            .title {
                                font-size: 20px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: inline-block;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
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
        }

        .right {
            display: grid;
            grid-template-rows: 0fr 1fr;

            .top {
                display: grid;
                grid-template-columns: 3fr 0fr;
                background-color: ${props => props.themColorRgba};
                border-radius: 5px;
                margin-bottom: 6px;
                padding: 8px;
                box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);
                align-items: center;

                .search-outer {
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
                    }
                }

                .right-outer {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 3px;

                    .setting-btn,
                    .open-qr-btn {
                        padding: 5px;
                        cursor: pointer;
                        user-select: none;

                        svg {
                            font-size: 20px;
                        }
                    }

                    .is-remote-connect {
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        padding: 5px;
                        opacity: .5;
                        transition: .5s ease;

                        &.active {
                            opacity: 1;

                            svg {
                                color: rgb(50,215,75);
                            }
                        }

                        svg {
                            transition: .5s ease;
                        }
                    }
                    
                }
            }

            .bottoms {
                position: relative;
                border-radius: 5px;
                overflow: hidden;
                background-color: ${props => props.themColorRgba};
                box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);

                .search-song-outer {
                
                    .list-outer {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        overflow-x: hidden;
                        overflow-y: auto;
                        margin: 8px;

                        &::-webkit-scrollbar {
                            width: 7px;
                        }

                        &::-webkit-scrollbar-thumb {
                            border-radius: 20px;
                            background-color: rgba(255, 255, 255, 0.7);
                        }

                        .is-searching,
                        .no-data {
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            display: flex;
                            justify-content: center;
                            flex-direction: column;
                            text-align: center;
                            font-size: 18px;
                            font-weight: bold;
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

                .collect-song-outer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    display: grid;
                    grid-template-rows: 0fr 1fr;

                    .list-top {
                        display: flex;
                        align-items: center;
                        margin: 8px 8px 0 8px;
                        padding-bottom: 14px;
                        position: relative;

                        &::after {
                            content: '';
                            position: absolute;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            height: 1px;
                            background-color: rgba(255, 255, 255, .3);
                        }

                        .icon {
                            box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);
                            border-radius: 5px;

                            svg {
                                font-size: 110pt;
                                filter: drop-shadow(0 0 2px rgba(30,30,30, .5));
                            }
                        }

                        .list-desc {
                            position: absolute;
                            right: 0;
                            left: 0;
                            margin-left: 166px;

                            .title {
                                font-size: 60px;
                                font-weight: bold;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                            }

                            .desc {
                                margin-top: 12px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                            }
                        }
                    }

                    .list-bottom {
                        overflow-x: hidden;
                        overflow-y: auto;
                        margin: 8px;

                        &::-webkit-scrollbar {
                            width: 7px;
                        }

                        &::-webkit-scrollbar-thumb {
                            border-radius: 20px;
                            background-color: rgba(255, 255, 255, 0.7);
                        }

                        .no-data {
                            position: absolute;
                            top: 34%;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            display: flex;
                            justify-content: center;
                            flex-direction: column;
                            text-align: center;
                            font-size: 18px;
                            font-weight: bold;

                            .no-song-btn {
                                box-shadow: inset 0 0 2px 0 rgba(255,255,255,.5);
                                border-radius: 5px;
                                margin: 0 auto;
                                padding: 12px;
                                cursor: pointer;
                                user-select: none;
                            }
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
                    }
                }
            }
        }
    }
`