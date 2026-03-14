const sleep = time => new Promise((resolve) => setTimeout(() => resolve() ,time))

const sideTabsOuter = document.createElement("div")
sideTabsOuter.className = 'ext-side-tabs-outer'

const sideTabList = document.createElement('div')
sideTabList.className = 'side-tabs-list'

const sideTabListEmpty = document.createElement('div')
sideTabListEmpty.className = 'no-tabs'
sideTabListEmpty.textContent = '讀取分頁列表中 ...'

sideTabList.appendChild(sideTabListEmpty)

sideTabsOuter.appendChild(sideTabList)

const sideTabListOpenBtn = document.createElement('div')
sideTabListOpenBtn.className = 'ext-side-tab-list-open-btn toggle'
sideTabListOpenBtn.innerHTML = `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">

        <rect x="6" y="10" width="52" height="42" rx="3" stroke="currentColor" stroke-width="4"/>

        <line x1="22" y1="10" x2="22" y2="52" stroke="currentColor" stroke-width="4"/>

        <line x1="6" y1="24" x2="22" y2="24" stroke="currentColor" stroke-width="4"/>

        <line x1="6" y1="38" x2="22" y2="38" stroke="currentColor" stroke-width="4"/>

    </svg>
`
sideTabListOpenBtn.onclick = () => {
    
    sideTabsOuter.classList.add('toggle')

    sideTabListOpenBtn.classList.add('toggle')

    chrome.storage.local.set({ sideTabListIsActive: true })
}

const sideTabListCloseBtn = document.createElement('div')
sideTabListCloseBtn.className = 'side-tab-list-close-btn'
sideTabListCloseBtn.textContent = '關閉'
sideTabListCloseBtn.onclick = () => {
    
    sideTabsOuter.classList.remove('toggle')
    sideTabListOpenBtn.classList.remove('toggle')

    chrome.storage.local.set({ sideTabListIsActive: false })
}

sideTabsOuter.appendChild(sideTabListCloseBtn)

const styles = document.createElement('style')

styles.textContent = `
    .ext-side-tabs-outer {
        position: fixed;
        top: 0;
        left: 0;
        width: 300px;
        background-color: rgba(30, 30, 30, .8);
        border-radius: 5px;
        margin: 5px;
        bottom: 0;
        backdrop-filter: blur(6px);
        z-index: 9999;
        padding: 6px;
        border-radius: 6px;
        display: grid;
        grid-template-rows: 1fr 0fr;
        gap: 6px;
        transform: translateX(-300px);
        pointer-events: none;
        opacity: 0;
        transition: transform .5s ease, opacity .5s ease;
        box-shadow: inset 0 0 1px .5px rgba(255, 255, 255, .3);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
    }

    .ext-side-tabs-outer.toggle {
        pointer-events: all;
        opacity: 1;
        transform: translateX(0);
    }

    .ext-side-tabs-outer .side-tabs-list {
        overflow-y: auto;
        height: 100%;
    }

    .ext-side-tabs-outer .side-tabs-list::-webkit-scrollbar {
        width: 5px;
    }

    .ext-side-tabs-outer .side-tabs-list::-webkit-scrollbar-thumb {
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 0.7);
    }

    .ext-side-tabs-outer .side-tabs-list .no-tabs {
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        height: 100%;
        font-size: 16px !important;
        color: white !important;
    }

    .ext-side-tabs-outer .side-tabs-list .tab-item-outer {
        position: relative;
        margin-bottom: 6px;
        border-radius: 5px;
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, .6);
        overflow: hidden;
    }

    .ext-side-tabs-outer .side-tabs-list .tab-item-outer.active {
        background-color: rgba(255, 255, 255, .3);
        color: black;
        font-weight: bold;
        box-shadow: inset 0 0 2px 1px rgba(30, 30, 30, .5);
    }

    .ext-side-tabs-outer .side-tabs-list .tab-item-outer:hover .tab-item  {
        width: 93%;
    }
    
    .ext-side-tabs-outer .side-tabs-list .tab-item-outer:hover .close-tab-btn  {
        opacity: 1;
        transform: translateX(0);
    }

    .ext-side-tabs-outer .side-tabs-list .tab-item-outer .tab-item {
        position: relative;
        cursor: pointer;
        user-select: none;
        padding: 8px 11px 10px 11px;
        cursor: pointer;
        user-select: none;
        display: grid;
        grid-template-columns: 22px 1fr;
        gap: 10px;
        align-items: center;
        width: 94%;
        transition: width .3s ease;
    }

    .ext-side-tabs-outer .side-tabs-list .tab-item-outer .tab-item.no-icon {
        display: block;
        grid-template-columns: unset;
        gap: unset;
        align-items: unset;
        padding: 9px 13px 9px 13px;
    }

    .ext-side-tabs-outer .side-tabs-list .tab-item-outer .tab-item:last-child {
        margin-bottom: 0;
    }

    .ext-side-tabs-outer .side-tabs-list .tab-item-outer .tab-item .text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 16px !important;
        color: white !important;
    }

    .ext-side-tabs-outer .side-tabs-list .tab-item-outer .tab-item .fav-icon-outer {
        padding-top: 1px;
    }

    .ext-side-tabs-outer .side-tabs-list .tab-item-outer .tab-item img {
        width: 100%;
        display: block !important;
    }

    .ext-side-tabs-outer .side-tabs-list .tab-item-outer .close-tab-btn {
        position: absolute;
        top: 0;
        right: 0;
        transform: translateX(36px);
        bottom: 0;
        opacity: 0;
        width: 35px;
        transition: transform .3s ease, opacity .3s ease;
        cursor: pointer;
        user-select: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .ext-side-tabs-outer .side-tabs-list .tab-item-outer .close-tab-btn svg {
        color: rgb(255, 51, 51);
        width: 18px;
    }

    .ext-side-tabs-outer .side-tab-list-close-btn {
        padding: 6px 0;
        text-align: center;
        font-size: 16px;
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, .6);
        border-radius: 5px;
        cursor: pointer;
        user-select: none;
        font-size: 16px !important;
        color: white !important;
    }

    .ext-side-tab-list-open-btn {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        padding: 4px 6px 0 6px;
        margin: 5px;
        height: 30px;
        width: 26px;
        background-color: rgba(30, 30, 30, .5);
        border-radius: 5px;
        backdrop-filter: blur(6px);
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, .6);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        transform: translateX(0);
        opacity: .5;
        transition: transform .5s ease, opacity .5s ease;
        cursor: pointer;
        user-select: none;
        font-size: 16px !important;
        color: white !important;
        box-sizing: unset !important;
    }

    .ext-side-tab-list-open-btn:hover {
        opacity: 1;
    }

    .ext-side-tab-list-open-btn svg {
        width: 100%;
    }

    .ext-side-tab-list-open-btn.toggle {
        opacity: 0;
        transform: translateX(-100px);
    }
`

document.head.appendChild(styles)

document.body.appendChild(sideTabListOpenBtn)

document.body.appendChild(sideTabsOuter)

const createList = async request => {

    if(request) {

        sideTabList.innerText = ''
        sideTabList.scrollTop = 0

        const tabItems = request.val.map(row => {

            let isActive = false

            const tabItemOuter = document.createElement('div')
            tabItemOuter.className = row.active ? 'tab-item-outer active' : 'tab-item-outer'
            
            const tabItem = document.createElement('div')
            tabItem.className = 'tab-item'

            isActive = row.active
            
            tabItem.onclick = () => {

                chrome.runtime.sendMessage(
                    { activeTabId: "activeTabId", val: row.id }
                )
            }

            const tabItemFavIconOuter = document.createElement('div')
            tabItemFavIconOuter.className = 'fav-icon-outer'

            if(row.favIconUrl) {

                const tabItemFavIcon = document.createElement('img')
                tabItemFavIcon.src = row.favIconUrl

                tabItemFavIconOuter.appendChild(tabItemFavIcon)

                tabItem.appendChild(tabItemFavIconOuter)
            } else {
                tabItem.classList.add('no-icon')
            }

            const tabItemText = document.createElement('div')
            tabItemText.className = 'text'
            tabItemText.textContent = row.title
            tabItemText.title = row.title

            const closeTabBtn = document.createElement('div')
            closeTabBtn.className = 'close-tab-btn'
            closeTabBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
                <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
            </svg>
            `
            closeTabBtn.onclick = () => {
                chrome.runtime.sendMessage({ closeTab: "closeTab", val: row.id }, createList.bind(undefined))
            }

            tabItem.appendChild(tabItemText)
            tabItemOuter.appendChild(tabItem)
            tabItemOuter.appendChild(closeTabBtn)

            return {
                tabItemOuter,
                isActive
            }
        })

        sideTabList.append(...tabItems.map(row => row.tabItemOuter))

        const [filterItem] = tabItems.filter(row => row.isActive === true)

        sideTabList.scrollTop = filterItem ? filterItem.tabItemOuter.getBoundingClientRect().top - 12 : 0
    }

    const storeSideTabListIsActive = await chrome.storage.local.get('sideTabListIsActive')
    const storeIsSideTabsActive = await chrome.storage.local.get('isSideTabsActive')

    if(storeIsSideTabsActive?.isSideTabsActive) {

        sideTabsOuter.classList[storeSideTabListIsActive?.sideTabListIsActive ? 'add' : 'remove']('toggle')

        sideTabListOpenBtn.classList[storeSideTabListIsActive?.sideTabListIsActive ? 'add' : 'remove']('toggle')
        
        return
    }

    sideTabsOuter.classList.remove('toggle')

    sideTabListOpenBtn.classList.add('toggle')
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    
    if(request?.tabList) {

        if(!request?.val) return

        createList(request)
    }

    if(request?.enableAction) {

        await chrome.storage.local.set({ isSideTabsActive: true })

        await chrome.storage.local.set({ sideTabListIsActive: false })
        
        chrome.runtime.sendMessage(
            { getTabs: "getTabs", val: request.val }
        )
    }

    if(request?.disabledAction) {

        await chrome.storage.local.set({ isSideTabsActive: false })
        
        await chrome.storage.local.set({ sideTabListIsActive: false })
        
        createList()
    }

    if(request?.getSetting) {
        
        chrome.runtime.sendMessage(
            { getTabs: "getTabs", val: request.val }
        )
    }
});

