import React,{ useEffect,useContext,useState,ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { NewContext } from '../../App'
import { articleDatasType } from '../AdminArticle'
import PaginationConfig,{ paginationType,PaginationProps } from '../../utiles/paginationConfig'
import { CustomInput,CustomTextArea,ActionModal,Pagination,Loading } from '../../component'
import { Container,msgDataObjType,valGroupsType,resContentListType } from '.'

const AdminMsg:FC = ():TSX => {
    const { $,Fetch,getReducer,rwdStatus,changeWebTitle } = useContext(NewContext)
    const router = useNavigate()

    const currentActionTypeGroup = {
        DELETE:'刪除',
        READ:'檢視',
        EDIT:'編輯'
    }

    const { authInfo } = getReducer(state => ({ ...state.AdminLoginReducer }))
    
    const [{
        msgData,
        renderMsgData,
        toggleModalStatus,
        toggleDeleteModalStatus,
        currentAction,
        valGroups,
        useDisabled,
        paginationObj
    },setInitState] = useState<{
        msgData:msgDataObjType[],
        renderMsgData:msgDataObjType[],
        toggleModalStatus:boolean,
        toggleDeleteModalStatus:boolean,
        valGroups:valGroupsType,
        currentAction:string,
        useDisabled:boolean,
        paginationObj:paginationType
    }>({
        msgData:[],
        renderMsgData:[],
        toggleModalStatus:false,
        toggleDeleteModalStatus:false,
        valGroups:{
            mud:'',
            articleID:'',
            msgNickName:'',
            msgContent:'',
            resContentList:[],
            createDate:''
        },
        currentAction:'',
        useDisabled:false,
        paginationObj:{}
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
            const { pageObj,renderItem } = PaginationConfig.createParts<msgDataObjType>(msgData,pages,partPage,pageSize)
        
            setInitState(prevState => ({
                ...prevState,
                renderMsgData:renderItem,
                paginationObj:pageObj
            }))
        }
    }

    const formatDateTime:(time:string) => string = time => {
        const [fullDate,] = time.split(' ')
        return fullDate
    }

    const getData: () => Promise<void> = async () => {
        setLoadingStatus(true)

        await Fetch.get<articleDatasType[]>('/back_view_all',{ token:authInfo.token }).then(({ data:articleData }) => {
            Fetch.get<msgDataObjType[]>('/back_msg_l_all',{ token:authInfo.token }).then(res => {
                const repackMsgData = $.maps<msgDataObjType,msgDataObjType>(res!.data!,item => {
                    const filterArticleItem = $.filter<articleDatasType>(articleData!,({ uuid }):any => uuid === item.articleID) 
                    
                    return filterArticleItem.length > 0 ? {
                        ...item,
                        articleTitle:filterArticleItem[0].articleTitle,
                    } as msgDataObjType : item
                })

                const { pageObj,renderItem } = PaginationConfig.createParts<msgDataObjType>(repackMsgData,1,10,10)

                setInitState(prevState => ({
                    ...prevState,
                    msgData:repackMsgData,
                    renderMsgData:renderItem,
                    paginationObj:pageObj
                }))

                setLoadingStatus(false)
            }).catch(() => alert('error'))
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

    const showSingleMsg:(currentAction:string,valGroups:valGroupsType) => void = (currentAction,valGroups) => {

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
                toggleModalStatus:true,
                useDisabled: currentAction === 'READ'
            }))
        }
    }

    const deleteResMsg:(id:number) => void = id => {
        const deepCopy = JSON.parse(JSON.stringify(valGroups)) as valGroupsType
        const pos = $.findIndexOfObj(deepCopy.resContentList,({ resMsgID }):any => resMsgID === id)
        deepCopy.resContentList = deepCopy.resContentList.remove(pos) 
        
        setInitState(prevState => ({
            ...prevState,
            valGroups:deepCopy
        }))
    }

    const useModalActions:(type:string,modalActions:string) => void = (type,modalActions) => {
        let reGetData:boolean = false

        const excuteMethod = {
            [type]:async ():Promise<void> => {
                if(modalActions === 'confirm'){
                    if(type !== 'READ'){
                        const today = $.formatDateTime({ formatDate:new Date(),formatType:'yyyy-MM-dd HH:mm:ss' }) as string

                        const postDataSetting:{[key:string]:any} = JSON.parse(JSON.stringify(valGroups))

                        postDataSetting.modifyDate = today

                        setLoadingStatus(true)

                        await Fetch.post('/update_msg_l',{ token:authInfo.token,data:postDataSetting })
                        
                        reGetData = true

                        setLoadingStatus(false)
                    }
                }
            },
            DELETE:async ():Promise<void> => {
                if(modalActions === 'confirm'){
                    const { mud } = valGroups

                    setLoadingStatus(true)

                    await Fetch.post('/delete_msg_l',{ token:authInfo.token,data:{ mud } })

                    getData()

                    reGetData = true

                    setLoadingStatus(false)
                }
            }
        }[type] as () => Promise<void>

        excuteMethod().finally(() => {
            setInitState(prevState => ({
                ...prevState,
                toggleModalStatus:false,
                toggleDeleteModalStatus:false,
                valGroups:{
                    mud:'',
                    articleID:'',
                    msgNickName:'',
                    msgContent:'',
                    resContentList:[],
                    createDate:''
                },
                useDisabled:false
            }))

            reGetData && getData()
        })
    } 

    useEffect(() => {
        authInfo?.token ? getData() : router({ pathname:'/admin/login' })
    }, [authInfo])
    
    return pug`
        Container
            |#{changeWebTitle('後台留言管理')}
            .msg-layout
                if !rwdStatus
                    .msg-list-header
                        each val,index in ['留言者','留言內容','留言文章','留言 / 修改日期','操作項']
                            div(key=index) #{val}
                .msg-list
                    if renderMsgData.length === 0
                        .no-data -- 無留言 --
                    else
                        each item,index in renderMsgData
                            if !rwdStatus
                                .msg-list-item(key=index)
                                    div #{item.msgNickName}
                                    div #{item.msgContent}
                                    div #{item.articleTitle}
                                    div #{formatDateTime(item.createDate)} / #{formatDateTime(item.modifyDate)}
                                    .btn-group
                                        .preview(onClick=showSingleMsg.bind(this,'READ',{
                                            mud: '',
                                            msgNickName: item.msgNickName,
                                            msgContent: item.msgContent,
                                            articleID: '',
                                            resContentList: item.resContentList,
                                            createDate: ''
                                        }))
                                            i(className="fas fa-eye")
                                        .edit-btn(onClick=showSingleMsg.bind(this,'EDIT',{
                                            mud:item.uuid,
                                            msgNickName: item.msgNickName,
                                            msgContent: item.msgContent,
                                            articleID: item.articleID,
                                            resContentList: item.resContentList,
                                            createDate: item.createDate
                                        }))
                                            i(className="fas fa-pencil")
                                        .delete-btn(onClick=showSingleMsg.bind(this,'DELETE',{
                                            mud:item.uuid,
                                            msgNickName: item.msgNickName,
                                            msgContent: '',
                                            articleID: '',
                                            resContentList: [],
                                            createDate: ''
                                        }))
                                            i(className="fas fa-trash-alt")
                            else
                                .msg-list-item(key=index)
                                    .top
                                        .left
                                            div 留言者
                                            div 留言內容
                                            div 留言文章
                                            div 留言 / 修改日期
                                        .right
                                            div #{item.msgNickName}
                                            div #{item.msgContent}
                                            div #{item.articleTitle}
                                            div #{formatDateTime(item.createDate)} / #{formatDateTime(item.modifyDate)}
                                    .bottom
                                        .btn-group
                                            .preview(onClick=showSingleMsg.bind(this,'READ',{
                                                mud: '',
                                                msgNickName: item.msgNickName,
                                                msgContent: item.msgContent,
                                                articleID: '',
                                                resContentList: item.resContentList,
                                                createDate: ''
                                            }))
                                                i(className="fas fa-eye")
                                            .edit-btn(onClick=showSingleMsg.bind(this,'EDIT',{
                                                mud:item.uuid,
                                                msgNickName: item.msgNickName,
                                                msgContent: item.msgContent,
                                                articleID: item.articleID,
                                                resContentList: item.resContentList,
                                                createDate: item.createDate
                                            }))
                                                i(className="fas fa-pencil")
                                            .delete-btn(onClick=showSingleMsg.bind(this,'DELETE',{
                                                mud:item.uuid,
                                                msgNickName: item.msgNickName,
                                                msgContent: '',
                                                articleID: '',
                                                resContentList: [],
                                                createDate: ''
                                            }))
                                                i(className="fas fa-trash-alt")
                .msg-list-footer 總留言數 #{msgData.length} 則
                Pagination(...paginationObjPropsSetting)
            ActionModal(
                acionModalTitle=${`${(currentActionTypeGroup as {[key:string]:any})[currentAction]}留言`},
                toggleModalStatus=toggleModalStatus,
                confirmEvent=useModalActions.bind(this,currentAction,'confirm')
                cancelEvent=useDisabled ? undefined : useModalActions.bind(this,currentAction,'cancel')
            )
                .top
                    CustomInput(
                        className=valGroups.msgNickName ? 'lock' : ''
                        label="留言者",
                        bindVal=valGroups.msgNickName,
                        type="text",
                        disabled=true,
                    )
                    .text-area-outer
                        CustomTextArea(
                            className=valGroups.msgContent ? 'lock' : ''
                            label="留言內容",
                            bindVal=valGroups.msgContent,
                            type="text",
                            disabled=true,
                        )
                .bottom
                    .title 回覆留言
                    .res-msg-list-outer
                        if valGroups.resContentList.length > 0
                            .res-msg-list
                                each item,index in valGroups.resContentList
                                    .res-msg-list-item-outer(key=index)
                                        .row.g-0
                                            div(className=useDisabled ? 'col-sm-12' : 'col-sm-11')
                                                .res-msg-list-item
                                                    .res-msg-title 
                                                        div #{item.resMsgNickName}
                                                        .right-group
                                                            div #{formatDateTime(item.createDate)}
                                                    div #{item.resMsgContent}
                                            if !useDisabled
                                                .col-sm-1
                                                    .delete-msg-btn(onClick=deleteResMsg.bind(this,item.resMsgID))
                                                        i(className="fas fa-trash-alt")

                        else
                            .no-data -- 無回覆內容 --
            ActionModal(
                toggleModalStatus=toggleDeleteModalStatus,
                confirmEvent=useModalActions.bind(this,currentAction,'confirm')
                cancelEvent=useModalActions.bind(this,currentAction,'cancel') 
            )
                .action-modal-body
                    .delete-context 確定要刪除 #{valGroups.msgNickName} 此人的留言嗎？
            Loading(loadingStatus=loadingStatus)
    `
}

export default AdminMsg