import { createSlice } from '@reduxjs/toolkit'
import { initStoreType, reducersActionType } from '.'

const { actions:actionCreator,reducer } = createSlice<
    initStoreType, reducersActionType<initStoreType>, string, any
>({
    name:'MainReducer',
    initialState:{
        currentPlaySongDetails: { songName: '' , artist: '', songId: '', songThumUrl: '' },
        currentPath: '',
        toggleSettingListStatus: false,
        toggleQRCodeModalStatus: false,
        isPlayStatus: false,
        isFullScreen: false,
        songSwitchControl: {
            songIndex: -1,
            canGoNext: false,
            canGoPrev: false,
            isClick: false,
            isPlayInCollect: false,
            fromRemote: false,
            isGoAction: false
        },
        playFunctionsActionNum: -1,
        themColorRgba: { r: 30, g: 30, b: 30, a: 0.5 },
        themColorRgbaStr: 'rgba(30,30,30,.5)'
    },
    reducers:{
        setCurrentPlaySongDetails:(state,action) => ({ ...state, currentPlaySongDetails:action.payload }),
        setCurrentPath:(state,action) => ({ ...state, currentPath:action.payload }),
        setToggleSettingListStatus:(state,action) => ({ ...state, toggleSettingListStatus:action.payload }),
        setToggleQRCodeModalStatus:(state,action) => ({ ...state, toggleQRCodeModalStatus:action.payload }),
        setIsPlayStatus: (state, action) => ({ ...state, isPlayStatus:action.payload }),
        setIsFullScreen: (state, action) => ({ ...state, isFullScreen:action.payload }),
        setSongSwitchControl: (state, action) => ({ ...state, songSwitchControl:action.payload }),
        setPlayFunctionsActionNum: (state, action) => ({ ...state, playFunctionsActionNum:action.payload }),
        setThemColorRgba: (state, action) => ({ 
            ...state, 
            themColorRgba:action.payload, 
            themColorRgbaStr: `rgba(${action.payload.r},${action.payload.g},${action.payload.b},${action.payload.a})`  
        }),
    }
})

export { actionCreator,reducer }