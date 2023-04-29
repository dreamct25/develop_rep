import { useState,useEffect, FC, ChangeEvent } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from '@tauri-apps/api/event'
// import "./App.css";
import StyledLayout from './style'

interface Person {
  uuid:number,
  name:string,
  old:number,
  create_date:string,
  update_date:string
}

const App:FC = ():JSX.Element => {
  const [{
    renderData,
    inputGroup
  }, setInitState] = useState<{
    renderData: Person[],
    inputGroup: {
      name:string,
      old:string
    }
  }>({
    renderData: [],
    inputGroup: {
      name: '',
      old: ''
    }
  });

  const setInputVal:(type:string, { target }:ChangeEvent<HTMLInputElement>) => void = (type, { target }) => {
    setInitState(prevState => {
      const deepCopy = JSON.parse(JSON.stringify(prevState)) as typeof prevState

      (deepCopy.inputGroup as {[key:string]:any})[type] = target.value;

      return deepCopy
    })
  }

  const addData:() => void = () => {
    invoke<{ message?:string }>('create_person',{ name:inputGroup.name, old:parseInt(inputGroup.old) }).then(res => {
      console.log(JSON.parse(res as string))
      setInitState(prevState => ({ ...prevState,inputGroup:{ ...prevState.inputGroup,name: '',old: '' } }))
      getData()
    }).catch(err => console.log(err))
  }

  const deleteData:(uuid:number) => void = uuid => {
    invoke<{ message?:string }>('delete_person',{ uuid }).then(res => {
      console.log(JSON.parse(res as string))
      getData()
    }).catch(err => console.log(err))
  }

  const updateData:(item:Person) => void = item => {
    item.name = 'rake'
    item.old = 888
    invoke<{ message?:string }>('update_person',{ obj: item }).then(res => {
      console.log(JSON.parse(res as string))
      getData()
    }).catch(err => console.log(err))
  }

  const getData: () => void = () => {
    invoke<string>("get_all_data").then(res => setInitState(prevState => ({ ...prevState,renderData: JSON.parse(res) })))
  }

  useEffect(() => {
    const unListen = listen('test-t',(event) => console.log(event))
    getData()
  
    return () => {
      unListen.then(f => f())
    }
  },[])

  return (
    <StyledLayout>
      <div className="top">
        <h1>Person CRUD With MySQL</h1>
        <div className="render-table">
          <input type="text" value={inputGroup.name} onChange={setInputVal.bind(this, 'name')} />
          <input type="text" value={inputGroup.old} onChange={setInputVal.bind(this, 'old')} />
          <div onClick={addData}>Add</div>
          {renderData.length > 0 && renderData.map((item,index) => (
            <div key={index} className="row">
              <div>{item.name}</div>
              <div>{item.old}</div>
              <div>{item.create_date}</div>
              <div>{item.update_date || 'no update date'}</div>
              <div className="action-btn">
                <div onClick={updateData.bind(this,item)}>Edit</div>
                <div onClick={deleteData.bind(this,item.uuid)}>Delete</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom">
        <div className="txt">Powered By Tauri</div>
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
        </div>
      </div>
    </StyledLayout>
  );
}

export default App;
