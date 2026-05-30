import { styled } from '@linaria/react'

export default styled.div`

    position: relative;

    .embla__viewport {
        overflow: hidden;

        .embla__container {
            display: flex;
            justify-content: safe center;
            touch-action: pan-y pinch-zoom;

            .embla__slide {
                flex: 0 0 100%;
                min-width: 0;
            }
        }
    }

    .embla-prev-btn {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
        background-color: rgba(30, 30, 30, .3);
        box-shadow: inset 0 0 1px 0 rgba(255, 255, 255, .5);
        backdrop-filter: blur(6px);
        border-radius: 50%;
        padding: 2.6px 5px .4px 0px;
        opacity: 0;
        color: white;
        cursor: pointer;
        user-select: none;
        pointer-events: none;
        transition: transform .5s ease, opacity .5s ease;

        &.active {
            pointer-events: all;
            opacity: 1;
            transform: translate(27px, -50%);
        }

        svg {
            pointer-events: none;
        }
    }

    .embla-next-btn {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
        background-color: rgba(30, 30, 30, .3);
        box-shadow: inset 0 0 1px 0 rgba(255, 255, 255, .5);
        backdrop-filter: blur(6px);
        border-radius: 50%;
        opacity: 0;
        padding: 3px 2px 0px 3px;
        color: white;
        cursor: pointer;
        user-select: none;
        pointer-events: none;
        transition: transform .5s ease, opacity .5s ease;

        &.active {
            pointer-events: all;
            opacity: 1;
            transform: translate(-27px, -50%);
        }

        svg {
            pointer-events: none;
        }
    }
`