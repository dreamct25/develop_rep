import React, { useEffect, useMemo, useRef, useState } from "react"
import styled from 'styled-components'
import VideoJs from "video.js"
import 'video.js/dist/video-js.min.css'
import 'videojs-contrib-hls'

const Widget = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    background-color: rgb(30,30,30);
    color: white;
    #vjs_video_3{
        display: none;
    }
    .set-bar {
        display: flex;
        justify-content: center;
        div {
            margin: 0 3px;
        }
        .prev-btn,
        .play-btn,
        .next-btn{
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-radius: 50%;
            background-color: white;
            color: black;
            font-size: 20px;
            cursor: pointer;
            user-select: none;
        }
        .prev-btn{
            padding:0 15px 0 11px;
        }
        .play-btn{
            .play{
                padding:14px 13px 12px 16px;
            }
            .pause{
                padding:14px 14.5px 12px 14.5px;
            }
            
        }
        .next-btn{
            padding:0 12px 0 14px;
        }
    }
    .voice-bar{
        display: flex;
        justify-content: center;
    }
    .radio-list-outer{
        overflow: hidden;
        border-radius: 10px;
        margin: 0 5%;
        .radio-list{
            overflow-x: hidden;
            overflow-y: scroll;
            height: 500px;
            .radio-list-item{
                display: grid;
                grid-template-columns: 18% 82%;
                grid-template-rows: 100px;
                align-items: center;
                color: white;
                background-color: rgb(30,30,30);
                transition: .7s ease;
                cursor: pointer;
                user-select: none;
                box-shadow: inset 0 0 0.1px 0 rgba(255,255,255,.7);
                overflow: hidden;
                .img-outer{
                    display: flex;
                    align-items: center;
                    padding-left: 3px;
                    img{
                        width: 100%;
                        height: 94px;
                        box-shadow: 0 0 0 0 rgba(255,255,255,.7);
                        transition: .7s ease;
                    }
                }
            }
            .radio-list-item:first-child{
                .img-outer{
                    img{
                        border-radius: 10px 0 0 0;
                    }
                }
            }
            .radio-list-item:last-child{
                .img-outer{
                    img{
                        border-radius: 0 0 0 10px;
                    }
                }
            }
            .radio-list-item:hover{
                color: black;
                background-color: rgb(255,255,255);
                box-shadow: inset 0 0 1px 2px rgba(0,0,0,.7);
                .img-outer{
                    img{
                        box-shadow: -1px 0 10px 2px rgba(0,0,0,.7);
                    }
                }
            }
            .active {
                color: black;
                background-color: rgb(255,255,255);
                box-shadow: inset 0 0 1px 2px rgba(0,0,0,.7);
                .img-outer{
                    img{
                        box-shadow: -1px 0 10px 2px rgba(0,0,0,.7);
                    }
                }
            }
        }
        .radio-list::-webkit-scrollbar {
            width: 4px;
            background-color: rgb(30,30,30);
        }
        .radio-list::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.7);
            border-radius:20px;
        }
    }
    .loading-outer{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.5);
        backdrop-filter: blur(10px);
        z-index: -1;
        opacity: 0;
        transition: .7s ease;
        .loading{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 130px;
            height: 130px;
            .loading-circle{
                width: 100%;
                height: 100%;
                border: 5px solid white;
                border-right-color: transparent;
                border-left-color: transparent;
                border-radius: 50%;
                transform: rotate(0turn);
                animation: loadingCircle linear 1s infinite;
            }

            @keyframes loadingCircle {
                100%{
                    transform: rotate(1turn);
                }
            }

            .loading-text{
                position: absolute;
                top: 50%;
                left: 50%;
                font-size: 20px;
                transform: translate(-42%,-38%);
            }
        }
    }
    .loading-outer-active{
        z-index: 1;
        opacity: 1;
    }
`

const Radio = () => {
    const videoRef = useRef(null)
    const [player,setPlayer] = useState(null)
    const [radioList,setRadioList] = useState([])
    const [filterRadioList,setFilterRadioList] = useState([])
    const [playerVoice,setVoice] = useState(50)
    const [currentId,setCurrentId] = useState("")
    const [currentSearch,setCurrentSearch] = useState("")
    const [loadingState,setLoadingState] = useState(false)
    const [playState,setPlayState] = useState(false)
    const [singleRadioSelect,setSingleRadioSelect] = useState([])

    const fetchCenter = async (url,setting) => {
        let res = null
        let returnItem = null
        try {
            res = setting === undefined ? await fetch(url) : await fetch(url,setting)
            if(res.status === 200){
                await res.json().then(res => returnItem = res.data )
            } else {
                throw new Error()
            }
        } catch (error) {
            
        }
        return returnItem
    }

    const seletctChannel = (currentChannel,currentId) => {
        setCurrentId(currentId)
        callChannelAndSetRadio(currentChannel)
        setLoadingState(true)
    }

    const callChannelAndSetRadio = async channelName => {
        const singleItem = await fetchCenter("http://localhost:9870/radio/get_single_channel",{
            method:'post',
            headers:{ "Content-Type":"application/json" },
            body:JSON.stringify({ selectChannelName:channelName })
        })

        console.log(singleItem)

        if(typeof singleItem === 'object'){
            const { radioUrl,radioInfoList } = singleItem
            setSingleRadioSelect([radioInfoList])
            player.src(radioUrl)
            player.play()
            console.log(radioInfoList)
        } else {
            setLoadingState(false)
            alert("please select again.")
        }
    }

    const setCurrentVoice = ({ target:{ value } }) => {
        player.volume(Number(value) / 100)
        setVoice(value)
    }

    const setCurrentSearchs = ({ target:{ value } }) => {
        let filterRadioList = radioList.filter(({ channel_title }) => channel_title.match(value))
        setFilterRadioList(value === "" ? radioList : filterRadioList)
        setCurrentSearch(value)
    }

    const prevOrNext = (type) => {
        let currentPos = filterRadioList.findIndex(({ channel_id }) => channel_id === currentId)
        if(type === 'prev'){
            let posTemp = currentPos - 1
            if(posTemp >= 0) seletctChannel(filterRadioList[posTemp].channel_title,filterRadioList[posTemp].channel_id)
        } else {
            let posTemp = currentPos + 1
            if(posTemp <= filterRadioList.length - 1) seletctChannel(filterRadioList[posTemp].channel_title,filterRadioList[posTemp].channel_id)
        }
    }

    const getData = async () => {
       const item = await fetchCenter("http://localhost:9870/radio/get_channel")
       setRadioList(item)
       setFilterRadioList(item)
    }

    useEffect(() => {
        // player !== null && player.on('loadstart',() => setLoadingState(true))
        player !== null && player.on('buffered',() => setLoadingState(true))
        player !== null && player.on('playing',() => {
            setPlayState(true)
            setLoadingState(false)
        })
    },[player])

    useEffect(() => {
        getData()
        setPlayer(VideoJs(videoRef.current,{
            defaultVolume:playerVoice / 100,
            autoplay:false,
            controls:false,
            sources:[{
                src:"",
                type:"application/x-mpegURL"
            }]
        }))
    },[])
    return(
        <Widget>
            <video ref={videoRef} />
            {singleRadioSelect.length !== 0 && singleRadioSelect.map(({ id,title,desc,showDate,nowProgramName }) => (
                <div key={id}>
                    <div>{title}</div>
                    <div>{nowProgramName}</div>
                    <div>{showDate.split(" ")[0]}</div>
                    <div>{desc}</div>
                </div>)
            )}
            <div className="search-outer">
                <input type="text"  value={currentSearch} onChange={setCurrentSearchs} />
            </div>
            <div className="set-bar">
                <div className="prev-btn" onClick={prevOrNext.bind(this,'prev')}>
                    <i className="fas fa-backward"></i>
                </div>
                <div className="play-btn" onClick={() => {
                    setPlayState(!playState)
                    !playState ? player.play() : player.pause()
                }}>
                    { !playState ? <i className="fas fa-play play"></i> : <i className="fas fa-pause pause"></i> }
                </div>
                <div className="next-btn" onClick={prevOrNext.bind(this,'next')}>
                    <i className="fas fa-forward"></i>
                </div>
            </div>
            <div className="voice-bar">
                <input type="range" min="0" max="100" value={playerVoice} onChange={setCurrentVoice} />
                <div>音量 { playerVoice } %</div>
            </div>
            <div className="radio-list-outer">
                <div className="radio-list">
                    { filterRadioList.length !== 0 && filterRadioList.map(({ channel_title,channel_id,channel_image }) => (
                        <div
                            className={ currentId === channel_id ? "radio-list-item active" : "radio-list-item" }
                            key={channel_id} 
                            onClick={seletctChannel.bind(this,channel_title,channel_id)}>
                                <div className="img-outer">
                                    <img src={`https://hichannel.hinet.net/upload/radio/channel/${channel_image}`} alt="" />
                                </div>
                                <div className="channel-title">{channel_title}</div>
                        </div>
                    )) }
                </div>
            </div>
            <div className={ loadingState ? "loading-outer loading-outer-active" : "loading-outer" }>
                <div className="loading">
                    <div className="loading-circle"></div>
                    <div className="loading-text">Loading</div>
                </div>
            </div>
        </Widget>
    )
}

export default Radio