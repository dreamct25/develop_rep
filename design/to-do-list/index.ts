import './styles.scss'
import './lib/Library'
import $ from './lib/Library'
import { toDoItemType,deleteToDoItemType,paginationObjType } from './types'

declare global {
    interface Window {
        modifyItem(element:HTMLDivElement,id:number):void
        getIndex(id:number,index:number):void
        changePage(pageSet:number):void
    }
}

let localData:toDoItemType[] = $.localData('get','item')
let localDataDeleted:deleteToDoItemType[] = $.localData('get','itemDeleted')
let deleteArray:number[] = []
let goList:boolean = true

const renderTable:(data:(toDoItemType | deleteToDoItemType)[],tableType:string,dom:HTMLTableElement) => void = (data,tableType,dom) => {
    const tableHeader:string = tableType === 'todo' ? `
        <tr>
            <th width="5%">Finish</th>
            <th>Title</th>
            <th width="15%">Create Time</th>
            <th width="15%">Create Date</th>
            <th width="15%">Modify</th>
        </tr>
    `:`
        <tr>
            <th width="15%">Finish</th>
            <th>Title</th>
            <th width="22%">Create / Delete Time</th>
            <th width="22%">Create / Delete Date</th>
        </tr>
    `
    const ifNoData:string = tableType === 'todo' ? `
        <tr class="list-in no-data">
            <td colspan="5">Nothing to added in your todo list</td>
        </tr>
    ` : `
        <tr class="list-in no-data">
            <td colspan="4">Nothing deleted from your todo list</td>
        </tr>
    `

    $(".table thead").html(tableHeader)

    if(data.length === 0){
        $(dom).html(ifNoData)
    } else {
        const renderList = tableType === 'todo' ? $.maps(data,(lists:toDoItemType, order:number) =>
            `<tr class="list-in">
                <td>
                    <input type="checkbox" onclick="getIndex(${lists.id},${order})" id="item${order}" ${lists.hasFinish == true?'checked':''}/>
                </td>
                <td>
                    <label for="item${order}" data-num="${order}" class="outside-text">${lists.title}</label>
                    <input type="text" data-num="${order}" class="inside-text" value="${lists.title}">
                    <div class="inside-text-bottom"></div>
                </td>
                <td>${lists.createTime}</td>
                <td>${lists.createDate}</td>
                <td>
                    <span class="modify-btn" data-num="${order}" onclick="modifyItem(this,${lists.id})">Modify<span>
                </td>
            </tr>`
        ).join('') : $.maps(data,(lists:deleteToDoItemType) => `
            <tr class="list-in">
                <td >${lists.hasFinish ? 'Completed' : 'Undone'}</td>
                <td>${lists.title}</td>
                <td >${lists.createTime} / ${lists.deleteTime}</td>
                <td >${lists.createDate} / ${lists.deleteDate}</td>
            </tr>`
        ).join('')

        $(dom).html(renderList)
    }
}

const pagination:(array:any[], pages:number) => any[] = (array,pages) => {
    let paginationObj:paginationObjType = {}

    paginationObj.totalLength = array.length;

    paginationObj.partPage = 8;

    paginationObj.pageTotal = Math.ceil(paginationObj.totalLength / paginationObj.partPage);

    pages = pages || 1;

    paginationObj.currentPage = pages;

    paginationObj.beforPage = paginationObj.currentPage > 1;
    
    paginationObj.afterPage = paginationObj.currentPage < paginationObj.totalLength;
    
    if (paginationObj.currentPage === paginationObj.pageTotal) paginationObj.afterPage = false;
    
    if (paginationObj.currentPage > paginationObj.pageTotal) paginationObj.currentPage = paginationObj.pageTotal;

    const minPage = paginationObj.currentPage * paginationObj.partPage - paginationObj.partPage + 1;
    
    const maxPage = paginationObj.currentPage * paginationObj.partPage;

    const partArrayTemp = JSON.parse(JSON.stringify(array));

    const partArray = $.maps(partArrayTemp,(item:toDoItemType | deleteToDoItemType,index:number) => (index + 1) >= minPage && (index + 1) <= maxPage && item)
        .filter((item:toDoItemType | deleteToDoItemType | boolean) => item !== false) as (toDoItemType | deleteToDoItemType)[]

    if (partArrayTemp.length === 0) {
        $(".pagination-group").html('')
        return partArray
    } else {
        paginationBtn(paginationObj)
        return partArray
    }
}

const paginationBtn:({ beforPage,afterPage,currentPage,pageTotal }:paginationObjType) => void = ({ beforPage,afterPage,currentPage,pageTotal }) => {
    const dom = [
        `<div ${beforPage ? `onclick="changePage(${currentPage! - 1})"` : 'class="current-diabled"'}><i class="fal fa-angle-double-left"></i></div>`,
        ...$.createArray({ type:'fake',item:{ random:pageTotal } },(num:number) => `<div ${currentPage === (num + 1) ? 'class="current-active"' : ''} onclick="changePage(${(num + 1)})">${(num + 1)}</div>`) as string[],
        ` <div ${afterPage ? `onclick="changePage(${currentPage! + 1})"` : 'class="current-diabled"'}><i class="fal fa-angle-double-right"></i></div>`
    ].join('')
    
    $(".pagination-group").html(dom)
}

const addItem:(event:Event) => void = event => {
    if($.typeOf(event) === 'KeyboardEvent'){
        if((event as KeyboardEvent).keyCode !== 13) return
    }

    const { fullDate:createDate,fullTime:createTime } = timeObject()

    localData.append({
        id: +new Date(),
        hasFinish: false,
        title: $(".input-text").val()!,
        createTime,
        createDate
    });

    (document.querySelector('.input-text') as HTMLInputElement).value = ''

    $.localData('set','item',localData)

    choosePart("I", 1, localData)
}

const searchItem:() => void = () => {
    const isSearch:boolean = $(".search-text").val()! !== ""

    const array = goList ? localData : localDataDeleted

    const filterItem = isSearch ? $.filter(array,({ title }:toDoItemType | deleteToDoItemType):any => title.toLowerCase().match(($(".search-text").val() as string).toLowerCase())) : array

    $(".searches").texts(isSearch ? `Find ${filterItem.length} todoes，` : '')
    
    choosePart(goList ? "I" : "II", 1, filterItem)
}

window.modifyItem = (element, id) => {
    if ($.includes(deleteArray,id)) return

    if (($(element).texts() as string).trim() == "Modify") {
        $(element).texts('Confirm');
        (document.querySelectorAll(".outside-text") as unknown as HTMLDivElement[])[parseInt(element.dataset.num!)].textContent = ''
        $(($(".outside-text") as unknown as HTMLDivElement[])[parseInt(element.dataset.num!)]).texts('')
        $(($(".modify-btn") as unknown as HTMLDivElement[])[parseInt(element.dataset.num!)]).addClass("confirmes")
        $(($(".inside-text") as unknown as HTMLDivElement[])[parseInt(element.dataset.num!)]).addClass("inside-text-toggle")
        $(($(".inside-text-bottom") as unknown as HTMLDivElement[])[parseInt(element.dataset.num!)]).addClass("inside-text-bottom-toggle")
    } else {
        $(element).texts("Modify")

        localData = $.maps(localData,(item:toDoItemType) => {
            const { fullDate:createDate,fullTime:createTime } = timeObject()

            return item.id === id ? {
                ...item,
                title: $(($(".inside-text") as unknown as HTMLDivElement[])[parseInt(element.dataset.num!)]).val()!,
                createDate,
                createTime
            } : item
        })

        $.localData('set',"item", localData)
        $(($(".modify-btn") as unknown as HTMLDivElement[])[parseInt(element.dataset.num!)]).removeClass("confirmes")
        $(($(".inside-text") as unknown as HTMLDivElement[])[parseInt(element.dataset.num!)]).removeClass("inside-text-toggle")
        $(($(".inside-text-bottom") as unknown as HTMLDivElement[])[parseInt(element.dataset.num!)]).removeClass("inside-text-bottom-toggle")
        setTimeout(() => choosePart("I", 1, localData), 700)
    }
}

const deleteItem:() => void = () => {
    let deleteText:string = ''

    $('.modal-outer').addClass('modal-toggle')

    if (deleteArray.length === 0) {
        $('.modal-body').texts('Check your finish todos then click delete')
        $('.cancel').removeClass('active')
        return
    }

    if(deleteArray.length >= 2){
        deleteText = `${deleteArray.length} todos`
    } else {
        const [deleteId] = deleteArray
        const [obj] = $.filter(localData,(({ id }:toDoItemType):any => deleteId === id)) as toDoItemType[]

        deleteText = `${obj.title} this todo`
    }

    $('.modal-body').texts(`Do you want to delete ${deleteText}？`)

    $('.cancel').addClass('active')
}

const deleteAllHistory:() => void = () => {
    const text:string = localDataDeleted.length === 0 ? "Your don't have any delete todoes" : 'Do you want to delete all todo list history？'

    $('.modal-outer').addClass('modal-toggle')
    $('.modal-body').texts(text)
    $('.cancel')[localDataDeleted.length ? 'addClass' : 'removeClass']('active')
}

const controlDeleteModal:(type:string) => void = type => {
    
    if(!goList && localDataDeleted.length === 0){
        $('.modal-outer').removeClass('modal-toggle')
        return
    }
    
    if(goList && deleteArray.length === 0){
        $('.modal-outer').removeClass('modal-toggle')
        return
    }

    if(type === 'confirm'){
        if(goList){
            const { fullDate,fullTime } = timeObject()

            $.each(deleteArray,(deleteId:number) => {
                const pos = $.findIndexOfObj(localData,(({ id }:toDoItemType) => deleteId === id))
                const filterItem = localData[pos]
                const deepCopyObj = JSON.parse(JSON.stringify(filterItem)) as {[key:string]:any}
                
                deepCopyObj.hasFinish = true
                deepCopyObj.deleteTime = fullTime
                deepCopyObj.deleteDate = fullDate
                localDataDeleted.append(deepCopyObj)
                localData.remove(pos)
            })
        } else {
            localDataDeleted = []
        }

        $('.modal-outer').removeClass('modal-toggle')

        setTimeout(() => {
            $('.cancel').removeClass('active')
            $('.modal-outer').addClass('modal-toggle')
            $('.modal-body').texts(goList ? 'Have already deleted this todo from your todo list' : 'Your todo list have all cleared')
    
            deleteArray = []

            $.localData('set','item',localData)
            $.localData('set','itemDeleted',localDataDeleted)
            choosePart(goList ? 'I' : 'II', 1, goList ? localData : localDataDeleted)
            $(".chooses").texts(" ")
        },501)
    } else {
        $('.modal-outer').removeClass('modal-toggle')
    }
}

const getItem:(cur:string) => void = cur => {
    localData = $.localData('get','item')
    localDataDeleted = $.localData('get','itemDeleted')

    if (cur == "I") {
        $(".table tfoot tr td").attr("colspan", 5)
        $(".total").texts(`Total ${localData.length} todoes`)
    } else {
        $(".table tfoot tr td").attr("colspan", 4)
        $(".total").texts(`Have deleted total ${localDataDeleted.length} todoes`)
    }
}

window.getIndex = (id, index) => {
    const pos = $.indexOf(deleteArray,id)

    if (pos === -1) {
        $(($(document.querySelectorAll(".outside-text")) as unknown as HTMLDivElement[])[index]).addClass("delete-line")
        $(($(document.querySelectorAll(".modify-btn")) as unknown as HTMLDivElement[])[index]).addClass("btn-disable")
        deleteArray.append(id)
    } else {
        $(($(document.querySelectorAll(".outside-text")) as unknown as HTMLDivElement[])[index]).removeClass("delete-line")
        $(($(document.querySelectorAll(".modify-btn")) as unknown as HTMLDivElement[])[index]).removeClass("btn-disable")
        deleteArray.remove(pos)
    }

    $(".chooses").texts(deleteArray.length > 0 ? `You have choose ${deleteArray.length} todo，` : " ")
}

const timeObject:() => { fullDate:string,fullTime:string,days:string } = () => {
    const { fullDateTime,getWeekName:days } = $.formatDateTime({ 
        formatDate:new Date(),
        formatType:'yyyy-MM-dd  HH : mm : ss',
        customWeekItem:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    }) as { fullDateTime:string,getWeekName:string }
    
    const [fullDate,fullTime] = fullDateTime.split('  ')

    return { fullDate,fullTime,days }
}

window.changePage = pageSet => choosePart(goList ? "I" : "II", pageSet, goList ? localData : localDataDeleted)

const choose:({ target }:{ target:HTMLDivElement }) => void = ({ target }) => {
    $(".searches").texts('');

    const haveI = $.includes(($(target).attr('class') as string).split(' '),'I')

    choosePart(haveI ? "I" : "II", 1, haveI ? localData : localDataDeleted)
}

const listAimate:(options:boolean) => void = options => {
    $.each(($(document.querySelectorAll(".list-in")) as unknown as HTMLDivElement[]),((element:HTMLDivElement) => $(element)[options ? 'addClass' : 'removeClass']('list-in-active') ))
}


const choosePart:(type:string, page:number, array:any[]) => void = (type,page,array) => {
    const isTypeI = type === 'I'

    goList = isTypeI
    
    getItem(isTypeI ? 'I' : 'II')
    
    $(".delete-btn")[isTypeI ? 'addClass' : 'removeClass']("delete-btn-toggle")
    
    $(".delete-all-btn")[isTypeI ? 'removeClass' : 'addClass']("delete-all-btn-toggle")
    
    $(".I")[isTypeI ? 'removeClass' : 'addClass']("top-btn-disable")
    
    $(".II")[isTypeI ? 'addClass' : 'removeClass']("top-btn-disable")
    
    const partArray = pagination(array, page)
    
    listAimate(false)

    setTimeout(() => 
        renderTable(partArray,isTypeI ? 'todo' : 'deleteTodo',$(".table tbody") as unknown as HTMLTableElement)
    , 501)

    setTimeout(() => listAimate(true), 702)
}

$(document).useMounted(() => {
    choosePart("I", 1, localData)
    
    $.each(($(".top-btn") as unknown as HTMLDivElement[]),(element:HTMLDivElement) => $(element).listener("click", choose))
    
    $(".add-btn").listener("click", addItem)

    $('.input-text').listener('keydown',addItem)
    
    $(".delete-btn").listener("click", deleteItem)
    
    $(".delete-all-btn").listener("click", deleteAllHistory)
    
    $(".search-text").listener("input", searchItem)

    $('.confirm').listener('click',controlDeleteModal.bind(this,'confirm'))

    $('.cancel').listener('click',controlDeleteModal.bind(this,'cancel'))
    
    setInterval(() => $(".times").html(`${timeObject().days} ${timeObject().fullDate}<br>${timeObject().fullTime}`), 1000)
})