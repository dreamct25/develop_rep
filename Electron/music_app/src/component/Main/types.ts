import { RgbaColor } from "react-colorful";

export interface initStateType {
    language: string
    fullscreenState: boolean,
    toggleModal: boolean,
    toggleCopyRightModal: boolean,
    languageToggleListStatus:boolean,
    moveXY:{ baseX: number,baseY: number }
    appInfo:{ productName: string, author: string, version: string }
}

export interface initStoreType {
    currentPlaySongDetails: { songName: string , artist: string, songId: string, songThumUrl: string },
    currentPath: string,
    toggleSettingListStatus: boolean,
    toggleQRCodeModalStatus: boolean,
    isPlayStatus: boolean,
    isFullScreen: boolean,
    songSwitchControl: {
        songIndex: number,
        canGoPrev: boolean,
        canGoNext: boolean,
        isClick: boolean,
        isPlayInCollect: boolean
        fromRemote: boolean,
        isGoAction: boolean
    },
    playFunctionsActionNum: number,
    themColorRgba: RgbaColor,
    themColorRgbaStr: string
}

export type reducersActionType<T> = {
    setCurrentPlaySongDetails(state:T, action: ActionPayLoad<initStoreType,'currentPlaySongDetails'>): void
    setCurrentPath(state:T, action: ActionPayLoad<initStoreType,'currentPath'>): void
    setToggleSettingListStatus(state:T, action: ActionPayLoad<initStoreType,'toggleSettingListStatus'>): void
    setToggleQRCodeModalStatus(state:T, action: ActionPayLoad<initStoreType,'toggleQRCodeModalStatus'>): void
    setIsPlayStatus(state:T, action: ActionPayLoad<initStoreType,'isPlayStatus'>): void,
    setIsFullScreen(state:T, action: ActionPayLoad<initStoreType,'isFullScreen'>): void,
    setSongSwitchControl(state:T, action: ActionPayLoad<initStoreType,'songSwitchControl'>): void
    setPlayFunctionsActionNum(state:T, action: ActionPayLoad<initStoreType,'playFunctionsActionNum'>): void,
    setThemColorRgba(state:T, action: ActionPayLoad<initStoreType,'themColorRgba'>): void
}