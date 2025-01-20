import { styled } from '@linaria/react'

export default styled.div<{ useThemColor: string }>`
    position: relative;

    .current-select {
        cursor: pointer;
        user-select: none;
        padding: 7px 10px;
        border-radius: 8px;
        background-color: rgba(255,255,255,0);
        box-shadow: 0 0 0 .5px rgba(255,255,255,.7);
        text-align: center;
        color: white;
        transition: .5s ease;

        &:hover {
            background-color: ${props => props.useThemColor};
        }
    }

    .select-list {
        position: absolute;
        top: 33px;
        left: 0;
        right: 0;
        max-height: 0;
        overflow: hidden;
        color: #fff;
        -webkit-transition: .5s ease;
        transition: .5s ease;
        border-radius: 8px;
        z-index: 10;
        transition: .5s ease;

        .list-item {
            padding: 8px;
            font-size: 14px;
            text-align: center;
            cursor: pointer;
            user-select: none;
        }

        &.toggle {
            max-height: 100vh;
        }

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            background-color: var(--seq0lg6-5);
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            box-shadow: inset 0 0 2px 1px #ffffff4d;
            border-radius: 8px;
            -webkit-transition: .5s ease;
            transition: .5s ease;
        }
    }
`