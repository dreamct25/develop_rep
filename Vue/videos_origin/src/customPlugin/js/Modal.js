// 2020/7/17 優化更新元件

let modalObj = {}

modalObj.createModal = (elBtn, elCloseBtn, elModal, elModalBody, elCancle) => {
    modalObj.btn = elBtn != false ? document.querySelector(elBtn) : false
    modalObj.closeBtn = elCloseBtn != false ? document.querySelector(elCloseBtn) : false
    modalObj.modal = elModal != false ? document.querySelector(elModal) : false
    modalObj.modalBody = elModalBody != false ? document.querySelector(elModalBody) : false
    modalObj.cancle = elCancle != false ? document.querySelector(elCancle) : false
}

modalObj.fn = () => {
    return {
        addClass: (el, str) => el.classList.add(str),
        removeClass: (el, str) => el.classList.remove(str),
        styles: (el, cssType, cssParameter) => el.style.setProperty(cssType, cssParameter),
        modalEventAdd: (el, parameter) => {
            let fnc = parameter == "close" ? modalObj.close : modalObj.show
            el.addEventListener('click', fnc)
        },
        modalEventRemove: el => el.removeEventListener('click', modalObj.close)
    }
}

// 設定 showModal 函式，filter為選配樣式
modalObj.show = () => {
    modalObj.fn().styles(modalObj.modal, "display", "block")
        // 設定淡入延遲
    setTimeout(() => modalObj.fn().addClass(modalObj.modal, 'modal-toggle'), 10)
    setTimeout(() => modalObj.fn().addClass(modalObj.modalBody, 'modal-body-toggle'), 190)
        // 監聽點擊彈出視窗本體內部架構 X 按鈕
    if (modalObj.closeBtn != false) modalObj.fn().modalEventAdd(modalObj.closeBtn, "close")
        // 監聽點擊彈出視窗本體內部架構 Cancel 按鈕
    if (modalObj.cancle != false) modalObj.fn().modalEventAdd(modalObj.cancle, "close")
}

modalObj.close = () => {
    modalObj.fn().removeClass(modalObj.modal, 'modal-toggle')
    modalObj.fn().removeClass(modalObj.modalBody, 'modal-body-toggle')
        // 移除監聽點擊彈出視窗本體內部架構 X 按鈕，優化效能
    if (modalObj.closeBtn != false) modalObj.fn().modalEventRemove(modalObj.closeBtn)
        // 移除監聽點擊彈出視窗本體內部架構 Cancel 按鈕，優化效能
    if (modalObj.cancle != false) modalObj.fn().modalEventRemove(modalObj.cancle)
    setTimeout(() => modalObj.fn().styles(modalObj.modal, "display", ""), 750) // 設定淡出延遲
}

// 監聽點擊彈出視窗本體架構外部網頁空白區域 window (整個網頁當前視窗)，當點擊外部區域時一樣可關閉彈出視窗
window.addEventListener('click', e => e.target == modalObj.modal ? modalObj.close() : null)

module.exports = modalObj