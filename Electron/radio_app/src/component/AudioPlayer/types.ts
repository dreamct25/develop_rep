import { RefObject } from "react";
import { StyledComponent } from "styled-components";

export interface cssSetPropertys {
    Container: StyledComponent<"div", any>
}

export interface AudioPlayerProps {
    audioPlayerProps: {
        audioPlayer: RefObject<HTMLVideoElement>,
        audioVoice: number
        audioState: boolean,
        setCurrentVoice: (voiceVal: string) => void,
        setCurrentPlayState: (status: boolean) => void,
        prevOrNext: (type: string, e: any) => void
    }
}
