// const rssParser = require('rss-parser');

// const uu = require('electron');

// (async () => {
//     await uu.dialog.showOpenDialog({
//         properties: ['openFile', 'openDirectory']
//     })
// })();

// (async () =>{
//     let parseItem = await new rssParser().parseURL('http://localhost:9870/python/items')
// })();

const { openBtn,cancelBtn,confirmBtn } = modalObj.createModal({
    modalClass:'.modal',
    modalBodyClass:'.modal-body',
    openBtnClass:'.add-item',
    cancelBtnClass:'.cancel',
    confirmBtnClass:'.confirm'
})

const localData = (method,key,item) => method === 'get' ? (JSON.parse(localStorage.getItem(key)) || []) : localStorage.setItem(key,JSON.stringify(item))

const whenAdd = () => {
    const val = $('.modal-input').val()
    if(val === ''){
        alert('Please enter some values...')
    } else {
        localData('set','collect',[...localData('get','collect'),{ id:new Date().getTime(),content:val }])
        renderItem(localData('get','collect'))
        modalObj.close()
    }
    
}

const deleteItem = (id,data) => {
    let itemIndex = $.findIndexOfObj(data,item => item.id === id)

    if(itemIndex !== -1){
        if(confirm(`Do you want to delete ${data[itemIndex].content} ?`)){
            alert(`Delete item ${data[itemIndex].content} success !`)
            data.splice(itemIndex,1)
            localData('set','collect',data)
            renderItem(localData('get','collect'))
        } else {
            alert('Not delete anything.')
        }
    }
    modalObj.close()
}

const modifyItem = (postId) => {
    const val = $('.modal-input').val()
    let data = localData('get','collect')
    let filterIndex = $.findIndexOfObj(data,({ id }) => id === postId)
    data[filterIndex] = {...data[filterIndex],content:val}
    localData('set','collect',data)
    renderItem(localData('get','collect'))
    modalObj.close()
}

const confirmOption = (openState,id) => {
    switch(openState){
        case 'add':
            whenAdd()
            break
        case 'modify':
            modifyItem(id)
            break
    }
}

const renderItem = (data) => {
    $('.item-list-outer').text() !== '' && $('.item-list-outer').removeChildDom()
    if(data.length === 0){
        const emptyDomOuter = $.createDom('div',{ className:'empty-data-outer' })
        const emptyDom = $.createDom('div',{
            className:'empty-data',
            textContent:'No data please add something ...'
        })
        $(emptyDomOuter).appendDom(emptyDom)
        $('.item-list-outer').appendDom(emptyDomOuter)
    } else {
        data.forEach(({ id,content },index) => {
            const domOuter = $.createDom('div',{ className:'item-list' })
            const dom = $.createDom('div',{
                className:'item',
                textContent:`${index + 1}-${content}` 
            })
            const domBtnGroup = $.createDom('div',{ className:'item-btn-group' })
            const domModifyBtn = $.createDom('div',{
                className:'item-modify-btn',
                textContent:'Modify',
                onclick:() => {
                    let filterItem = $.filter(data,item => item.id === id)
                    modalObj.show(() => {
                        $('.modal-header span').text('Modify')
                        $('.modal-input').val(filterItem[0].content)
                        $(confirmBtn).on('click',confirmOption.bind(this,'modify',filterItem[0].id))
                        $(cancelBtn).on('click',() => modalObj.close())
                    })
                }
            })
            const domDeletBtn = $.createDom('div',{
                className:'item-delete-btn',
                textContent:'Delete',
                onclick:() => deleteItem(id,data)
            })
    
            
    
            $('.modal-input').val('')
            $(domBtnGroup).appendDom(domModifyBtn)
            $(domBtnGroup).appendDom(domDeletBtn)
            $(domOuter).appendDom(dom)
            $(domOuter).appendDom(domBtnGroup)
            $('.item-list-outer').appendDom(domOuter)
        })
    }
}

renderItem(localData('get','collect'))

$(openBtn).listener('click',modalObj.show.bind(modalObj,() => {
    $('.modal-header span').text('Add')
    $(confirmBtn).on('click',confirmOption.bind(this,'add'))
    $(cancelBtn).on('click',() => modalObj.close())
}))