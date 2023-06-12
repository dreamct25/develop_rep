import { FC, useState,useContext,createElement } from "react";
import { Routes,Route,useNavigate, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAsia } from '@fortawesome/free-solid-svg-icons'
import { NewContext } from '../../App'
import { Container,initStateType } from '.'
import routerItem from '../../router'

const Main:FC = ():JSX.Element => {
    const { $,formatLanguage } = useContext(NewContext)

    const { i18n:i18next } = useTranslation()

    const router = useNavigate()

    const [{
        toggleLanguageList,
        toggleNavStatus
    },setInitState] = useState<initStateType>({
        toggleLanguageList: false,
        toggleNavStatus: false
    })

    const goPage:(path: string) => void = path => {
        router({ pathname:path })
    }

    const toggleNavBar:() => void = () => {
        setInitState(prevState => ({
            ...prevState,
            toggleNavStatus: !toggleNavStatus
        }))
    }

    const changeLanguage:(language: string) => void = language => {
        setInitState(prevState => ({
            ...prevState,
            toggleLanguageList: false
        }))
        i18next.changeLanguage(language)
    }

    const toggleLanguageListStatus:() => void = () => {
        setInitState(prevState => ({
            ...prevState,
            toggleLanguageList: !toggleLanguageList
        }))
    }

    return (
        <Container>
            <div className={toggleLanguageList ? "language-list-outer toggle" : "language-list-outer"}>
                <div className="language-display-outer" onClick={toggleLanguageListStatus}>
                    <FontAwesomeIcon icon={faGlobeAsia} />
                    <div className="language-display">{formatLanguage(i18next.language)}</div>
                </div>
                <div className={toggleLanguageList ? "language-list toggle" : "language-list"}>
                    <div className="language-list-item" onClick={changeLanguage.bind(undefined, 'zh')}>{formatLanguage('zh')}</div>
                    <div className="language-list-item" onClick={changeLanguage.bind(undefined, 'en')}>{formatLanguage('en')}</div>
                </div>
            </div>
            <div className={toggleNavStatus ? "nav-list toggle" : "nav-list"} onClick={toggleNavBar}>
                <div className="line-icon">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <div className={toggleNavStatus ? `nav-btn-group-${i18next.language} toggle` : `nav-btn-group-${i18next.language}`}>
                    <div className="converter" onClick={goPage.bind(undefined, '/converter')}>{formatLanguage('nav.converter')}</div>
                    <div className="picker" onClick={goPage.bind(undefined, '/picker')}>{formatLanguage('nav.picker')}</div>
                    <div className="color-card" onClick={goPage.bind(undefined, '/color_card')}>{formatLanguage('nav.card')}</div>
                    <div className="image-picker" onClick={goPage.bind(undefined, '/image_picker')}>{formatLanguage('nav.imagePicker')}</div>
                </div>
            </div>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Navigate replace={true} to={'/converter'} />} />
                    {$.maps(routerItem,({ path,component }:{ path:string,component:FC },index:number) => <Route key={index} path={path} element={createElement(component)} />)}
                </Routes>
                <div className="footer">&copy; CopyRight By Alex Chen</div>
            </div>
        </Container>
    )
}

export default Main