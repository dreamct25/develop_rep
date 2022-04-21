import styled from "styled-components";
import { cssSetPropertys } from "./types";

const { Container }: cssSetPropertys = {
    Container: styled.div`
        position: relative;
        .drag-window{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            cursor: move;
            user-select: 'none';
            &.toggle{
                z-index: 1;
            }
        }
        .text-area{
            padding: 10px;
            resize: unset;
            width: 100%;
            height: 99.66vh;
            outline: none;
            border: none;
            overflow: hidden;
        }
    `
}

export default Container