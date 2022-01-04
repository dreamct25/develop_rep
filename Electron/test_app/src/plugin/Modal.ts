import $ from '../lib/Library'

((scope) => {
    scope.createModal = function(settingParmas:{ 
        modalClass:string,
        modalBodyClass:string,
        modalBodyToggleClass:string,
        haveBlur:boolean
    } = { modalClass:'',modalBodyClass:'',modalBodyToggleClass:'',haveBlur:false }){
        if(!('modalClass' in settingParmas && 'modalBodyClass' in settingParmas)){
            scope.console('error','Paramter must be object and inside property must use modalClass and modalBodyClass with type string.')
            return
        }

        const { modalClass, modalBodyClass,modalBodyToggleClass,haveBlur } = settingParmas
        
        const { modal,modalBody }:{ modal:HTMLDivElement,modalBody:HTMLDivElement } = {
            modal:(modalClass !== '' && modalClass !== undefined) && scope(modalClass),
            modalBody:(modalBodyClass !== '' && modalBodyClass !== undefined) && scope(modalBodyClass),
        }

        haveBlur && scope(modal).addClass('modal-blur')

        console.log(modalBodyClass)

        const modalBodyToggleClassTemp = modalBodyToggleClass === 'modal-body-toggle' ? 'modal-body-toggle' : modalBodyToggleClass

        function showModal(fn?:() => void){
            // 設定淡入
            scope(modal).addClass('modal-toggle')
            scope(modalBody).addClass(modalBodyToggleClassTemp)
            fn !== undefined && fn.call(fn) // 設定 callBack 關閉後處理其他內容 ex modalObj.show(()=>console.log("open"))
        }

        function closeModal(fn?:() => void){
            // 設定淡出
            scope(modal).removeClass('modal-toggle')
            scope(modalBody).removeClass(modalBodyToggleClassTemp)
            fn !== undefined && fn.call(fn) // 設定 callBack 關閉後處理其他內容 ex modalObj.close(()=>console.log("close"))
        }

        scope(window).listener('click', ({ target }:{ target:HTMLElement }) => target == modal && closeModal())

        return { showModal,closeModal }
    }
})($)