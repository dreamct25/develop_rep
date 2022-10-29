import React, { FC, useEffect, useState } from "react";
import { ipcRenderer } from 'electron'

const App:FC = ():JSX.Element => {
    const [fromServer,setFromServer] = useState(undefined)
    const [fromElectron,setFromElectron] = useState(undefined)

    const getData:() => void = async () => {
        const res = await fetch('http://localhost:9995/api/some')

        const result = await res.json()

        setFromServer(result)
    }

    useEffect(() => {
        getData()

        ipcRenderer.on('getSome',(event,result) => setFromElectron(result))
    }, [])
    
    return (
        <div>
            Hello Electron & React Client & Express Server & Webpack !
            <br />
            {fromServer && JSON.stringify(fromServer)}
            <br />
            {fromElectron && JSON.stringify(fromElectron)}
        </div>
    )
}

export default App