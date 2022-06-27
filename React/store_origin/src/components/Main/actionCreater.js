import actionType from '../Main'
import axios from 'axios'

const thunkAction = {
    getItem: datas => ({
        type:actionType.typesName.getItemTypes,
        datas
    }),
    isSearching:(isSearchings,currentStarus) => ({
        type:actionType.typesName.searching,
        searchObj:{
            searching:isSearchings,
            status:currentStarus
        }
    }),
    hasClick: changeState =>({
        type:actionType.typesName.searchBtnHasClick,
        changeState
    }),
}
const actions = {
    isSearchingDefault:(isSearchings,currentStarus) => ({
        type:actionType.typesName.searchingDefault,
        searchObj:{
            searching:isSearchings,
            status:currentStarus
        }
    }),
    getVal: val => ({
        type:actionType.typesName.getVal,
        val
    }),
    getSelectVal: val => ({
        type:actionType.typesName.getSelectVal,
        val
    }),
    getItems: (searchVal,selectVal,routerProps) => (
        dispatch => (
            axios.post(`https://itunes.apple.com/search?term=${searchVal}&media=${selectVal}&country=tw&limit=200`).then(
            res=>{
                dispatch(thunkAction.isSearching(true,1))
                if(res.status === 200){
                    setTimeout(()=>{
                        dispatch(thunkAction.isSearching(true,2))
                    },1500)
                    if(res.data.results.length === 0){
                        setTimeout(()=>dispatch(thunkAction.isSearching(true,3)),1500)
                    } else {
                        setTimeout(()=>{
                            dispatch(thunkAction.getItem(res.data))
                            dispatch(thunkAction.isSearching(true,4))
                        },1500)
                    } 
                }
            }).catch(res=>{
                alert(res)
                dispatch(thunkAction.hasClick(false))
                routerProps.push("/")
            })
        )
    ),
    hasClick: changeState => ({
        type:actionType.typesName.searchBtnHasClick,
        changeState
    })
}

export default actions