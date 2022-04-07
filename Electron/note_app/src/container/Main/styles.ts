import styled from "styled-components";
import { cssSetPropertys } from "./types";

const { Container }:cssSetPropertys = {
    Container:styled.div`
        .text-area{
            resize: unset;
            width: 100%;
            height: 99.66vh;
            outline: none;
            border: none;
            overflow: hidden;
            transition: .5s ease;
        }
    `
}

export default Container