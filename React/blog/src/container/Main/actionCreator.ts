import { actionType,articleObjType } from '.'

const actionCreator:{
    setArticleData(data:articleObjType[]):{ type:string,data:articleObjType[] }
} = {
    setArticleData:data => ({
        type:actionType.SET_ARTICLE_DATA,
        data
    })
}

export default actionCreator