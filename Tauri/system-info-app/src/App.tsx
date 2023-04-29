import { FC, useEffect, useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

interface SystemInfo {
  cpu_info?: {
    cpu_usage: number, 
    name: string, 
    vendor_id: string, 
    brand: string, 
    frequency: number
  },
  cpu_num?: number,
  cpu_num_thread?: number,
  memory?: {
    total_memory: number, 
    used_memory: number, 
    free_memory: number, 
    available_memory: number
  },
  name?: string,
  os_arch?: string,
  os_version?: string,
  plantform?: string
}

const App:FC = ():JSX.Element => {

  const [{
    computerInfo
  },setInitState] = useState<{
    computerInfo: SystemInfo
  }>({
    computerInfo: {}
  })

  const timer = useRef<any>(undefined)

  const getSystemInfo: () => Promise<void> = async () => {
    const res = await invoke<string>("get_sys_info").then<SystemInfo>(res => {
      const obj = JSON.parse(res)
      obj.computer_info.cpu_info = JSON.parse(obj.computer_info.cpu_info)
      return obj.computer_info
    })
    
    setInitState(prevState => ({ ...prevState,computerInfo:res }))
  }

  useEffect(() => {
    getSystemInfo()

    timer.current = setInterval(async () => {
      await getSystemInfo()
    }, 1000)

    return () => {
      clearInterval(timer.current)
    }
  }, [])

  console.log(computerInfo.cpu_info)

  return (
    <div className="container">
      <h1>System Information</h1>

      <div className="content">
        <div>PC Name : {computerInfo?.name}</div>
        <div>Plantform : {computerInfo?.plantform === 'Darwin' ? 'MacOS' : 'Windows'} OS Version:{computerInfo?.os_version} {computerInfo.os_arch}</div>
        <div>CPU : {computerInfo?.cpu_info?.brand}</div>
        <div>CPU Norm : {computerInfo?.cpu_num} Core {computerInfo?.cpu_num_thread} Thread , Used: {Math.floor(computerInfo?.cpu_info?.cpu_usage!)} %</div>
        <div>RAM : {computerInfo?.memory?.used_memory!.toFixed(2)} GB / {computerInfo?.memory?.total_memory!.toFixed(2)} GB, Remain: {(parseFloat(computerInfo?.memory?.total_memory!.toFixed(2)!) - parseFloat(computerInfo?.memory?.used_memory!.toFixed(2)!)).toFixed(2)} GB</div>
      </div>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a title="Typescript" href="https://www.typescriptlang.org/" target="_blank">
          <img src="/typescript.svg" className="logo typescript" alt="typescript logo" />
        </a>
      </div>
    </div>
  );
}

export default App;
