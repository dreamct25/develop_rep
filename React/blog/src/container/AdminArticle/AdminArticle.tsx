import React,{ ChangeEvent, useContext,useEffect, useState,useRef } from "react";
import MarkdownEditor,{ bold,italic,unorderedListCommand,orderedListCommand,link,image,code,codeBlock,hr } from '@uiw/react-md-editor';
import { useNavigate } from 'react-router-dom'
import { NewContext } from '../../App'
import PaginationConfig,{ paginationType,PaginationProps } from '../../utiles/paginationConfig'
import { CustomInput,ActionModal,Pagination,Loading } from '../../component'
import { Container,articleDatasType,valGroupsType } from '.'

const AdminArticle:FC = ():TSX => {
    const { Fetch,$,getReducer,rwdStatus,changeWebTitle } = useContext(NewContext)
    const router = useNavigate()

    const collectTypeGroup = {
        all:'全部',
        potographyCollect:'攝影',
        psychologyCollect:'大眾心理',
        codeCollect:'程式語言'
    }

    const currentActionTypeGroup = {
        ADD:'新增',
        EDIT:'編輯',
        DELETE:'刪除',
        READ:'檢視'
    }

    const [{
        articleDatas,
        renderArticleDatas,
        valGroups,
        toggleOptionList,
        toggleAddOrUpdateModalStatus,
        toggleDeleteModalStatus,
        currentAction,
        useDisabled,
        paginationObj,
        mdLayoutDarkModToggle,
        currentFilterAricleCategoryType
    },setInitState] = useState<{
        articleDatas:articleDatasType[],
        renderArticleDatas:articleDatasType[]
        valGroups:valGroupsType,
        toggleOptionList:boolean,
        toggleAddOrUpdateModalStatus:boolean
        toggleDeleteModalStatus:boolean
        currentAction:string,
        useDisabled:boolean,
        paginationObj:paginationType,
        mdLayoutDarkModToggle:boolean,
        currentFilterAricleCategoryType:string
    }>({
        articleDatas:[],
        renderArticleDatas:[],
        valGroups:{
            articleTitle: '',
            articleContent: '',
            articleShortContent: '',
            cardImg: '',
            collectType: '',
            fullDate: $.formatDateTime({ formatDate:new Date(),formatType:'yyyy-MM-dd' }) as string
        },
        toggleOptionList:false,
        toggleAddOrUpdateModalStatus:false,
        toggleDeleteModalStatus:false,
        currentAction:'',
        useDisabled:false,
        paginationObj:{},
        mdLayoutDarkModToggle:false,
        currentFilterAricleCategoryType:'all'
    })

    const [loadingStatus,setLoadingStatus] = useState<boolean>(false)
    const mdLayoutDarkModToggleRef = useRef(mdLayoutDarkModToggle)

    const { authInfo } = getReducer(state => ({ ...state.AdminLoginReducer }))

    const mdDarkModBtn = {
        name: 'DarkMod',
        keyCommand: 'DarkMod',
        buttonProps: { 'aria-label': 'DarkMod' },
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-sun" viewBox="0 0 16 16"> <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/> </svg>
        ),
        execute: () => {
            setInitState(prevState => ({
                ...prevState,
                mdLayoutDarkModToggle:!mdLayoutDarkModToggleRef.current
            }))
        }
    }

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

            filterCollectType(currentFilterAricleCategoryType,pages,partPage,pageSize)
        }
    }

    const getData:() => void = () => {
        setLoadingStatus(true)

        Fetch.get<articleDatasType[]>('/back_view_all',{ token:authInfo.token }).then(res => {
            const { pageObj,renderItem } = PaginationConfig.createParts<articleDatasType>(res.data!,1,10,10)
            
            setInitState(prevState => ({
                ...prevState,
                articleDatas:res.data!,
                renderArticleDatas:renderItem,
                paginationObj:pageObj
            }))

            setLoadingStatus(false)
        }).catch(() => alert('error'))
    }

    const setVal:(type:string,{ target }:ChangeEvent<HTMLInputElement>) => void = (type,{ target }) => {
        const deepCopy = JSON.parse(JSON.stringify(valGroups))

        deepCopy[type] = target.value

        setInitState(prevState => ({
            ...prevState,
            valGroups:deepCopy
        }))
    }

    const setValFormDeffrent:(type:string,value:string) => void = (type,value) => {
        const deepCopy = JSON.parse(JSON.stringify(valGroups))

        deepCopy[type] = value

        if(type === 'collectType'){
            setInitState(prevState => ({
                ...prevState,
                valGroups:deepCopy,
                toggleOptionList:false
            }))
        } else {
            setInitState(prevState => ({
                ...prevState,
                valGroups:deepCopy
            }))
        }   
    }

    const showSingleArticle:(currentAction:string,valGroups:valGroupsType) => void = (currentAction,valGroups) => {
        if(currentAction === 'DELETE'){
            setInitState(prevState => ({
                ...prevState,
                currentAction,
                valGroups,
                toggleDeleteModalStatus:true
            }))
        } else {
            setInitState(prevState => ({
                ...prevState,
                currentAction,
                valGroups,
                toggleAddOrUpdateModalStatus:true,
                useDisabled:currentAction === 'READ'
            }))
        }
    }

    const useModalActions:(type:string,modalActions:string) => void = (type,modalActions) => {
        let reGetData:boolean = false

        const excuteMethod = {
            [type]:async ():Promise<void> => {
                if(modalActions === 'confirm'){
                    if(type !== 'READ'){
                        const today = $.formatDateTime({ formatDate:new Date(),formatType:'yyyy-MM-dd' }) as string

                        const url = type === 'ADD' ? '/add_article' : '/update_article'

                        const postDataSetting:{[key:string]:any} = JSON.parse(JSON.stringify(valGroups))

                        if(type === 'EDIT'){
                            postDataSetting.modifyDate = today
                        } else {
                            delete postDataSetting.ud
                            postDataSetting.createDate = today
                            postDataSetting.modifyDate = today
                        }

                        setLoadingStatus(true)

                        await Fetch.post(url,{ token:authInfo.token,data:postDataSetting })
                        
                        reGetData = true

                        setLoadingStatus(false)
                    }
                }
            },
            DELETE:async ():Promise<void> => {
                if(modalActions === 'confirm'){
                    const { ud } = valGroups
                    await Fetch.post('/delete_article',{ token:authInfo.token,data:{ ud } })

                    setLoadingStatus(true)

                    reGetData = true

                    setLoadingStatus(false)
                }
            }
        }[type] as () => Promise<void>

        excuteMethod().finally(() => {
            setInitState(prevState => ({
                ...prevState,
                toggleAddOrUpdateModalStatus:false,
                toggleDeleteModalStatus:false,
                valGroups:{
                    ud: undefined,
                    articleTitle: '',
                    articleContent: '',
                    articleShortContent: '',
                    cardImg: '',
                    collectType: '',
                    fullDate: $.formatDateTime({ formatDate:new Date(),formatType:'yyyy-MM-dd' }) as string,
                    createDate: undefined
                },
                useDisabled:false
            }))

            reGetData && getData()
        })
    }

    const filterCollectType:(...parameters:[string,number | undefined,number | undefined,number | undefined]) => void = (...parameters) => {
        const [type,pages,partPage,pageSize] = parameters

        const filterItem = type === 'all' ? articleDatas : $.filter<articleDatasType>(articleDatas,({ collectType }):any => collectType === type)

        const { pageObj,renderItem } = PaginationConfig.createParts<articleDatasType>(filterItem,typeof pages !== 'object' && pages ? pages : 1,partPage || 10,pageSize || 10)
    
        setInitState(prevState => ({
            ...prevState,
            renderArticleDatas:renderItem,
            paginationObj:pageObj,
            currentFilterAricleCategoryType:type
        }))
    }

    const filterCollectCountText:(type:string) => string = type => {
        const filterItem = type === 'all' ? articleDatas : $.filter<articleDatasType>(articleDatas,({ collectType }):any => collectType === type)
        return type === 'all' ? '' : `${(collectTypeGroup as {[key:string]:any})[type]} ${filterItem.length} 篇，`
    }

    useEffect(() => {
        mdLayoutDarkModToggleRef.current = mdLayoutDarkModToggle
    }, [mdLayoutDarkModToggle])

    useEffect(() => {
        authInfo?.token ? getData() : router({ pathname:'/admin/login' })
    }, [authInfo])

    return pug`
        Container
            |#{changeWebTitle('後台文章管理')}
            .articles-layout
                if articleDatas.length > 0
                    .article-category-bar
                        each item,index in $.objDetails(collectTypeGroup,'entries')
                            div(key=index,className=currentFilterAricleCategoryType === item[0] ? 'active' : '',onClick=filterCollectType.bind(this,item[0])) #{item[1]}
                if !rwdStatus
                    .article-list-header
                        each val,index in ['文章標題','文章簡述','文章分類','文章 / 修改日期','操作項']
                            div(key=index) #{val}
                .article-list
                    if renderArticleDatas.length === 0
                        .no-data -- 無文章 --
                    else
                        each item,index in renderArticleDatas
                            if !rwdStatus
                                .article-list-item(key=index)
                                    div #{item.articleTitle}
                                    div #{item.articleShortContent}
                                    div #{collectTypeGroup[item.collectType]}
                                    div #{item.fullDate} / #{item.modifyDate}
                                    .btn-group
                                        .preview(onClick=showSingleArticle.bind(this,'READ',{
                                            ud:item.uuid,
                                            articleTitle: item.articleTitle,
                                            articleContent: item.articleContent,
                                            articleShortContent: item.articleShortContent,
                                            cardImg: item.cardImg,
                                            collectType: item.collectType,
                                            fullDate: item.fullDate
                                        }))
                                            i(className="fas fa-eye")
                                        .edit-btn(onClick=showSingleArticle.bind(this,'EDIT',{
                                            ud:item.uuid,
                                            articleTitle: item.articleTitle,
                                            articleContent: item.articleContent,
                                            articleShortContent: item.articleShortContent,
                                            cardImg: item.cardImg,
                                            collectType: item.collectType,
                                            fullDate: item.fullDate,
                                            createDate: item.createDate
                                        }))
                                            i(className="fas fa-pencil")
                                        .delete-btn(onClick=showSingleArticle.bind(this,'DELETE',{
                                            ud:item.uuid,
                                            articleTitle: item.articleTitle,
                                            articleContent: '',
                                            articleShortContent: '',
                                            cardImg: '',
                                            collectType: '',
                                            fullDate: '',
                                            createDate: undefined
                                        }))
                                            i(className="fas fa-trash-alt")
                            else
                                .article-list-item(key=index)
                                    .top
                                        .left
                                            div 文章標題
                                            div 文章簡述
                                            div 文章分類
                                            div 文章 / 修改日期
                                        .right
                                            div #{item.articleTitle}
                                            div #{item.articleShortContent}
                                            div #{collectTypeGroup[item.collectType]}
                                            div #{item.fullDate} / #{item.modifyDate}
                                    .bottom
                                        .btn-group
                                            .preview(onClick=showSingleArticle.bind(this,'READ',{
                                                ud:item.uuid,
                                                articleTitle: item.articleTitle,
                                                articleContent: item.articleContent,
                                                articleShortContent: item.articleShortContent,
                                                cardImg: item.cardImg,
                                                collectType: item.collectType,
                                                fullDate: item.fullDate
                                            }))
                                                i(className="fas fa-eye")
                                            .edit-btn(onClick=showSingleArticle.bind(this,'EDIT',{
                                                ud:item.uuid,
                                                articleTitle: item.articleTitle,
                                                articleContent: item.articleContent,
                                                articleShortContent: item.articleShortContent,
                                                cardImg: item.cardImg,
                                                collectType: item.collectType,
                                                fullDate: item.fullDate,
                                                createDate: item.createDate
                                            }))
                                                i(className="fas fa-pencil")
                                            .delete-btn(onClick=showSingleArticle.bind(this,'DELETE',{
                                                ud:item.uuid,
                                                articleTitle: item.articleTitle,
                                                articleContent: '',
                                                articleShortContent: '',
                                                cardImg: '',
                                                collectType: '',
                                                fullDate: '',
                                                createDate: undefined
                                            }))
                                                i(className="fas fa-trash-alt")
                .article-list-footer #{filterCollectCountText(currentFilterAricleCategoryType)}總文章數 #{articleDatas.length} 篇
                Pagination(...paginationObjPropsSetting)
            .add-article-btn(onClick=${() => setInitState(prevState => ({
                ...prevState,
                currentAction:'ADD',
                toggleAddOrUpdateModalStatus:true
            }))})
                i(className="far fa-plus")
            ActionModal(
                acionModalTitle=${`${(currentActionTypeGroup as {[key:string]:any})[currentAction]}文章`},
                toggleModalStatus=toggleAddOrUpdateModalStatus,
                confirmEvent=useModalActions.bind(this,currentAction,'confirm')
                cancelEvent=useDisabled ? undefined : useModalActions.bind(this,currentAction,'cancel')
            )
                .modal-top-groups
                    .input-outer
                        CustomInput(
                            className=valGroups.articleTitle ? 'lock' : '',
                            label="文章標題",
                            bindVal=valGroups.articleTitle,
                            type="text",
                            disabled=useDisabled,
                            changeEvent=setVal.bind(this,'articleTitle')
                        )
                    .input-outer
                        CustomInput(
                            className=valGroups.articleShortContent ? 'lock' : '',
                            label="簡短內文",
                            bindVal=valGroups.articleShortContent,
                            type="text",
                            disabled=useDisabled,
                            changeEvent=setVal.bind(this,'articleShortContent')
                        )
                    .input-outer
                        CustomInput(
                            className=valGroups.cardImg ? 'lock' : '',
                            label="列表圖連結",
                            bindVal=valGroups.cardImg,
                            type="text",
                            disabled=useDisabled,
                            changeEvent=setVal.bind(this,'cardImg')
                        )
                    .row.g-2.mb-1
                        .col-sm-7
                            .option-group
                                CustomInput(
                                    className=valGroups.collectType ? 'lock' : '',
                                    label="文章分類",
                                    bindVal=collectTypeGroup[valGroups.collectType],
                                    type="text",
                                    disabled=useDisabled,
                                    clickEvent=${() => setInitState(prevState => ({
                                        ...prevState,
                                        toggleOptionList:!toggleOptionList
                                    }))}
                                )
                                div(className=toggleOptionList ? 'option-list-outer active' : 'option-list-outer')
                                    each val,index in ['potographyCollect','psychologyCollect','codeCollect']
                                        .list-item(key=index,className=val === valGroups.collectType ? 'active' : '',onClick=setValFormDeffrent.bind(this,'collectType',val)) #{collectTypeGroup[val]}
                        .col-sm-5
                            .date-input
                                CustomInput(
                                    className=valGroups.fullDate ? 'lock' : ''
                                    label="年 / 月 / 日",
                                    bindVal=valGroups.fullDate
                                    type="date",
                                    disabled=useDisabled,
                                    changeEvent=setVal.bind(this,'fullDate')
                                )
                        div(data-color-mode=mdLayoutDarkModToggle ? 'dark' : 'light')
                            MarkdownEditor(
                                height=rwdStatus ? 180 : 250,
                                preview="edit",
                                commands=[bold,italic,hr,unorderedListCommand,orderedListCommand,link,image,code,codeBlock,mdDarkModBtn],
                                value=valGroups.articleContent,
                                textareaProps={ disabled:useDisabled,placeholder:'文章內文' }
                                onChange=setValFormDeffrent.bind(this,'articleContent')
                            )
            ActionModal(
                toggleModalStatus=toggleDeleteModalStatus,
                confirmEvent=useModalActions.bind(this,currentAction,'confirm')
                cancelEvent=useModalActions.bind(this,currentAction,'cancel') 
            )
                .action-modal-body
                    .delete-context 確定要刪除 #{valGroups.articleTitle} 此篇文章嗎？
            Loading(loadingStatus=loadingStatus)
                        
    `
}

export default AdminArticle