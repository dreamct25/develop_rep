import { useState, useEffect } from "react";
import { ipcRenderer, IpcRendererEvent } from "electron";
import { useTranslation } from 'react-i18next'
import { StyledLayout } from '.'

const WhenStartLoading:FC = ():TSX => {

    const { t: formatLanguage } = useTranslation()

    const [showLoading,setShowLoading] = useState<boolean>(false)

    useEffect(() => {

        setShowLoading(true)

        ipcRenderer.on('closeLoading',(event:IpcRendererEvent,val:boolean) => setShowLoading(val))
        
    },[])

    return(
        <StyledLayout>
            <div className={showLoading ? "loading-outer toggle" : "loading-outer"}>
                <div className="loading"></div>
                <div className="loading-text">{formatLanguage('component.WhenStartLoading.startUp')}</div>
            </div>
        </StyledLayout>
    )
}

export default WhenStartLoading