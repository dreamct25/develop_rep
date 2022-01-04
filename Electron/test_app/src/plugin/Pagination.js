// 套件化版本 2021/12/15
// const createPagination = function (setting = {
//     currentItem:[],
//     pages:0,
//     partViewPage:0,
//     pageSize:0
// }) {
//     const render = function (putPage,pagination = {
//         currentItem:setting.currentItem,
//         currentPage:putPage || setting.pages,
//         totalLength:0,
//         hasPrev:false,
//         hasNext:false,
//         pageSize: setting.pageSize,
//         pageTotal: 0,
//         partViewPage: setting.partViewPage
//     }) {
//         let pageTotalToArray = []
//         let pagesItem = ""

//         pagination.totalLength = pagination.currentItem.length;
//         pagination.partViewPage = pagination.partViewPage
//         pagination.pageTotal = Math.ceil(
//             pagination.totalLength / pagination.partViewPage
//         );

//         pagination.currentPage = pagination.currentPage === undefined ? 1 : pagination.currentPage

//         pagination.hasPrev = pagination.currentPage > 1;
//         pagination.hasNext = pagination.currentPage < pagination.totalLength;

//         if (pagination.currentPage === pagination.pageTotal) pagination.hasNext = false
//         if (pagination.currentPage > pagination.pageTotal) pagination.currentPage = pagination.pageTotal
//         const minPage = pagination.currentPage * pagination.partViewPage - pagination.partViewPage + 1;
//         const maxPage = pagination.currentPage * pagination.partViewPage;

//         let currentItemTemp = pagination.currentItem
//         pagination.currentItem = []
//         currentItemTemp.forEach((item,index) => {
//             let num = index + 1;
//             if (num >= minPage && num <= maxPage) pagination.currentItem = [...pagination.currentItem, item];
//         });

//         document.querySelector(".pagination-item-group").replaceChildren()

//         if (pagination.currentPage <= pagination.pageTotal) {
//             if (pagination.currentPage < pagination.pageSize) {
//                 //當前頁數小於總頁數
//                 let i = Math.min(pagination.pageSize, pagination.pageTotal);
//                 while (i) {
//                     pageTotalToArray = [i--, ...pageTotalToArray]
//                 }
//             } else {
//                 //當前頁數大於顯示總頁數
//                 let middle = pagination.currentPage - Math.floor(pagination.pageSize / 2)
//                 //記錄起始位置
//                 let i = pagination.pageSize;
//                 if (middle > pagination.pageTotal - pagination.pageSize) {
//                     middle = pagination.pageTotal - pagination.pageSize + 1;
//                 }
//                 while (i--) {
//                     pageTotalToArray = [...pageTotalToArray, middle++]
//                 }
//             }
//         }

//         pagesItem = `
//             <div class="${pagination.hasPrev ? 'page-item' : 'page-item dis-active'}" data-page="${pagination.currentPage - 1}">
//                 <div class="page-link" data-page="${pagination.currentPage - 1}">
//                     P
//                 </div>
//             </div>
//             ${pageTotalToArray.map(num => `
//                 <div class="${pagination.currentPage === num ? 'page-item active' : 'page-item'}" data-page="${num}">
//                     <div class="page-link" data-page="${num}">
//                         ${num}
//                     </div>
//                 </div>
//             `).join("")}
//             <div class="${pagination.hasNext ? 'page-item' : 'page-item dis-active'}" data-page="${pagination.hasNext ? pagination.currentPage + 1 : pagination.pageTotal}">
//                 <div class="page-link" data-page="${pagination.hasNext ? pagination.currentPage + 1 : pagination.pageTotal}">
//                     N
//                 </div>
//             </div>
//         `
        
//         document.querySelector(".pagination-item-group").insertAdjacentHTML("beforeend",pagesItem)
        
//         return { pageObj: pagination, renderItem: pagination.currentItem,originItem:setting.currentItem }
//     }

//     render()

//     return { render:render }
// }

// 2021/12/15 改寫元件為套件全函式化並增修可控制內容，可擴展到開發 Library.js 上，只可在擴展上使用
((scope) => scope.createPagination = function (setting = {
    currentItem:[],
    pages:0,
    partViewPage:0,
    pageSize:0,
    isActiveDom:false
}) {
    const render = function (putPage,pagination = {
        currentItem:setting.currentItem,
        currentPage:putPage || setting.pages,
        totalLength:0,
        hasPrev:false,
        hasNext:false,
        pageSize: setting.pageSize,
        pageTotal: 0,
        partViewPage: setting.partViewPage
    }) {
        let pageTotalToArray = []
        let pagesItem = ""

        pagination.totalLength = pagination.currentItem.length;
        pagination.partViewPage = pagination.partViewPage
        pagination.pageTotal = Math.ceil(
            pagination.totalLength / pagination.partViewPage
        );

        pagination.currentPage = pagination.currentPage === undefined ? 1 : pagination.currentPage

        pagination.hasPrev = pagination.currentPage > 1;
        pagination.hasNext = pagination.currentPage < pagination.totalLength;

        if (pagination.currentPage === pagination.pageTotal) pagination.hasNext = false
        if (pagination.currentPage > pagination.pageTotal) pagination.currentPage = pagination.pageTotal
        const minPage = pagination.currentPage * pagination.partViewPage - pagination.partViewPage + 1;
        const maxPage = pagination.currentPage * pagination.partViewPage;

        let currentItemTemp = pagination.currentItem
        pagination.currentItem = []
        scope.each(currentItemTemp,(item,index) => {
            let num = index + 1;
            if (num >= minPage && num <= maxPage) pagination.currentItem = [...pagination.currentItem, item];
        });

        !setting.isActiveDom && scope(".pagination-item-group").removeChildDom()

        if (pagination.currentPage <= pagination.pageTotal) {
            if (pagination.currentPage < pagination.pageSize) {
                //當前頁數小於總頁數
                let i = Math.min(pagination.pageSize, pagination.pageTotal);
                while (i) {
                    pageTotalToArray = [i--, ...pageTotalToArray]
                }
            } else {
                //當前頁數大於顯示總頁數
                let middle = pagination.currentPage - Math.floor(pagination.pageSize / 2)
                //記錄起始位置
                let i = pagination.pageSize;
                if (middle > pagination.pageTotal - pagination.pageSize) {
                    middle = pagination.pageTotal - pagination.pageSize + 1;
                }
                while (i--) {
                    pageTotalToArray = [...pageTotalToArray, middle++]
                }
            }
        }

        pagesItem = `
            <div class="${pagination.hasPrev ? 'page-item' : 'page-item dis-active'}" data-page="${pagination.currentPage - 1}">
                <div class="page-link" data-page="${pagination.currentPage - 1}">
                    <div class="arrow-left-outer">
                        <div class="arrow-top"></div>
                        <div class="arrow-bottom"></div>
                    </div>
                </div>
            </div>
            ${scope.maps(pageTotalToArray,num => `
                <div class="${pagination.currentPage === num ? 'page-item active' : 'page-item'}" data-page="${num}">
                    <div class="page-link" data-page="${num}">
                        ${num}
                    </div>
                </div>
            `).join("")}
            <div class="${pagination.hasNext ? 'page-item' : 'page-item dis-active'}" data-page="${pagination.hasNext ? pagination.currentPage + 1 : pagination.pageTotal}">
                <div class="page-link" data-page="${pagination.hasNext ? pagination.currentPage + 1 : pagination.pageTotal}">
                    <div class="arrow-right-outer">
                        <div class="arrow-top"></div>
                        <div class="arrow-bottom"></div>
                    </div>
                </div>
            </div>
        `
        !setting.isActiveDom && scope(".pagination-item-group").easyAppendDom("beforDom",pagesItem)
        
        return { pageObj: pagination, renderItem: pagination.currentItem,originItem:setting.currentItem,pagesItem:pagesItem }
    }

    const { renderItem,pagesItem } = render()

    return { render:render,renderItem:renderItem,pagesItem:pagesItem }
})($)