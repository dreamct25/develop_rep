import { styled } from '@linaria/react'

export default styled.div<{ isDesktop: boolean }>`

    padding: 30px 0 3px 0;

    @media screen and (max-width: 414px) {
        padding: 12px 0 3px 0;
    }

    .info-outer {
        margin-bottom: 12px;
        border-radius: 5px;
        padding: 14px 12px;
        opacity: 1;
        transition: .5s ease;

        &.toggle {
            opacity: 0;

            .year {
                font-size: 25px;
            }
        }

        .year {
            color: white;
            font-size: 45px;
            text-align: center;
            transition: .5s ease;
        }
    }

    .info-outer-fixed {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 1;
        pointer-events: none;
        border-radius: 0 0 5px 5px;
        background-color: rgba(153,153,255,.5);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        padding: 8px 12px 9px 12px;
        margin: 5px;
        border-radius: 5px;
        box-shadow: inset 0 0 3px 1px rgba(255,255,255,.7);
        transition: .5s ease;
        opacity: 0;

        .year {
            color: white;
            font-size: 45px;
            text-align: center;
            transition: .5s ease;
        }

        &.toggle {
            opacity: 1;
            
            pointer-events: all;

            .year {
                font-size: 25px;
            }
        }
    }

    .calendar {
        display: grid;
        grid-template-columns: repeat(4,1fr);
        gap: 12px;
        
        @media screen and (max-width: 1520px) {
            grid-template-columns: repeat(3,1fr);
        }

        @media screen and (max-width: 1150px) {
            grid-template-columns: repeat(2,1fr);
        }

        @media screen and (max-width: 775px) {
            grid-template-columns: repeat(1,1fr);
        }

        .month-outer {

            .month {
                border: 1px solid #ccc;
                background-color: #fff;
                border-radius: 5px;
                overflow: hidden;

                .title {
                    background-color: rgb(153,153,255);
                    color: #fff;
                    margin: 0;
                    padding: 12px 0;
                    text-align: center;
                    font-size: 25px;
                    font-weight: bold;
                    font-style: italic;
                }

                .weekdays,
                .days {
                    display: grid;
                    grid-template-columns: repeat(7,1fr);
                    gap: 6px;
                    padding: 6px;

                    .weekday, .day {
                        text-align: center;
                        padding: 12px 5.5px 11px 5.5px;
                    }
                }

                .weekdays {
                    font-weight: bold;
                    border-bottom: 1px solid #ccc;
                    padding: 0 6px;
                    font-style: italic;
                }

                .day {
                    border: 1px solid #eee;
                    border-radius: 5px;
                    transition: .5s ease;
                    position: relative;
                    
                    &.in-pwa {
                        cursor: pointer;
                        user-select: none;

                        &.other-month {
                            cursor: default;
                        }
                    }

                    &.other-month {
                        color: #ccc;
                    }

                    &.holiday {
                        background-color: rgb(119,68,255);
                        color: white;
                        cursor: pointer;
                        user-select: none;
                    }

                    &.normal-holiday {
                        background-color: rgb(204,187,255);
                        color: white;
                    }

                    &.highlight {
                        background-color: rgb(255,62,255);
                        box-shadow: inset 0 0 4px 2px rgba(255,255,255,.7);
                    }

                    &:not(.holiday).highlight {
                        color: white;
                    }

                    .is-have-event-circle {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 5px;
                        height: 5px;
                        border-radius: 50%;
                        background-color: rgb(255,62,255);
                        margin: 3px;
                        pointer-events: none;
                        transition: background-color .5s ease;
                    }

                    &:is(.highlight) {

                        .is-have-event-circle {
                            background-color: white;
                        }
                    }
                }
            }

            .holiday-desc-outer {

                overflow: hidden;
                width: 360px;

                .row-outer {
                    overflow-x: auto;
                    overflow-y: hidden;
                    display: grid;
                    gap: 12px;
                    scroll-snap-type: ${props => !props.isDesktop ? 'x mandatory' : 'unset'};

                    &::-webkit-scrollbar {
                        height: 0;
                    }

                    .row {
                        display: flex;
                        justify-content: center;
                        background-color:  rgb(119,68,255);
                        padding: 15px 12px;
                        text-align: center;
                        color: white;
                        font-weight: bold;
                        font-size: 18px;
                        border-radius: 5px;
                        margin: 6px 0;
                        
                        pointer-events: none;

                        &.with-snap {
                            scroll-snap-align: center;
                        }

                        div {

                            &:last-child {
                                margin-left: 8px;

                                &.move {
                                    position: relative;
                                    overflow: hidden;

                                    &::before {
                                        content: '';
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        bottom: 0;
                                        width: 6px;
                                        background: linear-gradient(to right, rgb(119,68,255), transparent);
                                        z-index: 1;
                                    }

                                    &::after {
                                        content: '';
                                        position: absolute;
                                        top: 0;
                                        right: 0;
                                        bottom: 0;
                                        width: 6px;
                                        background: linear-gradient(to left, rgb(119,68,255), transparent);
                                        z-index: 1;
                                    }
                                    
                                    span {
                                        display: inline-block;
                                        white-space: nowrap;
                                        
                                            
                                        animation: textSlide 10s linear infinite;

                                        @keyframes textSlide {
                                            0% {
                                                transform: translateX(var(--padding-space));
                                            }
                                            50% {
                                                transform: translateX(calc(var(--move) - 100%));
                                            }
                                            100% {
                                                transform: translateX(var(--padding-space));
                                            }
                                        }
                                    }
                                }
                            }
                        }                       
                    }

                    .no-holiday {
                        background-color: rgb(153,153,255);
                        padding: 15px 12px;
                        text-align: center;
                        color: white;
                        font-weight: bold;
                        font-size: 18px;
                        border-radius: 5px;
                        margin: 6px 0;
                    }
                }
            }
        }
    }

    .footer {

        h6 {
            text-align: center;
            color: white;
            padding: 12px 0 18px 0;
        }
    }

    .back-fill {
        position: fixed;
        top: 0;
        bottom: 0;
        pointer-events: none;

        .icon {
            position: absolute;
            top: 50%;
            cursor: pointer;
            user-select: none;
            font-size: 35px;
            text-shadow: 0;
            pointer-events: all;
            background-color: rgb(153,153,255);
            height: 100px;
            border-radius: 20px;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            opacity: .3;
            box-shadow: inset 0 0 2px 1px rgba(255,255,255,.7);
            transition: .5s ease;

            &:first-child {
                left: 0;
                transform: translate(-50%,-50%);

                @media screen and (max-width: 414px) {
                    transform: translate(-30%,-50%);
                }
            }

            &:last-child {
                right: 0;
                transform: translate(50%,-50%);

                @media screen and (max-width: 414px) {
                    transform: translate(30%,-50%);
                }
            }

            &.d {

                &:hover {
                    opacity: .7;
                }
            }

            &.m {
                
                &:active {
                    opacity: 1;
                }
            }
        }

        .fill-box-outer {

            display: grid;
            grid-template-columns: repeat(4,1fr);
            gap: 12px;
            
            @media screen and (max-width: 1520px) {
                grid-template-columns: repeat(3,1fr);
            }

            @media screen and (max-width: 1150px) {
                grid-template-columns: repeat(2,1fr);
            }

            @media screen and (max-width: 775px) {
                grid-template-columns: repeat(1,1fr);
            }

            .fill-box {
                width: 360px;
            }
        }
        
    }

    .loading-outer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(30,30,30,.5);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: -1;
        opacity: 0;
        transition: .5s ease;
        
        .loading-text {
            color: white;
            position: relative;
            font-size: 48px;
            letter-spacing: 4px;
            
            &::before {
                content: "Loading";
                color: white;
                font-size: 48px;
                font-style: italic;
                letter-spacing: 2px;
                display: inline-block;
                animation: floatText .7s ease-out infinite alternate;

                @keyframes floatText {

                    0% {
                        transform: translateY(-15px);
                        opacity: .5;
                    }

                    100% {
                        transform: translateY(-35px);
                        opacity: 1;
                    }   
                }
            }

            &::after {
                content: "";
                width: 100%;
                height: 10px;
                
                position: absolute;
                left: 0;
                top: 100%;
                filter: blur(4px);
                border-radius: 50%;
                animation: bottomShadow .7s ease-out infinite alternate;

                @keyframes bottomShadow {

                    0% {
                        transform: scale(0.8);
                        background: rgba(0, 0, 0, .5);
                    }

                    100% {
                        transform: scale(1.2);
                        background: rgba(0, 0, 0, .1);
                    }
                }
            }
        }

        &.toggle {
            z-index: 2;
            opacity: 1;
        }
    }

    .open-event-list-btn {
        position: fixed;
        right: 0;
        bottom: 0;
        margin: 5px;
        border-radius: 5px;
        background-color: rgba(153,153,255,.3);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        padding: 6px 6px 5px 6px;
        box-shadow: inset 0 0 3px 1px rgba(255,255,255,.7);
        cursor: pointer;
        user-select: none;

        svg {
            font-size: 25px;
            color: white;
            pointer-events: none;
        }
    }

    .event-list-outer-frame {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        transition: opacity .5s ease;
        z-index: 11;

        &::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background-color: rgba(30, 30, 30, .5);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            opacity: 0;
            z-index: -1;
            transition: opacity .5s ease;
        }
        
        &.toggle {
            pointer-events: all;

            &::after {
                opacity: 1;
            }

            .event-list-outer {
                transform: translateX(0);
                opacity: 1;
            }
            
        }

        .event-list-outer {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            border-radius: 5px;
            background-color: rgba(153,153,255,.7);
            box-shadow: inset 0 0 3px 1px rgba(255,255,255,.7);
            margin: 5px;
            width: 300px;
            opacity: 0;
            transform: translateX(-105%);
            transition: transform .5s ease, opacity .5s ease;
            display: grid;
            grid-template-rows: 1fr auto;
            overflow: hidden;

            .event-list {
                overflow-y: auto;
                overflow-x: hidden;
                padding: 6px 6px 0 6px;
                margin: 6px 6px 0 6px;

                &::-webkit-scrollbar {
                    width: 6px;
                    border-radius: 20px;
                }

                &::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.7);
                    border-radius: 20px;
                }

                .event-items {
                    margin-bottom: 12px;
                    padding: 12px;
                    box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, .5);
                    border-radius: 5px;

                    .title-groups {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 6px 12px 6px;
                        position: relative;

                        &::after {
                            content: '';
                            position: absolute;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            height: 1px;
                            background-color: rgba(255, 255, 255, .5);
                        }

                        .title {
                            font-weight: bold;
                            font-size: 20px;
                            color: white;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                        }

                        .btn-groups {
                            display: grid;
                            grid-template-columns: 1fr 1fr 1fr;
                            gap: 6px;

                            div {
                                &:not(.icon) {
                                    cursor: pointer;
                                    user-select: none;
                                }

                                svg {
                                    pointer-events: none;
                                    color: white;
                                }
                            }
                        }
                    }

                    .content {
                        margin: 12px 6px;
                        color: white;
                        white-space: pre-line;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }

                    .create-date {
                        color: white;
                        font-size: 13px;
                        font-weight: bold;
                        text-align: right;
                        padding: 0 6px;
                    }
                }

                .no-data {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                    color: white;
                    letter-spacing: 2px;
                    font-size: 18px;
                    height: 100%;
                    line-height: 30px;
                }
            }

            .events-btn-groups {
                position: relative;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                padding: 12px;
                
                &::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: .5px;
                    background-color: rgba(255, 255, 255, .5);
                    margin: 0 2px;
                }

                div {
                    font-size: 18px;
                    font-weight: bold;
                    color: white;
                    padding: 6px 12px;
                    box-shadow: 0 0 0 1px rgba(255, 255, 255, .5);
                    border-radius: 5px;
                    text-align: center;
                    cursor: pointer;
                    user-select: none;

                    &.events-export-btn {
                        opacity: 1;
                        transition: opacity .5s ease;

                        &.disabled {
                            opacity: .5;
                            cursor: not-allowed;
                        }
                    }
                }
            }
            
            .delete-layout {
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                backdrop-filter: blur(6px);
                background-color: rgba(30, 30, 30, .3);
                box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, .7);
                color: white;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                opacity: 0;
                pointer-events: none;
                transition:  opacity .5s ease;

                &.toggle {
                    pointer-events: all;
                    opacity: 1;
                }

                .info-title {
                    margin: 50px 0 2px 0;
                    font-size: 18px;
                }

                .btn-groups {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    padding: 12px;

                    div {
                        font-size: 18px;
                        font-weight: bold;
                        color: white;
                        padding: 6px 12px;
                        box-shadow: 0 0 0 1px rgba(255, 255, 255, .5);
                        border-radius: 5px;
                        text-align: center;
                        cursor: pointer;
                        user-select: none;
                    }
                }
            }
        }
    }

    .single-date-event-modal-outer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 12;
        pointer-events: none;

        &::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background-color: rgba(30, 30, 30, .5);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            opacity: 0;
            z-index: -1;
            transition: opacity .5s ease;
        }
        
        &.toggle {
            pointer-events: all;

            &::after {
                opacity: 1;
            }
            
            .single-date-event-modal {

                .top {
                    opacity: 1;
                    transform: translateY(0);

                    .add-btn {
                        pointer-events: all;
                        transform: translate(0, -50%) rotate(0deg);
                    }
                }

                .bottom {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        }

        .single-date-event-modal {
            position: absolute;
            top: 50%;
            left: 50%;
            max-width: 500px;
            width: 95%;
            transform: translate(-50%, -50%);

            .top {
                position: relative;
                height: 50px;
                margin-bottom: 12px;
                transform: translateY(-30%);
                opacity: 0;
                transition: opacity .5s ease, transform .5s ease;

                .current-select-date {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    padding: 8px 12px;
                    font-weight: bold;
                    color: white;
                    border-radius: 5px;
                    background-color: rgba(153,153,255,.7);
                    box-shadow: inset 0 0 3px 1px rgba(255,255,255,.7);
                    transform: translate(-50%, -50%);
                }

                .add-btn {
                    position: absolute;
                    top: 50%;
                    right: 0;
                    opacity: 1;
                    transform: translate(0, -50%) rotate(90deg);
                    pointer-events: none;
                    transition: opacity .5s ease, transform .5s ease;

                    &.hidden {
                        pointer-events: none;
                        opacity: 0;
                    }

                    .svg-outer {
                        position: relative;
                        background-color: rgba(153,153,255,.7);
                        border-radius: 50%;
                        width: 37px;
                        height: 37px;

                        svg {
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            cursor: pointer;
                            user-select: none;
                            font-size: 45px;
                            color: rgb(255, 255, 255, .5);
                            transform: translate(-4px, -4px);
                        }
                    }
                }
            }

            .bottom {
                overflow: hidden;
                display: grid;
                grid-template-columns: 100% 100%;
                overflow-y: hidden;
                overflow-x: auto;
                border-radius: 5px;
                background-color: rgba(153,153,255,.7);
                box-shadow: inset 0 0 3px 1px rgba(255,255,255,.7);
                transform: translateY(5%);
                opacity: 0;
                transition: opacity .5s ease, transform .5s ease;

                &::-webkit-scrollbar {
                    height: 0;
                }

                .left {
                    opacity: 0;
                    transition: opacity .5s ease;

                    &.active {
                        opacity: 1;
                    }

                    .filter-list-outer {
                        position: relative;

                        .filter-list {
                            overflow-y: auto;
                            overflow-x: hidden;
                            height: 350px;
                            padding: 6px;
                            margin: 6px;

                            &::-webkit-scrollbar {
                                width: 6px;
                                border-radius: 20px;
                            }

                            &::-webkit-scrollbar-thumb {
                                background-color: rgba(255, 255, 255, 0.7);
                                border-radius: 20px;
                            }

                            .filter-items {
                                margin-bottom: 12px;
                                padding: 12px;
                                box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, .5);
                                border-radius: 5px;

                                .title-groups {
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    padding: 0 6px 12px 6px;
                                    position: relative;

                                    &::after {
                                        content: '';
                                        position: absolute;
                                        left: 0;
                                        right: 0;
                                        bottom: 0;
                                        height: 1px;
                                        background-color: rgba(255, 255, 255, .5);
                                    }

                                    .title {
                                        font-weight: bold;
                                        font-size: 20px;
                                        color: white;
                                        text-overflow: ellipsis;
                                        display: -webkit-box;
                                        -webkit-line-clamp: 1;
                                        -webkit-box-orient: vertical;
                                        overflow: hidden;
                                    }

                                    .btn-groups {
                                        display: grid;
                                        grid-template-columns: 1fr 1fr 1fr;
                                        gap: 6px;

                                        div {

                                            &:not(.icon) {
                                                cursor: pointer;
                                                user-select: none;
                                            }

                                            svg {
                                                pointer-events: none;
                                                color: white;
                                            }
                                        }
                                    }
                                }

                                .content {
                                    margin: 12px 6px;
                                    color: white;
                                    white-space: pre-line;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 3;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                }

                                .create-date {
                                    color: white;
                                    font-size: 13px;
                                    font-weight: bold;
                                    text-align: right;
                                    padding: 0 6px;
                                }

                                &:last-child {
                                    margin-bottom: 0;
                                }
                            }
                        }
                    }

                    .no-data {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        position: relative;
                        height: 350px;
                        padding: 12px;

                        .info {
                            text-align: center;
                            color: white;
                            font-weight: bold;
                        }
                    }

                    .delete-layout {
                        position: absolute;
                        top: 0;
                        right: 0;
                        left: 0;
                        bottom: 0;
                        backdrop-filter: blur(6px);
                        background-color: rgba(30, 30, 30, .3);
                        box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, .7);
                        color: white;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        opacity: 0;
                        pointer-events: none;
                        transition:  opacity .5s ease;

                        &.toggle {
                            pointer-events: all;
                            opacity: 1;
                        }

                        .info-title {
                            margin: 50px 0 2px 0;
                            font-size: 18px;
                        }

                        .btn-groups {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 12px;
                            padding: 12px;

                            div {
                                font-size: 18px;
                                font-weight: bold;
                                color: white;
                                padding: 6px 12px;
                                box-shadow: 0 0 0 1px rgba(255, 255, 255, .5);
                                border-radius: 5px;
                                text-align: center;
                                cursor: pointer;
                                user-select: none;
                            }
                        }
                    }
                }

                .right {
                    display: grid;
                    grid-template-rows: 0fr auto 0fr;
                    opacity: 0;
                    transition: opacity .5s ease;

                    &.active {
                        opacity: 1;
                    }

                    .title {
                        padding: 12px 14px;
                        font-size: 24px;
                        font-weight: bold;
                        color: white;
                        position: relative;
                        display: grid;
                        grid-template-columns: auto 30%;

                        .title-text {
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                        
                        &::after {
                            content: '';
                            position: absolute;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            width: 95%;
                            margin: 0 auto;
                            background-color: rgba(255, 255, 255, .5);
                            height: 1px;
                        }

                        .switch-is-alert {
                            display: flex;
                            align-items: center;
                            transition: opacity .5s ease;
                            margin-left: auto;

                            &.disabled {
                                opacity: .5;
                                cursor: not-allowed;
                            }

                            span {
                                font-size: 14px;
                                margin-right: 6px;
                            }
                        }
                    }

                    .input-groups {
                        padding: 12px 12px 0 12px;

                        .time-groups {

                            .label {
                                color: white;
                                margin-bottom: 14px;
                            }
                            
                            .time-inputs {
                                display: grid;
                                grid-template-columns: 1fr 1fr 1fr;
                                gap: 12px;
                            }
                        }
                    }

                    .btn-groups {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 12px;
                        padding: 12px;

                        div {
                            font-size: 18px;
                            font-weight: bold;
                            color: white;
                            padding: 6px 12px;
                            box-shadow: 0 0 0 1px rgba(255, 255, 255, .5);
                            border-radius: 5px;
                            text-align: center;
                            cursor: pointer;
                            user-select: none;
                        }
                    }
                }
            }
        }
    }
`