import { StyledComponent } from "styled-components";
import store from "../../store";

export interface actionType {
    getSingleCastItem: string,
    setSingleCastItem: string,
    setMoviePostToggle: string,
    setLoadingState:string,
    setPostPath:string
}

export interface actionCreatorType {
    getSingleCastItem: Function,
    setSingleCastItem: Function,
    setMoviePostToggle: Function,
    setLoadingState:Function,
    setPostPath:Function
}

export interface CastModalProps {
    postToggles:boolean
    postId: number,
    postSetCastModalToggle: Function
}

export interface dataType {
    id: number,
    also_known_as: string[],
    biography: string,
    birthday: string,
    name: string,
    place_of_birth: string,
    profile_path: string,
    combined_credits?:{ cast:{[key:string]:any}[] | any }
}

export interface combinedCreditsType {
    id: number
    title: string,
    original_title: string,
    character: string,
    release_date: string,
    poster_path: string,
    media_type: string
}

export interface objType {
    data: dataType,
    moviePostToggle: boolean,
    loadingState:boolean,
    postPath:string
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}

export interface reducerState extends ReturnType<typeof store.getState> {}