import React,{ useContext,Suspense,createElement, useEffect, useState } from "react";
import { Outlet,useNavigate } from 'react-router-dom'
import { articleObjType  } from '../ArticleAll'
import { NewContext } from '../../App'
import { Container ,actionCreator} from '.'

const Main:FC = ():TSX => {
    const { $,Fetch,setReducer,rwdStatus } = useContext(NewContext)
    const router = useNavigate()

    const [{
        topArticleDate,
        toggleRwdNavList
    },setInitState] = useState<{
        topArticleDate:articleObjType[],
        toggleRwdNavList:boolean
    }>({
        topArticleDate:[],
        toggleRwdNavList:false
    })

    const getArticleData:() => void = () => {

        Fetch.get<articleObjType[]>('/view_shorter_all').then(res => {
            const repackData = $.sort<articleObjType>(res!.data!,(a,b) => +new Date(b.fullDate) - +new Date(a.fullDate))
            setReducer(actionCreator,'setArticleData',repackData)
            setInitState(prevState => ({
                ...prevState,
                topArticleDate:$.createArray({ type:'fake',item:{ random:repackData.length > 6 ? 6 : repackData.length } },(num) => repackData[num]) as articleObjType[]
            }))
        }).catch(err => console.log(err))
    }

    const goAdminDash:() => void = () => router({ pathname:'/admin' })

    const goSingleArticle:(uuid:string) => void = ud => {
        router({ pathname:`/single_article/${ud}` },{ replace:true })
    }

    const showRwdNavList:() => void = () => setInitState(prevState => ({ ...prevState,toggleRwdNavList:!toggleRwdNavList }))

    useEffect(() => {
        getArticleData()
    }, [])
    
    return pug`
        Container
            .header
                h1 Alex Chen
                    br
                    span 菜菜的工程獅，喜歡四處流浪學習新知 ~
            .main
                .row
                    if !rwdStatus
                        .col-sm-9
                            Outlet
                        .col-sm-3
                            .right-bar
                                .top
                                    .about-layout
                                        .title 關於我
                                        .img-outer
                                            img(src="https://drive.google.com/uc?export=view&id=1B3t1sGrCXUosm5ZLxD63pXi1E2UlXn1x")
                                        .under Alex Chen
                                        .desc 四處流浪的工程師，平時喜歡四處拍拍照，學習新技術，偶爾也會看看心理學的東西分享所知，希望此處的內容對你有幫助 ~
                                .bottom
                                    .top-article-list
                                        .title 最新文章
                                        each item,index in topArticleDate
                                            .article-title(key=index,onClick=goSingleArticle.bind(this,item.uuid)) #{item.articleTitle}
                                    .to-board-btn(onClick=goAdminDash) 管理文章
                    else
                        .col-sm-12
                            Outlet
            if rwdStatus
                .rwd-nav-btn(onClick=showRwdNavList)
                    .line-group(className=toggleRwdNavList ? 'active' : '')
                        .line
                        .line
                        .line
            if rwdStatus
                .rwd-nav-list(className=toggleRwdNavList ? 'active' : '')
                    .top
                        .about-layout
                            .title 關於我
                            .img-outer
                                img(src="https://drive.google.com/uc?export=view&id=1B3t1sGrCXUosm5ZLxD63pXi1E2UlXn1x")
                            .under Alex Chen
                            .desc 四處流浪的工程師，平時喜歡四處拍拍照，學習新技術，偶爾也會看看心理學的東西分享所知，希望此處的內容對你有幫助 ~
                    .bottom
                        .top-article-list
                            .title 最新文章
                            each item,index in topArticleDate
                                .article-title(key=index,onClick=goSingleArticle.bind(this,item.uuid)) #{item.articleTitle}
                        .to-board-btn(onClick=goAdminDash) 管理文章

    `
}

export default Main