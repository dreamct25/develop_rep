import CrossProcessExports, { ipcRenderer } from 'electron'
import { createPaginationReturnType, paginationType } from '../plugin/Pagination'
import '../plugin/Pagination.scss'

import '../plugin/Modal.ts'
import '../plugin/Pagination.ts'

import $ from '../lib/Library'

interface fileDataType {
    fileName:string,
    fileModifyTime:number,
    fileCreateTime:number,
    fileSize:number,
    fileType:string,
    fileRealPath:string
}

interface dataItem {
    message:string,
    searchPath?:string,
    searchItem?:fileDataType[]
}

const remote = require('@electron/remote')
const win:CrossProcessExports.BrowserWindow = remote.getCurrentWindow()
let baseX:number
let baseY:number
let fileDataTemp:dataItem
let currentSelectNum:number[] = []
let currentSelectFileNum:number[] = []
let sortType:string = ""
let sortRevers:boolean = false

const dragStart:({ button,x,y }:MouseEvent) => void = ({ button,x,y }) => {
    // 滑鼠點擊後移動視窗開始
    // button 0 為左鍵，2 為右鍵
    if(button === 0){
        win.resizable = true // 開啟可調整視窗，因拖動時會造成視窗放大
        baseX = x; // 紀錄移動起始座標點 x
        baseY = y; // 紀錄移動起始座標點 y
        $(document).listener('mousemove', moveEvent);
    } else if(button === 2) {
        ipcRenderer.send('closeApp'); // 呼叫後端 ipcMain 事件，出現選單
    }
}

const dragEnd:() => void = () => {
    // 滑鼠點擊後移動視結束
    baseX = 0; // 歸零起始座標點 x
    baseY = 0; // 歸零起始座標點 x
    $(document).removeListener('mousemove', moveEvent);
    win.resizable = false // 關閉可調整視窗
}

const moveEvent:({ screenX,screenY }:MouseEvent) =>void = ({ screenX,screenY }) => {
    win.setPosition(screenX - baseX, screenY - baseY,false) // 設定拖動位置
    win.setSize(1280,700,false) // 設定視窗值，要記得與原始設定長寬相同
}

const modalAlert = $.createModal({
    modalClass:'.modal-alert',
    modalBodyClass:'.modal-body-alert',
    modalBodyToggleClass:'modal-body-toggle-alert',
    haveBlur:false
})

const modal = $.createModal({
    modalClass:'.modal',
    modalBodyClass:'.modal-body',
    modalBodyToggleClass:'modal-body-toggle',
    haveBlur:false
})

const getPath:(isFirstTime:boolean) => void = async (isFirstTime) => {
    if(isFirstTime){
        await $.fetch({
            method:'get',
            url:'http://localhost:9870/fs/get_path',
            beforePost:() => $.console('log','loading'),
            successFn:(data:dataItem) => {
                console.log(data)
                if(data.message === 'success'){
                    const { searchPath } = data
                    $.localData('set','url',{ selectUrl:searchPath })
                    fileDataTemp = data
                    renderSearchItem(true)
                } else {
                    alert(data.message)
                }
            },
            errorFn:(err:any) => $.console('log',err)
        })
    } else {
        const { selectUrl } = $.localData('get','url')
        await $.fetch({
            method:'post',
            url:'http://localhost:9870/fs/get_file',
            contentType:'application/json',
            data:{ filePath: selectUrl },
            beforePost:() => $.console('log','loading'),
            successFn:(data:dataItem) => {
                if(data.message === 'success'){
                    fileDataTemp = data
                    renderSearchItem(true)
                } else {
                    alert(data.message)
                }
            },
            errorFn:(err:any) => $.console('log',err)
        })
    }
}

const renderSearchItem = (isViewShortImg:boolean,page?:number,serialNum?:number) => {
    $('.render-item').removeChildDom()
    const { searchPath,searchItem } = fileDataTemp
    let dom:string = ""
    let sortItem:undefined

    if(sortType !== ""){
        switch(sortType){
            case 'bySize':
                sortItem = $.sort(searchItem,(a:fileDataType,b:fileDataType) => sortRevers ? a.fileSize - b.fileSize : b.fileSize - a.fileSize)
                sortRevers = !sortRevers
                break
            case 'byModifyDate':
                sortItem = $.sort(searchItem,(a:fileDataType,b:fileDataType) => sortRevers ? $.formatDateTime({ formatDate:a.fileModifyTime,formatType:'toDateFullNumber' }) - $.formatDateTime({ formatDate:b.fileModifyTime,formatType:'toDateFullNumber' }) : $.formatDateTime({ formatDate:b.fileModifyTime,formatType:'toDateFullNumber' }) - $.formatDateTime({ formatDate:a.fileModifyTime,formatType:'toDateFullNumber' }))
                sortRevers = !sortRevers
                break
            case 'byCreateDate':
                sortItem = $.sort(searchItem,(a:fileDataType,b:fileDataType) => sortRevers ? $.formatDateTime({ formatDate:a.fileCreateTime,formatType:'toDateFullNumber' }) - $.formatDateTime({ formatDate:b.fileCreateTime,formatType:'toDateFullNumber' }) : $.formatDateTime({ formatDate:b.fileCreateTime,formatType:'toDateFullNumber' }) - $.formatDateTime({ formatDate:a.fileCreateTime,formatType:'toDateFullNumber' }))
                sortRevers = !sortRevers
                break
            default:
                sortItem = undefined
        }
    }
    
    if(isViewShortImg){
        dom = `
            <div class="image-card-outer">
                ${$.maps(searchItem,({
                    fileName,
                    fileModifyTime,
                    fileCreateTime,
                    fileSize,
                    fileType,
                    fileRealPath
                }:fileDataType,index:number) => `
                <div class="image-card" onmouseleave="removeFileModifyList()">
                    <div class="image-outer" oncontextmenu="getRight(${index})">
                        <div class="image" style="background-image:url(${fileRealPath});"></div>
                    </div>
                    <div class="image-details-group">
                        <div class="file-title">檔名：${fileName}</div>
                        <div class="circle-group" onclick="currentChoose(${index})">
                            <div class="circle"></div>
                            <div class="circle"></div>
                            <div class="circle"></div>
                        </div>
                    </div>
                    <div class="option-list" data-point="${index}">
                        <div onclick="showImage('${fileRealPath}','${fileName}')">查看圖片</div>
                        <div onclick="showImageDetails(${index})">檔案詳情</div>
                    </div>
                    <div class="files-details" data-details="${index}">
                        <span>檔名：${fileName}</span>
                        <span>建檔日期：${$.formatDateTime({ formatDate:fileCreateTime,formatType:'date' })}</span>
                        <span>修改日期：${$.formatDateTime({ formatDate:fileModifyTime,formatType:'date' })}</span>
                        <span>檔案大小：${Math.round($.convert(fileSize,'number') / 1024)} KB</span>
                        <span>檔案類型：${fileType}</span>
                    </div>
                    <div class="file-modify-list" data-right="${index}">
                        <div onclick="showModalAlert('rename','${fileName}','${fileRealPath}')">重新命名</div>
                        <div onclick="showModalAlert('delete','${fileName}','${fileRealPath}')">刪除</div>
                    </div>
                </div>`).join("")}
            </div>
        `
        $('.render-item').easyAppendDom('beforeDom',dom)
    } else {
        const pagination:createPaginationReturnType = $.createPagination({
            currentItem:sortItem || searchItem,
            pages:page || 1,
            partViewPage:3,
            pageSize:10,
            isActiveDom:true
        })

        const { renderItem,pagesItem }:createPaginationReturnType = pagination

        dom = `
            <div class="grid-outer">
                <div class="grid-header">
                    <div class="order-title">檔名</div>
                    <div class="order-title">檔案類型</div>
                    <div class="order-title" onclick="orderByRule('bySize',2)">
                        檔案大小
                        <i class="${ serialNum === 2 ? "fas fa-angle-up order-arrow active" : "fas fa-angle-up order-arrow"}"></i>
                    </div>
                    <div class="order-title" onclick="orderByRule('byModifyDate',3)">
                        修改日期
                        <i class="${ serialNum === 3 ? "fas fa-angle-up order-arrow active" : "fas fa-angle-up order-arrow"}"></i>
                    </div>
                    <div class="order-title" onclick="orderByRule('byCreateDate',4)">
                        建檔日期
                        <i class="${ serialNum === 4 ? "fas fa-angle-up order-arrow active" : "fas fa-angle-up order-arrow"}"></i>
                    </div>
                </div>
                <div class="grid-body">
                    ${$.maps(renderItem,({
                        fileName,
                        fileModifyTime,
                        fileCreateTime,
                        fileSize,
                        fileType,
                    }:fileDataType,index:number) => `
                        <div class="grid-row">
                            <div>${fileName}</div>
                            <div>${fileType}</div>
                            <div>${Math.round($.convert(fileSize,'number') / 1024)} KB</div>
                            <div>${$.formatDateTime({ formatDate:fileModifyTime,formatType:'full' })}</div>
                            <div>${$.formatDateTime({ formatDate:fileCreateTime,formatType:'full' })}</div>
                        </div>
                    `).join("")}
                </div>
                <div class="grid-footer">
                    <div class="paginations">
                        <div class="pagination-outer">
                            <div class="pagination-item-group">${pagesItem}</div>
                        </div>
                    </div>
                </div>
            </div>`

            $('.render-item').easyAppendDom('beforeDom',dom)
            $('.pagination-item-group').on('click',usePagination.bind(this,pagination,isViewShortImg))
    }

    $('.path-temp').val(searchPath)
}

const orderByRule = (ruleText:string,serialNum:number) => {
    console.log(ruleText,serialNum)
    sortRevers = sortType === ruleText ? sortRevers : false
    sortType = ruleText
    renderSearchItem(false,undefined,serialNum)
}

const usePagination = (pagination:createPaginationReturnType,isViewShortImg:boolean,{ target }:{ target:HTMLElement }) => {
    if($(target).attr('class') === 'page-item' || $(target).attr('class') === 'page-link'){
        const { pageObj:{ currentPage } }:{ pageObj:paginationType } = pagination.render($.convert($(target).attr('data-page'),'number'))
        renderSearchItem(isViewShortImg,currentPage)
    }
}

const showModalAlert = (actionName:string,fileName:string,filePath:string) => {
    $('.modal-content-alert').removeChildDom()
    $.localData('set','selectAction',{ action:actionName,path:filePath })
    $('.modal-body-alert').styles('set','transform',)
    switch(actionName){
        case 'rename':
            $('.modal-header-alert span').texts('重新命名')
            $('.modal-content-alert').easyAppendDom('beforeDom',`<input type="text" class="rename-input" value="${fileName}" />`)
            break;
        case 'delete':
            $('.modal-header-alert span').texts('訊息')
            $('.modal-content-alert').easyAppendDom('beforeDom',`<span>確定要刪除 ${fileName} ?</span>`)
            break;
    }

    modalAlert.showModal()
}

const getRight = (targetIndex:number) => {
    const { offsetX,offsetY }:any = window.event
    $.each($('.file-modify-list'),((item:HTMLElement) => {
        if($.convert($(item).attr('data-right'),'number') === targetIndex){
            $(item).addClass('active')
            $(item).styles('set','top',`${offsetY}px`)
            $(item).styles('set','left',`${offsetX}px`)
        } else { 
            $(item).removeClass('active')
        }
    }))
}

const renameFile = ({ basicPath,name,type }:{ basicPath:string,name:string,type:string }) => {
    $.fetch({
        method:'post',
        url:'http://localhost:9870/fs/rename_file',
        contentType:'application/json',
        data:{ oldName:`${basicPath}${name}.${type}`,newName:`${basicPath}${$('.rename-input').val()}.${type}` },
        successFn:({ message }:{ message:string }) => {
            if(message === 'Rename Success'){
                getPath(false)
            } else {
                alert(message)
            }
        },
        errorFn:(err:any) => $.console('error',err)
    })
}

const deleteFile = (fileLink:string) => {
    $.fetch({
        method:'post',
        url:'http://localhost:9870/fs/delete_file',
        contentType:'application/json',
        data:{ link:fileLink },
        successFn:({ message }:{ message:string }) => {
            if(message === 'success'){
                getPath(false)
            } else {
                alert(message)
            }
        },
        errorFn:(err:any) => {
            console.log(err)
        }
    })
}

const confirmExecute = () => {
    const { action,path } = $.localData('get','selectAction')
    const [{ fileBasicPath,fileName,fileType,fileRealPath }] = $.filter(fileDataTemp.searchItem,({ fileRealPath }:fileDataType) => fileRealPath === path)
    console.log(fileBasicPath,fileRealPath)
    action === "rename" && renameFile({ basicPath:fileBasicPath,name:fileName,type:fileType })
    action === "delete" && deleteFile(fileRealPath)
    modalAlert.closeModal(() => $.localData('set','selectAction',{}))
}

const cancelExecute = () => {
    modalAlert.closeModal(() => $.localData('set','selectAction',{}))
}

const removeFileModifyList = () => $.each($('.file-modify-list'),(item:HTMLElement) => $(item).removeClass('active'))

const currentChoose = (num:number) => {
    if($.indexOf(currentSelectNum,num) === -1){
        currentSelectNum.push(num)
        $.each(currentSelectNum,(selectNum:number) => {
            $.each($('.option-list'),(target:HTMLElement) => {
                $.convert($(target).attr('data-point'),'number') === selectNum && $(target).addClass('active')
            })
        })
    } else {
        const index = $.indexOf(currentSelectNum,num)
        $($('.option-list')[num]).removeClass('active')
        currentSelectNum.splice(index,1)
    }
}

const showImage = (url:string,fileName:string) => {
    $('.modal-header span').texts(fileName)
    $('.content-img-outer img').attr('src',url)
    modal.showModal()
}

const showImageDetails = (postfileNum:number) => {
    if($.indexOf(currentSelectFileNum,postfileNum) === -1){
        currentSelectFileNum.push(postfileNum)
        $.each(currentSelectFileNum,(selectNum:number) => {
            $.each($('.files-details'),(target:HTMLElement) => {
                $.convert($(target).attr('data-details'),'number') === selectNum && $(target).addClass('active')
            })
        })
    } else {
        const index = $.indexOf(currentSelectFileNum,postfileNum)
        $($('.files-details')[postfileNum]).removeClass('active')
        currentSelectFileNum.splice(index,1)
    }
}

const currentImgStyle = (obj:{ type:any[],newValue?:string }) => {
    if(!('newValue' in obj)){
       return $('.content-img-outer img').getDomStyles(obj.type)
    } else {
        $('.content-img-outer img').styles('set',obj.type.join(),obj.newValue)
    }
}

const zoomPlusOrSubs = ({ target }:{ target:HTMLElement }) => {
    const { width } = currentImgStyle({ type:['width'] })
    const valueText = target.className === 'zoom-plus' ? `${$.convert(width.replace('px',''),'number') + 100}px` : `${$.convert(width.replace('px',''),'number') - 100}px`
    currentImgStyle({ type:['width'],newValue: valueText})
    $(target).addClass('active')
    setTimeout(() => $(target).removeClass('active'),300)
}

const changeListView = ({ target }:{ target:HTMLElement }) => {
    const currentClass = target.className.split(" ")[1]
    if(currentClass === 'view-short-img'){
        $(`.${currentClass}`).addClass('active')
        $('.view-details-list').removeClass('active')
        renderSearchItem(true)
    } else {
        $(`.${currentClass}`).addClass('active')
        $('.view-short-img').removeClass('active')
        renderSearchItem(false)
    }
}

$('.zoom-plus').listener('click',zoomPlusOrSubs)
$('.zoom-subs').listener('click',zoomPlusOrSubs)
$('.open-path').listener('click',getPath.bind(this,true))
$('.close').listener('click',() => modal.closeModal(() => $('.content-img-outer img').attr('src','')))
$('.modal-footer-alert .confirm').listener('click',confirmExecute)
$('.modal-footer-alert .cancel').listener('click',cancelExecute)
$.each($('.change-view'),(element:HTMLElement) => $(element).listener('click',changeListView))

// $(document).listener('mousedown',dragStart)
// $(document).listener('mouseup',dragEnd)