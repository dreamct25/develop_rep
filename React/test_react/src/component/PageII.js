import React,{useState,useEffect,useReducer} from 'react'
const data = {
    datas:[],
    searchVal:"",
    bindClickID:""
}
const reducer = (state = data,{type,value}) => {
    switch(type){
        case "update_datas":
            return {...state,datas:value}
        case "update_searchVal":
            return {...state,searchVal:value}
        case "update_bindClickID":
            return {...state,bindClickID:value}
    }
}
const PageII = props => {
    console.log("render pageII")
    let [{datas,searchVal,bindClickID},dispatch] = useReducer(reducer,data)
    const getData = async val => {
        let res = await fetch("http://localhost:9870/test_api/single_item",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id:val})
        })
        
        res.status === 200 && await res.json().then(resItem => dispatch({type:"update_datas",value:resItem}))
    }
    const changeSearchVal = val => dispatch({type:"update_searchVal",value:val})
    const searchID = () => dispatch({type:"update_bindClickID",value:searchVal})
    useEffect(() => getData(bindClickID),[bindClickID])
    return(
        <div>
            <input type="text" value={searchVal} onChange={({ target:{value}}) => changeSearchVal(value)} ></input>
            <div onClick={searchID.bind(this)}>searchID</div>
            <div>{datas.length !== 0 ? datas.map(({id,PersonName,PersonOld}) => `Current search ID：${id}，PersonName：${PersonName}，PersonOld：${PersonOld}`).join(""):"Current search：no data"}</div>
            <div>{JSON.stringify(props.obj)}</div>
        </div>
    )
}

export default PageII