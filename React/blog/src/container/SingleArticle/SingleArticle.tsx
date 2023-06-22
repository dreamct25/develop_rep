import React,{ useContext,useEffect,useState,ChangeEvent } from "react";
import { useLocation,useNavigate } from 'react-router-dom'
import MarkDownIt from 'markdown-it'
import MarkdownCodeHighLight from 'markdown-it-highlightjs'
import { NewContext } from '../../App'
import { CustomInput,CustomTextArea,Loading } from '../../component'
import { articleObjType } from '../ArticleAll'
import { Container,leaveMsgObjType } from '.'
import 'highlight.js/scss/github-dark.scss'

const SingleArticle:FC = ():TSX => {
    const { $,Fetch,getReducer,changeWebTitle } = useContext(NewContext)
    const router = useNavigate() 
    const { pathname } = useLocation()

    const markDown = new MarkDownIt().use(MarkdownCodeHighLight,{ inline:true })
    
    const [{
        singleArticleData,
        singleArticleMsgData,
        renderArticleUds,
        msgValGroups,
        resValGroups,
        currentResContentListIndex
    },setInitState] = useState<{
        singleArticleData:articleObjType[]
        singleArticleMsgData:leaveMsgObjType[]
        renderArticleUds:string[],
        msgValGroups:{ msgNickName:string,msgContent:string },
        resValGroups:{ resMsgNickName:string,resMsgContent:string },
        currentResContentListIndex:number
    }>({
        singleArticleData:[],
        singleArticleMsgData:[],
        renderArticleUds:[],
        msgValGroups:{ msgNickName: '',msgContent: '' },
        resValGroups:{ resMsgNickName: '',resMsgContent: '' },
        currentResContentListIndex: -1
    })

    const [loadingStatus,setLoadingStatus] = useState<boolean>(false)

    const { articleData } = getReducer(state => ({ ...state.MainReducer }))

    const articleCategoryDesc = {
        codeCollect: '程式語言',
        potographyCollect: '攝影',
        psychologyCollect: '大眾心理'
    }

    const goRenderArtilce:(ud:string,replacePath:boolean) => Promise<void> = async (ud,replacePath) => {
        setLoadingStatus(true)

        await Fetch.post<{[key:string]:any,result:articleObjType[]}>('/view_single_article',{ data:{ ud } }).then(res => {
            let renderArr:string[] = []
            const pos = $.findIndexOfObj(articleData,({ uuid }:articleObjType) => uuid === ud)

            if(pos === 0){
                renderArr = ['',ud,articleData[pos + 1].uuid]
            } else if(pos >= 1 && pos <= articleData.length - 2){
                renderArr = [articleData[pos - 1].uuid,ud,articleData[pos + 1].uuid]
            } else if(pos === articleData.length - 1){
                renderArr = [articleData[pos - 1].uuid,ud,'']
            }

            if(replacePath){
                router({ pathname:`/single_article/${ud}` },{ replace:true })
            }

            setInitState(prevState => ({
                ...prevState,
                singleArticleData:res!.data!.result,
                renderArticleUds:renderArr
            }))
        }).catch(err => console.log(err))

        await Fetch.post<{ result:leaveMsgObjType[] }>('/msg_l_on',{ data:{ aud:ud } }).then(res => {
            setInitState(prevState => ({
                ...prevState,
                singleArticleMsgData:res!.data!.result
            }))
        }).catch(err => console.log(err))

        setLoadingStatus(false)
    }

    const showResContentList:(index:number) => void = index => {
        setInitState(prevState => ({
            ...prevState,
            currentResContentListIndex:prevState.currentResContentListIndex === index ? -1 : index
        }))
    }

    const setMsgGroupVal:(member:string,type:string,{ target }:ChangeEvent<HTMLInputElement>) => void = (member,type,{ target }) => {
        
        setInitState(prevState => {
            const deepCopy = JSON.parse(JSON.stringify((prevState as {[key:string]:any})[member]))

            deepCopy[type] = target.value

            return { ...prevState,[member]:deepCopy }
        })
    }

    const postMsg:(type:string,msgud:string) => void = (type,msgud) => {
        const regexp = new RegExp(/<(\w+)>/)

        if(type === 'leaveMsg'){
            if(msgValGroups.msgNickName && msgValGroups.msgContent){

                if(!regexp.test(msgValGroups.msgNickName) && !regexp.test(msgValGroups.msgContent)){
                    const [{ uuid }] = singleArticleData
    
                    Fetch.post('/msg_l_to',{ 
                        data:{
                            aud: uuid,
                            msgNickName:msgValGroups.msgNickName,
                            msgContent:msgValGroups.msgContent,
                            createDate:$.formatDateTime({ formatDate:new Date(),formatType:'yyyy-MM-dd HH:mm:ss' }),
                            resContentList:[]
                        } 
                    }).then(async () => {
                        await goRenderArtilce(uuid,false)
        
                        setInitState(prevState => ({
                            ...prevState,
                            msgValGroups:{ msgNickName:'',msgContent:'' }
                        }))
                    }).catch(err => console.log(err))
                } else {
                    alert('有出現錯誤字元喔 ~')
                }
            } else {
                alert('請輸入完整留言內容 ~')
            }
        } else {
            if(resValGroups.resMsgNickName && resValGroups.resMsgContent){

                if(!regexp.test(resValGroups.resMsgNickName) && !regexp.test(resValGroups.resMsgContent)){
                    const [{ uuid }] = singleArticleData
    
                    Fetch.post('/res_l_to',{ 
                        data:{
                            msgud,
                            resMsgNickName:resValGroups.resMsgNickName,
                            resMsgContent:resValGroups.resMsgContent,
                            createDate:$.formatDateTime({ formatDate:new Date(),formatType:'yyyy-MM-dd HH:mm:ss' }),
                        } 
                    }).then(async () => {
                        await goRenderArtilce(uuid,false)
        
                        setInitState(prevState => ({
                            ...prevState,
                            resValGroups:{ resMsgNickName:'',resMsgContent:'' }
                        }))
                    }).catch(err => console.log(err))
                } else {
                    alert('有出現錯誤字元喔 ~')
                }
            } else {
                alert('請輸入完整留言內容 ~')
            }
        }
        
    }

    useEffect(() => {
        if(articleData.length > 0){
            if(pathname){
                const getUd = pathname.split('/')
                if(getUd.length === 3){
                    const [,,ud] = getUd
                    goRenderArtilce(ud,false)
                }
            }
        }
    }, [articleData,pathname])

    return pug`
        Container
            if singleArticleData.length > 0
                |#{changeWebTitle(singleArticleData[0].articleTitle)}
            if singleArticleData.length === 0
                .no-data 無內容 此人正在偷懶 ~
            else
                .single-article-layout
                    if renderArticleUds[0]
                        .prev-angle(onClick=goRenderArtilce.bind(this,renderArticleUds[0],true))
                            i(className="far fa-angle-left")
                    .single-article
                        each item,index in singleArticleData
                            .article-main(key=index)
                                .context
                                    .top
                                        .title #{item.articleTitle}
                                        div(dangerouslySetInnerHTML={ __html: markDown.render(item.articleContent) })
                                    .bottom
                                        div 留言 ( #{singleArticleMsgData.length} )
                                        div 
                                            |&nbsp;#{item.fullDate}&nbsp;&nbsp;
                                            i(className="fas fa-tag")
                                            |&nbsp;&nbsp;#{articleCategoryDesc[item.collectType]}
                                .leave-msg-layout
                                    .leave-msg-input-groups
                                        CustomInput(
                                            className=msgValGroups.msgNickName ? 'lock' : ''
                                            label="暱稱",
                                            bindVal=msgValGroups.msgNickName,
                                            type="text",
                                            changeEvent=setMsgGroupVal.bind(this,'msgValGroups','msgNickName')
                                        )
                                        CustomTextArea(
                                            className=msgValGroups.msgContent ? 'lock' : ''
                                            label="留言內容",
                                            bindVal=msgValGroups.msgContent,
                                            useTextArea=true
                                            changeEvent=setMsgGroupVal.bind(this,'msgValGroups','msgContent')
                                        )
                                        .leave-msg-btn(onClick=postMsg.bind(this,'leaveMsg','')) 留言
                                    if singleArticleMsgData.length > 0
                                        .msg-list
                                            each item,index in singleArticleMsgData
                                                .msg-list-item(key=index)
                                                    .msg-title #{item.msgNickName}
                                                    .msg-content #{item.msgContent}
                                                    .msg-footer
                                                        div(className="res-btn",onClick=showResContentList.bind(this,index)) 回覆 ( #{item.resContentList.length} )
                                                        div &nbsp;#{item.createDate}
                                                    .leave-res-group(className=currentResContentListIndex === index ? 'active' : '')
                                                        if item.resContentList.length > 0
                                                            .res-list(className=currentResContentListIndex === index ? 'active' : '')
                                                                each resItem,resIndex in item.resContentList
                                                                    .res-list-item(key=resIndex)
                                                                        .res-title 
                                                                            span #{resItem.resMsgNickName} 
                                                                            span #{resItem.createDate}
                                                                        .res-content #{resItem.resMsgContent}
                                                        .leave-res-input-groups
                                                            CustomInput(
                                                                className=resValGroups.resMsgNickName ? 'lock' : ''
                                                                label="暱稱",
                                                                bindVal=resValGroups.resMsgNickName,
                                                                type="text",
                                                                changeEvent=setMsgGroupVal.bind(this,'resValGroups','resMsgNickName')
                                                            )
                                                            CustomTextArea(
                                                                className=resValGroups.resMsgContent ? 'lock' : ''
                                                                label="回覆內容",
                                                                bindVal=resValGroups.resMsgContent,
                                                                useTextArea=true
                                                                changeEvent=setMsgGroupVal.bind(this,'resValGroups','resMsgContent')
                                                            )
                                                            .leave-res-btn(onClick=postMsg.bind(this,'resMsg',item.uuid)) 回覆
                    if renderArticleUds[2]
                        .next-angle(onClick=goRenderArtilce.bind(this,renderArticleUds[2],true))
                            i(className="far fa-angle-right")
            Loading(loadingStatus=loadingStatus)
    `
}

export default SingleArticle