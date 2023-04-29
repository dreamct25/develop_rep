import { ChangeEvent, FC, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke, dialog } from '@tauri-apps/api'
import { Modal } from './component'
import StylesLayout from "./styles";

interface PersonDataType {
  uuid:number,
  name:string,
  old:number,
  create_date:string,
  update_date:string
}

const App:FC = ():JSX.Element => {
  const [{
    currentAction,
    currentId,
    currentPerson,
    inputGroup,
    modalObj,
    deleteModalObj,
    personData
  }, setInitState] = useState<{
    currentAction: string
    currentId: number,
    currentPerson:string,
    inputGroup:{
      name:string,
      old:string
    },
    modalObj: { 
      modalTitle:string, 
      toggleModalStatus:boolean
    },
    deleteModalObj: {
      modalTitle:string, 
      toggleModalStatus:boolean
    }
    personData: PersonDataType[]
  }>({
    currentAction: '',
    currentId: -1,
    currentPerson: '',
    inputGroup: {
      name: '',
      old: ''
    },
    modalObj: {
      toggleModalStatus: false,
      modalTitle: ''
    },
    deleteModalObj: {
      toggleModalStatus: false,
      modalTitle: ''
    },
    personData: []
  })

  const getData:() => Promise<void> = async () => {
    const { message,data } = await invoke<string>('get_all_data').then<{ message:string,data:PersonDataType[] }>(res => JSON.parse(res))

    if(message === 'success'){
      setInitState(prevState => ({
        ...prevState,
        personData: data
      }))
    } else {
      console.log(message)
    }
  }

  const openModalAction:(type:string, obj?: PersonDataType) => void = async (type,obj) => {
    setInitState(prevState => ({
      ...prevState,
      currentAction: type,
      currentId: obj ? obj.uuid : -1,
      currentPerson: obj && type === 'Delete' ? obj!.name : '',
      inputGroup: type !== 'Delete' ? { 
        ...prevState.inputGroup,
        name: type === 'Edit' ? obj!.name : '',
        old: type === 'Edit' ? obj!.old.toString() : '' 
      } : prevState.inputGroup,
      modalObj: type !== 'Delete' ? {
        ...prevState.modalObj,
        toggleModalStatus: true,
        modalTitle: `${type} Person`
      } : prevState.modalObj,
      deleteModalObj: type === 'Delete' ? {
        ...prevState.deleteModalObj,
        toggleModalStatus: true,
        modalTitle: `${type} Person`
      } : prevState.deleteModalObj,
    }))
  }

  const handleAction:(type:string) => Promise<void> = async type => {
    if(type === 'confirm'){
      if(currentAction === 'Delete'){
        const { message } = await invoke<string>('delete_data',{ uuid:currentId }).then<{ message:string }>(res => JSON.parse(res))
        
        if(message === 'success'){
          await getData()
        } else {
          console.log(message)
        }
      } else {
        const { name,old } = inputGroup

        if(!name || !old){
          dialog.message('Please set Name and Old.', { title: 'Message',type: 'error' })
          return
        }

        const { message } = await invoke<string>(
          currentAction === 'Add' ? 'insert_data' : 'update_data',
          currentId === -1 ? { name,old:parseInt(old) } : { uuid:currentId, name,old:parseInt(old) }
        ).then<{ message:string }>(res => JSON.parse(res))
        
        if(message === 'success'){
          await getData()
        } else {
          console.log(message)
        }
      }
    }

    setInitState(prevState => ({
      ...prevState,
      modalObj: currentAction !== 'Delete' ? {
        ...prevState.modalObj,
        toggleModalStatus: false,
        modalTitle: ''
      } : prevState.modalObj,
      deleteModalObj: currentAction === 'Delete' ? {
        ...prevState.deleteModalObj,
        toggleModalStatus: false,
        modalTitle: ''
      } : prevState.deleteModalObj,
    }))
  }

  useEffect(() => {
    getData()
  }, [])

  const setInputVal:(type:string,{ target }:ChangeEvent<HTMLInputElement>) => void = (type,{ target }) => {
    setInitState(prevState => {
      const deepCopy = JSON.parse(JSON.stringify(prevState))

      deepCopy.inputGroup[type] = target.value

      return deepCopy
    })
  }

  return (
    <StylesLayout>
      <div className="container">
        <div className="header">
          <h1>Person CRUD With MySQL</h1>
          <div className="add-btn" onClick={openModalAction.bind(this,'Add',undefined)}>Add Person</div>
        </div>
        <div className="main">
          <div className="tables">
            <div className="table-header">
              <div>Name</div>
              <div>Old</div>
              <div>Create / Update Date</div>
              <div>Action</div>
            </div>
            <div className="table-body">
              {personData.length > 0 ? personData.map((item,index) => (
                <div key={index} className="row">
                  <div>{item.name}</div>
                  <div>{item.old}</div>
                  <div>{item.create_date} / {item.update_date}</div>
                  <div className="row-btns">
                    <div onClick={openModalAction.bind(this, 'Edit',item)}>Edit</div>
                    <div onClick={openModalAction.bind(this, 'Delete', item)}>Delete</div>
                  </div>
                </div>
              )) : (
                <div className="no-data">-- No Persons --</div>
              )}
            </div>
          </div>
        </div>
        <div className="footer">
          <h6>&copy; CopyRight 2023-04 Alex Chen .</h6>
        </div>
        <div className="bottom">
          <div className="row">
            <div className="title">Prowed By</div>
            <div className="icons-group">
              <a title="Vite" href="https://vitejs.dev" target="_blank">
                <img src="/vite.svg" className="logo vite" alt="Vite logo" />
              </a>
              <a title="Tauri" href="https://tauri.app" target="_blank">
                <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
              </a>
              <a title="React" href="https://react.dev/" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
              <a title="Typescript" href="https://www.typescriptlang.org/" target="_blank">
                <img src="/typescript.svg" className="logo typescript" alt="typescript logo" />
              </a>
            </div>
          </div>
        </div>
        <Modal modalObj={modalObj} handleAction={handleAction}>
          <div className="input-group">
            <input type="text" placeholder="Name" value={inputGroup.name} onChange={setInputVal.bind(this,'name')} />
            <input type="text" placeholder="Old" value={inputGroup.old} onChange={setInputVal.bind(this,'old')} />
          </div>
        </Modal>
        <Modal modalObj={deleteModalObj} handleAction={handleAction}>
          <span>{`Do you want to delete ${currentPerson} this person ?`}</span>
        </Modal>
      </div>
    </StylesLayout>
  );
}

export default App;
