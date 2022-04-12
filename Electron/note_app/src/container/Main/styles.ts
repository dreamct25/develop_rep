import styled from "styled-components";
import { cssSetPropertys } from "./types";

const { Container }:cssSetPropertys = {
    Container:styled.div`
        .text-area{
            padding: 10px;
            /* resize: unset; */
            width: 100%;
            height: 99.66vh;
            outline: none;
            border: none;
            overflow: hidden;
        }
    `
}

export default Container