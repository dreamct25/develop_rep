import React, { FunctionComponent, useEffect, useState } from "react";
import { Switch, Route, useHistory as useRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ipcRenderer } from "electron";
import { io } from 'socket.io-client'
import $ from '../../lib/Library'
import Radio from "../Radio/Radio";
import RadioCollect from "../RadioCollect/RadioCollect";
import NetworkWrong from "../NetworkWrong/NetworkWrong";
import Modal from "../Modal/Modal";
import { Container } from './styles'
import { initStateType } from './types'
import version from '../../asset/version.json'

const Main: FunctionComponent = (): JSX.Element => {
    const { t, i18n } = useTranslation()
    const formatLanguage = t
    const route = useRouter()
    const [{
        language,
        currentPath,
        topToggleStatus,
        fullscreenState,
        toggleModal,
        toggleCopyRightModal,
        languageToggleListStatus,
        moveXY
    }, setInitState] = useState<initStateType>({
        language: 'zh',
        currentPath: '',
        topToggleStatus: false,
        fullscreenState: false,
        toggleModal: false,
        toggleCopyRightModal: false,
        languageToggleListStatus: false,
        moveXY:{ baseX: -1, baseY: -1 }
    })

    const dragStart: ({ nativeEvent: { button, x, y } }: React.MouseEvent<HTMLDivElement>) => void = ({ nativeEvent: { button, x, y } }) => button === 0 && setInitState(initState => ({ ...initState,moveXY:{ baseX: x, baseY: y } }))

    useEffect(() => {
        const { baseX, baseY } = moveXY;
        (baseX !== -1 && baseY !== -1) && $(document).on('mousemove', moveEvent);
    }, [moveXY])

    const dragEnd: () => void = () => {
        setInitState(initState => ({ ...initState,moveXY:{ baseX: -1, baseY: -1 } }))
        $(document).on('mousemove', () => { });
    }

    const moveEvent: ({ screenX, screenY }: React.MouseEvent) => void = ({ screenX, screenY }) => {
        const { baseX, baseY } = moveXY
        ipcRenderer.send('setPosition', { dragX: screenX - baseX, dragY: screenY - baseY })
    }

    const fullScreenToggle: () => void = () => {
        setInitState(initState => ({ ...initState, fullscreenState: !fullscreenState }))
        ipcRenderer.send('setFullscreen', !fullscreenState)
    }

    const minScreen: () => void = () => ipcRenderer.send('setMinScreen')

    const setToggleModalFn: (status: boolean, method: string) => void = (status, method) => {
        method === 'confirm' && !toggleCopyRightModal && setTimeout(() => ipcRenderer.send('closeApp'), 700);
        method === 'confirm' && toggleCopyRightModal && setTimeout(() => setInitState(initState => ({ ...initState, toggleModal: false, toggleCopyRightModal: false })), 700);
        method === 'copyRight' ? setInitState(initState => ({
            ...initState,
            toggleModal: status,
            toggleCopyRightModal: status
        })) :
            setInitState(initState => ({
                ...initState,
                toggleModal: status,
            }))
    }

    const setLanguageToggleList:() => void = () => setInitState(initState => ({ ...initState,languageToggleListStatus:!languageToggleListStatus }))

    const setCurrentLanguage:(val:string) => void = val => {
        setInitState(initState => ({ ...initState, language: val,languageToggleListStatus:!languageToggleListStatus }))
        setUserSetting('update',val)
    } 

    const goPage: (pathname: string) => void = pathname => route.push({ pathname: navigator.onLine ? pathname : '/wrong' })

    const setUserSetting:(method:string,useLanguage?:string) => void = (method,useLanguage) => {
        const url = method === 'add' ? 'http://localhost:9870/db/add_user_setting' : 'http://localhost:9870/db/update_user_setting'
        const data = method === 'add' ? { language,remote_language:language } : { uuid:1,language:useLanguage,remote_language:useLanguage }

        $.fetch({
            method:'post',
            url,
            headers:{ 'Content-Type':'application/json' },
            data,
            successFn:(data:any) => console.log(data),
            errorFn:(err:any) => console.log(err)
        })
    }

    useEffect(() => {
        goPage('/radio')
        ipcRenderer.on('getCopyrightInfo', () => setToggleModalFn(true, 'copyRight'))

        const socketClient = io('ws://localhost:9870')

        socketClient.on('whenChangeLaguageFromRemote',({ language }:{ language:string }) => setInitState(prevState => ({ ...prevState,language })))
    
        $.fetch({
            method:'get',
            url:'http://localhost:9870/db/get_user_setting',
            successFn:(data:{[key:string]:any}[]) => {
                if(data.length > 0){
                    const [{ language }] = data
                    setInitState(prevState => ({ ...prevState,language }))
                } else {
                    setUserSetting('add')
                }
            },
            errorFn:(err:any) => console.log(err)
        })
    }, [])

    useEffect(() => {
        i18n.changeLanguage(language)
    }, [language])
    return (
        <Container>
            <div className="top-bar" onMouseDown={dragStart} onMouseUp={dragEnd}>
                <div className="top-bar-title">
                    <img src="../asset/icon/radio-waves.png" />
                    <span>{formatLanguage('radio')}</span>
                </div>
                <div className="top-bar-controller">
                    {process.platform !== 'darwin' && <div className="abount-text" onClick={setToggleModalFn.bind(this,true, 'copyRight')}>{formatLanguage('about')}</div>}
                    <div className="min" onClick={minScreen}>
                        <i className="fas fa-horizontal-rule min-icon"></i>
                    </div>
                    <div className="full" onClick={fullScreenToggle}>
                        <i className="fas fa-expand-alt full-icon"></i>
                    </div>
                    <div className="close" onClick={setToggleModalFn.bind(this, true, 'closeApp')}>
                        <i className="fas fa-times close-icon"></i>
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
            {navigator.onLine !== false && (
                <div className={topToggleStatus ? "top-option-group toggle" : "top-option-group"}>
                    <div 
                        className={currentPath === '/radio' ? "go-radio-list active" : "go-radio-list"} 
                        onClick={goPage.bind(this, '/radio')}
                    >
                        {formatLanguage('radioList')}
                    </div>
                    <div 
                        className={currentPath === '/collect' ? "go-collect-list active" : "go-collect-list"} 
                        onClick={goPage.bind(this, '/collect')}
                    >
                        {formatLanguage('collectList')}
                    </div>
                </div>
            )}
            <Switch>
                <Route exact path="/radio" render={(routeProps:RouteComponentProps<{[key: string]: string }>) => <Radio routeProps={routeProps} language={language} setMainInitStateStatus={setInitState} />} />
                <Route exact path="/collect" render={(routeProps:RouteComponentProps<{[key: string]: string }>) => <RadioCollect routeProps={routeProps} language={language} setMainInitStateStatus={setInitState} />} />
                <Route exact path="/wrong" component={NetworkWrong} />
            </Switch>
            <Modal modalProps={{
                modalTitle: toggleCopyRightModal ? '' : formatLanguage('prompt'),
                toggleModal: toggleModal,
                setToggleModal: setToggleModalFn,
                renderText: toggleCopyRightModal ? formatLanguage('copyRight',{ person:version.author.name }) : formatLanguage('doYouWantToCloseApplication'),
                showCopyRightInfo: toggleCopyRightModal
            }} />
        </Container>
    )
}

export default React.memo(Main)