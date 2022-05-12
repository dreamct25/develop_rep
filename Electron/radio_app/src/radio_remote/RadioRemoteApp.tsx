import React, { FunctionComponent, useEffect, useRef, useState, MouseEvent } from "react";
import { Slider } from '@mui/material'
import io from 'socket.io-client'
import { useTranslation } from 'react-i18next'
import $ from '../lib/Library'
import Container from "./RadioRemoteAppStyles";
import { initStateType } from './types'
import { channelItemType } from '../server/server_api/channel_api'


const App:FunctionComponent = ():JSX.Element => {
    const { t, i18n } = useTranslation()
    const formatLanguage = t
    const [{
        voiceVal,
        currentIp,
        currentChannel,
        playState,
        radioList,
        languageToggleListStatus,
        language
    },setInitState] = useState<initStateType<channelItemType>>({
        voiceVal:'0',
        currentIp:'',
        currentChannel:'',
        playState:false,
        radioList:[],
        languageToggleListStatus: false,
        language:'zh'
    })

    const getReqTimer: React.MutableRefObject<any> = useRef<any>(null)

    const getAllChannel:() => void = () => {
        $.fetch({
            method: 'get',
            url: `http://${currentIp}/channel/get_channel`,
            beforePost: () => {},
            successFn: ({ data }: {
                data: {
                    channels: channelItemType[]
                } | string
            }) => {
                if (typeof data !== 'string') {
                    setInitState(initState => ({
                        ...initState,
                        radioList: data.channels,
                    }))
                }
            },
            errorFn: (err: any) => { console.log(err) }
        })
    }

    const changeVoice:(value:number) => void = value => {
        setInitState(prevState => ({
            ...prevState,
            voiceVal: value.toString()
        }))
    }

    const setLanguageToggleList:() => void = () => setInitState(initState => ({ ...initState,languageToggleListStatus:!languageToggleListStatus }))

    const setCurrentLanguage:(val:string) => void = val => {
        setInitState(initState => ({ ...initState, language: val,languageToggleListStatus:!languageToggleListStatus }))

        $.fetch({
            method:'post',
            url:`http://${currentIp}/db/update_user_setting`,
            headers:{ 'Content-Type':'application/json' },
            data:{ uuid:1,language:val,remote_language:val },
            successFn:(data:any) => console.log(data),
            errorFn:(err:any) => console.log(err)
        })

        $.fetch({
            method:'post',
            url:`http://${currentIp}/socket/remote_language_setting`,
            headers:{ 'Content-Type':'application/json' },
            data:{ language:val },
            successFn:(data:any) => console.log(data),
            errorFn:(err:any) => console.log(err)
        })
    }

    const changePlayState:(status:boolean,event:MouseEvent<HTMLElement>) => void = (status,{ target }) => {
        const currentClassName:string[] = (target as HTMLDivElement).className.split(" ")
        if(!currentClassName.includes("toggle")){
            $.fetch({
                method:'post',
                url:`http://${currentIp}/socket/post_current_play_state`,
                headers: { "Content-Type": "application/json" },
                data: {
                    playState: !status
                },
                successFn:() => {
                    console.log('changed!')
                },
                errorFn:() => {
                    console.log('err!')
                }
            })
        }
    }

    const changeChannel:(channel:string) => void = channel => {
        $.fetch({
            method:'post',
            url:`http://${currentIp}/socket/set_channel`,
            headers: { "Content-Type": "application/json" },
            data: {
                channel
            },
            successFn:() => {
                console.log('changed!')
            },
            errorFn:() => {
                console.log('err!')
            }
        })
    }

    const whenRemoteStart:() => void = () => {
        $.fetch({
            method:'post',
            url:`http://${window.location.host}/socket/remote_is_start`,
            headers: { "Content-Type": "application/json" },
            data: {
                isStart:true
            },
            successFn:() => {
                console.log('changed!')
            },
            errorFn:() => {
                console.log('err!')
            }
        })
    }

    useEffect(() => {
        if(currentIp){
            clearTimeout(getReqTimer.current!)
            getReqTimer.current = setTimeout(() => {
                $.fetch({
                    method:'post',
                    url:`http://${currentIp}/socket/set_voice`,
                    headers: { "Content-Type": "application/json" },
                    data: {
                        voiceVal:$.convert(voiceVal,'number')
                    },
                    successFn:() => {
                        console.log('changed!')
                    },
                    errorFn:() => {
                        console.log('err!')
                    }
                })
            },500)
        }
    },[voiceVal])

    useEffect(() => {
        currentIp && getAllChannel()
    },[currentIp])

    useEffect(() => {
        setInitState(prevState => ({
            ...prevState,
            currentIp: window.location.host,
        }))

        const socketClient = io(`ws://${window.location.host}`)

        socketClient.on('getCurrentSetting',(valuse) => {
            console.log(valuse)
            setInitState(prevState => ({
                ...prevState,
                voiceVal:valuse.playerVoice,
                currentChannel:valuse.currentChannel,
                playState:valuse.playState,
                language:valuse.language
            }))
        })

        socketClient.on('checkRemoteIsStart',() => whenRemoteStart())

        whenRemoteStart()

        $.fetch({
            method:'get',
            url:`http://${window.location.host}/db/get_user_setting`,
            successFn:(data:{[key:string]:any}[]) => {
                if(data.length > 0){
                    const [{ remote_language }] = data
                    setInitState(prevState => ({
                        ...prevState,
                        language:remote_language
                    }))
                }
            },
            errorFn:(err:any) => console.log(err)
        })
    },[])

    useEffect(() => { i18n.changeLanguage(language) }, [language])

    return(
        <Container>
            <div className="header">
                <h1>Radio Remote</h1>
            </div>
            <div className="main">
                <div className="current-channle">{formatLanguage('remote.currentPlay')}：{currentChannel || formatLanguage('remote.noChannel')}</div>
                <div className="play-controller">
                    <i className={playState ? "fal fa-play-circle toggle" : "fal fa-play-circle"} onClick={changePlayState.bind(this,true)} />
                    <i className={playState ? "fal fa-pause-circle" : "fal fa-pause-circle toggle"} onClick={changePlayState.bind(this,false)} />
                </div>
                <div className="voice-controller">
                    <span className="txt">{formatLanguage('remote.voice')}</span>
                    <div className="slider-outer">
                        <Slider
                            value={Number(voiceVal)}
                            valueLabelFormat={value => `${value}%`}
                            min={0} max={100}
                            marks={Array.from({ length: 100 },(_,num:number) => ({
                                value:num,
                                label:`${num} %`
                            }))}
                            onChange={(_:Event,value:number) => changeVoice(value)}
                            valueLabelDisplay="auto"
                        />
                    </div>
                </div>
                <div className="radio-list-group">
                    <div className="radio-list-title">{formatLanguage('remote.radioList')}</div>
                    <div className="radio-list-outer">
                        {radioList.length > 0 ? $.maps(radioList,({ channel_title,channel_image }:channelItemType,index:number) => (
                            <div className="radio-list-item" key={index} onClick={changeChannel.bind(this,channel_title)}>
                                <div className="img" style={{ backgroundImage: `url('https://hichannel.hinet.net/upload/radio/channel/${channel_image}')` }}></div>
                                <div  className="title">{channel_title}</div>
                                <div className={channel_title === currentChannel && playState ? "radio-list-item-playing toggle" : "radio-list-item-playing"}>
                                    <div className="playing-progress">
                                        <span className="active-1"></span>
                                        <span className="active-2"></span>
                                        <span className="active-3"></span>
                                        <span className="active-4"></span>
                                        <span className="active-5"></span>
                                        <span className="active-6"></span>
                                        <span className="active-7"></span>
                                        <span className="active-8"></span>
                                        <span className="active-9"></span>
                                        <span className="active-10"></span>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="no-data">{formatLanguage('remote.getRadioList')}</div>
                        )}
                    </div>
                </div>
            </div>
            <div className="change-language-list">
                <div 
                    className="change-language-switch"
                    onClick={setLanguageToggleList}
                >
                    <i className="fal fa-globe-americas"></i>
                    &nbsp;
                    {formatLanguage('changeLanguage')}
                </div>
                <div className={languageToggleListStatus ? "language-list-item-outer toggle" : "language-list-item-outer"}>
                    <div 
                        className={language === 'zh' ? "language-list-item active" : "language-list-item"}
                        onClick={setCurrentLanguage.bind(this,'zh')}
                    >{formatLanguage('languageZh')}</div>
                    <div 
                        className={language === 'en' ? "language-list-item active" : "language-list-item"}
                        onClick={setCurrentLanguage.bind(this,'en')}
                    >{formatLanguage('languageEn')}</div>
                </div>
            </div>
        </Container>
    )
}

export default App