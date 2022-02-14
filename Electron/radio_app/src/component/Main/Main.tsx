import React, { FunctionComponent, useEffect, useState } from "react";
import { Switch, Route, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ipcRenderer } from 'electron'
import $ from '../../lib/Library'
import Radio from "../Radio/Radio";
import RadioCollect from "../RadioCollect/RadioCollect";
import { Container } from './styles'
import { initStateType } from './types'
import NetworkWrong from "../NetworkWrong/NetworkWrong";
import Modal from "../Modal/Modal";

const Main: FunctionComponent = (): JSX.Element => {
    const { t, i18n } = useTranslation()
    const formatLang = t
    const route = useHistory()
    const [initState, setInitState] = useState<initStateType>({
        lang: 'zh',
        currentPath: '',
        topToggleStatus: false,
        fullscreenState: false,
        toggleModal: false,
        toggleCopyRightModal: false
    })

    const [moveXY, setMoveXY] = useState<{ baseX: number, baseY: number }>({
        baseX: -1,
        baseY: -1
    })

    const {
        lang,
        currentPath,
        topToggleStatus,
        fullscreenState,
        toggleModal,
        toggleCopyRightModal
    }: initStateType = initState

    const dragStart: ({ nativeEvent: { button, x, y } }: React.MouseEvent<HTMLDivElement>) => void = ({ nativeEvent: { button, x, y } }) => {
        // 滑鼠點擊後移動視窗開始
        // button 0 為左鍵，2 為右鍵
        if (button === 0) {
            // win.setResizable(true) // 開啟可調整視窗，因拖動時會造成視窗放大
            setMoveXY({ baseX: x, baseY: y })
        } else if (button === 2) {
            ipcRenderer.send('closeApp'); // 呼叫後端 ipcMain 事件，出現選單
        }
    }

    useEffect(() => {
        const { baseX, baseY } = moveXY
        if (baseX !== -1 && baseY !== -1) {
            $(document).on('mousemove', moveEvent);
        }
    }, [moveXY])

    const dragEnd: () => void = () => {
        setMoveXY({ baseX: -1, baseY: -1 })
        $(document).on('mousemove', () => { });
    }

    const moveEvent: ({ screenX, screenY }: React.MouseEvent) => void = ({ screenX, screenY }) => {
        const { baseX, baseY } = moveXY
        ipcRenderer.send('setPosition', { dragX: screenX - baseX, dragY: screenY - baseY })
    }

    const fullScreenToggle: () => void = () => {
        setInitState({ ...initState, fullscreenState: !fullscreenState })
        ipcRenderer.send('setFullscreen', !fullscreenState)
    }

    const minScreen: () => void = () => ipcRenderer.send('setMinScreen')

    const setToggleModalFn: (status: boolean, method: string) => void = (status, method) => {
        method === 'confirm' && !toggleCopyRightModal && setTimeout(() => ipcRenderer.send('closeApp'), 700);
        method === 'confirm' && toggleCopyRightModal && setTimeout(() => setInitState({ ...initState, toggleModal: false, toggleCopyRightModal: false }), 700);
        method === 'copyRight' ? setInitState({
            ...initState,
            toggleModal: status,
            toggleCopyRightModal: status
        }) :
            setInitState({
                ...initState,
                toggleModal: status,
            })
    }

    const goPage: (pathname: string) => void = pathname => route.push({ pathname: navigator.onLine ? pathname : '/wrong' })

    ipcRenderer.on('getCopyrightInfo', () => setToggleModalFn(true, 'copyRight'))

    useEffect(() => {
        goPage('/radio')
    }, [])

    useEffect(() => { i18n.changeLanguage(lang) }, [lang])
    return (
        <Container>
            <div className="top-bar" onMouseDown={dragStart} onMouseUp={dragEnd}>
                <div className="top-bar-title">廣播電台</div>
                <div className="top-bar-controller">
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
                <div onClick={() => {
                    setInitState({
                        ...initState,
                        lang: lang === 'zh' ? 'en' : 'zh'
                    })
                }}><i className="fal fa-globe-americas">&nbsp;&nbsp;</i>{formatLang('changeLanguage')}</div>
            </div>
            {navigator.onLine !== false && (
                <div className={topToggleStatus ? "top-option-group toggle" : "top-option-group"}>
                    <div className={currentPath === '/radio' ? "go-radio-list active" : "go-radio-list"} onClick={goPage.bind(this, '/radio')}>{formatLang('radioList')}</div>
                    <div className={currentPath === '/collect' ? "go-collect-list active" : "go-collect-list"} onClick={goPage.bind(this, '/collect')}>{formatLang('collectList')}</div>
                </div>
            )}
            <Switch>
                <Route exact path="/radio" render={() => <Radio mainInitState={initState} setMainInitStateStatus={setInitState} />} />
                <Route exact path="/collect" render={() => <RadioCollect mainInitState={initState} setMainInitStateStatus={setInitState} />} />
                <Route exact path="/wrong" component={NetworkWrong} />
            </Switch>
            <Modal modalProps={{
                modalTitle: toggleCopyRightModal ? '' : '提示',
                toggleModal: toggleModal,
                setToggleModal: setToggleModalFn,
                renderText: toggleCopyRightModal ? 'CopyRight By Chen 2022-02' : '確定要關閉應用程式嗎 ?',
                showCopyRightInfo: toggleCopyRightModal
            }} />
        </Container>
    )
}

export default React.memo(Main)