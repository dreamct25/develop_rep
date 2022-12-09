import React, { useContext,useEffect,useState } from "react"
import { useNavigate } from 'react-router-dom'
import { NewContext } from '../../App'
import { articleObjType,Container } from '.'
import PaginationConfig,{ paginationType,PaginationProps } from '../../utiles/paginationConfig'
import { CustomInput,ActionModal,Pagination,Loading } from '../../component'
import codeCollectJPG from '../../images/codeCollect.jpg'
import potographyCollectJPG from '../../images/potographyCollect.jpg'
import psychologyCollectJPG from '../../images/psychologyCollect.jpg'

const imgUrlGroup = {
    codeCollect:codeCollectJPG,
    potographyCollect:potographyCollectJPG,
    psychologyCollect:psychologyCollectJPG
}

const ArticleAll:FC = ():TSX => {
    const { getReducer,rwdStatus,changeWebTitle } = useContext(NewContext)
    const router = useNavigate()

    const { articleData } = getReducer(state => ({...state.MainReducer }))

    const [{
        paginationObj,
        renderArticleDatas
    },setInitState] = useState<{
        paginationObj:paginationType,
        renderArticleDatas:articleObjType[]
    }>({
        paginationObj:{},
        renderArticleDatas:[]
    })

    const [loadingStatus,setLoadingStatus] = useState<boolean>(false)

    const paginationObjPropsSetting:PaginationProps = {
        hasPrev: paginationObj.hasPrev!,
        hasNext: paginationObj.hasNext!,
        currentPage: paginationObj.currentPage!,
        pageTotal: paginationObj.pageTotal!,
        pageSize: paginationObj.pageSize!,
        partPage: paginationObj.partPage!,
        postNext: (paginationOption: {
            pages: number | undefined,
            partPage: number,
            pageSize: number
        }) => {
            const { pages,partPage,pageSize } = paginationOption
            const { pageObj,renderItem } = PaginationConfig.createParts<articleObjType>(articleData,pages,partPage,pageSize)
        
            setInitState(prevState => ({
                ...prevState,
                renderArticleDatas:renderItem,
                paginationObj:pageObj
            }))
        }
    }

    const articleCategoryDesc = {
        codeCollect: '程式語言',
        potographyCollect: '攝影',
        psychologyCollect: '大眾心理'
    }

    const goSingleArticle:(uuid:string) => void = ud => {
        router({ pathname:`/single_article/${ud}`, })
    }

    useEffect(() => {
        const { pageObj,renderItem } = PaginationConfig.createParts<articleObjType>(articleData,1,10,10)
            
        setInitState(prevState => ({
            ...prevState,
            renderArticleDatas:renderItem,
            paginationObj:pageObj
        }))

        setLoadingStatus(!(articleData.length > 0))
    },[articleData])

    return pug`
        Container
            if renderArticleDatas.length === 0
                .no-data 無文章 此人正在偷懶 ~
            else
                if !rwdStatus
                    .article-list-outer
                        .article-list
                            each item,index in renderArticleDatas
                                .article-item(key=index)
                                    .left
                                        div #{item.articleTitle}
                                        div
                                            i(className="far fa-calendar-star")
                                            |&nbsp;&nbsp;#{item.fullDate}
                                        div #{item.articleShortContent}

                                        div
                                            div
                                                i(className="fas fa-tag")
                                                |&nbsp;#{articleCategoryDesc[item.collectType]}
                                            div(onClick=goSingleArticle.bind(this,item.uuid)) （繼續閱讀 ...）
                                    .right
                                        .img(style={ backgroundImage:item.cardImg ? 'url(' +  item.cardImg + ')' : 'url(' + imgUrlGroup[item.collectType]  + ')' })
                else
                    .article-list-outer
                        .article-list
                            each item,index in renderArticleDatas
                                .article-item(key=index)
                                    div #{item.articleTitle}
                                    div
                                        i(className="far fa-calendar-star")
                                        |&nbsp;&nbsp;#{item.fullDate}
                                    div #{item.articleShortContent}

                                    div
                                        div
                                            i(className="fas fa-tag")
                                            |&nbsp;#{articleCategoryDesc[item.collectType]}
                                        div(onClick=goSingleArticle.bind(this,item.uuid)) （繼續閱讀 ...）
                                    .img(style={ backgroundImage:item.cardImg ? 'url(' +  item.cardImg + ')' : 'url(' + imgUrlGroup[item.collectType]  + ')' })
                Pagination(...paginationObjPropsSetting)
            Loading(loadingStatus=loadingStatus)

    `
}

export default ArticleAll