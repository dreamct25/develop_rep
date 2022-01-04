// 2020/07/17 優化更新元件
// 2021/02/08 改寫元件為套件物件

// let modalObj = {}

// modalObj.createModal = ({elBtn, elCloseBtn, elModal, elModalBody, elCancle}) => {
//     modalObj.btn = elBtn != false ? document.querySelector(elBtn) : false
//     modalObj.closeBtn = elCloseBtn != false ? document.querySelector(elCloseBtn) : false
//     modalObj.modal = elModal != false ? document.querySelector(elModal) : false
//     modalObj.modalBody = elModalBody != false ? document.querySelector(elModalBody) : false
//     modalObj.cancle = elCancle != false ? document.querySelector(elCancle) : false
// }

// modalObj.fn = () => {
//     return {
//         addClass: (el, str) => el.classList.add(str),
//         removeClass: (el, str) => el.classList.remove(str),
//         styles: (el, cssType, cssParameter) => el.style.setProperty(cssType, cssParameter),
//         modalEventAdd: (el, parameter) => {
//             let fnc = parameter == "close" ? modalObj.close : modalObj.show
//             el.addEventListener('click', fnc)
//         },
//         modalEventRemove: el => el.removeEventListener('click', modalObj.close)
//     }
// }

// // 設定 showModal 函式，filter為選配樣式
// modalObj.show = () => {
//     modalObj.fn().styles(modalObj.modal, "display", "block")
//         // 設定淡入延遲
//     setTimeout(() => modalObj.fn().addClass(modalObj.modal, 'modal-toggle'), 10)
//     setTimeout(() => modalObj.fn().addClass(modalObj.modalBody, 'modal-body-toggle'), 190)
//         // 監聽點擊彈出視窗本體內部架構 X 按鈕
//     if (modalObj.closeBtn != false) modalObj.fn().modalEventAdd(modalObj.closeBtn, "close")
//         // 監聽點擊彈出視窗本體內部架構 Cancel 按鈕
//     if (modalObj.cancle != false) modalObj.fn().modalEventAdd(modalObj.cancle, "close")
// }

// modalObj.close = () => {
//     modalObj.fn().removeClass(modalObj.modal, 'modal-toggle')
//     modalObj.fn().removeClass(modalObj.modalBody, 'modal-body-toggle')
//         // 移除監聽點擊彈出視窗本體內部架構 X 按鈕，優化效能
//     if (modalObj.closeBtn != false) modalObj.fn().modalEventRemove(modalObj.closeBtn)
//         // 移除監聽點擊彈出視窗本體內部架構 Cancel 按鈕，優化效能
//     if (modalObj.cancle != false) modalObj.fn().modalEventRemove(modalObj.cancle)
//     setTimeout(() => modalObj.fn().styles(modalObj.modal, "display", ""), 750) // 設定淡出延遲
// }

// // 監聽點擊彈出視窗本體架構外部網頁空白區域 window (整個網頁當前視窗)，當點擊外部區域時一樣可關閉彈出視窗
// window.addEventListener('click', e => e.target == modalObj.modal ? modalObj.close() : null)

// 2021/10/01 改寫元件為套件全面物件化並增加開啟或關閉時的彈性，可單獨使用
// 使用方式
// const { openBtn,closeBtn } = modalObj.createModal({
//     modalClass:'.modal',
//     modalBodyClass:'.modal-body',
//     openBtnClass:'.btn',
//     cancelBtnClass:'.cancel'
// })
//
// openBtn.addEventListener('click',() => modalObj.show(()=> document.querySelector('.modal-content').textContent = 'open'))
// closeBtn.addEventListener('click',() => modalObj.close())
// 原碼
// let modalObj = {
//     element:{
//         modal:undefined,
//         modalBody:undefined,
//         openBtn:undefined,
//         cancelBtn:undefined,
//         confirmBtn:undefined
//     },
//     shardFn:{
//         addClass: (el, className) => el.classList.add(className),
//         removeClass: (el, className) => el.classList.remove(className),
//         styles: (el, cssType, cssParameter) => el.style.setProperty(cssType, cssParameter),
//     },
//     createModal(settingParmas = { modalClass:'',modalBodyClass:'',openBtnClass:'',cancelBtnClass:'',confirmBtnClass:'' }){
//         const { modalClass, modalBodyClass,openBtnClass,cancelBtnClass,confirmBtnClass } = settingParmas
//         this.element.modal = modalClass !== undefined && document.querySelector(modalClass)
//         this.element.modalBody = modalBodyClass !== undefined && document.querySelector(modalBodyClass)
//         this.element.openBtn = openBtnClass !== undefined && document.querySelector(openBtnClass)
//         this.element.cancelBtn = cancelBtnClass !== undefined && document.querySelector(cancelBtnClass)
//         this.element.confirmBtn = confirmBtnClass !== undefined && document.querySelector(confirmBtnClass)
//        
//         return {...this.element}
//     },
//     show(fn){
//         const { element:{ modal,modalBody },shardFn:{ addClass } } = this
//         // 設定淡入
//         addClass(modal, 'modal-toggle')
//         addClass(modalBody, 'modal-body-toggle')
//         fn !== undefined && fn.call(fn) // 設定 callBack 關閉後處理其他內容 ex modalObj.show(()=>console.log("open"))
//     },
//     close(fn){
//         const { element:{ modal,modalBody },shardFn:{ removeClass } } = this
//         removeClass(modal, 'modal-toggle')
//         removeClass(modalBody, 'modal-body-toggle')
//         fn !== undefined && fn.call(fn) // 設定 callBack 關閉後處理其他內容 ex modalObj.close(()=>console.log("close"))
//     }
// };
// 監聽點擊彈出視窗本體架構外部網頁空白區域 window (整個網頁當前視窗)，當點擊外部區域時一樣可關閉彈出視窗
// window.addEventListener('click', e => e.target == modalObj.element.modal ? modalObj.close() : null)


// 2021/12/06 改寫元件為套件全函式化並增修可控制內容，可擴展到開發 Library.js 上，只可在擴展上使用
// 使用方式
// const modal = $.createModal({
//     modalClass:'.modal',
//     modalBodyClass:'.modal-body',
//     haveBlur:true // 背景是否霧化效果
// })
//
// $('.btn').listener('click',() => modal.showModal())
// $('.cancel').listener('click',() => modal.closeModal())
// 原碼
((scope) => {
    scope.createModal = function(settingParmas = { modalClass:'',modalBodyClass:'',modalBodyToggleClass:'',haveBlur:false }){
        if(!('modalClass' in settingParmas && 'modalBodyClass' in settingParmas)){
            scope.console('error','Paramter must be object and inside property must use modalClass and modalBodyClass with type string.')
            return
        }

        const { modalClass, modalBodyClass,modalBodyToggleClass,haveBlur } = settingParmas
        
        const { modal,modalBody } = {
            modal:(modalClass !== '' && modalClass !== undefined) && scope(modalClass),
            modalBody:(modalBodyClass !== '' && modalBodyClass !== undefined) && scope(modalBodyClass),
            haveBlur:haveBlur
        }

        haveBlur && scope(modal).addClass('modal-blur')

        const modalBodyToggleClassTemp = modalBodyToggleClass === 'modal-body-toggle' ? 'modal-body-toggle' : modalBodyToggleClass

        function showModal(fn){
            // 設定淡入
            scope(modal).addClass('modal-toggle')
            scope(modalBody).addClass(modalBodyToggleClassTemp)
            fn !== undefined && fn.call(fn) // 設定 callBack 關閉後處理其他內容 ex modalObj.show(()=>console.log("open"))
        }

        function closeModal(fn){
            // 設定淡出
            scope(modal).removeClass('modal-toggle')
            scope(modalBody).removeClass(modalBodyToggleClassTemp)
            fn !== undefined && fn.call(fn) // 設定 callBack 關閉後處理其他內容 ex modalObj.close(()=>console.log("close"))
        }

        scope(window).listener('click', e => e.target == modal && closeModal())

        return { showModal,closeModal }
    }
})($)