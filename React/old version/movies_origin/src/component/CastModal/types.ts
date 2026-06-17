import { Action } from "redux";
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
    getSingleCastItem: (val: number) => Action<any>,
    setSingleCastItem: (obj: object) => Action<any>,
    setMoviePostToggle: (status: boolean) => Action<any>,
    setLoadingState:(status:boolean) => Action<any>,
    setPostPath:(path:string) => Action<any>
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
    combined_credits?:{ 
        cast:{[key:string]:any}[] | any,
        crew:{[key:string]:any}[] | any
    }
}

export interface combinedCreditsCastType {
    id: number
    title: string,
    name:string,
    original_title: string,
    original_name: string,
    character: string,
    release_date: string,
    first_air_date:string,
    poster_path: string,
    media_type: string
}

export interface combinedCreditsCrewType {
    id: number
    title: string,
    name:string,
    original_title: string,
    original_name: string,
    poster_path: string,
    media_type: string,
    first_air_date:string,
    release_date: string,
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