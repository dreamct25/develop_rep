import React,{ memo,FunctionComponent, useState, useEffect } from "react";
import { ipcRenderer, IpcRendererEvent } from "electron";
import { Container } from './styles'

const WhenStartLoading:FunctionComponent = ():JSX.Element => {
    const [showLoading,setShowLoading] = useState<boolean>(false)

    ipcRenderer.on('closeLoading',(event:IpcRendererEvent,val:boolean) => setShowLoading(val))

    useEffect(() => setShowLoading(true),[])

    return(
        <Container>
            <div className={showLoading ? "loading-outer toggle" : "loading-outer"}>
                <div className="loading"></div>
                <div className="loading-text">Start Up</div>
            </div>
        </Container>
    )
}

export default memo(WhenStartLoading)